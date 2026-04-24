'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InteractiveGridBackground from '@/components/InteractiveGridBackground';
import { ArrowLeft, MessageSquare, PenTool, BookOpen, Compass, Presentation, Star, Quote } from 'lucide-react';
import Link from 'next/link';

export default function StrategyStorytellingPage() {
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
                <section className="pt-40 pb-32">
                    <div className="container mx-auto px-6 text-center">
                        <Link href="/workshops" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors mb-16">
                            <ArrowLeft className="w-4 h-4" />
                            Return to Workshops
                        </Link>
                        
                        <div className="max-w-4xl mx-auto">
                            <span className="px-6 py-2 border border-emerald-200 text-emerald-600 text-xs font-bold uppercase tracking-widest rounded-full mb-10 inline-block bg-emerald-50/50">Module 04</span>
                            <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-12 tracking-tighter leading-[0.9]">
                                Narrative <span className="italic font-serif font-light text-emerald-500">Architecture</span>
                            </h1>
                            <p className="text-2xl text-gray-600 leading-relaxed font-light mb-16 max-w-3xl mx-auto">
                                Storytelling is the most powerful tool in a designer&apos;s arsenal. Learn to craft strategies that resonate and narratives that drive action.
                            </p>
                            <div className="flex justify-center">
                                <Link href="/workshops#register" className="px-12 py-5 bg-gray-900 text-white font-bold uppercase tracking-widest text-sm hover:shadow-2xl hover:shadow-emerald-900/20 transition-all rounded-sm">
                                    Apply Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pillars */}
                <section className="py-32 bg-emerald-900 text-white">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                            <div className="space-y-6">
                                <Compass className="w-10 h-10 text-emerald-400" />
                                <h3 className="text-2xl font-bold">Strategic Intent</h3>
                                <p className="text-emerald-100/70 leading-relaxed">Defining the &apos;Why&apos; before the &apos;What&apos;. Aligning creative output with organizational goals and user needs.</p>
                            </div>
                            <div className="space-y-6">
                                <PenTool className="w-10 h-10 text-emerald-400" />
                                <h3 className="text-2xl font-bold">The Hero&apos;s Journey</h3>
                                <p className="text-emerald-100/70 leading-relaxed">Applying classical narrative structures to modern brand communications and user experiences.</p>
                            </div>
                            <div className="space-y-6">
                                <Presentation className="w-10 h-10 text-emerald-400" />
                                <h3 className="text-2xl font-bold">Visual Pitching</h3>
                                <p className="text-emerald-100/70 leading-relaxed">The art of persuasion. How to present ideas so they stick and win stakeholder approval.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quote Section */}
                <section className="py-32 bg-white relative">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto text-center">
                            <Quote className="w-16 h-16 text-emerald-100 mx-auto mb-10" />
                            <blockquote className="text-3xl md:text-5xl font-serif italic text-gray-900 leading-tight mb-12">
                                &quot;The most powerful person in the world is the storyteller. The storyteller sets the vision, values and agenda of an entire generation.&quot;
                            </blockquote>
                            <cite className="text-sm font-bold uppercase tracking-widest text-gray-500 not-italic">— Steve Jobs</cite>
                        </div>
                    </div>
                </section>

                <section className="py-32 bg-gray-50 border-t border-gray-100">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                            <div>
                                <h2 className="text-4xl font-bold mb-8">What you will learn</h2>
                                <div className="space-y-6">
                                    {[
                                        'Brand archetyping and voice development',
                                        'Persuasive communication frameworks',
                                        'Data storytelling and visualization',
                                        'Presentation design and delivery skills'
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 text-lg text-gray-700">
                                            <Star className="w-5 h-5 text-emerald-500 shrink-0" />
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative aspect-video bg-emerald-50 flex items-center justify-center p-12">
                                <div className="w-full h-full border border-emerald-200 bg-white shadow-xl rotate-3"></div>
                                <div className="absolute inset-0 flex items-center justify-center -rotate-3 p-12">
                                    <div className="w-full h-full border-2 border-gray-900 bg-white p-8 flex flex-col justify-between">
                                        <div className="text-xs font-bold uppercase tracking-widest text-emerald-600">Case Study #04</div>
                                        <div className="text-2xl font-bold">The impact of a single story.</div>
                                        <div className="w-12 h-0.5 bg-gray-900"></div>
                                    </div>
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
