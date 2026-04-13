import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { AuthRequest } from "../middleware/auth.middleware";
import jwt from "jsonwebtoken";

const userService = new UserService();

export class UserController {
  async getUserParticipations(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const participations = await userService.getUserParticipations(userId);
      res.json(participations);
    } catch (error) {
      res.status(500).json({ message: "Error fetching participations", error });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error });
    }
  }

  async updateProfile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user.id;
      const { name, picture } = req.body;
      const updatedUser = await userService.updateProfile(userId, { name, picture });
      
      // Generate new token with updated info
      const token = jwt.sign(
        {
          id: updatedUser.id,
          email: updatedUser.email,
          name: updatedUser.name,
          picture: updatedUser.picture,
          role: updatedUser.role,
        },
        process.env.JWT_SECRET || "default_secret",
        { expiresIn: "24h" }
      );

      res.json({ user: updatedUser, token });
    } catch (error) {
      res.status(500).json({ message: "Error updating profile", error });
    }
  }

  async updatePassword(req: AuthRequest, res: Response) {
    try {
      const userId = req.user.id;
      const { currentPassword, newPassword } = req.body;
      
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Current and new passwords are required" });
      }

      const result = await userService.updatePassword(userId, currentPassword, newPassword);
      res.json(result);
    } catch (error: any) {
      const status = error.message === "Current password doesn't match" ? 400 : 500;
      res.status(status).json({ message: error.message || "Error updating password" });
    }
  }
}
