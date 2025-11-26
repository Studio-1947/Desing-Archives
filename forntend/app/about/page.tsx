import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlaceholderPage from '@/components/PlaceholderPage';

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-1">
                <PlaceholderPage
                    title="About Us"
                    description="Learn more about Design Archives and our mission to celebrate local wisdom and global impact."
                />
            </main>
            <Footer />
        </div>
    );
}
