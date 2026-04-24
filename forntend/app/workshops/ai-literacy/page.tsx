'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InteractiveGridBackground from '@/components/InteractiveGridBackground';
import { ArrowLeft, Sparkles, Brain, Cpu, MessageSquare, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AILiteracyPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white overflow-hidden relative">
            <InteractiveGridBackground
                showGrid={true}
                showGradients={true}
                className="fixed inset-0 overflow-hidden pointer-events-none bg-white z-0 opacity-40"
            />

            <Header />

            <main className="flex-1 relative z-10">
                {/* Hero */}
                <section className="pt-32 pb-32">
                    <div className="container mx-auto px-6">
                        <Link href="/workshops" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors mb-12">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Workshops
                        </Link>
                        
                        <div className="max-w-4xl">
                            <span className="px-4 py-1.5 bg-amber-50 text-amber-600 text-xs font-bold uppercase tracking-widest rounded-full mb-8 inline-block animate-pulse">Module 03</span>
                            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-10 leading-tight tracking-tighter">
                                Future-Proofing with <br/>
                                <span className="italic font-serif font-light text-amber-500">AI Literacy</span>
                            </h1>
                            <p className="text-2xl text-gray-600 leading-relaxed max-w-2xl mb-12">
                                Don&apos;t just fear the future—build it. Master the tools of Generative AI to enhance your creative and professional workflows.
                            </p>
                            <Link href="/workshops#register" className="group inline-flex items-center gap-3 px-10 py-5 bg-gray-900 text-white font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-all rounded-sm">
                                <span>Join the Cohort</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="py-24 bg-gray-50 border-y border-gray-100">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                            <div className="space-y-4">
                                <div className="w-16 h-16 bg-white border border-gray-100 flex items-center justify-center mx-auto text-amber-500">
                                    <MessageSquare className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-xl">Prompting</h3>
                                <p className="text-sm text-gray-500">The art of talking to machines.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-16 h-16 bg-white border border-gray-100 flex items-center justify-center mx-auto text-amber-500">
                                    <Sparkles className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-xl">Generative Design</h3>
                                <p className="text-sm text-gray-500">Infinite creative possibilities.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-16 h-16 bg-white border border-gray-100 flex items-center justify-center mx-auto text-amber-500">
                                    <ShieldCheck className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-xl">AI Ethics</h3>
                                <p className="text-sm text-gray-500">Navigating the moral landscape.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="w-16 h-16 bg-white border border-gray-100 flex items-center justify-center mx-auto text-amber-500">
                                    <Zap className="w-8 h-8" />
                                </div>
                                <h3 className="font-bold text-xl">Workflows</h3>
                                <p className="text-sm text-gray-500">Boosting productivity 10x.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AI & Human Section */}
                <section className="py-32 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col lg:flex-row gap-20 items-center">
                            <div className="lg:w-1/2 space-y-8">
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                    AI as your <span className="italic font-serif font-light underline decoration-amber-500/30 underline-offset-8">Creative Mirror</span>.
                                </h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    We believe AI shouldn&apos;t replace human intuition, but amplify it. In this workshop, you&apos;ll learn to use local and cloud-based AI tools to ideate, draft, and refine your work like never before.
                                </p>
                                <div className="p-8 border-l-4 border-amber-500 bg-amber-50/30">
                                    <p className="text-xl font-medium text-gray-800 italic">
                                        &quot;Prompting is not coding; it&apos;s communicating intent with clarity and precision.&quot;
                                    </p>
                                </div>
                            </div>
                            <div className="lg:w-1/2 relative">
                                <div className="w-full aspect-square bg-gray-900 flex items-center justify-center overflow-hidden">
                                    <Brain className="w-48 h-48 text-amber-500/20" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer className="bg-white/80 backdrop-blur-md" />
        </div>
    );
}
