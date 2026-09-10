import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlaceholderPage from '@/components/PlaceholderPage';

export default function ChallengesPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-1">
                <PlaceholderPage
                    title="Design Challenges — Coming Soon"
                    description="Timed briefs, submissions and a leaderboard are on the way. Check back soon, or browse the Archive in the meantime."
                />
            </main>
            <Footer />
        </div>
    );
}
