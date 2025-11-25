import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlaceholderPage from '@/components/PlaceholderPage';

export default function ArchivesPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-1">
                <PlaceholderPage
                    title="Design Archives"
                    description="Explore our vast collection of past design challenges and winning entries. We are currently curating the best works for you."
                />
            </main>
            <Footer />
        </div>
    );
}
