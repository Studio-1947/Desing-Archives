'use client';

import { useState, useEffect } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface WorkshopApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function WorkshopApplicationModal({ isOpen, onClose }: WorkshopApplicationModalProps) {
    const { user } = useAuth();
    const [isAnimating, setIsAnimating] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        statement: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            // Autofill if user is logged in
            if (user) {
                setFormData(prev => ({
                    ...prev,
                    name: user.name || '',
                    email: user.email || ''
                }));
            }

            // Small delay to allow render before animation starts
            requestAnimationFrame(() => setIsAnimating(true));
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        } else {
            setIsAnimating(false);
            const timer = setTimeout(() => setIsVisible(false), 300); // Match transition duration
            document.body.style.overflow = 'unset';
            return () => clearTimeout(timer);
        }
    }, [isOpen, user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);

        // Reset and close after success message
        setTimeout(() => {
            setIsSuccess(false);
            setFormData({ name: '', email: '', phone: '', statement: '' });
            onClose();
        }, 2000);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className={`relative w-full max-w-lg bg-white shadow-2xl rounded-sm overflow-hidden transform transition-all duration-300 ${isAnimating ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}
            >
                {/* Header */}
                <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Join the Cohort</h3>
                        <p className="text-sm text-gray-500 mt-1">Design Emerge Workshop</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8">
                    {isSuccess ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Send className="w-8 h-8" />
                            </div>
                            <h4 className="text-2xl font-bold text-gray-900 mb-2">Application Sent!</h4>
                            <p className="text-gray-600">
                                Thank you for applying. We&apos;ll review your note and get back to you shortly.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all"
                                            placeholder="+91 98765 43210"
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="statement" className="block text-sm font-medium text-gray-700 mb-1">
                                        Why do you want to join? <span className="text-gray-400 font-normal">(100-150 words)</span>
                                    </label>
                                    <textarea
                                        id="statement"
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all resize-none"
                                        placeholder="Tell us how this workshop can positively impact you..."
                                        value={formData.statement}
                                        onChange={e => setFormData({ ...formData, statement: e.target.value })}
                                    />
                                    <p className="text-xs text-gray-500 mt-2 text-right">
                                        Feel free to write in your native language.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-4 bg-gray-900 text-white font-bold tracking-wide uppercase hover:bg-gray-800 transition-all duration-300 rounded-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Submit Application
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

function ArrowRight({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}
