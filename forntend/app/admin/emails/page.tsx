"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/ToastContext";

interface User {
    id: string;
    name: string;
    email: string;
    picture: string | null;
}

export default function EmailManagerPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [activeTab, setActiveTab] = useState<"reminder" | "promotion">("reminder");

    // Form State
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [content, setContent] = useState("");

    const router = useRouter();
    const { showToast } = useToast();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/users");
            if (!res.ok) throw new Error("Failed to fetch users");
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
            showToast("Failed to load users", "error");
        } finally {
            setLoading(false);
        }
    };

    const toggleUser = (email: string) => {
        const newSelected = new Set(selectedUsers);
        if (newSelected.has(email)) {
            newSelected.delete(email);
        } else {
            newSelected.add(email);
        }
        setSelectedUsers(newSelected);
    };

    const toggleAll = () => {
        if (selectedUsers.size === users.length) {
            setSelectedUsers(new Set());
        } else {
            setSelectedUsers(new Set(users.map((u) => u.email)));
        }
    };

    const handleSend = async () => {
        if (selectedUsers.size === 0) {
            showToast("Please select at least one user", "error");
            return;
        }
        if (!title) {
            showToast("Title is required", "error");
            return;
        }
        if (activeTab === "reminder" && !date) {
            showToast("Date is required for reminders", "error");
            return;
        }
        if (activeTab === "promotion" && !content) {
            showToast("Content is required for promotions", "error");
            return;
        }

        setSending(true);
        const endpoint = activeTab === "reminder" ? "/api/mail/reminder" : "/api/mail/promotion";
        const payloadBase = { title };
        // For reminders, we send date AND content (optional). For promotions, we send content.
        const payloadExtra = activeTab === "reminder" ? { date, content } : { content };

        let successCount = 0;
        let failCount = 0;

        for (const email of Array.from(selectedUsers)) {
            try {
                const res = await fetch(`http://localhost:5000${endpoint}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, ...payloadBase, ...payloadExtra }),
                });
                if (res.ok) successCount++;
                else failCount++;
            } catch (error) {
                failCount++;
                console.error(`Failed to send to ${email}`, error);
            }
        }

        setSending(false);
        if (successCount > 0) {
            showToast(`Successfully sent to ${successCount} users`, "success");
            // Reset form
            setTitle("");
            setDate("");
            setContent("");
            setSelectedUsers(new Set());
        }
        if (failCount > 0) {
            showToast(`Failed to send to ${failCount} users`, "error");
        }
    };

    if (loading) return <div className="p-8">Loading users...</div>;

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Email Manager</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* User List */}
                <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden h-[600px] flex flex-col">
                    <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                        <h2 className="font-semibold text-gray-700">Users ({users.length})</h2>
                        <button
                            onClick={toggleAll}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                            {selectedUsers.size === users.length ? "Deselect All" : "Select All"}
                        </button>
                    </div>
                    <div className="overflow-y-auto flex-1 p-2">
                        {users.map((user) => (
                            <div
                                key={user.id}
                                className={`flex items-center p-3 rounded-md mb-1 cursor-pointer transition-colors ${selectedUsers.has(user.email) ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                                    }`}
                                onClick={() => toggleUser(user.email)}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.has(user.email)}
                                    onChange={() => { }}
                                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                />
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 text-center">
                        {selectedUsers.size} users selected
                    </div>
                </div>

                {/* Email Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                        {/* Tabs */}
                        <div className="flex space-x-4 mb-6 border-b border-gray-200">
                            <button
                                className={`pb-2 px-1 text-sm font-medium transition-colors ${activeTab === "reminder"
                                        ? "border-b-2 border-black text-black"
                                        : "text-gray-500 hover:text-gray-700"
                                    }`}
                                onClick={() => setActiveTab("reminder")}
                            >
                                Send Reminder
                            </button>
                            <button
                                className={`pb-2 px-1 text-sm font-medium transition-colors ${activeTab === "promotion"
                                        ? "border-b-2 border-black text-black"
                                        : "text-gray-500 hover:text-gray-700"
                                    }`}
                                onClick={() => setActiveTab("promotion")}
                            >
                                Send Promotion
                            </button>
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Title / Subject
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                    placeholder={
                                        activeTab === "reminder" ? "e.g., Challenge Submission Deadline" : "e.g., New Summer Collection"
                                    }
                                />
                            </div>

                            {activeTab === "reminder" ? (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Event Date
                                        </label>
                                        <input
                                            type="text"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                            placeholder="e.g., December 25, 2025"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            This will be highlighted in the email body.
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Additional Content (Optional)
                                        </label>
                                        <textarea
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            rows={4}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                            placeholder="Add any extra details or instructions here..."
                                        />
                                    </div>
                                </>
                            ) : (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Promotional Content
                                    </label>
                                    <textarea
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        rows={6}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                        placeholder="Enter the main content of your promotional email..."
                                    />
                                </div>
                            )}

                            <div className="pt-4">
                                <button
                                    onClick={handleSend}
                                    disabled={sending || selectedUsers.size === 0}
                                    className={`w-full py-3 px-4 rounded-md text-white font-medium transition-all ${sending || selectedUsers.size === 0
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-black hover:bg-gray-800 shadow-md hover:shadow-lg"
                                        }`}
                                >
                                    {sending
                                        ? "Sending..."
                                        : `Send ${activeTab === "reminder" ? "Reminder" : "Promotion"} to ${selectedUsers.size
                                        } Users`}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
