import { Router } from 'express';
import multer from 'multer';
import { TranscriptionController } from '../controllers/transcription.controller';

const router = Router();
const transcriptionController = new TranscriptionController();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB limit
  }
});

import { authenticate } from '../middleware/auth.middleware';

router.post('/', authenticate, upload.single('audio'), transcriptionController.transcribeAudio);
router.get('/health', transcriptionController.healthCheck);

export default router;
