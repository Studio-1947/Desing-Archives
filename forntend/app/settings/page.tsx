'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import { 
    User, 
    Lock, 
    Bell, 
    Shield, 
    Camera, 
    Loader2, 
    ChevronRight,
    Mail,
    Globe,
    Key
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FileUpload from '@/components/ui/FileUpload';
import Image from 'next/image';

type SettingsTab = 'profile' | 'security' | 'notifications';

export default function SettingsPage() {
    const { user, login, isAuthenticated } = useAuth();
    const { showToast } = useToast();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
    const [isLoading, setIsLoading] = useState(false);

    // Profile state
    const [name, setName] = useState('');
    const [picture, setPicture] = useState('');

    // Security state
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setPicture(user.picture || '');
        }
    }, [user]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const token = localStorage.getItem('auth_token');
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name, picture })
            });

            if (!res.ok) throw new Error('Failed to update profile');

            const data = await res.json();
            login(data.token);
            showToast('Profile updated successfully', 'success');
        } catch (error) {
            console.error(error);
            showToast('Failed to update profile', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            showToast('Passwords do not match', 'error');
            return;
        }

        setIsLoading(true);
        try {
            const token = localStorage.getItem('auth_token');
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ currentPassword, newPassword })
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message || 'Failed to update password');
            }

            showToast('Password updated successfully', 'success');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error: any) {
            showToast(error.message, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) return null;

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'security', label: 'Account Security', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Header />
            
            <main className="container mx-auto px-6 py-12 md:py-20">
                <div className="max-w-6xl mx-auto">
                    <header className="mb-12">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 uppercase">Settings</h1>
                        <p className="mt-2 text-gray-500">Manage your account preferences and personal information.</p>
                    </header>

                    <div className="flex flex-col lg:flex-row items-start gap-12 min-h-[600px]">
                        {/* Sidebar Navigation */}
                        <aside className="lg:w-72 flex-shrink-0 lg:sticky lg:top-32 z-10">
                            <nav className="flex flex-col gap-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id as SettingsTab)}
                                        className={`flex items-center justify-between px-4 py-3 text-sm font-medium tracking-wide uppercase transition-all duration-200 border-l-2 ${
                                            activeTab === tab.id 
                                            ? 'border-gray-900 bg-white text-gray-900 shadow-sm' 
                                            : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'
                                        }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <tab.icon className="w-4 h-4" />
                                            {tab.label}
                                        </div>
                                        <ChevronRight className={`w-4 h-4 transition-opacity ${activeTab === tab.id ? 'opacity-100' : 'opacity-0'}`} />
                                    </button>
                                ))}
                            </nav>
                        </aside>

                        {/* Main Content Area */}
                        <div className="flex-1 max-w-2xl bg-white border border-gray-100 shadow-sm p-8 md:p-12">
                            {activeTab === 'profile' && (
                                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <section>
                                        <h2 className="text-xl font-bold tracking-tight text-gray-900 uppercase mb-8 pb-4 border-b border-gray-100">Profile Information</h2>
                                        
                                        <form onSubmit={handleUpdateProfile} className="space-y-8">
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 p-6 bg-gray-50 border border-gray-100">
                                                <div className="relative group">
                                                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white relative">
                                                        {picture ? (
                                                            <Image 
                                                                src={picture} 
                                                                alt="Profile" 
                                                                fill 
                                                                className="object-cover" 
                                                                unoptimized
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                                                <User className="w-10 h-10" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex-1 space-y-4">
                                                    <div>
                                                        <h3 className="font-bold text-gray-900 uppercase text-xs tracking-wider">Profile Picture</h3>
                                                        <p className="text-sm text-gray-500 mt-1">Update your professional avatar used across the platform.</p>
                                                    </div>
                                                    <FileUpload 
                                                        onUpload={(urls) => setPicture(urls[0])} 
                                                        label="Change Photo"
                                                        accept="image/*"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid gap-6">
                                                <div className="space-y-2">
                                                    <label htmlFor="full-name" className="text-xs font-bold uppercase tracking-wider text-gray-700">Full Name</label>
                                                    <input
                                                        id="full-name"
                                                        type="text"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        className="w-full px-4 py-3 bg-white border-2 border-gray-100 focus:border-gray-900 focus:outline-none transition-colors text-sm font-medium"
                                                        placeholder="Your full name"
                                                        title="Full Name"
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-gray-700 block">
                                                        Email Address
                                                        <span className="ml-2 text-[10px] font-normal normal-case text-gray-400">Primary contact email</span>
                                                    </label>
                                                    <div className="relative">
                                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                        <input
                                                            id="email"
                                                            type="email"
                                                            value={user.email}
                                                            disabled
                                                            className="w-full pl-11 pr-4 py-3 bg-gray-50 border-2 border-gray-100 text-gray-500 cursor-not-allowed text-sm font-medium"
                                                            title="Email Address"
                                                            placeholder="Email Address"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full sm:w-auto px-8 py-3 bg-gray-900 text-white text-sm font-bold uppercase tracking-widest hover:bg-gray-800 disabled:bg-gray-400 transition-all duration-300 flex items-center justify-center gap-2"
                                            >
                                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
                                            </button>
                                        </form>
                                    </section>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <section>
                                        <h2 className="text-xl font-bold tracking-tight text-gray-900 uppercase mb-8 pb-4 border-b border-gray-100">Update Password</h2>
                                        <p className="text-sm text-gray-500 mb-8">Ensure your account is using a long, random password to stay secure.</p>
                                        
                                        <form onSubmit={handleUpdatePassword} className="space-y-6">
                                            <div className="space-y-2">
                                                <label htmlFor="current-password" className="text-xs font-bold uppercase tracking-wider text-gray-700">Current Password</label>
                                                <div className="relative">
                                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <input
                                                        id="current-password"
                                                        type="password"
                                                        value={currentPassword}
                                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                                        className="w-full pl-11 pr-4 py-3 bg-white border-2 border-gray-100 focus:border-gray-900 focus:outline-none transition-colors text-sm font-medium"
                                                        required
                                                        title="Current Password"
                                                        placeholder="Enter current password"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label htmlFor="new-password" className="text-xs font-bold uppercase tracking-wider text-gray-700">New Password</label>
                                                    <div className="relative">
                                                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                        <input
                                                            id="new-password"
                                                            type="password"
                                                            value={newPassword}
                                                            onChange={(e) => setNewPassword(e.target.value)}
                                                            className="w-full pl-11 pr-4 py-3 bg-white border-2 border-gray-100 focus:border-gray-900 focus:outline-none transition-colors text-sm font-medium"
                                                            required
                                                            title="New Password"
                                                            placeholder="Enter new password"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label htmlFor="confirm-password" className="text-xs font-bold uppercase tracking-wider text-gray-700">Confirm Password</label>
                                                    <div className="relative">
                                                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                        <input
                                                            id="confirm-password"
                                                            type="password"
                                                            value={confirmPassword}
                                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                                            className="w-full pl-11 pr-4 py-3 bg-white border-2 border-gray-100 focus:border-gray-900 focus:outline-none transition-colors text-sm font-medium"
                                                            required
                                                            title="Confirm Password"
                                                            placeholder="Confirm new password"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full sm:w-auto px-8 py-3 bg-gray-900 text-white text-sm font-bold uppercase tracking-widest hover:bg-gray-800 disabled:bg-gray-400 transition-all duration-300 flex items-center justify-center gap-2"
                                            >
                                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Update Password'}
                                            </button>
                                        </form>
                                    </section>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                    <section>
                                        <h2 className="text-xl font-bold tracking-tight text-gray-900 uppercase mb-8 pb-4 border-b border-gray-100">Preferences</h2>
                                        
                                        <div className="space-y-6">
                                            {[
                                                { title: 'Email Notifications', desc: 'Receive updates about new challenges and workshops.', checked: true },
                                                { title: 'Community Activity', desc: 'Get notified when someone replies to your discussions.', checked: true },
                                                { title: 'Marketing Emails', desc: 'Stay informed about our latest initiatives and project news.', checked: false },
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-start justify-between p-4 border border-gray-100 hover:border-gray-200 transition-colors group">
                                                    <div>
                                                        <h3 className="font-bold text-sm text-gray-900 uppercase">{item.title}</h3>
                                                        <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
                                                    </div>
                                                    <div className={`w-10 h-6 rounded-full relative transition-colors duration-200 cursor-pointer ${item.checked ? 'bg-gray-900' : 'bg-gray-200'}`}>
                                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200 ${item.checked ? 'left-5' : 'left-1'}`} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-8 p-6 bg-blue-50 border border-blue-100">
                                            <div className="flex gap-4">
                                                <Bell className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                                <div>
                                                    <p className="text-sm font-medium text-blue-900">Notification settings are currently being optimized.</p>
                                                    <p className="text-xs text-blue-700 mt-1">We'll save your preferences locally for now. Global sync coming soon.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
