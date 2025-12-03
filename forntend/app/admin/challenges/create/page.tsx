'use client';

import React from 'react';
import ChallengeForm from '@/components/admin/ChallengeForm';

export default function CreateChallengePage() {
    return (
        <div className="space-y-8">
            <div className="border-b-2 border-gray-200 pb-6">
                <h1 className="text-3xl font-bold tracking-tighter text-gray-900">Create New Challenge</h1>
            </div>
            <ChallengeForm />
        </div>
    );
}
