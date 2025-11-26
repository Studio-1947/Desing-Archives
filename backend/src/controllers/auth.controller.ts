import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Mock database
const users: any[] = [];

export class AuthController {
  async signup(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (!email || !password || !name) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        id: (users.length + 1).toString(),
        name,
        email,
        password: hashedPassword,
        picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
      };

      users.push(newUser);

      const token = jwt.sign(
        { id: newUser.id, email: newUser.email, name: newUser.name, picture: newUser.picture },
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: '24h' }
      );

      const { password: _, ...userWithoutPassword } = newUser;

      res.status(201).json({
        token,
        user: userWithoutPassword
      });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Error creating user' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const user = users.find(u => u.email === email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name, picture: user.picture },
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: '24h' }
      );

      const { password: _, ...userWithoutPassword } = user;

      res.json({
        token,
        user: userWithoutPassword
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Error logging in' });
    }
  }

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

      // Check if user exists, if not create one
      let user = users.find(u => u.email === payload.email);
      
      if (!user) {
        user = {
          id: payload.sub,
          email: payload.email,
          name: payload.name,
          picture: payload.picture,
          password: '' // No password for Google users
        };
        users.push(user);
      }

      // Generate JWT
      const jwtToken = jwt.sign(
        { id: user.id, email: user.email, name: user.name, picture: user.picture }, 
        process.env.JWT_SECRET || 'default_secret', 
        { expiresIn: '24h' }
      );

      const { password: _, ...userWithoutPassword } = user;

      res.json({
        token: jwtToken,
        user: userWithoutPassword
      });
    } catch (error) {
      console.error('Google login error:', error);
      res.status(401).json({ message: 'Invalid Google token' });
    }
  }
}
