'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InteractiveGridBackground from '@/components/InteractiveGridBackground';
import { ArrowLeft, ArrowRight, Lightbulb, Target, Users, Map, Cpu, Zap, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function DesignThinkingPage() {
    const learningPath = [
        {
            title: "Empathy & Immersion",
            description: "Go beyond surface observations. Learn techniques to observe, engage, and empathize with users to discover their latent needs.",
            icon: <Users className="w-6 h-6 text-red-500" />
        },
        {
            title: "Problem Definition",
            description: "The art of framing. Transform vague challenges into actionable problem statements using the 'How Might We' framework.",
            icon: <Target className="w-6 h-6 text-red-500" />
        },
        {
            title: "Ideation & Selection",
            description: "Quantity over quality. Use divergent thinking to generate hundreds of ideas before converging on the most promising ones.",
            icon: <Zap className="w-6 h-6 text-red-500" />
        },
        {
            title: "Rapid Prototyping",
            description: "Build to learn. Create low-fidelity physical or digital models to test assumptions and gather feedback early.",
            icon: <Cpu className="w-6 h-6 text-red-500" />
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
                {/* Product Hero */}
                <section className="pt-32 pb-20 border-b border-gray-100">
                    <div className="container mx-auto px-6">
                        <Link href="/workshops" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors mb-12">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Workshops
                        </Link>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <span className="px-4 py-1.5 bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest rounded-full mb-6 inline-block">Module 01</span>
                                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight tracking-tighter">
                                    Design Thinking & <br/>
                                    <span className="italic font-serif font-light text-red-500">Problem Solving</span>
                                </h1>
                                <p className="text-xl text-gray-600 leading-relaxed max-w-xl mb-10">
                                    Master the human-centric approach to innovation. This workshop teaches you how to identify the right problems before finding the right solutions.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link href="/workshops#register" className="px-8 py-4 bg-gray-900 text-white font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-all rounded-sm">
                                        Apply for this Track
                                    </Link>
                                    <button className="px-8 py-4 border border-gray-200 text-gray-900 font-bold uppercase tracking-widest text-xs hover:border-gray-900 transition-all rounded-sm">
                                        Download Syllabus
                                    </button>
                                </div>
                            </div>
                            <div className="relative aspect-square bg-slate-50 border border-gray-100 p-12 flex items-center justify-center">
                                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-[0.03] pointer-events-none">
                                    {Array.from({ length: 36 }).map((_, i) => (
                                        <div key={i} className="border border-black"></div>
                                    ))}
                                </div>
                                <div className="relative w-full h-full border-2 border-gray-900 flex flex-col items-center justify-center p-10 text-center gap-6">
                                    <Lightbulb className="w-24 h-24 text-gray-900" />
                                    <div className="space-y-2">
                                        <div className="text-sm font-bold uppercase tracking-widest">Core Philosophy</div>
                                        <div className="text-2xl font-light italic font-serif">&quot;Identify the latent need, <br/>not the surface want.&quot;</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                                <div className="space-y-8">
                                    <h2 className="text-3xl font-bold text-gray-900">Why Design Thinking?</h2>
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        In a world focused on output, we focus on outcome. Design Thinking provides a proven framework for tackling complex, ambiguous challenges across any industry.
                                    </p>
                                    <ul className="space-y-4">
                                        {['Reduces risk by testing early', 'Uncovers hidden opportunities', 'Accelerates innovation cycles', 'Foster collaborative culture'].map(item => (
                                            <li key={item} className="flex items-center gap-3 text-gray-700">
                                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                                <span className="font-medium">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-gray-50 p-10 border border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">Learning Path</h3>
                                    <div className="space-y-8">
                                        {learningPath.map((item, i) => (
                                            <div key={i} className="flex gap-4">
                                                <div className="shrink-0 pt-1">
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                                                    <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Outcomes */}
                <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 pointer-events-none text-[30rem] font-bold select-none whitespace-nowrap leading-none">
                        OUTCOME OUTCOME OUTCOME
                    </div>
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-4xl md:text-5xl font-bold mb-16">What you&apos;ll walk away with</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                                <div className="space-y-4">
                                    <div className="text-5xl font-serif italic text-red-500">01</div>
                                    <h4 className="text-xl font-bold">The Toolkit</h4>
                                    <p className="text-gray-400">A complete set of methods and templates for workshops.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="text-5xl font-serif italic text-red-500">02</div>
                                    <h4 className="text-xl font-bold">A Prototype</h4>
                                    <p className="text-gray-600">A tangible solution developed during the track.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="text-5xl font-serif italic text-red-500">03</div>
                                    <h4 className="text-xl font-bold">Certification</h4>
                                    <p className="text-gray-400">A certificate of completion from Design Archives.</p>
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
