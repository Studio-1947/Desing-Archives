import { Router } from 'express';
import { WorkshopController } from '../controllers/workshop.controller';

const router = Router();
const workshopController = new WorkshopController();

router.post('/apply', (req, res) => workshopController.applyForWorkshop(req, res));

export default router;
