'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/context/ToastContext';
import { ArrowLeft, Plus, Trash2, GripVertical, Info } from 'lucide-react';
import Link from 'next/link';
import FileUpload from '@/components/ui/FileUpload';
import FormattingGuide from '@/components/admin/FormattingGuide';

interface ArchiveSection {
    title: string;
    content: string;
}

export default function CreateArchivePage() {
    const router = useRouter();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [sections, setSections] = useState<ArchiveSection[]>([
        { title: 'The Story', content: '' }
    ]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        coverImage: '',
        images: [] as string[],
        type: 'story',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSectionChange = (index: number, field: keyof ArchiveSection, value: string) => {
        const newSections = [...sections];
        newSections[index][field] = value;
        setSections(newSections);
    };

    const addSection = () => {
        setSections([...sections, { title: '', content: '' }]);
    };

    const removeSection = (index: number) => {
        if (sections.length > 1) {
            setSections(sections.filter((_, i) => i !== index));
        }
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

        // Convert sections to Markdown for the backend
        const contentMarkdown = sections
            .map(s => `## ${s.title.toUpperCase()}\n\n${s.content}`)
            .join('\n\n');

        const finalData = {
            ...formData,
            content: contentMarkdown
        };

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/archives`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalData),
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
        <div className="max-w-7xl mx-auto px-6 space-y-8 pb-12">
            <div className="flex items-center gap-4 border-b-2 border-gray-200 pb-6">
                <Link href="/admin/archives" className="text-gray-500 hover:text-gray-900 transition-colors">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-3xl font-bold tracking-tighter text-gray-900 uppercase">Create New Archive</h1>
            </div>

            <div className="grid grid-cols-1 min-[1100px]:grid-cols-[1fr_320px] gap-12 items-start">
                <form onSubmit={handleSubmit} className="space-y-12">

                    {/* PART 1: IDENTITY */}
                    <section className="bg-white p-8 border-2 border-gray-200 shadow-sm space-y-8">
                        <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
                            <span className="w-8 h-8 bg-gray-900 text-white flex items-center justify-center text-xs font-bold">01</span>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900">Archive Identity</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-bold uppercase tracking-extra-wide text-gray-400">Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        className="w-full p-4 bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white focus:outline-none transition-all font-medium text-lg"
                                        placeholder="e.g. THE WEAVERS OF PHULIA"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-[10px] font-bold uppercase tracking-extra-wide text-gray-400">Category</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        className="w-full p-4 bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white focus:outline-none transition-all font-medium appearance-none"
                                    >
                                        <option value="story">STORY</option>
                                        <option value="craft">CRAFT</option>
                                        <option value="tool">TOOL</option>
                                        <option value="winner">CHALLENGE WINNER</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-[10px] font-bold uppercase tracking-extra-wide text-gray-400">Introduction / Summary</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full p-4 bg-gray-50 border border-gray-200 focus:border-gray-900 focus:bg-white focus:outline-none transition-all resize-none font-medium text-gray-600"
                                        placeholder="Briefly describe what this archive entry represents..."
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <FileUpload
                                    label="Cover Hero Image"
                                    onUpload={handleCoverImageUpload}
                                    defaultUrls={formData.coverImage ? [formData.coverImage] : []}
                                />
                                <div className="p-4 bg-gray-50 border border-gray-100 flex gap-3">
                                    <Info className="w-5 h-5 text-gray-400 shrink-0" />
                                    <p className="text-[10px] leading-relaxed text-gray-500 uppercase font-medium">
                                        The cover image will be the primary visual for the archive entry. High-resolution landscapes or portraits recommended.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* PART 2: STRUCTURED CONTENT (FOR THE INDEX) */}
                    <section className="bg-white p-8 border-2 border-gray-200 shadow-sm space-y-8">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <div className="flex items-center gap-2">
                                <span className="w-8 h-8 bg-gray-900 text-white flex items-center justify-center text-xs font-bold">02</span>
                                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900">Archive Story & Topics</h2>
                            </div>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Each topic creates an index entry</p>
                        </div>

                        <div className="space-y-6">
                            {sections.map((section, index) => (
                                <div key={index} className="group relative border border-gray-100 p-6 bg-gray-50/50 hover:bg-white hover:border-gray-900 transition-all">
                                    <div className="flex items-start gap-4">
                                        <div className="mt-4 cursor-grab">
                                            <GripVertical className="w-4 h-4 text-gray-300 group-hover:text-gray-900" />
                                        </div>
                                        <div className="flex-1 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <input
                                                    type="text"
                                                    value={section.title}
                                                    onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                                                    className="bg-transparent border-b border-gray-200 focus:border-gray-900 outline-none font-bold uppercase text-sm tracking-widest w-full py-2"
                                                    placeholder={`Topic ${index + 1} Title`}
                                                    required
                                                />
                                                {sections.length > 1 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSection(index)}
                                                        className="ml-4 p-2 text-gray-300 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                            <textarea
                                                value={section.content}
                                                onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
                                                rows={8}
                                                className="w-full bg-transparent border border-gray-100 p-4 focus:bg-white focus:border-gray-900 outline-none text-sm leading-relaxed font-mono"
                                                placeholder="Write the content for this specific section..."
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={addSection}
                                className="w-full py-4 border-2 border-dashed border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-all flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900"
                            >
                                <Plus className="w-4 h-4" />
                                Add New Topic Section
                            </button>
                        </div>
                    </section>

                    {/* PART 3: VISUAL DOCUMENTATION */}
                    <section className="bg-white p-8 border-2 border-gray-200 shadow-sm space-y-8">
                        <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
                            <span className="w-8 h-8 bg-gray-900 text-white flex items-center justify-center text-xs font-bold">03</span>
                            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900">Visual Documentation</h2>
                        </div>

                        <div className="space-y-6">
                            <FileUpload
                                label="Gallery (Images & Videos)"
                                onUpload={handleGalleryUpload}
                                defaultUrls={formData.images}
                                multiple={true}
                                accept="image/*,video/*"
                            />
                            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest text-center">
                                These will appear in the right-hand visual gallery on the live archive page.
                            </p>
                        </div>
                    </section>

                    <div className="flex justify-end pt-12">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-gray-900 text-white px-16 py-6 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-800 disabled:bg-gray-400 transition-all"
                        >
                            {loading ? 'PUBLISHING...' : 'PUBLISH TO ARCHIVE'}
                        </button>
                    </div>
                </form>

                <FormattingGuide />
            </div>
        </div>
    );
}
