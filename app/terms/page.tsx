import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlaceholderPage from '@/components/PlaceholderPage';

export default function TermsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-1">
                <PlaceholderPage
                    title="Terms of Service"
                    description="Please read our terms of service carefully before using our platform."
                />
            </main>
            <Footer />
        </div>
    );
}
