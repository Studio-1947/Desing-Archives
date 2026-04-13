import { Router } from 'express';
import { uploadMiddleware, uploadFile } from '../controllers/upload.controller';

const router = Router();

/**
 * @swagger
 * /api/upload:
 *   post:
 *     summary: Upload a file to Cloudinary
 *     tags: [Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded
 */
router.post('/', uploadMiddleware, uploadFile);

export default router;
