'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Archive } from '@/types/archive';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { useToast } from '@/context/ToastContext';

export default function AdminArchivesPage() {
    const [archives, setArchives] = useState<Archive[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [archiveToDelete, setArchiveToDelete] = useState<string | null>(null);
    const { showToast } = useToast();

    useEffect(() => {
        const fetchArchives = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/archives`);
                const data = await res.json();
                setArchives(data);
            } catch (error) {
                console.error('Error fetching archives:', error);
                showToast('Failed to fetch archives', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchArchives();
    }, [showToast]);

    const confirmDelete = (id: string) => {
        setArchiveToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (!archiveToDelete) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/archives/${archiveToDelete}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setArchives(archives.filter(a => a.id !== archiveToDelete));
                showToast('Archive deleted successfully', 'success');
            } else {
                showToast('Failed to delete archive', 'error');
            }
        } catch (error) {
            console.error('Error deleting archive:', error);
            showToast('Error deleting archive', 'error');
        } finally {
            setIsDeleteModalOpen(false);
            setArchiveToDelete(null);
        }
    };

    if (loading) {
        return <div className="p-8 text-center">Loading archives...</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center border-b-2 border-gray-200 pb-6">
                <h1 className="text-3xl font-bold tracking-tighter text-gray-900">Archives</h1>
                <Link
                    href="/admin/archives/create"
                    className="btn-primary-minimal flex items-center gap-2"
                >
                    <Plus size={16} />
                    Create Archive
                </Link>
            </div>

            <div className="bg-white border-2 border-gray-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-900 uppercase tracking-wide text-xs">Title</th>
                            <th className="px-6 py-4 font-bold text-gray-900 uppercase tracking-wide text-xs">Type</th>
                            <th className="px-6 py-4 font-bold text-gray-900 uppercase tracking-wide text-xs">Created At</th>
                            <th className="px-6 py-4 font-bold text-gray-900 uppercase tracking-wide text-xs text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {archives.map((archive) => (
                            <tr key={archive.id} className="hover:bg-gray-50 transition-colors duration-200">
                                <td className="px-6 py-4 font-medium text-gray-900">{archive.title}</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-3 py-1 border text-xs font-bold uppercase tracking-wide bg-gray-50 text-gray-700 border-gray-200">
                                        {archive.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {new Date(archive.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <Link
                                        href={`/archives/${archive.id}`}
                                        target="_blank"
                                        className="inline-flex p-2 text-gray-400 hover:text-gray-900 transition-colors duration-200"
                                        title="View Public Page"
                                    >
                                        <Eye size={18} />
                                    </Link>
                                    <Link
                                        href={`/admin/archives/${archive.id}/edit`}
                                        className="inline-flex p-2 text-gray-400 hover:text-gray-900 transition-colors duration-200"
                                        title="Edit"
                                    >
                                        <Edit size={18} />
                                    </Link>
                                    <button
                                        onClick={() => confirmDelete(archive.id)}
                                        className="inline-flex p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {archives.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                    No archives found. Create one to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Archive"
            >
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Are you sure you want to delete this archive? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="btn-secondary-minimal"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-600 text-white px-4 py-2 text-sm font-bold uppercase tracking-wide hover:bg-red-700 transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
