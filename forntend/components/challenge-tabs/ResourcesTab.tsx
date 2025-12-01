'use client';

import { Challenge } from '@/types';
import { Download, FileText, Image as ImageIcon, Package } from 'lucide-react';

interface ResourcesTabProps {
    challenge: Challenge;
}

export default function ResourcesTab({ challenge }: ResourcesTabProps) {
    const getIcon = (type: string) => {
        switch (type) {
            case 'pdf': return <FileText className="w-6 h-6" />;
            case 'zip': return <Package className="w-6 h-6" />;
            case 'fig': return <ImageIcon className="w-6 h-6" />; // Using Image icon for design files
            default: return <Download className="w-6 h-6" />;
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 uppercase tracking-wide">
                Assets & Guidelines
            </h2>

            {challenge.assets.length > 0 ? (
                <div className="grid gap-4">
                    {challenge.assets.map((asset, index) => (
                        <div key={index} className="flex items-center justify-between p-6 border border-gray-200 hover:border-gray-900 transition-colors bg-white group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-50 flex items-center justify-center text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                                    {getIcon(asset.type)}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{asset.name}</h3>
                                    <p className="text-sm text-gray-500 uppercase tracking-wide">{asset.type} • {asset.size}</p>
                                </div>
                            </div>
                            <button className="p-3 text-gray-400 hover:text-gray-900 transition-colors">
                                <Download className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 border-2 border-dashed border-gray-200">
                    <p className="text-gray-500">No resources available for this challenge yet.</p>
                </div>
            )}
        </div>
    );
}
