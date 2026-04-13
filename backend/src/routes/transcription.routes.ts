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

/**
 * @swagger
 * /api/v1/transcribe:
 *   post:
 *     summary: Transcribe audio file
 *     tags: [Transcription]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               audio:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Transcription successful
 */
router.post('/', authenticate, upload.single('audio'), transcriptionController.transcribeAudio);

/**
 * @swagger
 * /api/v1/transcribe/health:
 *   get:
 *     summary: Transcription service health check
 *     tags: [Transcription]
 *     responses:
 *       200:
 *         description: Service is healthy
 */
router.get('/health', transcriptionController.healthCheck);

export default router;
