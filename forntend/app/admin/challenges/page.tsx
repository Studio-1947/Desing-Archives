'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Challenge } from '@/types';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { useToast } from '@/context/ToastContext';

export default function AdminChallengesPage() {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [loading, setLoading] = useState(true);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [challengeToDelete, setChallengeToDelete] = useState<string | null>(null);
    const { showToast } = useToast();

    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/challenges`);
                const data = await res.json();
                setChallenges(data);
            } catch (error) {
                console.error('Error fetching challenges:', error);
                showToast('Failed to fetch challenges', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchChallenges();
    }, [showToast]);

    const confirmDelete = (id: string) => {
        setChallengeToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = async () => {
        if (!challengeToDelete) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/challenges/${challengeToDelete}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setChallenges(challenges.filter(c => c.id !== challengeToDelete));
                showToast('Challenge deleted successfully', 'success');
            } else {
                showToast('Failed to delete challenge', 'error');
            }
        } catch (error) {
            console.error('Error deleting challenge:', error);
            showToast('Error deleting challenge', 'error');
        } finally {
            setIsDeleteModalOpen(false);
            setChallengeToDelete(null);
        }
    };

    if (loading) {
        return <div className="p-8 text-center">Loading challenges...</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center border-b-2 border-gray-200 pb-6">
                <h1 className="text-3xl font-bold tracking-tighter text-gray-900">Challenges</h1>
                <Link
                    href="/admin/challenges/create"
                    className="btn-primary-minimal flex items-center gap-2"
                >
                    <Plus size={16} />
                    Create Challenge
                </Link>
            </div>

            <div className="bg-white border-2 border-gray-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-900 uppercase tracking-wide text-xs">Title</th>
                            <th className="px-6 py-4 font-bold text-gray-900 uppercase tracking-wide text-xs">Status</th>
                            <th className="px-6 py-4 font-bold text-gray-900 uppercase tracking-wide text-xs">Category</th>
                            <th className="px-6 py-4 font-bold text-gray-900 uppercase tracking-wide text-xs">Participants</th>
                            <th className="px-6 py-4 font-bold text-gray-900 uppercase tracking-wide text-xs text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {challenges.map((challenge) => (
                            <tr key={challenge.id} className="hover:bg-gray-50 transition-colors duration-200">
                                <td className="px-6 py-4 font-medium text-gray-900">{challenge.title}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-3 py-1 border text-xs font-bold uppercase tracking-wide
                    ${challenge.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : ''}
                    ${challenge.status === 'upcoming' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}
                    ${challenge.status === 'archived' ? 'bg-gray-50 text-gray-700 border-gray-200' : ''}
                  `}>
                                        {challenge.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{challenge.category.join(', ')}</td>
                                <td className="px-6 py-4 text-gray-600">{challenge.totalParticipants}</td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <Link
                                        href={`/challenges/${challenge.id}`}
                                        target="_blank"
                                        className="inline-flex p-2 text-gray-400 hover:text-gray-900 transition-colors duration-200"
                                        title="View Public Page"
                                    >
                                        <Eye size={18} />
                                    </Link>
                                    <Link
                                        href={`/admin/challenges/${challenge.id}/edit`}
                                        className="inline-flex p-2 text-gray-400 hover:text-gray-900 transition-colors duration-200"
                                        title="Edit"
                                    >
                                        <Edit size={18} />
                                    </Link>
                                    <button
                                        onClick={() => confirmDelete(challenge.id)}
                                        className="inline-flex p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Challenge"
            >
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Are you sure you want to delete this challenge? This action cannot be undone.
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
