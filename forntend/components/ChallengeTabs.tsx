'use client';
// ChallengeTabs component for managing challenge details views

import { useState } from 'react';
import { Challenge } from '@/types';
import OverviewTab from './challenge-tabs/OverviewTab';
import LeaderboardTab from './challenge-tabs/LeaderboardTab';
import ResourcesTab from './challenge-tabs/ResourcesTab';
import RulesTab from './challenge-tabs/RulesTab';

interface ChallengeTabsProps {
    challenge: Challenge;
}

type TabType = 'overview' | 'leaderboard' | 'resources' | 'rules';

export default function ChallengeTabs({ challenge }: ChallengeTabsProps) {
    const [activeTab, setActiveTab] = useState<TabType>('overview');

    const tabs: { id: TabType; label: string }[] = [
        { id: 'overview', label: 'Overview' },
        { id: 'leaderboard', label: 'Leaderboard' },
        { id: 'resources', label: 'Resources' },
        { id: 'rules', label: 'Rules' },
    ];

    return (
        <div className="bg-white">
            {/* Tabs Navigation */}
            <div className="border-b border-gray-200 sticky top-0 bg-white z-10">
                <div className="flex overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-6 py-4 text-sm font-medium tracking-wide uppercase whitespace-nowrap border-b-2 transition-colors duration-200 ${activeTab === tab.id
                                ? 'border-gray-900 text-gray-900'
                                : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="py-8">
                {activeTab === 'overview' && <OverviewTab challenge={challenge} />}
                {activeTab === 'leaderboard' && <LeaderboardTab challenge={challenge} />}
                {activeTab === 'resources' && <ResourcesTab challenge={challenge} />}
                {activeTab === 'rules' && <RulesTab challenge={challenge} />}
            </div>
        </div>
    );
}
