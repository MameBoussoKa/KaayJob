/**
 * Routes des prestataires
 */

import { Router, Response } from "express";
import { query } from "../config/database";
import { authenticate, AuthRequest } from "../middleware/auth";

const router = Router();

// GET /api/providers - Liste des prestataires
router.get("/", async (req: AuthRequest, res: Response) => {
  try {
    const { category, search, page = 1, limit = 12 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let whereClause = "WHERE pp.is_verified = true";
    const params: any[] = [];
    let paramIndex = 1;

    if (category) {
      whereClause += ` AND s.category_id = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    if (search) {
      whereClause += ` AND (u.first_name ILIKE $${paramIndex} OR u.last_name ILIKE $${paramIndex} OR pp.business_name ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    const countResult = await query(
      `SELECT COUNT(*) FROM provider_profiles pp
       JOIN users u ON pp.user_id = u.id
       WHERE pp.is_verified = true`,
    );

    const result = await query(
      `SELECT u.id, u.first_name, u.last_name, u.email, pp.business_name, pp.description,
              pp.experience_years, pp.location, pp.profile_image, pp.rating, pp.review_count,
              COALESCE(AVG(s.price), 0) as avg_price
       FROM provider_profiles pp
       JOIN users u ON pp.user_id = u.id
       LEFT JOIN services s ON s.provider_id = u.id
       ${whereClause}
       GROUP BY u.id, u.first_name, u.last_name, u.email, pp.business_name, pp.description,
                pp.experience_years, pp.location, pp.profile_image, pp.rating, pp.review_count
       ORDER BY pp.rating DESC NULLS LAST
       LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      [...params, Number(limit), offset],
    );

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: parseInt(countResult.rows[0].count),
        totalPages: Math.ceil(
          parseInt(countResult.rows[0].count) / Number(limit),
        ),
      },
    });
  } catch (error) {
    console.error("Erreur liste prestataires:", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

// GET /api/providers/:id
router.get("/:id", async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query(
      `SELECT u.id, u.first_name, u.last_name, u.email, pp.business_name, pp.description,
              pp.experience_years, pp.location, pp.profile_image, pp.rating, pp.review_count,
              pp.is_verified, pp.created_at
       FROM provider_profiles pp
       JOIN users u ON pp.user_id = u.id
       WHERE u.id = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Prestataire non trouvé" });
    }

    // Get services
    const servicesResult = await query(
      `SELECT s.*, c.name as category_name
       FROM services s
       JOIN categories c ON s.category_id = c.id
       WHERE s.provider_id = $1 AND s.is_active = true`,
      [id],
    );

    res.json({
      success: true,
      data: {
        ...result.rows[0],
        services: servicesResult.rows,
      },
    });
  } catch (error) {
    console.error("Erreur récupération prestataire:", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

// PUT /api/providers/profile - Mettre à jour le profil
router.put(
  "/profile",
  authenticate,
  async (req: AuthRequest, res: Response) => {
    try {
      const user = req.user!;
      if (user.role !== "prestataire") {
        return res
          .status(403)
          .json({ success: false, message: "Accès réservé aux prestataires" });
      }

      const {
        businessName,
        description,
        experienceYears,
        location,
        profileImage,
      } = req.body;

      const result = await query(
        `UPDATE provider_profiles
       SET business_name = COALESCE($1, business_name),
           description = COALESCE($2, description),
           experience_years = COALESCE($3, experience_years),
           location = COALESCE($4, location),
           profile_image = COALESCE($5, profile_image),
           updated_at = NOW()
       WHERE user_id = $6
       RETURNING *`,
        [
          businessName,
          description,
          experienceYears,
          location,
          profileImage,
          user.id,
        ],
      );

      if (result.rows.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Profil non trouvé" });
      }

      res.json({
        success: true,
        message: "Profil mis à jour",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Erreur mise à jour profil:", error);
      res.status(500).json({ success: false, message: "Erreur serveur" });
    }
  },
);

// GET /api/providers/:id/reviews
router.get("/:id/reviews", async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const result = await query(
      `SELECT r.*, u.first_name, u.last_name
       FROM reviews r
       JOIN users u ON r.client_id = u.id
       WHERE r.provider_id = $1
       ORDER BY r.created_at DESC
       LIMIT $2 OFFSET $3`,
      [id, Number(limit), offset],
    );

    const countResult = await query(
      "SELECT COUNT(*) FROM reviews WHERE provider_id = $1",
      [id],
    );

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: parseInt(countResult.rows[0].count),
      },
    });
  } catch (error) {
    console.error("Erreur récupération avis:", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

export default router;
module.exports = router;
