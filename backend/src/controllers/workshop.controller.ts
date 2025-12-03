import { Request, Response } from 'express';
import prisma from '../config/prisma';

export class WorkshopController {
  async applyForWorkshop(req: Request, res: Response) {
    try {
      const { name, email, phone, statement } = req.body;

      if (!name || !email || !statement) {
        return res.status(400).json({ message: 'Name, email, and statement are required' });
      }

      const application = await prisma.workshopApplication.create({
        data: {
          name,
          email,
          phone,
          statement,
        },
      });

      res.status(201).json({ message: 'Application submitted successfully', application });
    } catch (error) {
      console.error('Error submitting workshop application:', error);
      res.status(500).json({ message: 'Error submitting application', error });
    }
  }
}
