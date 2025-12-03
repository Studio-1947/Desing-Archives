'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Upload, CheckCircle, Loader2 } from 'lucide-react';
import { useSocket } from '@/context/SocketContext';
import { useToast } from '@/context/ToastContext';
import FileUpload from './FileUpload';

interface SubmissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    challengeId: string;
}

export default function SubmissionModal({ isOpen, onClose, challengeId }: SubmissionModalProps) {
    const [fileUrl, setFileUrl] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'completed'>('idle');
    const { socket } = useSocket();
    const { showToast } = useToast();

    useEffect(() => {
        if (!socket) return;

        socket.on('submission_processed', (data: any) => {
            if (data.challengeId === challengeId) {
                setStatus('completed');
                showToast('Submission processed successfully!', 'success');
                setTimeout(() => {
                    onClose();
                    setStatus('idle');
                    setFileUrl('');
                    setDescription('');
                }, 2000);
            }
        });

        return () => {
            socket.off('submission_processed');
        };
    }, [socket, challengeId, onClose, showToast]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // In a real app, you would upload the file first. 
        // For now, we assume the URL is provided directly.

        setStatus('uploading');

        try {
            // Get user ID from local storage or context (assuming user is logged in)
            // This is a simplification; in a real app, the token would be handled by an interceptor
            const userStr = localStorage.getItem('user');
            if (!userStr) {
                showToast('Please login to submit', 'error');
                setStatus('idle');
                return;
            }
            const user = JSON.parse(userStr);

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submissions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    challengeId,
                    userId: user.id,
                    fileUrl,
                    description,
                }),
            });

            if (!res.ok) {
                throw new Error('Failed to submit');
            }

            setStatus('completed');
            showToast('Submission received! It is now pending grading.', 'success');

            // Notify socket for real-time updates (optional, if we want to show "New Submission" on leaderboard)
            if (socket) {
                socket.emit('new_submission', { challengeId, userId: user.id });
            }

            setTimeout(() => {
                onClose();
                setStatus('idle');
                setFileUrl('');
                setDescription('');
            }, 2000);

        } catch (error) {
            console.error('Submission error:', error);
            setStatus('idle');
            showToast('Failed to submit. Please try again.', 'error');
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900">Submit Solution</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6">
                    {status === 'processing' ? (
                        <div className="text-center py-8">
                            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                            <h4 className="text-lg font-semibold text-gray-900">Processing Submission...</h4>
                            <p className="text-gray-500">We are analyzing your code against the test cases.</p>
                        </div>
                    ) : status === 'completed' ? (
                        <div className="text-center py-8">
                            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                            <h4 className="text-lg font-semibold text-gray-900">Submission Successful!</h4>
                            <p className="text-gray-500">Your score has been updated on the leaderboard.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Upload Solution
                                </label>
                                <FileUpload
                                    onUploadComplete={(url) => setFileUrl(url)}
                                />
                                {fileUrl && (
                                    <input type="hidden" name="fileUrl" value={fileUrl} required />
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description (Optional)
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                    placeholder="Briefly describe your approach..."
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'uploading' || !fileUrl}
                                className="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                            >
                                {status === 'uploading' ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-4 h-4" />
                                        Submit Solution
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
}
