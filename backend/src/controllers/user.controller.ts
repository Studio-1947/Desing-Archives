import { Request, Response } from "express";
import { UserService } from "../services/user.service";

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
}
