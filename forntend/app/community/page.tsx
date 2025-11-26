import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlaceholderPage from '@/components/PlaceholderPage';

export default function CommunityPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-1">
                <PlaceholderPage
                    title="Community"
                    description="Connect with fellow designers, share your work, and grow together. Our community features are coming soon."
                />
            </main>
            <Footer />
        </div>
    );
}
