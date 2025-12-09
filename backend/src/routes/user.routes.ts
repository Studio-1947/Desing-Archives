import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

router.get("/:userId/participations", userController.getUserParticipations);
router.get("/", userController.getAllUsers);

export default router;
