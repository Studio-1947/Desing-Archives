import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlaceholderPage from '@/components/PlaceholderPage';

export default function SubmitPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-1">
                <PlaceholderPage
                    title="Submit Your Work"
                    description="Ready to showcase your talent? The submission portal is being prepared for the next challenge cycle."
                />
            </main>
            <Footer />
        </div>
    );
}
