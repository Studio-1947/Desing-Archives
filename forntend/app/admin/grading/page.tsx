'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { Loader2, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Submission {
    id: string;
    challengeId: string;
    userId: string;
    fileUrl: string;
    description: string;
    createdAt: string;
    user: {
        name: string;
        email: string;
        picture: string;
    };
    challenge: {
        title: string;
    };
}

export default function AdminGradingPage() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [gradingId, setGradingId] = useState<string | null>(null);
    const [scores, setScores] = useState({ creativity: 0, technical: 0, adherence: 0 });
    const { user } = useAuth();
    const { showToast } = useToast();

    const fetchPendingSubmissions = useCallback(async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submissions/pending`);
            if (res.ok) {
                const data = await res.json();
                setSubmissions(data);
            }
        } catch (error) {
            console.error('Error fetching submissions:', error);
            showToast('Failed to load submissions', 'error');
        } finally {
            setLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        fetchPendingSubmissions();
    }, [fetchPendingSubmissions]);

    const handleGrade = async (id: string) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submissions/${id}/grade`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(scores),
            });

            if (res.ok) {
                showToast('Submission graded successfully', 'success');
                setGradingId(null);
                setScores({ creativity: 0, technical: 0, adherence: 0 });
                fetchPendingSubmissions(); // Refresh list
            } else {
                const errorData = await res.json();
                showToast(errorData.message || 'Failed to grade submission', 'error');
            }
        } catch (error) {
            console.error('Error grading:', error);
            showToast('Error grading submission', 'error');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-900" />
            </div>
        );
    }

    if (!user || user.role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500">Access Denied. Admin only.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-tight">
                        Pending Submissions
                    </h1>
                    <Link href="/admin/challenges" className="text-sm font-medium text-gray-600 hover:text-gray-900 underline">
                        Back to Dashboard
                    </Link>
                </div>

                {submissions.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-gray-900">All Caught Up!</h3>
                        <p className="text-gray-500">No pending submissions to grade.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {submissions.map((submission) => (
                            <div key={submission.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row gap-6">
                                        {/* User Info & Challenge */}
                                        <div className="flex-shrink-0 w-full md:w-64 space-y-4">
                                            <div className="flex items-center gap-3">
                                                {submission.user.picture ? (
                                                    <Image
                                                        src={submission.user.picture}
                                                        alt={submission.user.name}
                                                        width={40}
                                                        height={40}
                                                        className="rounded-full"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                                                )}
                                                <div>
                                                    <p className="font-bold text-gray-900">{submission.user.name}</p>
                                                    <p className="text-xs text-gray-500">{submission.user.email}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Challenge</p>
                                                <p className="font-medium text-gray-900">{submission.challenge.title}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Submitted</p>
                                                <p className="text-sm text-gray-700">{new Date(submission.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>

                                        {/* Submission Content */}
                                        <div className="flex-1 space-y-4 border-l border-gray-100 pl-6">
                                            <div>
                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Description</p>
                                                <p className="text-gray-700 text-sm leading-relaxed">{submission.description || 'No description provided.'}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Submission Link</p>
                                                <a
                                                    href={submission.fileUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-blue-600 hover:underline text-sm font-medium"
                                                >
                                                    View Submission <ExternalLink className="w-4 h-4" />
                                                </a>
                                            </div>
                                        </div>

                                        {/* Grading Action */}
                                        <div className="flex-shrink-0 w-full md:w-80 bg-gray-50 p-4 rounded-lg">
                                            {gradingId === submission.id ? (
                                                <div className="space-y-4">
                                                    <h4 className="font-bold text-gray-900 text-sm uppercase">Enter Scores (0-100)</h4>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        <div>
                                                            <label className="text-[10px] uppercase font-bold text-gray-500">Creativity</label>
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                max="100"
                                                                value={scores.creativity}
                                                                onChange={(e) => setScores({ ...scores, creativity: Number(e.target.value) })}
                                                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="text-[10px] uppercase font-bold text-gray-500">Technical</label>
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                max="100"
                                                                value={scores.technical}
                                                                onChange={(e) => setScores({ ...scores, technical: Number(e.target.value) })}
                                                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="text-[10px] uppercase font-bold text-gray-500">Adherence</label>
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                max="100"
                                                                value={scores.adherence}
                                                                onChange={(e) => setScores({ ...scores, adherence: Number(e.target.value) })}
                                                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleGrade(submission.id)}
                                                            className="flex-1 bg-gray-900 text-white text-xs font-bold py-2 rounded hover:bg-black transition-colors"
                                                        >
                                                            Submit Grade
                                                        </button>
                                                        <button
                                                            onClick={() => setGradingId(null)}
                                                            className="px-3 py-2 border border-gray-300 text-gray-600 text-xs font-bold rounded hover:bg-gray-100"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="h-full flex items-center justify-center">
                                                    <button
                                                        onClick={() => {
                                                            setGradingId(submission.id);
                                                            setScores({ creativity: 0, technical: 0, adherence: 0 });
                                                        }}
                                                        className="w-full py-3 border-2 border-gray-900 text-gray-900 font-bold uppercase text-sm hover:bg-gray-900 hover:text-white transition-all"
                                                    >
                                                        Grade Submission
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
