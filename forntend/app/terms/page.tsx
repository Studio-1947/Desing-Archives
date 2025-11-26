import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | Local Design',
    description: 'Terms of Service for Local Design - Read our terms and conditions for using the platform.',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-1 py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Terms of Service</h1>
                    <p className="text-gray-500 mb-12 text-lg">Last updated: {new Date().toLocaleDateString()}</p>

                    <div className="prose prose-lg prose-gray max-w-none">
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Studio 1947 ("we," "us" or "our"), concerning your access to and use of the website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these Terms of Service, then you are expressly prohibited from using the Site and you must discontinue use immediately.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Intellectual Property Rights</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Representations</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                By using the Site, you represent and warrant that:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li>All registration information you submit will be true, accurate, current, and complete.</li>
                                <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
                                <li>You have the legal capacity and you agree to comply with these Terms of Service.</li>
                                <li>You are not a minor in the jurisdiction in which you reside.</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Prohibited Activities</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Modifications and Interruptions</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Site. We also reserve the right to modify or discontinue all or part of the Site without notice at any time.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Governing Law</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                These Terms shall be governed by and defined following the laws of India. Studio 1947 and yourself irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Us</h2>
                            <p className="text-gray-700 leading-relaxed">
                                In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at support@studio1947.com.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
