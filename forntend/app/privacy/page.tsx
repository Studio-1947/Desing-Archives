import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | Local Design',
    description: 'Privacy Policy for Local Design - Understand how we collect, use, and protect your data.',
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-1 py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Privacy Policy</h1>
                    <p className="text-gray-500 mb-12 text-lg">Last updated: {new Date().toLocaleDateString()}</p>

                    <div className="prose prose-lg prose-gray max-w-none">
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Welcome to Studio 1947 ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy.
                                If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                When you visit our website and use our services, you trust us with your personal information. We take your privacy very seriously.
                                In this privacy policy, we seek to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our products and services,
                                when participating in activities on the website, or otherwise contacting us.
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-4">
                                <li><strong>Personal Data:</strong> Name, email address, and other contact details.</li>
                                <li><strong>Credentials:</strong> Passwords, password hints, and similar security information used for authentication and account access.</li>
                                <li><strong>Social Media Login Data:</strong> We provide you with the option to register using social media account details, like your Google, Facebook, or other social media account.</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We use personal information collected via our website for a variety of business purposes described below.
                                We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you,
                                with your consent, and/or for compliance with our legal obligations.
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-700">
                                <li>To facilitate account creation and logon process.</li>
                                <li>To send you marketing and promotional communications.</li>
                                <li>To send administrative information to you.</li>
                                <li>To protect our services.</li>
                            </ul>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Sharing Your Information</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process.
                                However, please also remember that we cannot guarantee that the internet itself is 100% secure.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Contact Us</h2>
                            <p className="text-gray-700 leading-relaxed">
                                If you have questions or comments about this policy, you may email us at support@studio1947.com.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
