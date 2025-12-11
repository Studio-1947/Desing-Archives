'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, MapPin, Phone, Send, Loader2, ArrowRight } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus('idle');
        setErrorMessage('');

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!res.ok) {
                throw new Error('Failed to send message');
            }

            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setStatus('error');
            setErrorMessage('Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-gray-50 border-b border-gray-200 py-20">
                    <div className="container mx-auto px-6 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            Get in Touch
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Have a question about our challenges, workshops, or archives? We'd love to hear from you.
                        </p>
                    </div>
                </section>

                <section className="container mx-auto px-6 py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Contact Info */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">
                                Contact Information
                            </h2>
                            <p className="text-gray-600 mb-12 leading-relaxed">
                                Whether you're a student looking to participate, a designer wanting to contribute, or an organization interested in partnering, we're here to help.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 border border-gray-900 flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-5 h-5 text-gray-900" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">Email Us</h3>
                                        <p className="text-gray-600">localdesigncommunity@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 border border-gray-900 flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-5 h-5 text-gray-900" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">Call Us</h3>
                                        <p className="text-gray-600">+91 98765 43210</p>
                                        <p className="text-gray-500 text-sm mt-1">Mon-Fri, 9am - 6pm IST</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 border border-gray-900 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5 text-gray-900" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-1">Visit Us</h3>
                                        <p className="text-gray-600">
                                            Studio 1947, Design Block<br />
                                            Hauz Khas Village, New Delhi<br />
                                            India - 110016
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white border-2 border-gray-900 p-8 md:p-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h2>

                            {status === 'success' ? (
                                <div className="bg-green-50 border border-green-200 p-6 text-center">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Send className="w-6 h-6 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                    <p className="text-gray-600 mb-6">
                                        Thank you for reaching out. We'll get back to you as soon as possible.
                                    </p>
                                    <button
                                        onClick={() => setStatus('idle')}
                                        className="text-sm font-bold text-gray-900 underline hover:text-gray-600"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-gray-900 transition-colors"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-gray-900 transition-colors"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                                            Subject
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-gray-900 transition-colors appearance-none"
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="General Inquiry">General Inquiry</option>
                                            <option value="Partnership">Partnership</option>
                                            <option value="Workshops">Workshops</option>
                                            <option value="Challenges">Challenges</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            className="w-full bg-gray-50 border border-gray-200 p-3 focus:outline-none focus:border-gray-900 transition-colors resize-none"
                                            placeholder="How can we help you?"
                                        />
                                    </div>

                                    {status === 'error' && (
                                        <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm">
                                            {errorMessage}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gray-900 text-white font-bold py-4 px-8 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span>Sending...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Send Message</span>
                                                <ArrowRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
