'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { GoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Login failed');
            }

            login(data.token);
            router.push('/');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse: any) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: credentialResponse.credential }),
            });

            if (!res.ok) throw new Error('Google login failed');

            const data = await res.json();
            login(data.token);
            router.push('/');
        } catch (error) {
            console.error('Google login error', error);
            setError('Google login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
            {/* Minimal Background Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="w-full max-w-md p-8 relative z-10 animate-fade-in">
                <div className="text-center mb-12">
                    <div className="inline-block border border-gray-900 px-3 py-1 mb-6">
                        <span className="text-xs uppercase tracking-extra-wide font-medium">Studio 1947</span>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Welcome Back</h1>
                    <p className="text-gray-500">Enter your details to access your archives.</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-100 text-red-600 text-sm p-4 mb-8 text-center">
                        {error}
                    </div>
                )}

                <div className="space-y-6 mb-8">
                    <div className="w-full">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => setError('Google Login Failed')}
                            useOneTap
                            theme="outline"
                            shape="rectangular"
                            width="100%"
                            text="continue_with"
                        />
                    </div>
                </div>

                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase tracking-widest">
                        <span className="px-4 bg-white text-gray-400">Or continue with email</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wide text-gray-900">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field-minimal"
                            placeholder="name@example.com"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-bold uppercase tracking-wide text-gray-900">Password</label>
                            <Link href="/forgot-password" className="text-xs text-gray-500 hover:text-gray-900 underline">
                                Forgot?
                            </Link>
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field-minimal pr-10"
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary-minimal flex items-center justify-center gap-2 group"
                        >
                            {isLoading ? 'Authenticating...' : 'Sign In'}
                            {!isLoading && <span className="group-hover:translate-x-1 transition-transform">→</span>}
                        </button>
                    </div>
                </form>

                <div className="mt-12 text-center border-t border-gray-100 pt-8">
                    <p className="text-sm text-gray-600">
                        New to the archives?{' '}
                        <Link href="/signup" className="font-bold text-gray-900 hover:underline">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
