import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlaceholderPage from '@/components/PlaceholderPage';

export default function CareersPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-1">
                <PlaceholderPage
                    title="Careers"
                    description="Join our team and help shape the future of design."
                />
            </main>
            <Footer />
        </div>
    );
}
