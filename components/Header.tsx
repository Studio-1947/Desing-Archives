"use client";

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeText, setActiveText] = useState('Community');
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setActiveText(prev => prev === 'Community' ? 'Archives' : 'Community');
                setIsAnimating(false);
            }, 500); // Wait for fade out animation to complete
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <nav className="container mx-auto px-6 py-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="group flex items-center gap-4">
                        <div className="relative w-10 h-10">
                            <img
                                src="/logo.svg"
                                alt="Studio 1947 Logo"
                                className="w-full h-full object-contain animate-spin-slow"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-gray-600 transition-colors duration-300">
                                    Local Design
                                </span>
                                <span className={`text-2xl font-bold tracking-tight text-gray-500 transition-all duration-500 ${isAnimating ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
                                    {activeText}
                                </span>
                            </div>
                            <span className="text-xs tracking-extra-wide text-gray-500 uppercase">
                                An initiative by Studio 1947
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-12">
                        <Link
                            href="/challenges"
                            className="text-sm font-medium tracking-wide text-gray-700 hover:text-gray-900 transition-colors duration-200 uppercase"
                        >
                            Challenges
                        </Link>
                        <Link
                            href="/archives"
                            className="text-sm font-medium tracking-wide text-gray-700 hover:text-gray-900 transition-colors duration-200 uppercase"
                        >
                            Archives
                        </Link>
                        <Link
                            href="/community"
                            className="text-sm font-medium tracking-wide text-gray-700 hover:text-gray-900 transition-colors duration-200 uppercase"
                        >
                            Community
                        </Link>
                        <Link
                            href="/about"
                            className="text-sm font-medium tracking-wide text-gray-700 hover:text-gray-900 transition-colors duration-200 uppercase"
                        >
                            About
                        </Link>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/submit"
                            className="hidden sm:block px-6 py-2 border-2 border-gray-900 text-gray-900 text-sm font-medium tracking-wide hover:bg-gray-900 hover:text-white transition-all duration-300 uppercase"
                        >
                            Submit Work
                        </Link>

                        <button
                            className="p-2 md:hidden hover:bg-gray-100 transition-colors duration-200"
                            aria-label="Menu"
                            onClick={toggleMenu}
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6 text-gray-900" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-900" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 py-6 px-6 shadow-lg animate-fade-in">
                        <div className="flex flex-col gap-6">
                            <Link
                                href="/challenges"
                                className="text-lg font-medium tracking-wide text-gray-900 hover:text-gray-600 transition-colors duration-200 uppercase"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Challenges
                            </Link>
                            <Link
                                href="/archives"
                                className="text-lg font-medium tracking-wide text-gray-900 hover:text-gray-600 transition-colors duration-200 uppercase"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Archives
                            </Link>
                            <Link
                                href="/community"
                                className="text-lg font-medium tracking-wide text-gray-900 hover:text-gray-600 transition-colors duration-200 uppercase"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Community
                            </Link>
                            <Link
                                href="/about"
                                className="text-lg font-medium tracking-wide text-gray-900 hover:text-gray-600 transition-colors duration-200 uppercase"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About
                            </Link>
                            <Link
                                href="/submit"
                                className="text-lg font-medium tracking-wide text-gray-900 hover:text-gray-600 transition-colors duration-200 uppercase"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Submit Work
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
