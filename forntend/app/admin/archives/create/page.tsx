'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/context/ToastContext';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import FileUpload from '@/components/ui/FileUpload';

export default function CreateArchivePage() {
    const router = useRouter();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        content: '',
        coverImage: '',
        images: [] as string[],
        type: 'story',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCoverImageUpload = (urls: string[]) => {
        setFormData(prev => ({ ...prev, coverImage: urls[0] || '' }));
    };

    const handleGalleryUpload = (urls: string[]) => {
        setFormData(prev => ({ ...prev, images: urls }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/archives`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                showToast('Archive created successfully', 'success');
                router.push('/admin/archives');
            } else {
                showToast('Failed to create archive', 'error');
            }
        } catch (error) {
            console.error('Error creating archive:', error);
            showToast('Error creating archive', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <div className="flex items-center gap-4 border-b-2 border-gray-200 pb-6">
                <Link href="/admin/archives" className="text-gray-500 hover:text-gray-900 transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-3xl font-bold tracking-tighter text-gray-900">Create Archive</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 border-2 border-gray-200 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="title" className="block text-xs font-bold uppercase tracking-wide text-gray-500">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full p-4 bg-gray-50 border-2 border-gray-200 focus:border-gray-900 focus:bg-white focus:outline-none transition-all duration-200 font-medium"
                                placeholder="Enter archive title"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="type" className="block text-xs font-bold uppercase tracking-wide text-gray-500">
                                Type
                            </label>
                            <div className="relative">
                                <select
                                    id="type"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full p-4 bg-gray-50 border-2 border-gray-200 focus:border-gray-900 focus:bg-white focus:outline-none transition-all duration-200 appearance-none font-medium"
                                >
                                    <option value="story">Story</option>
                                    <option value="winner">Winner</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="description" className="block text-xs font-bold uppercase tracking-wide text-gray-500">
                                Short Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full p-4 bg-gray-50 border-2 border-gray-200 focus:border-gray-900 focus:bg-white focus:outline-none transition-all duration-200 resize-none font-medium"
                                placeholder="Brief summary of the archive..."
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <FileUpload
                            label="Cover Image"
                            onUpload={handleCoverImageUpload}
                            defaultUrls={formData.coverImage ? [formData.coverImage] : []}
                        />

                        <FileUpload
                            label="Gallery (Images & Videos)"
                            onUpload={handleGalleryUpload}
                            defaultUrls={formData.images}
                            multiple={true}
                            accept="image/*,video/*"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="content" className="block text-xs font-bold uppercase tracking-wide text-gray-500">
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                        rows={12}
                        className="w-full p-4 bg-gray-50 border-2 border-gray-200 focus:border-gray-900 focus:bg-white focus:outline-none transition-all duration-200 font-mono text-sm leading-relaxed"
                        placeholder="# Markdown Content\n\nWrite your full story here..."
                    />
                </div>

                <div className="flex justify-end pt-6 border-t-2 border-gray-100">
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary-minimal px-10 py-4 text-sm"
                    >
                        {loading ? 'Creating...' : 'Create Archive'}
                    </button>
                </div>
            </form>
        </div>
    );
}
