import { Router } from 'express';
import { uploadMiddleware, uploadFile } from '../controllers/upload.controller';

const router = Router();

router.post('/', uploadMiddleware, uploadFile);

export default router;
