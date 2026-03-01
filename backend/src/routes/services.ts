/**
 * Routes des services
 */

import { Router, Response, Request } from "express";
import { body, validationResult } from "express-validator";
import { query } from "../config/database";
import { authenticate, AuthRequest } from "../middleware/auth";

const router = Router();

// GET /api/services - Liste des services
router.get("/", async (req: Request, res: Response) => {
  try {
    const {
      category,
      provider,
      search,
      page = 1,
      limit = 12,
      minPrice,
      maxPrice,
    } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let whereClause = "WHERE s.is_active = true";
    const params: any[] = [];
    let paramIndex = 1;

    if (category) {
      whereClause += ` AND s.category_id = $${paramIndex}`;
      params.push(category);
      paramIndex++;
    }

    if (provider) {
      whereClause += ` AND s.provider_id = $${paramIndex}`;
      params.push(provider);
      paramIndex++;
    }

    if (search) {
      whereClause += ` AND (s.name ILIKE $${paramIndex} OR s.description ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    if (minPrice) {
      whereClause += ` AND s.price >= $${paramIndex}`;
      params.push(Number(minPrice));
      paramIndex++;
    }

    if (maxPrice) {
      whereClause += ` AND s.price <= $${paramIndex}`;
      params.push(Number(maxPrice));
      paramIndex++;
    }

    const countResult = await query(
      `SELECT COUNT(*) FROM services s ${whereClause}`,
    );

    const result = await query(
      `SELECT s.*, c.name as category_name, u.first_name, u.last_name, pp.business_name, pp.rating
       FROM services s
       JOIN categories c ON s.category_id = c.id
       JOIN users u ON s.provider_id = u.id
       JOIN provider_profiles pp ON pp.user_id = u.id
       ${whereClause}
       ORDER BY s.created_at DESC
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
    console.error("Erreur liste services:", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

// GET /api/services/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query(
      `SELECT s.*, c.name as category_name, c.id as category_id,
              u.first_name as provider_first_name, u.last_name as provider_last_name,
              pp.business_name, pp.rating, pp.profile_image
       FROM services s
       JOIN categories c ON s.category_id = c.id
       JOIN users u ON s.provider_id = u.id
       JOIN provider_profiles pp ON pp.user_id = u.id
       WHERE s.id = $1`,
      [id],
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Service non trouvé" });
    }

    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Erreur récupération service:", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

// POST /api/services - Créer un service (prestataire)
router.post(
  "/",
  authenticate,
  [
    body("name")
      .notEmpty()
      .withMessage("Nom du service requis")
      .isLength({ max: 100 }),
    body("description")
      .notEmpty()
      .withMessage("Description requise")
      .isLength({ max: 1000 }),
    body("categoryId").isInt({ min: 1 }).withMessage("Catégorie invalide"),
    body("price").isFloat({ min: 0 }).withMessage("Prix invalide"),
    body("duration")
      .isInt({ min: 15 })
      .withMessage("Durée minimale: 15 minutes"),
  ],
  async (req: AuthRequest, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ success: false, errors: errors.array() });

      const user = req.user!;
      if (user.role !== "prestataire") {
        return res
          .status(403)
          .json({ success: false, message: "Accès réservé aux prestataires" });
      }

      const { name, description, categoryId, price, duration } = req.body;

      const result = await query(
        `INSERT INTO services (provider_id, category_id, name, description, price, duration, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, true)
       RETURNING *`,
        [user.id, categoryId, name, description, price, duration],
      );

      res
        .status(201)
        .json({ success: true, message: "Service créé", data: result.rows[0] });
    } catch (error) {
      console.error("Erreur création service:", error);
      res.status(500).json({ success: false, message: "Erreur serveur" });
    }
  },
);

// PUT /api/services/:id - Mettre à jour un service
router.put("/:id", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user!;

    // Verify ownership
    const existing = await query(
      "SELECT provider_id FROM services WHERE id = $1",
      [id],
    );
    if (existing.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Service non trouvé" });
    }
    if (existing.rows[0].provider_id !== user.id && user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Accès refusé" });
    }

    const { name, description, categoryId, price, duration, isActive } =
      req.body;

    const result = await query(
      `UPDATE services
       SET name = COALESCE($1, name),
           description = COALESCE($2, description),
           category_id = COALESCE($3, category_id),
           price = COALESCE($4, price),
           duration = COALESCE($5, duration),
           is_active = COALESCE($6, is_active),
           updated_at = NOW()
       WHERE id = $7
       RETURNING *`,
      [name, description, categoryId, price, duration, isActive, id],
    );

    res.json({
      success: true,
      message: "Service mis à jour",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Erreur mise à jour service:", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

// DELETE /api/services/:id
router.delete("/:id", authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user!;

    const existing = await query(
      "SELECT provider_id FROM services WHERE id = $1",
      [id],
    );
    if (existing.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Service non trouvé" });
    }
    if (existing.rows[0].provider_id !== user.id && user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Accès refusé" });
    }

    await query("DELETE FROM services WHERE id = $1", [id]);

    res.json({ success: true, message: "Service supprimé" });
  } catch (error) {
    console.error("Erreur suppression service:", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

export default router;
module.exports = router;
