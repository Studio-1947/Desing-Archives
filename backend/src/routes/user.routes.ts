import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/", userController.getAllUsers);

/**
 * @swagger
 * /api/users/{userId}/participations:
 *   get:
 *     summary: Get user participations
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of challenges the user participated in
 */
router.get("/:userId/participations", userController.getUserParticipations);

export default router;
