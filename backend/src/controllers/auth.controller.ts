import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "../config/prisma";
import { MailService } from "../services/mail.service";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const mailService = new MailService();

// Seed admin user
(async () => {
  try {
    const adminEmail = "admin@studio1947.com";
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin", 10);
      await prisma.user.create({
        data: {
          name: "Admin",
          email: adminEmail,
          password: hashedPassword,
          role: "admin",
          picture: "https://ui-avatars.com/api/?name=Admin&background=random",
        },
      });
      console.log("Admin user seeded in database");
    }
  } catch (error) {
    console.error("Error seeding admin user:", error);
  }
})();

export class AuthController {
  async signup(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (!email || !password || !name) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "user",
          picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            name
          )}&background=random`,
        },
      });

      // Send welcome email
      await mailService
        .sendWelcomeEmail({ name: newUser.name, email: newUser.email })
        .catch((err) => console.error("Failed to send welcome email:", err));

      const token = jwt.sign(
        {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          picture: newUser.picture,
          role: newUser.role,
        },
        process.env.JWT_SECRET || "default_secret",
        { expiresIn: "24h" }
      );

      const { password: _, ...userWithoutPassword } = newUser;

      res.status(201).json({
        token,
        user: userWithoutPassword,
      });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Error creating user" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !user.password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
          picture: user.picture,
          role: user.role,
        },
        process.env.JWT_SECRET || "default_secret",
        { expiresIn: "24h" }
      );

      const { password: _, ...userWithoutPassword } = user;

      res.json({
        token,
        user: userWithoutPassword,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Error logging in" });
    }
  }

  async googleLogin(req: Request, res: Response) {
    try {
      const { token } = req.body;

      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      if (!payload || !payload.email) {
        return res.status(400).json({ message: "Invalid token payload" });
      }

      let user = await prisma.user.findUnique({
        where: { email: payload.email },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            email: payload.email,
            name: payload.name || "User",
            picture: payload.picture,
            role: "user",
          },
        });

        // Send welcome email for new Google users
        await mailService
          .sendWelcomeEmail({ name: user.name, email: user.email })
          .catch((err) => console.error("Failed to send welcome email:", err));
      }

      const jwtToken = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
          picture: user.picture,
          role: user.role,
        },
        process.env.JWT_SECRET || "default_secret",
        { expiresIn: "24h" }
      );

      const { password: _, ...userWithoutPassword } = user;

      res.json({
        token: jwtToken,
        user: userWithoutPassword,
      });
    } catch (error) {
      console.error("Google login error:", error);
      res.status(401).json({ message: "Invalid Google token" });
    }
  }
}
