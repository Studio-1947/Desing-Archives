import { Router } from 'express';
import { WorkshopController } from '../controllers/workshop.controller';

const router = Router();
const workshopController = new WorkshopController();

/**
 * @swagger
 * /api/workshops/apply:
 *   post:
 *     summary: Apply for a workshop
 *     tags: [Workshops]
 *     responses:
 *       200:
 *         description: Application received
 */
router.post('/apply', (req, res) => workshopController.applyForWorkshop(req, res));

export default router;
