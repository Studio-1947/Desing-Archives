import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export class AuthController {
  async googleLogin(req: Request, res: Response) {
    try {
      const { token } = req.body;
      
      // Verify Google token
      const ticket = await client.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      if (!payload) {
        return res.status(400).json({ message: 'Invalid token payload' });
      }

      // In a real app, you would find or create the user in your database here
      const user = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture
      };

      // Generate JWT
      const jwtToken = jwt.sign(user, process.env.JWT_SECRET || 'default_secret', { expiresIn: '24h' });

      res.json({
        token: jwtToken,
        user
      });
    } catch (error) {
      console.error('Google login error:', error);
      res.status(401).json({ message: 'Invalid Google token' });
    }
  }
}
