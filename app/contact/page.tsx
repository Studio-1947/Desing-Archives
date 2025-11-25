import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlaceholderPage from '@/components/PlaceholderPage';

export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-1">
                <PlaceholderPage
                    title="Contact Us"
                    description="Get in touch with the Design Archives team."
                />
            </main>
            <Footer />
        </div>
    );
}
