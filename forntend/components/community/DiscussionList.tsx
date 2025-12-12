"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageSquare, Eye, Pin, ArrowRight } from "lucide-react";

interface Discussion {
    id: string;
    title: string;
    content: string;
    author: {
        name: string;
        picture: string | null;
    };
    category: string;
    views: number;
    isPinned: boolean;
    isLocked: boolean;
    tags: string[];
    mediaUrls: string[];
    likes: string[];
    createdAt: string;
    comments: {
        author: {
            name: string;
            picture: string | null;
        };
    }[];
    _count: {
        comments: number;
    };
}

export default function DiscussionList({ sortBy = "newest" }: { sortBy?: string }) {
    const [discussions, setDiscussions] = useState<Discussion[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setPage(1); // Reset to page 1 when sort changes
    }, [sortBy]);

    useEffect(() => {
        fetchDiscussions();
    }, [sortBy, page]);

    const fetchDiscussions = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/discussions?sortBy=${sortBy}&page=${page}&limit=5`);
            const data = await res.json();

            // Handle both old (array) and new (paginated object) response formats for safety
            if (Array.isArray(data)) {
                setDiscussions(data);
                setTotalPages(1);
            } else {
                setDiscussions(data.discussions);
                setTotalPages(data.totalPages);
            }
        } catch (error) {
            console.error("Error fetching discussions:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading && page === 1) {
        return <div className="text-center py-20 text-gray-500 uppercase tracking-wide text-sm">Loading discussions...</div>;
    }

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                {discussions.map((discussion) => (
                    <Link
                        key={discussion.id}
                        href={`/community/${discussion.id}`}
                        className="group block bg-white border border-gray-200 hover:border-gray-900 transition-all duration-300 overflow-hidden"
                    >
                        <div className="flex flex-col md:flex-row h-full">
                            {/* Cover Image Section */}
                            <div className="md:w-48 h-48 md:h-auto bg-gray-100 flex-shrink-0 relative border-b md:border-b-0 md:border-r border-gray-200">
                                {discussion.mediaUrls && discussion.mediaUrls.length > 0 ? (
                                    discussion.mediaUrls[0].match(/\.(mp4|mov|webm)$/i) ? (
                                        <video src={discussion.mediaUrls[0]} className="w-full h-full object-cover" muted />
                                    ) : (
                                        <img src={discussion.mediaUrls[0]} alt={discussion.title} className="w-full h-full object-cover" />
                                    )
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
                                        <div className="text-center p-4">
                                            <div className="w-12 h-12 border-2 border-gray-200 mx-auto mb-2 flex items-center justify-center">
                                                <span className="text-2xl font-bold text-gray-200">DA</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex-1 p-6 flex flex-col justify-between">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        {discussion.isPinned && (
                                            <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gray-900 bg-gray-100 px-2 py-1">
                                                <Pin className="w-3 h-3" /> Pinned
                                            </span>
                                        )}
                                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500 border border-gray-200 px-2 py-1">
                                            {discussion.category}
                                        </span>
                                        {discussion.tags && discussion.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className="text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-50 px-2 py-1">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-600 transition-colors mb-2">
                                            {discussion.title}
                                        </h3>
                                        <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
                                            {discussion.content}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4 text-xs text-gray-500 uppercase tracking-wide pt-2">
                                        <span className="font-medium text-gray-900">
                                            {discussion.author.name}
                                        </span>
                                        <span>•</span>
                                        <span>{new Date(discussion.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                                    <div className="flex items-center gap-6 text-sm text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <MessageSquare className="w-4 h-4" />
                                            <span>{discussion._count.comments}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Eye className="w-4 h-4" />
                                            <span>{discussion.views}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">♥</span>
                                            <span>{discussion.likes ? discussion.likes.length : 0}</span>
                                        </div>
                                    </div>

                                    {/* Stacked Avatars */}
                                    {discussion.comments && discussion.comments.length > 0 && (
                                        <div className="flex -space-x-2 overflow-hidden">
                                            {discussion.comments.map((comment, idx) => (
                                                <div key={idx} className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-900 border border-gray-200">
                                                    {comment.author.picture ? (
                                                        <img
                                                            src={comment.author.picture}
                                                            alt={comment.author.name}
                                                            className="h-full w-full rounded-full object-cover"
                                                            onError={(e) => {
                                                                e.currentTarget.style.display = 'none';
                                                                e.currentTarget.parentElement!.innerText = comment.author.name.charAt(0).toUpperCase();
                                                            }}
                                                        />
                                                    ) : (
                                                        comment.author.name.charAt(0).toUpperCase()
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 pt-8">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 text-sm font-medium uppercase tracking-wide border border-gray-200 hover:border-gray-900 disabled:opacity-50 disabled:hover:border-gray-200 transition-colors"
                    >
                        Previous
                    </button>
                    <div className="flex items-center gap-2 px-4">
                        <span className="text-sm font-bold text-gray-900">Page {page}</span>
                        <span className="text-sm text-gray-400">of {totalPages}</span>
                    </div>
                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-4 py-2 text-sm font-medium uppercase tracking-wide border border-gray-200 hover:border-gray-900 disabled:opacity-50 disabled:hover:border-gray-200 transition-colors"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
