'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center gap-2 pt-8">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium uppercase tracking-wide border border-gray-200 hover:border-gray-900 disabled:opacity-50 disabled:hover:border-gray-200 transition-colors flex items-center gap-2"
            >
                <ChevronLeft className="w-4 h-4" />
                Previous
            </button>
            <div className="flex items-center gap-2 px-4">
                <span className="text-sm font-bold text-gray-900">Page {currentPage}</span>
                <span className="text-sm text-gray-400">of {totalPages}</span>
            </div>
            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium uppercase tracking-wide border border-gray-200 hover:border-gray-900 disabled:opacity-50 disabled:hover:border-gray-200 transition-colors flex items-center gap-2"
            >
                Next
                <ChevronRight className="w-4 h-4" />
            </button>
        </div>
    );
}
