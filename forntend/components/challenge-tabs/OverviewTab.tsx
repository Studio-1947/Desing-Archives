'use client';

import { Challenge } from '@/types';
import { useState } from 'react';

interface OverviewTabProps {
    challenge: Challenge;
}

export default function OverviewTab({ challenge }: OverviewTabProps) {
    const [activeSection, setActiveSection] = useState('brief');

    const sections = [
        { id: 'brief', label: 'Challenge Overview' },
        { id: 'task', label: 'Design Brief' },
        { id: 'criteria', label: 'Judging Criteria' },
        { id: 'schedule', label: 'Timeline' },
        { id: 'deliverables', label: 'Deliverables' },
    ];

    const scrollToSection = (id: string) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Sidebar Navigation */}
            <div className="hidden lg:block lg:col-span-1">
                <div className="sticky top-24 space-y-1">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors duration-200 border-l-2 ${activeSection === section.id
                                ? 'border-gray-900 text-gray-900 bg-gray-50'
                                : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                                }`}
                        >
                            {section.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-16">
                {/* Challenge Overview */}
                <section id="brief" className="scroll-mt-24">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide">
                        Challenge Overview
                    </h2>
                    <div className="prose max-w-none text-gray-700">
                        <p className="text-lg leading-relaxed">{challenge.description}</p>
                    </div>
                </section>

                {/* Design Brief */}
                <section id="task" className="scroll-mt-24">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide">
                        Design Brief
                    </h2>
                    <div className="bg-gray-50 p-8 border border-gray-200">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {challenge.overview.brief}
                        </p>
                    </div>
                </section>

                {/* Judging Criteria */}
                <section id="criteria" className="scroll-mt-24">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide">
                        Judging Criteria
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {challenge.overview.criteria.map((criterion, index) => (
                            <div key={index} className="border border-gray-200 p-6 hover:border-gray-900 transition-colors duration-300">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-gray-900">{criterion.title}</h3>
                                    <span className="bg-gray-900 text-white text-xs font-bold px-2 py-1">
                                        {criterion.weight}%
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600">{criterion.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Timeline */}
                <section id="schedule" className="scroll-mt-24">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide">
                        Timeline
                    </h2>
                    <div className="relative border-l-2 border-gray-200 ml-3 space-y-8 pl-8 py-2">
                        {challenge.overview.schedule.map((item, index) => (
                            <div key={index} className="relative">
                                <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-white bg-gray-900" />
                                <h3 className="font-bold text-gray-900">{item.phase}</h3>
                                <p className="text-gray-600 font-mono text-sm mt-1">{item.date}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Deliverables */}
                <section id="deliverables" className="scroll-mt-24">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide">
                        Deliverables
                    </h2>
                    <ul className="space-y-3">
                        {challenge.overview.deliverables.map((item, index) => (
                            <li key={index} className="flex items-start gap-3 text-gray-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-2.5 flex-shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
}
