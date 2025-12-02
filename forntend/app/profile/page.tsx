'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import ProfileHistory from '@/components/profile/ProfileHistory';
import { LogOut } from 'lucide-react';
import Image from 'next/image';

export default function ProfilePage() {
    const { user, logout } = useAuth();

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col bg-white">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Please log in to view your profile</h2>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <div className="min-h-screen bg-white pt-24 pb-12">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto space-y-12">
                        {/* Profile Header */}
                        <div className="bg-white border-2 border-gray-900 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden group">
                            {/* Decorative background pattern */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 -z-10 rounded-bl-full opacity-50 transition-transform group-hover:scale-110" />

                            <div className="w-32 h-32 border-2 border-gray-900 flex items-center justify-center text-4xl font-bold text-gray-900 overflow-hidden relative bg-gray-50">
                                {user.picture ? (
                                    <Image src={user.picture} alt={user.name} fill className="object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                                ) : (
                                    user.name.charAt(0)
                                )}
                            </div>

                            <div className="flex-1 text-center md:text-left space-y-4">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-2">{user.name}</h1>
                                    <p className="text-gray-500 font-mono text-sm">{user.email}</p>
                                </div>

                                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                    <span className="px-3 py-1 bg-gray-900 text-white text-xs font-bold uppercase tracking-wider">
                                        {user.role}
                                    </span>
                                    <span className="px-3 py-1 border border-gray-200 text-gray-600 text-xs font-bold uppercase tracking-wider">
                                        Member since {new Date().getFullYear()}
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 min-w-[160px]">
                                <button
                                    onClick={logout}
                                    className="btn-secondary-minimal flex items-center justify-center gap-2 w-full"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                            </div>
                        </div>

                        {/* History Section */}
                        <ProfileHistory />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
