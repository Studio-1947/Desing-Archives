"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Eye, Pin, Send, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

interface Comment {
    id: string;
    content: string;
    author: {
        id: string;
        name: string;
        picture: string | null;
    };
    createdAt: string;
    replies: Comment[];
}

interface Discussion {
    id: string;
    title: string;
    content: string;
    author: {
        id: string;
        name: string;
        picture: string | null;
    };
    category: string;
    views: number;
    isPinned: boolean;
    isLocked: boolean;
    createdAt: string;
    comments: Comment[];
}

export default function DiscussionDetail({ id }: { id: string }) {
    const [discussion, setDiscussion] = useState<Discussion | null>(null);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState("");
    const { user } = useAuth();

    useEffect(() => {
        fetchDiscussion();
        incrementViews();
    }, [id]);

    const fetchDiscussion = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/discussions/${id}`);
            if (res.ok) {
                const data = await res.json();
                setDiscussion(data);
            }
        } catch (error) {
            console.error("Error fetching discussion:", error);
        } finally {
            setLoading(false);
        }
    };

    const incrementViews = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/discussions/${id}/view`, {
                method: "POST",
            });
        } catch (error) {
            console.error("Error incrementing views:", error);
        }
    };

    const handlePostComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !user) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/discussions/${id}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content: newComment,
                    authorId: user.id,
                }),
            });

            if (res.ok) {
                setNewComment("");
                fetchDiscussion();
            }
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    if (loading) return <div className="text-center py-20 uppercase tracking-wide text-sm">Loading...</div>;
    if (!discussion) return <div className="text-center py-20 uppercase tracking-wide text-sm">Discussion not found</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <Link
                href="/community"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 uppercase tracking-wide font-medium transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Discussions
            </Link>

            <div className="bg-white border border-gray-200 p-8 md:p-12 mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-900 border border-gray-900 px-2 py-1">
                        {discussion.category}
                    </span>
                    {discussion.isPinned && (
                        <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gray-900 bg-gray-100 px-2 py-1">
                            <Pin className="w-3 h-3" /> Pinned
                        </span>
                    )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    {discussion.title}
                </h1>

                <div className="flex items-center gap-6 text-sm text-gray-500 border-b border-gray-100 pb-8 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-gray-900">
                            {discussion.author.picture ? (
                                <img src={discussion.author.picture} alt={discussion.author.name} className="w-full h-full object-cover" />
                            ) : (
                                discussion.author.name.charAt(0)
                            )}
                        </div>
                        <span className="font-bold text-gray-900 uppercase tracking-wide text-xs">
                            {discussion.author.name}
                        </span>
                    </div>
                    <span className="text-gray-300">|</span>
                    <span className="uppercase tracking-wide text-xs">{new Date(discussion.createdAt).toLocaleDateString()}</span>
                    <span className="text-gray-300">|</span>
                    <div className="flex items-center gap-2 uppercase tracking-wide text-xs">
                        <Eye className="w-4 h-4" />
                        <span>{discussion.views} views</span>
                    </div>
                </div>

                <div className="prose prose-gray max-w-none mb-8">
                    <p className="whitespace-pre-wrap text-gray-700 leading-relaxed text-lg">{discussion.content}</p>
                </div>
            </div>

            {/* Comments Section */}
            <div className="border-t-2 border-gray-900 pt-12">
                <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3 uppercase tracking-wide">
                    <MessageSquare className="w-5 h-5" />
                    Comments ({discussion.comments.length})
                </h3>

                {/* Comment Form */}
                {user ? (
                    <form onSubmit={handlePostComment} className="mb-12 bg-gray-50 p-6 border border-gray-200">
                        <div className="flex gap-4">
                            <div className="w-10 h-10 bg-white border border-gray-200 flex-shrink-0 flex items-center justify-center font-bold text-gray-900">
                                {user.picture ? (
                                    <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    user.name.charAt(0)
                                )}
                            </div>
                            <div className="flex-1">
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    placeholder="Write a comment..."
                                    className="w-full p-4 bg-white border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors resize-none min-h-[120px] mb-4"
                                />
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={!newComment.trim()}
                                        className="btn-primary-minimal inline-flex items-center gap-2 disabled:opacity-50"
                                    >
                                        <span>Post Comment</span>
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                ) : (
                    <div className="p-8 bg-gray-50 border border-gray-200 text-center mb-12">
                        <p className="text-gray-600 mb-4">Join the discussion to leave a comment.</p>
                        <Link href="/login" className="btn-secondary-minimal inline-block">
                            Log In
                        </Link>
                    </div>
                )}

                {/* Comments List */}
                <div className="space-y-8">
                    {discussion.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-6 p-6 bg-white border-l-2 border-gray-100 hover:border-gray-900 transition-colors">
                            <div className="w-10 h-10 bg-gray-50 border border-gray-200 flex-shrink-0 flex items-center justify-center font-bold text-gray-900">
                                {comment.author.picture ? (
                                    <img src={comment.author.picture} alt={comment.author.name} className="w-full h-full object-cover" />
                                ) : (
                                    comment.author.name.charAt(0)
                                )}
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-gray-900 uppercase tracking-wide text-xs">
                                            {comment.author.name}
                                        </span>
                                        <span className="text-xs text-gray-400 uppercase tracking-wide">
                                            {new Date(comment.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    {comment.content}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
