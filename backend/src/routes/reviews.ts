/**
 * Routes des avis
 */

import { Router, Response, Request } from "express";
import { body, validationResult } from "express-validator";
import { query } from "../config/database";
import { authenticate, AuthRequest } from "../middleware/auth";

const router = Router();

// GET /api/reviews/:providerId - Liste des avis d'un prestataire
router.get("/:providerId", async (req: Request, res: Response) => {
  try {
    const { providerId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const result = await query(
      `SELECT r.*, u.first_name, u.last_name
       FROM reviews r
       JOIN users u ON r.client_id = u.id
       WHERE r.provider_id = $1
       ORDER BY r.created_at DESC
       LIMIT $2 OFFSET $3`,
      [providerId, Number(limit), offset],
    );

    const countResult = await query(
      "SELECT COUNT(*), AVG(rating) as avg_rating FROM reviews WHERE provider_id = $1",
      [providerId],
    );

    res.json({
      success: true,
      data: result.rows,
      summary: {
        total: parseInt(countResult.rows[0].count),
        averageRating: parseFloat(countResult.rows[0].avg_rating) || 0,
      },
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: parseInt(countResult.rows[0].count),
      },
    });
  } catch (error) {
    console.error("Erreur liste avis:", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

// POST /api/reviews - Créer un avis
router.post(
  "/",
  authenticate,
  [
    body("providerId").isInt({ min: 1 }).withMessage("ID prestataire invalide"),
    body("bookingId").isInt({ min: 1 }).withMessage("ID réservation invalide"),
    body("rating").isInt({ min: 1, max: 5 }).withMessage("Note: 1-5"),
    body("comment")
      .optional()
      .isLength({ max: 1000 })
      .withMessage("Commentaire: 1000 caractères max"),
  ],
  async (req: AuthRequest, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ success: false, errors: errors.array() });

      const user = req.user!;
      const { providerId, bookingId, rating, comment } = req.body;

      // Verify booking exists and belongs to user
      const bookingResult = await query(
        "SELECT id, client_id, service_id FROM bookings WHERE id = $1 AND client_id = $2 AND status = 'completed'",
        [bookingId, user.id],
      );

      if (bookingResult.rows.length === 0) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Réservation invalide ou non terminée",
          });
      }

      // Check if already reviewed
      const existingReview = await query(
        "SELECT id FROM reviews WHERE booking_id = $1",
        [bookingId],
      );

      if (existingReview.rows.length > 0) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Avis déjà soumis pour cette réservation",
          });
      }

      const result = await query(
        `INSERT INTO reviews (client_id, provider_id, booking_id, rating, comment)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
        [user.id, providerId, bookingId, rating, comment],
      );

      // Update provider rating
      await query(
        `UPDATE provider_profiles
       SET rating = (SELECT AVG(rating) FROM reviews WHERE provider_id = $1),
           review_count = review_count + 1
       WHERE user_id = $1`,
        [providerId],
      );

      res
        .status(201)
        .json({ success: true, message: "Avis créé", data: result.rows[0] });
    } catch (error) {
      console.error("Erreur création avis:", error);
      res.status(500).json({ success: false, message: "Erreur serveur" });
    }
  },
);

// DELETE /api/reviews/:id - Supprimer un avis (auteur ou admin)
router.delete("/:id", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user!;

    const existing = await query(
      "SELECT client_id, provider_id FROM reviews WHERE id = $1",
      [id],
    );
    if (existing.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Avis non trouvé" });
    }

    // Check ownership or admin
    if (existing.rows[0].client_id !== user.id && user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Accès refusé" });
    }

    const providerId = existing.rows[0].provider_id;

    await query("DELETE FROM reviews WHERE id = $1", [id]);

    // Update provider rating
    await query(
      `UPDATE provider_profiles
       SET rating = COALESCE((SELECT AVG(rating) FROM reviews WHERE provider_id = $1), 0),
           review_count = GREATEST(review_count - 1, 0)
       WHERE user_id = $1`,
      [providerId],
    );

    res.json({ success: true, message: "Avis supprimé" });
  } catch (error) {
    console.error("Erreur suppression avis:", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

export default router;
module.exports = router;
