import Link from 'next/link';
import { Twitter, Linkedin, Instagram, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 mt-32">
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-bold tracking-tight text-gray-900">
                                DESIGN ARCHIVES
                            </h3>
                            <p className="text-xs tracking-extra-wide text-gray-500 uppercase mt-1">
                                by Studio 1947
                            </p>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Rooted in local wisdom, designed for global impact. Empowering designers and creative communities.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="p-2 border border-gray-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="p-2 border border-gray-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a
                                href="#"
                                className="p-2 border border-gray-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Platform */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-6 tracking-wide uppercase">Platform</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/challenges" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                                    Browse Challenges
                                </Link>
                            </li>
                            <li>
                                <Link href="/archives" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                                    Design Archives
                                </Link>
                            </li>
                            <li>
                                <Link href="/community" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                                    Community
                                </Link>
                            </li>
                            <li>
                                <Link href="/submit" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                                    Submit Work
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-6 tracking-wide uppercase">Resources</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/guidelines" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                                    Design Guidelines
                                </Link>
                            </li>
                            <li>
                                <Link href="/tutorials" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                                    Tutorials
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Studio 1947 */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-6 tracking-wide uppercase">Studio 1947</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="https://www.1947.io" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                                    About Studio
                                </a>
                            </li>
                            <li>
                                <a href="https://www.1947.io/portfolio" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                                    Our Work
                                </a>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-gray-500">
                            © 2024 Studio 1947. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <Link href="/privacy" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-200">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-xs text-gray-500 hover:text-gray-900 transition-colors duration-200">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
