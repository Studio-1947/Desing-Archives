'use client';

import React, { useState } from 'react';
import { Challenge, ChallengeStatus, ChallengeCategory } from '@/types';
import { useRouter } from 'next/navigation';
import { useToast } from '@/context/ToastContext';

interface ChallengeFormProps {
    initialData?: Partial<Challenge>;
    isEditing?: boolean;
}

export default function ChallengeForm({ initialData, isEditing = false }: ChallengeFormProps) {
    const router = useRouter();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Partial<Challenge>>({
        title: '',
        description: '',
        shortDescription: '',
        status: 'upcoming',
        category: [],
        organizer: 'Studio 1947',
        prizePool: 0,
        currency: 'INR',
        startDate: '',
        endDate: '',
        imageUrl: '',
        difficulty: 'Intermediate',
        tags: [],
        location: '',
        overview: {
            brief: '',
            deliverables: [],
            criteria: [],
            schedule: []
        },
        rules: [],
        assets: [],
        ...initialData
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'number' ? Number(value) : value;
        setFormData(prev => ({ ...prev, [name]: val }));
    };

    const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'tags' | 'rules' | 'category') => {
        const values = e.target.value.split(',').map(item => item.trim());
        setFormData(prev => ({ ...prev, [field]: values }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = isEditing
                ? `http://localhost:5000/api/challenges/${initialData?.id}`
                : 'http://localhost:5000/api/challenges';

            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to save challenge');

            router.push('/admin/challenges');
            router.refresh();
            showToast('Challenge saved successfully', 'success');
        } catch (error) {
            console.error('Error saving challenge:', error);
            showToast('Failed to save challenge', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto bg-white p-8 border-2 border-gray-200">
            <div className="space-y-6">
                <h2 className="text-xl font-bold border-b-2 border-gray-200 pb-2 text-gray-900 uppercase tracking-wide">Basic Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wide text-gray-900">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="input-field-minimal"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wide text-gray-900">Organizer</label>
                        <input
                            type="text"
                            name="organizer"
                            value={formData.organizer}
                            onChange={handleChange}
                            className="input-field-minimal"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wide text-gray-900">Short Description</label>
                    <input
                        type="text"
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleChange}
                        className="input-field-minimal"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wide text-gray-900">Full Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="input-field-minimal"
                        required
                    />
                </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-bold border-b-2 border-gray-200 pb-2 text-gray-900 uppercase tracking-wide">Details & Logistics</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="input-field-minimal"
                        >
                            <option value="active">Active</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wide text-gray-900">Type</label>
                        <select
                            name="type"
                            value={formData.type || 'standard'}
                            onChange={handleChange}
                            className="input-field-minimal"
                        >
                            <option value="standard">Standard</option>
                            <option value="student">Student</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wide text-gray-900">Difficulty</label>
                        <select
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleChange}
                            className="input-field-minimal"
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wide text-gray-900">Prize Pool</label>
                        <input
                            type="number"
                            name="prizePool"
                            value={formData.prizePool}
                            onChange={handleChange}
                            className="input-field-minimal"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wide text-gray-900">Categories (comma separated)</label>
                    <input
                        type="text"
                        value={formData.category?.join(', ')}
                        onChange={(e) => handleArrayChange(e, 'category')}
                        className="input-field-minimal"
                        placeholder="Graphic Design, UI/UX"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wide text-gray-900">Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="input-field-minimal"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wide text-gray-900">End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className="input-field-minimal"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wide text-gray-900">Image URL</label>
                    <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="input-field-minimal"
                    />
                </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-bold border-b-2 border-gray-200 pb-2 text-gray-900 uppercase tracking-wide">Overview & Brief</h2>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wide text-gray-900">Brief</label>
                    <textarea
                        value={formData.overview?.brief}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            overview: { ...prev.overview!, brief: e.target.value }
                        }))}
                        rows={3}
                        className="input-field-minimal"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wide text-gray-900">Deliverables (one per line)</label>
                    <textarea
                        value={formData.overview?.deliverables?.join('\n')}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            overview: { ...prev.overview!, deliverables: e.target.value.split('\n').filter(Boolean) }
                        }))}
                        rows={4}
                        className="input-field-minimal"
                        placeholder="Primary Logo&#10;Color Palette"
                    />
                </div>
                <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-wide text-gray-900">Evaluation Criteria</label>
                    {formData.overview?.criteria?.map((item, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 bg-gray-50">
                            <input
                                placeholder="Title"
                                value={item.title}
                                onChange={(e) => {
                                    const newCriteria = [...(formData.overview?.criteria || [])];
                                    newCriteria[index] = { ...item, title: e.target.value };
                                    setFormData(prev => ({ ...prev, overview: { ...prev.overview!, criteria: newCriteria } }));
                                }}
                                className="input-field-minimal"
                            />
                            <input
                                placeholder="Weight (e.g. 30)"
                                type="number"
                                value={item.weight}
                                onChange={(e) => {
                                    const newCriteria = [...(formData.overview?.criteria || [])];
                                    newCriteria[index] = { ...item, weight: Number(e.target.value) };
                                    setFormData(prev => ({ ...prev, overview: { ...prev.overview!, criteria: newCriteria } }));
                                }}
                                className="input-field-minimal"
                            />
                            <div className="flex gap-2">
                                <input
                                    placeholder="Description"
                                    value={item.description}
                                    onChange={(e) => {
                                        const newCriteria = [...(formData.overview?.criteria || [])];
                                        newCriteria[index] = { ...item, description: e.target.value };
                                        setFormData(prev => ({ ...prev, overview: { ...prev.overview!, criteria: newCriteria } }));
                                    }}
                                    className="input-field-minimal flex-1"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newCriteria = formData.overview?.criteria?.filter((_, i) => i !== index);
                                        setFormData(prev => ({ ...prev, overview: { ...prev.overview!, criteria: newCriteria || [] } }));
                                    }}
                                    className="text-red-500 hover:text-red-700 px-2"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => setFormData(prev => ({
                            ...prev,
                            overview: {
                                ...prev.overview!,
                                criteria: [...(prev.overview?.criteria || []), { title: '', weight: 0, description: '' }]
                            }
                        }))}
                        className="text-sm font-bold text-gray-900 hover:underline"
                    >
                        + Add Criteria
                    </button>
                </div>

                <div className="space-y-4">
                    <label className="text-xs font-bold uppercase tracking-wide text-gray-900">Schedule</label>
                    {formData.overview?.schedule?.map((item, index) => (
                        <div key={index} className="flex flex-col gap-4 p-4 border border-gray-200 bg-gray-50 relative">
                            <button
                                type="button"
                                onClick={() => {
                                    const newSchedule = formData.overview?.schedule?.filter((_, i) => i !== index);
                                    setFormData(prev => ({ ...prev, overview: { ...prev.overview!, schedule: newSchedule || [] } }));
                                }}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                            >
                                ×
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    placeholder="Phase Name"
                                    value={item.phase}
                                    onChange={(e) => {
                                        const newSchedule = [...(formData.overview?.schedule || [])];
                                        newSchedule[index] = { ...item, phase: e.target.value };
                                        setFormData(prev => ({ ...prev, overview: { ...prev.overview!, schedule: newSchedule } }));
                                    }}
                                    className="input-field-minimal"
                                />
                                <input
                                    placeholder="Date / Duration"
                                    value={item.date}
                                    onChange={(e) => {
                                        const newSchedule = [...(formData.overview?.schedule || [])];
                                        newSchedule[index] = { ...item, date: e.target.value };
                                        setFormData(prev => ({ ...prev, overview: { ...prev.overview!, schedule: newSchedule } }));
                                    }}
                                    className="input-field-minimal"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <textarea
                                    placeholder="Objectives (one per line)"
                                    value={item.objectives?.join('\n')}
                                    onChange={(e) => {
                                        const newSchedule = [...(formData.overview?.schedule || [])];
                                        newSchedule[index] = { ...item, objectives: e.target.value.split('\n').filter(Boolean) };
                                        setFormData(prev => ({ ...prev, overview: { ...prev.overview!, schedule: newSchedule } }));
                                    }}
                                    className="input-field-minimal"
                                    rows={3}
                                />
                                <textarea
                                    placeholder="Deliverables (one per line)"
                                    value={item.deliverables?.join('\n')}
                                    onChange={(e) => {
                                        const newSchedule = [...(formData.overview?.schedule || [])];
                                        newSchedule[index] = { ...item, deliverables: e.target.value.split('\n').filter(Boolean) };
                                        setFormData(prev => ({ ...prev, overview: { ...prev.overview!, schedule: newSchedule } }));
                                    }}
                                    className="input-field-minimal"
                                    rows={3}
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => setFormData(prev => ({
                            ...prev,
                            overview: {
                                ...prev.overview!,
                                schedule: [...(prev.overview?.schedule || []), { phase: '', date: '', objectives: [], deliverables: [] }]
                            }
                        }))}
                        className="text-sm font-bold text-gray-900 hover:underline"
                    >
                        + Add Schedule Item
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-bold border-b-2 border-gray-200 pb-2 text-gray-900 uppercase tracking-wide">Assets</h2>
                {formData.assets?.map((item, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 bg-gray-50">
                        <input
                            placeholder="Name"
                            value={item.name}
                            onChange={(e) => {
                                const newAssets = [...(formData.assets || [])];
                                newAssets[index] = { ...item, name: e.target.value };
                                setFormData(prev => ({ ...prev, assets: newAssets }));
                            }}
                            className="input-field-minimal"
                        />
                        <select
                            value={item.type}
                            onChange={(e) => {
                                const newAssets = [...(formData.assets || [])];
                                newAssets[index] = { ...item, type: e.target.value as any };
                                setFormData(prev => ({ ...prev, assets: newAssets }));
                            }}
                            className="input-field-minimal"
                        >
                            <option value="pdf">PDF</option>
                            <option value="zip">ZIP</option>
                            <option value="fig">Figma</option>
                            <option value="img">Image</option>
                        </select>
                        <input
                            placeholder="URL"
                            value={item.url}
                            onChange={(e) => {
                                const newAssets = [...(formData.assets || [])];
                                newAssets[index] = { ...item, url: e.target.value };
                                setFormData(prev => ({ ...prev, assets: newAssets }));
                            }}
                            className="input-field-minimal"
                        />
                        <div className="flex gap-2">
                            <input
                                placeholder="Size"
                                value={item.size}
                                onChange={(e) => {
                                    const newAssets = [...(formData.assets || [])];
                                    newAssets[index] = { ...item, size: e.target.value };
                                    setFormData(prev => ({ ...prev, assets: newAssets }));
                                }}
                                className="input-field-minimal flex-1"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    const newAssets = formData.assets?.filter((_, i) => i !== index);
                                    setFormData(prev => ({ ...prev, assets: newAssets || [] }));
                                }}
                                className="text-red-500 hover:text-red-700 px-2"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => setFormData(prev => ({
                        ...prev,
                        assets: [...(prev.assets || []), { name: '', type: 'pdf', url: '', size: '' }]
                    }))}
                    className="text-sm font-bold text-gray-900 hover:underline"
                >
                    + Add Asset
                </button>
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-bold border-b-2 border-gray-200 pb-2 text-gray-900 uppercase tracking-wide">Tags & Rules</h2>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wide text-gray-900">Tags (comma separated)</label>
                    <input
                        type="text"
                        value={formData.tags?.join(', ')}
                        onChange={(e) => handleArrayChange(e, 'tags')}
                        className="input-field-minimal"
                        placeholder="branding, design, logo"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wide text-gray-900">Rules (one per line)</label>
                    <textarea
                        value={formData.rules?.join('\n')}
                        onChange={(e) => setFormData(prev => ({ ...prev, rules: e.target.value.split('\n').filter(Boolean) }))}
                        className="input-field-minimal"
                        rows={4}
                        placeholder="No AI&#10;Original work only"
                    />
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-6 border-t-2 border-gray-200">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="btn-secondary-minimal"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary-minimal disabled:opacity-50"
                >
                    {loading ? 'Saving...' : isEditing ? 'Update Challenge' : 'Create Challenge'}
                </button>
            </div>
        </form>
    );
}
