import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlaceholderPage from '@/components/PlaceholderPage';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-1">
                <PlaceholderPage
                    title="Privacy Policy"
                    description="Your privacy is important to us. Read our policy to understand how we handle your data."
                />
            </main>
            <Footer />
        </div>
    );
}
