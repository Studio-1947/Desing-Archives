import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlaceholderPage from '@/components/PlaceholderPage';

export default function FAQPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-1">
                <PlaceholderPage
                    title="Frequently Asked Questions"
                    description="Find answers to common questions about challenges, submissions, and more."
                />
            </main>
            <Footer />
        </div>
    );
}
