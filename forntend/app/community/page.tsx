"use client";

import { useState, useEffect } from "react";
import DiscussionList from "@/components/community/DiscussionList";
import Link from "next/link";
import { Plus, MessageSquare, Users, Search } from "lucide-react";

export default function CommunityPage() {
    const [stats, setStats] = useState<{
        totalMembers: number;
        totalDiscussions: number;
        categoryCounts: { name: string; count: number }[];
    } | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/discussions/stats`);
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="bg-gray-50 border-b border-gray-200">
                <div className="container mx-auto px-6 py-16 md:py-24">
                    <div className="max-w-4xl">
                        <div className="inline-block px-3 py-1 border border-gray-900 mb-6">
                            <span className="text-xs tracking-widest uppercase text-gray-900 font-medium">
                                Community Forum
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            Design Discussions
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl leading-relaxed mb-8">
                            A space for designers to share knowledge, ask questions, and connect with the community.
                            Join the conversation and help build our local design archive.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/community/new"
                                className="btn-primary-minimal inline-flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Start Discussion</span>
                            </Link>
                            <div className="relative flex-1 max-w-md">
                                <input
                                    type="text"
                                    placeholder="Search discussions..."
                                    className="w-full h-full px-4 py-3 bg-white border border-gray-200 focus:border-gray-900 focus:outline-none transition-colors"
                                />
                                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-4">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">Latest Discussions</h2>
                            <div className="flex gap-2">
                                <button className="text-sm font-medium text-gray-900 underline">Newest</button>
                                <span className="text-gray-300">|</span>
                                <button className="text-sm font-medium text-gray-500 hover:text-gray-900">Popular</button>
                            </div>
                        </div>
                        <DiscussionList />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Categories */}
                        <div className="bg-gray-50 p-6 border border-gray-200">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">
                                Categories
                            </h3>
                            <ul className="space-y-3">
                                {stats?.categoryCounts.map((category) => (
                                    <li key={category.name}>
                                        <Link
                                            href={`/community?category=${category.name}`}
                                            className="flex items-center justify-between group"
                                        >
                                            <span className="text-gray-600 group-hover:text-gray-900 transition-colors capitalize">
                                                {category.name}
                                            </span>
                                            <span className="text-xs text-gray-400 bg-white px-2 py-1 border border-gray-200 group-hover:border-gray-900 transition-colors">
                                                {category.count}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                                {!stats && (
                                    <li className="text-sm text-gray-400">Loading categories...</li>
                                )}
                            </ul>
                        </div>

                        {/* Community Stats */}
                        <div className="border border-gray-200 p-6">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">
                                Stats
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {stats?.totalMembers ?? "-"}
                                        </p>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Members</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MessageSquare className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {stats?.totalDiscussions ?? "-"}
                                        </p>
                                        <p className="text-xs text-gray-500 uppercase tracking-wide">Topics</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
