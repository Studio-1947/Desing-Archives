"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import FileUpload from "@/components/ui/FileUpload";

const DEFAULT_IMAGES: Record<string, string> = {
    "general": "https://images.unsplash.com/photo-1499750310159-5b9887039e54?q=80&w=2070&auto=format&fit=crop",
    "design help": "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
    "showcase": "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop",
    "resources": "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=2070&auto=format&fit=crop",
    "jobs": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop"
};

export default function NewDiscussionPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("general");
    const [tags, setTags] = useState("");
    const [mediaUrls, setMediaUrls] = useState<string[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    const { user } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setSubmitting(true);
        try {
            const finalMediaUrls = mediaUrls.length > 0 ? mediaUrls : [DEFAULT_IMAGES[category] || DEFAULT_IMAGES["general"]];

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/discussions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    content,
                    category,
                    authorId: user.id,
                    mediaUrls: finalMediaUrls,
                    tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
                }),
            });

            if (res.ok) {
                const data = await res.json();
                router.push(`/community/${data.id}`);
            }
        } catch (error) {
            console.error("Error creating discussion:", error);
        } finally {
            setSubmitting(false);
        }
    };

    if (!user) {
        return (
            <div className="container mx-auto px-6 py-24 text-center">
                <h1 className="text-3xl font-bold mb-6">Please Log In</h1>
                <p className="mb-8 text-gray-600">You need to be logged in to start a discussion.</p>
                <Link href="/login" className="btn-primary-minimal inline-block">
                    Log In
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-12 max-w-3xl">
            <Link
                href="/community"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 uppercase tracking-wide font-medium transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Community
            </Link>

            <div className="bg-white border-2 border-gray-900 p-8 md:p-12">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                    Start a New Discussion
                </h1>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="What's on your mind?"
                            className="w-full p-4 bg-white border-2 border-gray-200 focus:border-gray-900 focus:outline-none transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                            Category
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-4 bg-white border-2 border-gray-200 focus:border-gray-900 focus:outline-none transition-colors appearance-none"
                        >
                            <option value="general">General</option>
                            <option value="design help">Design Help</option>
                            <option value="showcase">Showcase</option>
                            <option value="resources">Resources</option>
                            <option value="jobs">Jobs</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                            Tags (Comma separated)
                        </label>
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="design, help, poster, typography"
                            className="w-full p-4 bg-white border-2 border-gray-200 focus:border-gray-900 focus:outline-none transition-colors"
                        />
                    </div>

                    <div>
                        <FileUpload
                            label="Attachments (Images & Videos)"
                            multiple
                            onUpload={setMediaUrls}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
                            Content
                        </label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            rows={12}
                            placeholder="Share your thoughts..."
                            className="w-full p-4 bg-white border-2 border-gray-200 focus:border-gray-900 focus:outline-none transition-colors resize-none"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
                        <Link
                            href="/community"
                            className="btn-secondary-minimal inline-block"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="btn-primary-minimal inline-block disabled:opacity-50"
                        >
                            {submitting ? "Publishing..." : "Publish Discussion"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
