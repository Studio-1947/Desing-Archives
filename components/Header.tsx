import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <nav className="container mx-auto px-6 py-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="group">
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-gray-600 transition-colors duration-300">
                                DESIGN ARCHIVES
                            </span>
                            <span className="text-xs tracking-extra-wide text-gray-500 uppercase">
                                by Studio 1947
                            </span>
                        </div>
                    </Link>

                    {/* Navigation */}
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
                        >
                            <Menu className="w-6 h-6 text-gray-900" />
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}
