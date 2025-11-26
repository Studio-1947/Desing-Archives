'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

interface User {
    id: string;
    name: string;
    email: string;
    picture: string;
}

interface AuthContextType {
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Check for existing token on mount
        const token = localStorage.getItem('auth_token');
        if (token) {
            try {
                const decoded = jwtDecode(token) as User;
                // Check if token is expired (optional, but good practice)
                // const isExpired = decoded.exp * 1000 < Date.now();
                // if (!isExpired) {
                setUser(decoded);
                // } else {
                //   localStorage.removeItem('auth_token');
                // }
            } catch (error) {
                console.error('Invalid token found', error);
                localStorage.removeItem('auth_token');
            }
        }
    }, []);

    const login = (token: string) => {
        localStorage.setItem('auth_token', token);
        const decoded = jwtDecode(token) as User;
        setUser(decoded);
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
                {children}
            </GoogleOAuthProvider>
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
