'use client';

import React, { useState } from 'react';
import { Copy, Check, Info, Code } from 'lucide-react';

interface Snippet {
    name: string;
    description: string;
    code: string;
}

const snippets: Snippet[] = [
    {
        name: 'Professional Pull Quote',
        description: 'Large, centered quote with an accent border and quotation mark.',
        code: `<blockquote class="pull-quote">
  "This is a professional pull quote that draws attention to key insights."
</blockquote>`
    },
    {
        name: 'Editorial Callout Box',
        description: 'A shaded box for highlights, notes, or additional context.',
        code: `<div class="callout">
  <strong>Note:</strong> This is an editorial callout box for providing extra information.
</div>`
    },
    {
        name: 'Side Note (Desktop Only)',
        description: 'Text that appears in a smaller column to the right on large screens.',
        code: `<div class="sidenote-wrap">
  <div>Main content text goes here. This part stays in the primary column.</div>
  <div class="sidenote">This is a sidenote that appears to the right.</div>
</div>`
    },
    {
        name: 'Elegant Section Divider',
        description: 'A thin horizontal line to separate thematic sections.',
        code: `<hr class="section-divider" />`
    },
    {
        name: 'Image Plate Label',
        description: 'Style for image captions or metadata.',
        code: `<p class="plate-label">FIG. 01 — THE WEAVING PROCESS</p>`
    }
];

export default function FormattingGuide() {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const copyToClipboard = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <aside className="w-full bg-gray-50 border-2 border-gray-200 p-6 space-y-8 sticky top-24 h-fit max-h-[85vh] overflow-y-auto">
            <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
                <Code className="w-5 h-5 text-gray-900" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900">Formatting Guide</h3>
            </div>

            <div className="space-y-6">
                <div className="p-4 bg-blue-50 border border-blue-100 flex gap-3">
                    <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] leading-relaxed text-blue-700 uppercase font-medium">
                        Use these HTML snippets in your topic content to achieve professional blog layouts.
                    </p>
                </div>

                {snippets.map((snippet, index) => (
                    <div key={index} className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h4 className="text-[11px] font-bold text-gray-900 uppercase tracking-extra-wide">{snippet.name}</h4>
                            <button
                                type="button"
                                onClick={() => copyToClipboard(snippet.code, index)}
                                className="text-gray-400 hover:text-gray-900 transition-colors"
                                title="Copy snippet"
                            >
                                {copiedIndex === index ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                        <p className="text-[10px] text-gray-500 leading-tight">{snippet.description}</p>
                        <pre className="bg-gray-900 text-gray-300 p-3 text-[10px] overflow-x-auto rounded font-mono">
                            {snippet.code}
                        </pre>
                    </div>
                ))}
            </div>

            <div className="pt-4 border-t border-gray-200">
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-extra-wide mb-3">Headings Tip</h4>
                <p className="text-[10px] text-gray-500 leading-relaxed italic">
                    Type a line in ALL CAPS to create a section heading automatically, or use standard markdown ## Title.
                </p>
            </div>
        </aside>
    );
}
