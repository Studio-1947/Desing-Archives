import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlaceholderPage from '@/components/PlaceholderPage';

export default function BlogPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-1">
                <PlaceholderPage
                    title="Blog"
                    description="Insights, interviews, and news from the world of design."
                />
            </main>
            <Footer />
        </div>
    );
}
