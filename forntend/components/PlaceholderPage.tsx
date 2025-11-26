import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PlaceholderPageProps {
    title: string;
    description?: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-24">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {title}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mb-12 leading-relaxed">
                {description || "This page is currently under construction. We're working hard to bring you this content. Please check back soon!"}
            </p>
            <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium tracking-wide hover:bg-gray-800 transition-all duration-300"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
            </Link>
        </div>
    );
}
