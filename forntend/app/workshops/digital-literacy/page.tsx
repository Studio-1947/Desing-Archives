'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InteractiveGridBackground from '@/components/InteractiveGridBackground';
import { ArrowLeft, Smartphone, Globe, Share2, MousePointer2, Image as ImageIcon, Layout, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function DigitalLiteracyPage() {
    const modules = [
        {
            title: "Digital Foundations",
            description: "Master the essential OS navigations, file management, and understanding cloud ecosystems.",
            icon: <MousePointer2 className="w-6 h-6 text-purple-500" />
        },
        {
            title: "Creative Software",
            description: "An introduction to industry-standard tools (Illustrator, Photoshop, Canva) for non-designers.",
            icon: <ImageIcon className="w-6 h-6 text-purple-500" />
        },
        {
            title: "Social Media Strategy",
            description: "Go beyond posting. Learn platform algorithms, content scheduling, and community engagement.",
            icon: <Share2 className="w-6 h-6 text-purple-500" />
        },
        {
            title: "Visual Storytelling",
            description: "Creating grid-worthy content that adheres to brand guidelines and grabs attention.",
            icon: <Layout className="w-6 h-6 text-purple-500" />
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-white overflow-hidden relative">
            <InteractiveGridBackground
                showGrid={false}
                showGradients={true}
                className="fixed inset-0 overflow-hidden pointer-events-none bg-white z-0"
            />

            <Header />

            <main className="flex-1 relative z-10">
                {/* Hero */}
                <section className="pt-32 pb-20 border-b border-gray-100">
                    <div className="container mx-auto px-6">
                        <Link href="/workshops" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors mb-12">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Workshops
                        </Link>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <span className="px-4 py-1.5 bg-purple-50 text-purple-600 text-xs font-bold uppercase tracking-widest rounded-full mb-6 inline-block">Module 02</span>
                                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight tracking-tighter">
                                    Digital Literacy <br/>
                                    <span className="italic font-serif font-light text-purple-500">Basics to Social Media</span>
                                </h1>
                                <p className="text-xl text-gray-600 leading-relaxed max-w-xl mb-10">
                                    Bridge the digital divide. From essential computer skills to mastering the strategic art of social media presence.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link href="/workshops#register" className="px-8 py-4 bg-gray-900 text-white font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-all rounded-sm">
                                        Enroll in Course
                                    </Link>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 relative">
                                <div className="aspect-square bg-purple-50 flex items-center justify-center border border-purple-100">
                                    <Smartphone className="w-12 h-12 text-purple-500 animate-pulse" />
                                </div>
                                <div className="aspect-square bg-gray-900 flex items-center justify-center">
                                    <Globe className="w-12 h-12 text-white" />
                                </div>
                                <div className="aspect-square bg-gray-50 flex items-center justify-center border border-gray-100">
                                    <Share2 className="w-12 h-12 text-gray-900" />
                                </div>
                                <div className="aspect-square bg-purple-100 flex items-center justify-center">
                                    <div className="w-12 h-12 border-2 border-purple-500 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="md:col-span-1">
                                <h2 className="text-3xl font-bold text-gray-900 mb-8">What we&apos;ll cover</h2>
                                <p className="text-gray-600 leading-relaxed mb-8">
                                    This track is specifically designed for non-technical individuals who want to gain professional proficiency in the digital tools of today.
                                </p>
                            </div>
                            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {modules.map((m, i) => (
                                    <div key={i} className="p-8 border border-gray-100 hover:border-purple-500 transition-all group">
                                        <div className="mb-6 group-hover:scale-110 transition-transform">{m.icon}</div>
                                        <h3 className="font-bold text-lg mb-3">{m.title}</h3>
                                        <p className="text-sm text-gray-500 leading-relaxed">{m.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-purple-600 text-white">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-4xl font-bold mb-12">Take control of your digital identity.</h2>
                        <div className="flex justify-center gap-16 flex-wrap">
                            <div className="text-center">
                                <div className="text-5xl font-bold mb-2">100%</div>
                                <div className="text-sm uppercase tracking-widest opacity-80">Practical Learning</div>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-bold mb-2">15+</div>
                                <div className="text-sm uppercase tracking-widest opacity-80">Tools Mastered</div>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-bold mb-2">24/7</div>
                                <div className="text-sm uppercase tracking-widest opacity-80">Online Support</div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer className="bg-white/80 backdrop-blur-md" />
        </div>
    );
}
