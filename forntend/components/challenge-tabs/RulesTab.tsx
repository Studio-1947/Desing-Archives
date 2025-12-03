'use client';

import { Challenge } from '@/types';
import { ShieldCheck } from 'lucide-react';

interface RulesTabProps {
    challenge: Challenge;
}

export default function RulesTab({ challenge }: RulesTabProps) {
    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 uppercase tracking-wide">
                Rules & Eligibility
            </h2>

            <div className="space-y-6">
                {challenge.rules.map((rule, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-gray-50 border-l-4 border-gray-900">
                        <ShieldCheck className="w-6 h-6 text-gray-900 flex-shrink-0" />
                        <p className="text-gray-700">{rule}</p>
                    </div>
                ))}
            </div>

            <div className="mt-12 p-8 border border-gray-200 text-center">
                <h3 className="font-bold text-gray-900 mb-2">Have questions about the rules?</h3>
                <p className="text-gray-600 mb-4">Check our FAQ for more details.</p>
                <button className="text-sm font-bold text-gray-900 uppercase tracking-wide border-b-2 border-gray-900 hover:text-gray-700 hover:border-gray-700 transition-colors">
                    View FAQ
                </button>
            </div>
        </div>
    );
}
