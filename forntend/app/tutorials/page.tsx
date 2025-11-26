import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlaceholderPage from '@/components/PlaceholderPage';

export default function TutorialsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-1">
                <PlaceholderPage
                    title="Tutorials"
                    description="Learn new skills and techniques with our curated design tutorials."
                />
            </main>
            <Footer />
        </div>
    );
}
