import { Request, Response } from 'express';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'design-archives-submissions',
    allowed_formats: ['jpg', 'png', 'jpeg', 'pdf', 'ai', 'psd', 'sketch', 'fig'],
    resource_type: 'auto', // Allow both image and raw files (for pdf, ai, etc.)
  } as any, // Type assertion needed for some custom params
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

export const uploadMiddleware = upload.single('file');

export const uploadFile = (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }

  // Cloudinary returns the URL in `path` or `secure_url` depending on the version/types
  // @ts-ignore
  const fileUrl = req.file.path || req.file.secure_url;

  res.status(200).json({
    message: 'File uploaded successfully',
    url: fileUrl,
    filename: req.file.filename,
  });
};
