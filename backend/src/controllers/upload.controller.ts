import { Request, Response } from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "design-archives-submissions",
    allowed_formats: [
      "jpg",
      "png",
      "jpeg",
      "pdf",
      "ai",
      "psd",
      "sketch",
      "fig",
    ],
    resource_type: "auto", // Allow both image and raw files (for pdf, ai, etc.)
  } as any, // Type assertion needed for some custom params
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 4 * 1024 * 1024, // 4MB limit to stay safely within Netlify's 6MB payload limit
  },
});

export const uploadMiddleware = (req: Request, res: Response, next: any) => {
  upload.single("file")(req, res, (err: any) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res
            .status(400)
            .json({ message: "File too large. Maximum size is 4MB." });
        }
        return res
          .status(400)
          .json({ message: `Upload error: ${err.message}` });
      }
      return res
        .status(500)
        .json({ message: "Unknown upload error", error: err.message });
    }
    next();
  });
};

export const uploadFile = (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }

  // Cloudinary returns the URL in `path` or `secure_url` depending on the version/types
  // @ts-ignore
  const fileUrl = req.file.path || req.file.secure_url;

  res.status(200).json({
    message: "File uploaded successfully",
    url: fileUrl,
    filename: req.file.filename,
  });
};
