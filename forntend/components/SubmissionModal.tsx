'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Upload, CheckCircle, Loader2 } from 'lucide-react';
import { useSocket } from '@/context/SocketContext';
import { useToast } from '@/context/ToastContext';

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
        setStatus('uploading');

        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        setStatus('processing');

        // In a real app, you would upload the file and get a URL
        // Then send the URL to the backend
        // For now, we'll just simulate the socket event from the client for demo purposes
        // BUT ideally, the backend emits this after processing.

        // Let's call the API to create submission
        try {
            // Mock API call
            // await fetch('/api/submissions', ...);

            // For demo, we'll manually trigger the success state after a delay
            // since we haven't fully implemented the backend processing worker yet
            setTimeout(() => {
                setStatus('completed');
                showToast('Submission received!', 'success');
                setTimeout(onClose, 1500);
            }, 2000);

        } catch (error) {
            setStatus('idle');
            showToast('Failed to submit', 'error');
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
                                    Repository URL / File Link
                                </label>
                                <input
                                    type="url"
                                    required
                                    value={fileUrl}
                                    onChange={(e) => setFileUrl(e.target.value)}
                                    placeholder="https://github.com/username/repo"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
                                />
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
                                disabled={status === 'uploading'}
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
