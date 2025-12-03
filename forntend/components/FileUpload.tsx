'use client';

import { useState, useRef } from 'react';
import { Upload, X, FileText, Image as ImageIcon, Loader2, CheckCircle } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

interface FileUploadProps {
    onUploadComplete: (url: string) => void;
    accept?: string;
    maxSizeMB?: number;
}

export default function FileUpload({
    onUploadComplete,
    accept = "image/*,.pdf,.ai,.psd,.sketch,.fig",
    maxSizeMB = 5
}: FileUploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { showToast } = useToast();

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        // Validate size
        if (selectedFile.size > maxSizeMB * 1024 * 1024) {
            showToast(`File size must be less than ${maxSizeMB}MB`, 'error');
            return;
        }

        setFile(selectedFile);
        setStatus('idle');
        setUploadProgress(0);

        // Create preview for images
        if (selectedFile.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setPreview(null);
        }

        // Auto upload
        uploadFile(selectedFile);
    };

    const uploadFile = async (fileToUpload: File) => {
        setStatus('uploading');
        const formData = new FormData();
        formData.append('file', fileToUpload);

        try {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', `${process.env.NEXT_PUBLIC_API_URL}/upload`);

            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    setUploadProgress(percentComplete);
                }
            };

            xhr.onload = () => {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    setStatus('success');
                    onUploadComplete(response.url);
                    showToast('File uploaded successfully', 'success');
                } else {
                    setStatus('error');
                    showToast('Upload failed', 'error');
                }
            };

            xhr.onerror = () => {
                setStatus('error');
                showToast('Upload failed', 'error');
            };

            xhr.send(formData);
        } catch (error) {
            console.error('Upload error:', error);
            setStatus('error');
            showToast('Upload failed', 'error');
        }
    };

    const clearFile = () => {
        setFile(null);
        setPreview(null);
        setStatus('idle');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onUploadComplete('');
    };

    return (
        <div className="w-full">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept={accept}
                className="hidden"
            />

            {!file ? (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-black transition-colors bg-gray-50 hover:bg-gray-100"
                >
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm font-medium text-gray-700">Click to upload file</p>
                    <p className="text-xs text-gray-500 mt-1">
                        Images, PDF, AI, PSD (Max {maxSizeMB}MB)
                    </p>
                </div>
            ) : (
                <div className="border border-gray-200 rounded-lg p-4 bg-white relative">
                    <button
                        onClick={clearFile}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-3">
                        {preview ? (
                            <img src={preview} alt="Preview" className="w-12 h-12 object-cover rounded-md" />
                        ) : (
                            <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                                <FileText className="w-6 h-6 text-gray-500" />
                            </div>
                        )}

                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>

                        {status === 'uploading' && (
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">{Math.round(uploadProgress)}%</span>
                                <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                            </div>
                        )}

                        {status === 'success' && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                        )}

                        {status === 'error' && (
                            <span className="text-xs text-red-500 font-medium">Failed</span>
                        )}
                    </div>

                    {status === 'uploading' && (
                        <div className="mt-2 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-black transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
