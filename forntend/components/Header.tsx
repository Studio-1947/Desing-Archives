"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import LoginButton from './LoginButton';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeTextIndex, setActiveTextIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isChallengesOpen, setIsChallengesOpen] = useState(false);

    const words = ['Community', 'Archives', 'Workshops', 'Challenges'];

    useEffect(() => {
        const interval = window.setInterval(() => {
            setIsAnimating(true);
            window.setTimeout(() => {
                setActiveTextIndex((prev) => (prev + 1) % words.length);
                setIsAnimating(false);
            }, 500); // Wait for fade out animation to complete
        }, 3000);

        return () => window.clearInterval(interval);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <nav className="container mx-auto px-6 py-6">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link href="/" className="group flex items-center gap-1.5 md:gap-3 flex-shrink-0">
                        <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                            <Image
                                src="/logo.svg"
                                alt="Studio 1947 Logo"
                                fill
                                className="object-contain animate-spin-slow"
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1.5 md:gap-2 whitespace-nowrap">
                                <span className="text-base md:text-xl lg:text-2xl font-bold tracking-tight text-gray-900 group-hover:text-gray-600 transition-colors duration-300">
                                    Local Design
                                </span>
                                <div className="grid grid-cols-1 grid-rows-1">
                                    {/* Invisible copies to reserve space */}
                                    {words.map((word) => (
                                        <span key={word} className="text-base md:text-xl lg:text-2xl font-bold tracking-tight text-transparent invisible col-start-1 row-start-1 pointer-events-none select-none" aria-hidden="true">
                                            {word}
                                        </span>
                                    ))}
                                    {/* Visible animating text */}
                                    <span className={`text-base md:text-xl lg:text-2xl font-bold tracking-tight text-gray-500 transition-all duration-500 col-start-1 row-start-1 ${isAnimating ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'}`}>
                                        {words[activeTextIndex]}
                                    </span>
                                </div>
                            </div>
                            <span className=" text-[10px] md:text-xs tracking-extra-wide text-gray-500 uppercase whitespace-nowrap">
                                An initiative by Studio 1947
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                        <div className="relative group">
                            <button
                                className="flex items-center gap-1 text-sm font-medium tracking-wide text-gray-700 hover:text-gray-900 transition-colors duration-200 uppercase"
                            >
                                Challenges
                                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
                            </button>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-sm py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <Link
                                    href="/challenges"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 uppercase tracking-wide"
                                >
                                    All Challenges
                                </Link>
                                <Link
                                    href="/challenges?type=student"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 uppercase tracking-wide"
                                >
                                    Student
                                </Link>
                            </div>
                        </div>

                        <Link
                            href="/workshops"
                            className="text-sm font-medium tracking-wide text-gray-700 hover:text-gray-900 transition-colors duration-200 uppercase"
                        >
                            Workshops
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
                    <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
                        <div className="hidden sm:block">
                            <LoginButton />
                        </div>
                        <Link
                            href="/submit"
                            className="hidden md:block px-5 py-2 border-2 border-gray-900 text-gray-900 text-sm font-medium tracking-wide hover:bg-gray-900 hover:text-white transition-all duration-300 uppercase whitespace-nowrap"
                        >
                            Submit Work
                        </Link>

                        <button
                            className="p-2 lg:hidden hover:bg-gray-100 transition-colors duration-200"
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
                    <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 py-6 px-6 shadow-lg animate-fade-in">
                        <div className="flex flex-col gap-6">
                            <div className="space-y-4">
                                <button
                                    onClick={() => setIsChallengesOpen(!isChallengesOpen)}
                                    className="flex items-center justify-between w-full text-lg font-medium tracking-wide text-gray-900 hover:text-gray-600 transition-colors duration-200 uppercase"
                                >
                                    Challenges
                                    <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isChallengesOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isChallengesOpen && (
                                    <div className="pl-4 flex flex-col gap-4 border-l border-gray-100 ml-1">
                                        <Link
                                            href="/challenges"
                                            className="text-base font-medium tracking-wide text-gray-600 hover:text-gray-900 uppercase"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            All Challenges
                                        </Link>
                                        <Link
                                            href="/challenges?type=student"
                                            className="text-base font-medium tracking-wide text-gray-600 hover:text-gray-900 uppercase"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            Student
                                        </Link>
                                    </div>
                                )}
                            </div>
                            <Link
                                href="/workshops"
                                className="text-lg font-medium tracking-wide text-gray-900 hover:text-gray-600 transition-colors duration-200 uppercase"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Workshops
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
                            <div className="pt-4 border-t border-gray-100">
                                <LoginButton />
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
