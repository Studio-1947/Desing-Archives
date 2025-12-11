'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, FileVideo, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

interface FileUploadProps {
    onUpload: (urls: string[]) => void;
    defaultUrls?: string[];
    multiple?: boolean;
    label?: string;
    accept?: string;
}

export default function FileUpload({
    onUpload,
    defaultUrls = [],
    multiple = false,
    label = 'Upload File',
    accept = 'image/*,video/*'
}: FileUploadProps) {
    const [urls, setUrls] = useState<string[]>(defaultUrls);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { showToast } = useToast();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const newUrls: string[] = [];

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const formData = new FormData();
                formData.append('file', file);

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
                    method: 'POST',
                    body: formData,
                });

                if (!res.ok) {
                    throw new Error(`Failed to upload ${file.name}`);
                }

                const data = await res.json();
                newUrls.push(data.url);
            }

            const updatedUrls = multiple ? [...urls, ...newUrls] : newUrls;
            setUrls(updatedUrls);
            onUpload(updatedUrls);
            showToast('Upload successful', 'success');
        } catch (error) {
            console.error('Upload error:', error);
            showToast('Failed to upload file(s)', 'error');
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const removeFile = (indexToRemove: number) => {
        const updatedUrls = urls.filter((_, index) => index !== indexToRemove);
        setUrls(updatedUrls);
        onUpload(updatedUrls);
    };

    const isVideo = (url: string) => {
        return url.match(/\.(mp4|mov|webm)$/i);
    };

    return (
        <div className="space-y-4">
            <label className="block text-sm font-bold uppercase tracking-wide text-gray-700">
                {label}
            </label>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {urls.map((url, index) => (
                    <div key={index} className="relative group aspect-video bg-gray-100 border-2 border-gray-200 overflow-hidden">
                        {isVideo(url) ? (
                            <video src={url} className="w-full h-full object-cover" controls />
                        ) : (
                            <img src={url} alt={`Uploaded ${index + 1}`} className="w-full h-full object-cover" />
                        )}
                        <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}

                {(multiple || urls.length === 0) && (
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-gray-300 hover:border-gray-900 hover:bg-gray-50 transition-all duration-200 group"
                    >
                        {uploading ? (
                            <Loader2 className="animate-spin text-gray-400" size={24} />
                        ) : (
                            <>
                                <Upload className="text-gray-400 group-hover:text-gray-900 mb-2" size={24} />
                                <span className="text-xs font-medium text-gray-500 group-hover:text-gray-900">
                                    {multiple ? 'Add Files' : 'Upload File'}
                                </span>
                            </>
                        )}
                    </button>
                )}
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple={multiple}
                accept={accept}
                className="hidden"
            />
        </div>
    );
}
