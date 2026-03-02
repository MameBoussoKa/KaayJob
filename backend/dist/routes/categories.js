"use strict";
/**
 * Routes des catégories
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
const router = (0, express_1.Router)();
// GET /api/categories - Liste des catégories
router.get("/", async (req, res) => {
    try {
        const result = await (0, database_1.query)(`
      SELECT c.*, COUNT(s.id) as service_count
      FROM categories c
      LEFT JOIN services s ON s.category_id = c.id AND s.is_active = true
      GROUP BY c.id
      ORDER BY c.name
    `);
        res.json({ success: true, data: result.rows });
    }
    catch (error) {
        console.error("Erreur liste catégories:", error);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});
// GET /api/categories/:id
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await (0, database_1.query)("SELECT * FROM categories WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return res
                .status(404)
                .json({ success: false, message: "Catégorie non trouvée" });
        }
        // Get services in this category
        const servicesResult = await (0, database_1.query)(`
      SELECT s.*, u.first_name, u.last_name, pp.business_name, pp.rating
      FROM services s
      JOIN users u ON s.provider_id = u.id
      JOIN provider_profiles pp ON pp.user_id = u.id
      WHERE s.category_id = $1 AND s.is_active = true
      ORDER BY pp.rating DESC NULLS LAST
      LIMIT 20
    `, [id]);
        res.json({
            success: true,
            data: {
                ...result.rows[0],
                services: servicesResult.rows,
            },
        });
    }
    catch (error) {
        console.error("Erreur récupération catégorie:", error);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});
exports.default = router;
module.exports = router;
//# sourceMappingURL=categories.js.map