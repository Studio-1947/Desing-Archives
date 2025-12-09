import React from 'react';
import Link from 'next/link';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-white">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r-2 border-gray-200 hidden md:block">
                <div className="p-6 border-b-2 border-gray-200">
                    <Link href="/" className="text-xl font-bold tracking-tighter text-gray-900">
                        Studio 1947
                    </Link>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide font-medium">Admin Panel</p>
                </div>
                <nav className="p-4 space-y-2">
                    <Link
                        href="/admin/challenges"
                        className="flex items-center px-4 py-3 text-sm font-medium rounded-none bg-gray-900 text-white transition-all duration-300 hover:bg-gray-800"
                    >
                        Challenges
                    </Link>
                    <Link
                        href="/admin/emails"
                        className="flex items-center px-4 py-3 text-sm font-medium rounded-none text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300"
                    >
                        Email Manager
                    </Link>
                    {/* Add more admin links here */}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
                {children}
            </main>
        </div>
    );
}
