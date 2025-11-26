import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlaceholderPage from '@/components/PlaceholderPage';

export default function GuidelinesPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-1">
                <PlaceholderPage
                    title="Design Guidelines"
                    description="Read our comprehensive design guidelines to ensure your submissions meet our standards."
                />
            </main>
            <Footer />
        </div>
    );
}
