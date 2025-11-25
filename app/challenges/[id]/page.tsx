import { notFound } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockChallenges } from '@/data/challenges';
import {
    Calendar, Users, Eye, MapPin, Clock, Award, Share2, Download
} from 'lucide-react';

export default function ChallengePage({ params }: { params: { id: string } }) {
    const challenge = mockChallenges.find(c => c.id === params.id);

    if (!challenge) {
        notFound();
    }

    const statusColors = {
        active: 'border-gray-900 text-gray-900',
        upcoming: 'border-gray-500 text-gray-500',
        archived: 'border-gray-300 text-gray-400',
    };

    // Mock leaderboard data
    const topParticipants = [
        { rank: 1, name: 'Priya Sharma', score: 98.5, submissions: 12 },
        { rank: 2, name: 'Arjun Patel', score: 96.8, submissions: 9 },
        { rank: 3, name: 'Ananya Reddy', score: 95.2, submissions: 15 },
        { rank: 4, name: 'Rohan Mehta', score: 94.7, submissions: 8 },
        { rank: 5, name: 'Kavya Iyer', score: 93.1, submissions: 11 },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />

            <main className="flex-1">
                {/* Hero Image */}
                <div className="relative h-96 bg-gray-100">
                    <Image
                        src={challenge.imageUrl}
                        alt={challenge.title}
                        fill
                        className="object-cover grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-8">
                        <div className="max-w-4xl">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className={`px-3 py-1 bg-white border text-xs font-medium tracking-wide uppercase ${statusColors[challenge.status]}`}>
                                    {challenge.status}
                                </span>
                                {challenge.category.map((cat) => (
                                    <span
                                        key={cat}
                                        className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium tracking-wide uppercase"
                                    >
                                        {cat}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                {challenge.title}
                            </h1>
                            {challenge.location && (
                                <div className="flex items-center gap-2 text-white/90">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm uppercase tracking-wide">{challenge.location}</span>
                                    <span className="mx-2">•</span>
                                    <span className="text-sm uppercase tracking-wide">{challenge.organizer}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up">
                                <div className="border border-gray-200 p-6 text-center">
                                    <Award className="w-6 h-6 text-gray-900 mx-auto mb-3" />
                                    <p className="text-2xl font-bold text-gray-900">
                                        ₹{(challenge.prizePool / 1000).toFixed(0)}K
                                    </p>
                                    <p className="text-xs text-gray-600 uppercase tracking-wide mt-1">Prize Pool</p>
                                </div>
                                <div className="border border-gray-200 p-6 text-center">
                                    <Users className="w-6 h-6 text-gray-900 mx-auto mb-3" />
                                    <p className="text-2xl font-bold text-gray-900">
                                        {challenge.totalParticipants.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-gray-600 uppercase tracking-wide mt-1">Participants</p>
                                </div>
                                <div className="border border-gray-200 p-6 text-center">
                                    <Eye className="w-6 h-6 text-gray-900 mx-auto mb-3" />
                                    <p className="text-2xl font-bold text-gray-900">
                                        {challenge.totalViews.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-gray-600 uppercase tracking-wide mt-1">Views</p>
                                </div>
                                <div className="border border-gray-200 p-6 text-center">
                                    <Download className="w-6 h-6 text-gray-900 mx-auto mb-3" />
                                    <p className="text-2xl font-bold text-gray-900">
                                        {challenge.totalSubmissions.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-gray-600 uppercase tracking-wide mt-1">Submissions</p>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="border border-gray-200 p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide">
                                    Challenge Brief
                                </h2>
                                <p className="text-gray-700 leading-relaxed mb-6">
                                    {challenge.description}
                                </p>

                                <div className="pt-6 border-t border-gray-200">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {challenge.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 border border-gray-200 text-xs text-gray-600 uppercase tracking-wide"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Leaderboard */}
                            <div className="border border-gray-200 p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 uppercase tracking-wide">
                                    Top Participants
                                </h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wide">Rank</th>
                                                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wide">Designer</th>
                                                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wide">Score</th>
                                                <th className="text-left py-4 px-4 text-xs font-semibold text-gray-700 uppercase tracking-wide">Submissions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {topParticipants.map((participant) => (
                                                <tr key={participant.rank} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                                                    <td className="py-4 px-4">
                                                        <div className={`inline-flex items-center justify-center w-8 h-8 border font-bold text-sm ${participant.rank === 1 ? 'border-gray-900 text-gray-900' : 'border-gray-300 text-gray-600'
                                                            }`}>
                                                            {participant.rank}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-gray-900 flex items-center justify-center text-white font-bold">
                                                                {participant.name.charAt(0)}
                                                            </div>
                                                            <span className="font-medium text-gray-900">{participant.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 font-semibold text-gray-900">
                                                        {participant.score}
                                                    </td>
                                                    <td className="py-4 px-4 text-gray-600">
                                                        {participant.submissions}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Action Card */}
                            <div className="border-2 border-gray-900 p-6 sticky top-24">
                                <div className="space-y-4">
                                    <button className="w-full px-8 py-4 bg-gray-900 text-white font-medium tracking-wide hover:bg-gray-800 transition-all duration-300 uppercase text-sm">
                                        Participate Now
                                    </button>
                                    <button className="w-full px-8 py-4 border-2 border-gray-900 text-gray-900 font-medium tracking-wide hover:bg-gray-900 hover:text-white transition-all duration-300 uppercase text-sm flex items-center justify-center gap-2">
                                        <Download className="w-4 h-4" />
                                        Download Brief
                                    </button>
                                    <button className="w-full px-8 py-4 border-2 border-gray-200 text-gray-700 font-medium tracking-wide hover:border-gray-900 transition-all duration-300 uppercase text-sm flex items-center justify-center gap-2">
                                        <Share2 className="w-4 h-4" />
                                        Share
                                    </button>
                                </div>

                                <div className="mt-8 pt-8 border-t border-gray-200 space-y-6">
                                    <div className="flex items-start gap-3">
                                        <Calendar className="w-5 h-5 text-gray-900 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-1">Start Date</p>
                                            <p className="text-sm text-gray-600">
                                                {new Date(challenge.startDate).toLocaleDateString('en-IN', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Clock className="w-5 h-5 text-gray-900 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-1">End Date</p>
                                            <p className="text-sm text-gray-600">
                                                {new Date(challenge.endDate).toLocaleDateString('en-IN', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Award className="w-5 h-5 text-gray-900 mt-0.5" />
                                        <div>
                                            <p className="text-xs font-semibold text-gray-900 uppercase tracking-wide mb-1">Difficulty</p>
                                            <p className="text-sm text-gray-600">{challenge.difficulty}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
