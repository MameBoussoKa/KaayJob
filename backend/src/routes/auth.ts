/**
 * Routes d'authentification
 */

import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "../config/database";

const router = Router();
const JWT_SECRET =
  process.env.JWT_SECRET || "kaayjob-secret-key-change-in-production";

// POST /api/auth/register
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Email invalide"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Mot de passe: 8 caractères min"),
    body("firstName").notEmpty().withMessage("Prénom requis"),
    body("lastName").notEmpty().withMessage("Nom requis"),
    body("phone")
      .matches(/^(\+221|221)?[67]\d{8}$/)
      .withMessage("Téléphone invalide"),
    body("role").isIn(["client", "prestataire"]).withMessage("Rôle invalide"),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ success: false, errors: errors.array() });

      const { email, password, firstName, lastName, phone, role } = req.body;

      const existing = await query("SELECT id FROM users WHERE email = $1", [
        email,
      ]);
      if (existing.rows.length > 0)
        return res
          .status(400)
          .json({ success: false, message: "Email déjà utilisé" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await query(
        `INSERT INTO users (email, password, first_name, last_name, phone, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, email, first_name, last_name, phone, role`,
        [email, hashedPassword, firstName, lastName, phone, role],
      );

      const user = result.rows[0];
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "7d" },
      );

      res.status(201).json({
        success: true,
        message: "Compte créé",
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            phone: user.phone,
            role: user.role,
          },
          token,
        },
      });
    } catch (error) {
      console.error("Erreur inscription:", error);
      res.status(500).json({ success: false, message: "Erreur inscription" });
    }
  },
);

// POST /api/auth/login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email invalide"),
    body("password").notEmpty().withMessage("Mot de passe requis"),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(400).json({ success: false, errors: errors.array() });

      const { email, password } = req.body;
      const result = await query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      if (result.rows.length === 0)
        return res
          .status(401)
          .json({ success: false, message: "Email ou mot de passe incorrect" });

      const user = result.rows[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res
          .status(401)
          .json({ success: false, message: "Email ou mot de passe incorrect" });

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: "7d" },
      );

      res.json({
        success: true,
        message: "Connexion réussie",
        data: {
          user: {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            phone: user.phone,
            role: user.role,
          },
          token,
        },
      });
    } catch (error) {
      console.error("Erreur connexion:", error);
      res.status(500).json({ success: false, message: "Erreur connexion" });
    }
  },
);

// GET /api/auth/me
router.get("/me", async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Token requis" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    const result = await query(
      "SELECT id, email, first_name, last_name, phone, role, created_at FROM users WHERE id = $1",
      [decoded.id],
    );

    if (result.rows.length === 0)
      return res
        .status(404)
        .json({ success: false, message: "Utilisateur non trouvé" });

    const user = result.rows[0];
    res.json({
      success: true,
      data: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        phone: user.phone,
        role: user.role,
        createdAt: user.created_at,
      },
    });
  } catch {
    res.status(401).json({ success: false, message: "Token invalide" });
  }
});

export default router;
module.exports = router;
