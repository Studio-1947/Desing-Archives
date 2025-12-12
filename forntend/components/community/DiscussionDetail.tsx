"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Eye, Pin, Send, ArrowLeft, Pencil, Trash2, X, Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FileUpload from "@/components/ui/FileUpload";

interface Comment {
    id: string;
    content: string;
    author: {
        id: string;
        name: string;
        picture: string | null;
    };
    createdAt: string;
    mediaUrls: string[];
    likes: string[];
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
    mediaUrls: string[];
    tags: string[];
    likes: string[];
    createdAt: string;
    comments: Comment[];
}

export default function DiscussionDetail({ id }: { id: string }) {
    const [discussion, setDiscussion] = useState<Discussion | null>(null);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState("");
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [replyContent, setReplyContent] = useState("");

    // Edit Discussion State
    const [isEditingDiscussion, setIsEditingDiscussion] = useState(false);
    const [editDiscussionContent, setEditDiscussionContent] = useState("");
    const [editTitle, setEditTitle] = useState("");
    const [editCategory, setEditCategory] = useState("");
    const [editMediaUrls, setEditMediaUrls] = useState<string[]>([]);

    // Edit Comment State
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const [editCommentContent, setEditCommentContent] = useState("");

    const { user } = useAuth();
    const router = useRouter();

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
                setEditDiscussionContent(data.content);
                setEditTitle(data.title);
                setEditCategory(data.category);
                setEditMediaUrls(data.mediaUrls || []);
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

    const handlePostComment = async (e: React.FormEvent, parentId?: string) => {
        e.preventDefault();
        const content = parentId ? replyContent : newComment;
        if (!content.trim() || !user) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/discussions/${id}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    content,
                    authorId: user.id,
                    parentId,
                }),
            });

            if (res.ok) {
                if (parentId) {
                    setReplyContent("");
                    setReplyingTo(null);
                } else {
                    setNewComment("");
                }
                fetchDiscussion();
            }
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    const handleUpdateDiscussion = async () => {
        if (!discussion || !user) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/discussions/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: editTitle,
                    content: editDiscussionContent,
                    category: editCategory,
                    mediaUrls: editMediaUrls
                }),
            });
            if (res.ok) {
                setDiscussion({
                    ...discussion,
                    title: editTitle,
                    content: editDiscussionContent,
                    category: editCategory,
                    mediaUrls: editMediaUrls
                });
                setIsEditingDiscussion(false);
            }
        } catch (error) {
            console.error("Error updating discussion:", error);
        }
    };

    const handleDeleteDiscussion = async () => {
        if (!confirm("Are you sure you want to delete this discussion?")) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/discussions/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                router.push("/community");
            }
        } catch (error) {
            console.error("Error deleting discussion:", error);
        }
    };

    const handleUpdateComment = async (commentId: string) => {
        if (!user) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/discussions/comments/${commentId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: editCommentContent }),
            });
            if (res.ok) {
                setEditingCommentId(null);
                fetchDiscussion();
            }
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        if (!confirm("Are you sure you want to delete this comment?")) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/discussions/comments/${commentId}`, {
                method: "DELETE",
            });
            if (res.ok) {
                fetchDiscussion();
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const handleLikeDiscussion = async () => {
        if (!user || !discussion) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/discussions/${id}/like`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user.id }),
            });
            if (res.ok) {
                fetchDiscussion(); // Refresh to get updated likes
            }
        } catch (error) {
            console.error("Error liking discussion:", error);
        }
    };

    const handleLikeComment = async (commentId: string) => {
        if (!user) return;
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/discussions/comments/${commentId}/like`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user.id }),
            });
            if (res.ok) {
                fetchDiscussion();
            }
        } catch (error) {
            console.error("Error liking comment:", error);
        }
    };

    if (loading) return <div className="text-center py-20 uppercase tracking-wide text-sm">Loading...</div>;
    if (!discussion) return <div className="text-center py-20 uppercase tracking-wide text-sm">Discussion not found</div>;

    const isAuthor = user?.id === discussion.author.id;

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
                <div className="flex flex-wrap items-center justify-between mb-6">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-900 border border-gray-900 px-2 py-1">
                            {discussion.category}
                        </span>
                        {discussion.isPinned && (
                            <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-gray-900 bg-gray-100 px-2 py-1">
                                <Pin className="w-3 h-3" /> Pinned
                            </span>
                        )}
                        {discussion.tags && discussion.tags.map(tag => (
                            <span key={tag} className="text-xs font-bold uppercase tracking-wider text-gray-500 bg-gray-50 px-2 py-1">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {isAuthor && !isEditingDiscussion && (
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsEditingDiscussion(true)}
                                className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
                                title="Edit Discussion"
                            >
                                <Pencil className="w-4 h-4" />
                            </button>
                            <button
                                onClick={handleDeleteDiscussion}
                                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                title="Delete Discussion"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    {discussion.title}
                </h1>

                <div className="flex items-center gap-6 text-sm text-gray-500 border-b border-gray-100 pb-8 mb-8">
                    <div className="flex items-center gap-3">
                        <UserAvatar user={discussion.author} />
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
                    {isEditingDiscussion ? (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Title</label>
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-gray-900 focus:outline-none font-bold text-xl"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Category</label>
                                <select
                                    value={editCategory}
                                    onChange={(e) => setEditCategory(e.target.value)}
                                    className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-gray-900 focus:outline-none appearance-none"
                                >
                                    <option value="general">General</option>
                                    <option value="design help">Design Help</option>
                                    <option value="showcase">Showcase</option>
                                    <option value="resources">Resources</option>
                                    <option value="jobs">Jobs</option>
                                </select>
                            </div>

                            <div>
                                <FileUpload
                                    label="Cover Image & Attachments"
                                    multiple
                                    onUpload={setEditMediaUrls}
                                    defaultUrls={editMediaUrls}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">Content</label>
                                <textarea
                                    value={editDiscussionContent}
                                    onChange={(e) => setEditDiscussionContent(e.target.value)}
                                    className="w-full p-4 bg-gray-50 border border-gray-200 focus:border-gray-900 focus:outline-none min-h-[200px]"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => setIsEditingDiscussion(false)}
                                    className="btn-secondary-minimal inline-flex items-center gap-2"
                                >
                                    <X className="w-4 h-4" /> Cancel
                                </button>
                                <button
                                    onClick={handleUpdateDiscussion}
                                    className="btn-primary-minimal inline-flex items-center gap-2"
                                >
                                    <Check className="w-4 h-4" /> Save Changes
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p className="whitespace-pre-wrap text-gray-700 leading-relaxed text-lg">{discussion.content}</p>
                    )}

                    {/* Discussion Media */}
                    {!isEditingDiscussion && discussion.mediaUrls && discussion.mediaUrls.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                            {discussion.mediaUrls.map((url, idx) => (
                                <div key={idx} className="relative aspect-video bg-gray-100 border border-gray-200">
                                    {url.match(/\.(mp4|mov|webm)$/i) ? (
                                        <video src={url} controls className="w-full h-full object-cover" />
                                    ) : (
                                        <img src={url} alt={`Attachment ${idx + 1}`} className="w-full h-full object-cover" />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4 pt-8 border-t border-gray-100">
                    <button
                        onClick={handleLikeDiscussion}
                        className={`btn-secondary-minimal inline-flex items-center gap-2 ${user && discussion.likes.includes(user.id) ? "bg-gray-100" : ""}`}
                    >
                        <span className={user && discussion.likes.includes(user.id) ? "text-red-600" : ""}>♥</span>
                        <span>{discussion.likes.length} Likes</span>
                    </button>
                </div>
            </div>

            {/* Comments Section */}
            <div className="border-t-2 border-gray-900 pt-12">
                <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3 uppercase tracking-wide">
                    <MessageSquare className="w-5 h-5" />
                    Comments ({discussion.comments.length})
                </h3>

                {/* Main Comment Form */}
                {user ? (
                    <form onSubmit={(e) => handlePostComment(e)} className="mb-12 bg-gray-50 p-6 border border-gray-200">
                        <div className="flex gap-4">
                            <UserAvatar user={user} className="w-10 h-10" />
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
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            replyingTo={replyingTo}
                            setReplyingTo={setReplyingTo}
                            replyContent={replyContent}
                            setReplyContent={setReplyContent}
                            handlePostComment={handlePostComment}
                            handleLikeComment={handleLikeComment}
                            user={user}
                            editingCommentId={editingCommentId}
                            setEditingCommentId={setEditingCommentId}
                            editCommentContent={editCommentContent}
                            setEditCommentContent={setEditCommentContent}
                            handleUpdateComment={handleUpdateComment}
                            handleDeleteComment={handleDeleteComment}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

const UserAvatar = ({ user, className = "w-8 h-8" }: { user: { name: string; picture: string | null } | null; className?: string }) => {
    const [error, setError] = useState(false);

    if (!user) return null;

    return (
        <div className={`${className} bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-gray-900 flex-shrink-0`}>
            {user.picture && !error ? (
                <img
                    src={user.picture}
                    alt={user.name}
                    className="w-full h-full object-cover"
                    onError={() => setError(true)}
                />
            ) : (
                user.name.charAt(0).toUpperCase()
            )}
        </div>
    );
};

const CommentItem = ({
    comment,
    depth = 0,
    replyingTo,
    setReplyingTo,
    replyContent,
    setReplyContent,
    handlePostComment,
    handleLikeComment,
    user,
    editingCommentId,
    setEditingCommentId,
    editCommentContent,
    setEditCommentContent,
    handleUpdateComment,
    handleDeleteComment
}: {
    comment: Comment;
    depth?: number;
    replyingTo: string | null;
    setReplyingTo: (id: string | null) => void;
    replyContent: string;
    setReplyContent: (content: string) => void;
    handlePostComment: (e: React.FormEvent, parentId?: string) => void;
    handleLikeComment: (id: string) => void;
    user: any;
    editingCommentId?: string | null;
    setEditingCommentId?: (id: string | null) => void;
    editCommentContent?: string;
    setEditCommentContent?: (content: string) => void;
    handleUpdateComment?: (id: string) => void;
    handleDeleteComment?: (id: string) => void;
}) => {
    const isReplying = replyingTo === comment.id;
    const hasLiked = user ? comment.likes.includes(user.id) : false;
    const isAuthor = user?.id === comment.author.id;
    const isEditing = editingCommentId === comment.id;

    const startEditing = () => {
        if (setEditingCommentId && setEditCommentContent) {
            setEditingCommentId(comment.id);
            setEditCommentContent(comment.content);
        }
    };

    return (
        <div className={`flex gap-4 p-6 bg-white border-l-2 ${depth > 0 ? "border-gray-200 ml-8" : "border-gray-100"} hover:border-gray-900 transition-colors group`}>
            <UserAvatar user={comment.author} className="w-10 h-10" />
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
                    {isAuthor && !isEditing && (
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={startEditing}
                                className="p-1 text-gray-400 hover:text-gray-900"
                                title="Edit"
                            >
                                <Pencil className="w-3 h-3" />
                            </button>
                            <button
                                onClick={() => handleDeleteComment && handleDeleteComment(comment.id)}
                                className="p-1 text-gray-400 hover:text-red-600"
                                title="Delete"
                            >
                                <Trash2 className="w-3 h-3" />
                            </button>
                        </div>
                    )}
                </div>

                {isEditing ? (
                    <div className="space-y-2">
                        <textarea
                            value={editCommentContent}
                            onChange={(e) => setEditCommentContent && setEditCommentContent(e.target.value)}
                            className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-gray-900 focus:outline-none text-sm"
                            rows={3}
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setEditingCommentId && setEditingCommentId(null)}
                                className="text-xs font-bold uppercase tracking-wide text-gray-500 hover:text-gray-900 px-3 py-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleUpdateComment && handleUpdateComment(comment.id)}
                                className="btn-primary-minimal text-xs px-4 py-2"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-700 leading-relaxed">
                        {comment.content}
                    </p>
                )}

                {/* Media in comments (future proofing) */}
                {comment.mediaUrls && comment.mediaUrls.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        {comment.mediaUrls.map((url, idx) => (
                            <div key={idx} className="relative aspect-video bg-gray-100">
                                {url.match(/\.(mp4|mov|webm)$/i) ? (
                                    <video src={url} controls className="w-full h-full object-cover" />
                                ) : (
                                    <img src={url} alt="Attachment" className="w-full h-full object-cover" />
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {!isEditing && (
                    <div className="flex items-center gap-4 mt-2">
                        <button
                            onClick={() => handleLikeComment(comment.id)}
                            className={`text-xs font-bold uppercase tracking-wide flex items-center gap-1 ${hasLiked ? "text-red-600" : "text-gray-400 hover:text-gray-900"}`}
                        >
                            <span className={hasLiked ? "fill-current" : ""}>♥</span> {comment.likes.length} Likes
                        </button>
                        <button
                            onClick={() => setReplyingTo(isReplying ? null : comment.id)}
                            className="text-xs font-bold uppercase tracking-wide text-gray-400 hover:text-gray-900"
                        >
                            Reply
                        </button>
                    </div>
                )}

                {isReplying && (
                    <div className="mt-4 pl-4 border-l-2 border-gray-900">
                        <textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            placeholder="Write a reply..."
                            className="w-full p-3 bg-gray-50 border border-gray-200 focus:border-gray-900 focus:outline-none text-sm mb-2"
                            rows={3}
                            autoFocus
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setReplyingTo(null)}
                                className="text-xs font-bold uppercase tracking-wide text-gray-500 hover:text-gray-900 px-3 py-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={(e) => handlePostComment(e, comment.id)}
                                disabled={!replyContent.trim()}
                                className="btn-primary-minimal text-xs px-4 py-2"
                            >
                                Reply
                            </button>
                        </div>
                    </div>
                )}

                {/* Recursive Replies */}
                {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 space-y-4">
                        {comment.replies.map(reply => (
                            <CommentItem
                                key={reply.id}
                                comment={reply}
                                depth={depth + 1}
                                replyingTo={replyingTo}
                                setReplyingTo={setReplyingTo}
                                replyContent={replyContent}
                                setReplyContent={setReplyContent}
                                handlePostComment={handlePostComment}
                                handleLikeComment={handleLikeComment}
                                user={user}
                                editingCommentId={editingCommentId}
                                setEditingCommentId={setEditingCommentId}
                                editCommentContent={editCommentContent}
                                setEditCommentContent={setEditCommentContent}
                                handleUpdateComment={handleUpdateComment}
                                handleDeleteComment={handleDeleteComment}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
