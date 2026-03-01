/**
 * Routes des réservations
 */

import { Router, Response } from "express";
import { body, validationResult } from "express-validator";
import { query } from "../config/database";
import { authenticate, AuthRequest } from "../middleware/auth";

const router = Router();

// GET /api/bookings - Liste des réservations (selon rôle)
router.get("/", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user!;
    let result;

    if (user.role === "admin") {
      result = await query(`
        SELECT b.*, u.first_name, u.last_name, u.email, s.name as service_name
        FROM bookings b
        JOIN users u ON b.client_id = u.id
        JOIN services s ON b.service_id = s.id
        ORDER BY b.created_at DESC
      `);
    } else if (user.role === "prestataire") {
      result = await query(`
        SELECT b.*, u.first_name, u.last_name, u.email, s.name as service_name
        FROM bookings b
        JOIN users u ON b.client_id = u.id
        JOIN services s ON b.service_id = s.id
        JOIN provider_services ps ON b.service_id = ps.service_id
        WHERE ps.provider_id = $1
        ORDER BY b.created_at DESC
      `, [user.id]);
    } else {
      result = await query(`
        SELECT b.*, s.name as service_name
        FROM bookings b
        JOIN services s ON b.service_id = s.id
        WHERE b.client_id = $1
        ORDER BY b.created_at DESC
      `, [user.id]);
    }

    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Erreur liste reservations:", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

// POST /api/bookings - Créer une réservation
router.post("/", authenticate, [
  body("serviceId").isInt({ min: 1 }).withMessage("ID service invalide"),
  body("date").isISO8601().withMessage("Date invalide"),
  body("time").matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage("Heure invalide (format HH:mm)"),
  body("address").notEmpty().withMessage("Adresse requise"),
  body("notes").optional().isLength({ max: 500 }).withMessage("Notes: 500 caractères max"),
], async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    const { serviceId, date, time, address, notes } = req.body;
    const clientId = req.user!.id;

    // Vérifier si le service existe
    const serviceResult = await query("SELECT id, price FROM services WHERE id = $1", [serviceId]);
    if (serviceResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Service non trouvé" });
    }

    const result = await query(
      `INSERT INTO bookings (client_id, service_id, booking_date, booking_time, address, notes, status, total_amount)
       VALUES ($1, $2, $3, $4, $5, $6, 'pending', $7)
       RETURNING *`,
      [clientId, serviceId, date, time, address, notes, serviceResult.rows[0].price]
    );

    res.status(201).json({ success: true, message: "Réservation créée", data: result.rows[0] });
  } catch (error) {
    console.error("Erreur création réservation:", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

// GET /api/bookings/:id
router.get("/:id", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user!;

    const result = await query(`
      SELECT b.*, s.name as service_name, s.description as service_description,
             u.first_name as provider_first_name, u.last_name as provider_last_name
      FROM bookings b
      JOIN services s ON b.service_id = s.id
      JOIN users u ON s.provider_id = u.id
      WHERE b.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Réservation non trouvée" });
    }

    const booking = result.rows[0];
    // Vérifier accès
    if (user.role === "client" && booking.client_id !== user.id) {
      return res.status(403).json({ success: false, message: "Accès refusé" });
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    console.error("Erreur récupération réservation:", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

// PUT /api/bookings/:id/status - Mettre à jour le statut
router.put("/:id/status", authenticate, [
  body("status").isIn(["pending", "confirmed", "completed", "cancelled"]).withMessage("Statut invalide"),
], async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    const { id } = req.params;
    const { status } = req.body;

    const result = await query(
      "UPDATE bookings SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Réservation non trouvée" });
    }

    res.json({ success: true, message: "Statut mis à jour", data: result.rows[0] });
  } catch (error) {
    console.error("Erreur mise à jour statut:", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

// DELETE /api/bookings/:id
router.delete("/:id", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query("DELETE FROM bookings WHERE id = $1 RETURNING id", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Réservation non trouvée" });
    }

    res.json({ success: true, message: "Réservation supprimée" });
  } catch (error) {
    console.error("Erreur suppression réservation:", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

export default router;
module.exports = router;
