'use client';

import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '@/context/AuthContext';

export default function LoginButton() {
    const { login, user, logout } = useAuth();

    const handleSuccess = async (credentialResponse: any) => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: credentialResponse.credential }),
            });

            if (!res.ok) {
                throw new Error('Failed to authenticate with backend');
            }

            const data = await res.json();
            login(data.token);
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    if (user) {
        return (
            <div className="flex items-center gap-4">
                <img
                    src={user.picture}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border border-gray-200"
                />
                <button
                    onClick={logout}
                    className="text-sm text-gray-600 hover:text-gray-900"
                >
                    Logout
                </button>
            </div>
        );
    }

    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => {
                console.log('Login Failed');
            }}
            useOneTap
            theme="outline"
            shape="circle"
        />
    );
}
