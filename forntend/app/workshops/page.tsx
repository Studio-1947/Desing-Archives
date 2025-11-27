import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InteractiveGridBackground from '@/components/InteractiveGridBackground';
import { ArrowRight, CheckCircle2, Users, Lightbulb, PenTool, Presentation, Share2, Calendar, Globe, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function WorkshopPage() {
    const curriculum = [
        {
            day: "Day 1",
            title: "Intro of Design",
            description: "Expressing human emotions through basic design elements and understanding the limitations and delimitations of language and representation."
        },
        {
            day: "Day 2",
            title: "Functionality & Limitation of Expression",
            description: "Anatomy of typography and basic understanding of typesetting in crafting layouts. Typography and Minimal design."
        },
        {
            day: "Day 3",
            title: "Emotion & Typography",
            description: "Practicing typography in Illustrator. Understanding how type conveys emotion."
        },
        {
            day: "Day 4",
            title: "Empathy",
            description: "What is empathy, and how does it help in design? Influence of Culture and Nature in Design. Listening & not listening in individual and collective discourse. Inclusive Design. Identifying problems."
        },
        {
            day: "Day 5-7",
            title: "Approaching Challenges",
            description: "Framing problem statements and approaching through design. Mentorship on developing individual projects and guidance for design tools and softwares."
        },
        {
            day: "Day 8",
            title: "Wrap Up",
            description: "Presenting individual projects and reflections. Portfolio making and marketing your design work. + Feedbacks"
        }
    ];

    const targetAudience = [
        {
            icon: <PenTool className="w-6 h-6" />,
            text: "Design enthusiasts and non-designers who may feel the design is beyond their expertise."
        },
        {
            icon: <Presentation className="w-6 h-6" />,
            text: "Consultants seeking to enhance their presentation skills."
        },
        {
            icon: <Users className="w-6 h-6" />,
            text: "Young individuals with aspirations of becoming Visual Designers and UI/UX Designers."
        },
        {
            icon: <Share2 className="w-6 h-6" />,
            text: "Social science researchers interested in effectively conveying complex ideas using graphs and charts."
        },
        {
            icon: <Lightbulb className="w-6 h-6" />,
            text: "Volunteers or interns looking to create engaging social media posts on a daily basis."
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-white overflow-hidden relative">
            {/* Global Gradient Background - Fixed Position */}
            <InteractiveGridBackground
                showGrid={false}
                showGradients={true}
                className="fixed inset-0 overflow-hidden pointer-events-none bg-white z-0"
            />

            <Header />

            <main className="flex-1 relative z-10">
                {/* Hero Section */}
                <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
                    {/* Hero-specific Grid Background */}
                    <InteractiveGridBackground
                        showGrid={true}
                        showGradients={false}
                        className="absolute inset-0 overflow-hidden pointer-events-none z-0"
                    />

                    <div className="container mx-auto px-6 relative z-10 pt-20">
                        <div className="max-w-5xl mx-auto text-center">
                            <div className="inline-block px-4 py-2 border border-gray-900 mb-8 bg-white/30 backdrop-blur-sm rounded-full">
                                <span className="text-xs tracking-extra-wide uppercase text-gray-900 font-medium">
                                    Free Design Workshop
                                </span>
                            </div>

                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-gray-900 mb-8 tracking-tighter leading-none">
                                Design <span className="italic font-serif font-light">Emerge</span>
                            </h1>

                            <p className="text-xl md:text-3xl text-gray-800 mb-12 font-light max-w-3xl mx-auto leading-relaxed">
                                &quot;If I&apos;m capable of designing, so are you 🙌&quot;
                            </p>

                            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                <Link
                                    href="#register"
                                    className="btn-primary-minimal inline-flex items-center gap-2 rounded-full px-10 py-4"
                                >
                                    <span>Join the Cohort</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="#curriculum"
                                    className="btn-secondary-minimal rounded-full px-10 py-4 bg-white/50 hover:bg-white"
                                >
                                    View Curriculum
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid - Styled like the reference image */}
                <section className="py-24 relative z-10">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                            {/* Feature 1 */}
                            <div className="space-y-4 group">
                                <div className="text-7xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-300">
                                    24
                                </div>
                                <p className="text-sm font-medium text-gray-800 leading-relaxed max-w-[150px] mx-auto">
                                    hours Live and interactive Sessions
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="space-y-4 group">
                                <div className="text-7xl font-bold text-gray-900 flex justify-center items-center gap-2 group-hover:scale-110 transition-transform duration-300">
                                    [<span className="text-red-500 text-4xl">●</span>]
                                </div>
                                <p className="text-sm font-medium text-gray-800 leading-relaxed max-w-[150px] mx-auto">
                                    Offline & Cohort based sessions
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="space-y-4 group">
                                <div className="text-7xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-300">
                                    You
                                </div>
                                <p className="text-sm font-medium text-gray-800 leading-relaxed max-w-[150px] mx-auto">
                                    will create your own design project through mentorship
                                </p>
                            </div>

                            {/* Feature 4 */}
                            <div className="space-y-4 group">
                                <div className="text-7xl font-bold text-gray-900 flex justify-center items-center gap-1 group-hover:scale-110 transition-transform duration-300">
                                    <span className="tracking-tighter">))))</span>
                                    <span className="text-red-500 -ml-4">)</span>
                                </div>
                                <p className="text-sm font-medium text-gray-800 leading-relaxed max-w-[150px] mx-auto">
                                    Available in Bengali, English, Hindi & Nepali
                                </p>
                            </div>
                        </div>

                        <div className="text-center mt-16">
                            <Link
                                href="#curriculum"
                                className="inline-block px-12 py-4 border border-gray-900 rounded-full text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition-all duration-300"
                            >
                                Know More
                            </Link>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section className="py-24 relative z-10 bg-white/80 backdrop-blur-md">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                                    Weaving stories.<br />
                                    Approaching Challenges.
                                </h2>
                                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                                    <p>
                                        Embark on an 8-session journey. This design workshop builds a solid foundation,
                                        enabling you to approach diverse challenges with a design-centric mindset.
                                    </p>
                                    <p>
                                        Bring your vision to life by creating a personal design project through the workshop.
                                        We believe that design is not just about aesthetics, but about problem-solving and
                                        storytelling.
                                    </p>
                                </div>
                            </div>

                            <div className="relative h-[600px] border-2 border-gray-900 p-4 bg-white">
                                <div className="relative h-full w-full overflow-hidden bg-gray-900">
                                    <Image
                                        src="/rabida_about.png"
                                        alt="Rabiul Islam (Rabi)"
                                        fill
                                        className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent text-white">
                                        <p className="text-sm uppercase tracking-widest mb-2">Facilitator</p>
                                        <h3 className="text-2xl font-bold mb-2">Rabiul Islam (Rabi)</h3>
                                        <p className="text-sm opacity-90">
                                            Communication & Product Designer with 8+ years of experience.
                                            Mentored 200+ people and worked with 50+ brands.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Who is this for */}
                <section className="py-24 bg-gray-50/80 backdrop-blur-md border-y border-gray-200 relative z-10">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Who is this for?</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Whether you&apos;re a beginner or looking to sharpen your skills, this workshop is designed for diverse backgrounds.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {targetAudience.map((item, index) => (
                                <div key={index} className="minimal-card p-8 hover-lift group bg-white">
                                    <div className="w-12 h-12 border border-gray-900 flex items-center justify-center mb-6 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
                                        {item.icon}
                                    </div>
                                    <p className="text-gray-700 leading-relaxed font-medium">
                                        {item.text}
                                    </p>
                                </div>
                            ))}

                            {/* Bonus Card */}
                            <div className="minimal-card p-8 hover-lift group bg-gray-900 text-white">
                                <div className="w-12 h-12 border border-white flex items-center justify-center mb-6">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <p className="leading-relaxed font-medium">
                                    Anyone willing to learn and explore the world of design through a new lens.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Curriculum */}
                <section id="curriculum" className="py-24 bg-white relative z-10">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row gap-16">
                            <div className="md:w-1/3">
                                <div className="sticky top-32">
                                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                        Workshop<br />Curriculum
                                    </h2>
                                    <p className="text-gray-600 mb-8 leading-relaxed">
                                        A collaborative learning endeavor aimed at grasping the core principles of design,
                                        nurturing a design-centric dialogue through storytelling, and shaping design projects.
                                    </p>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-900">
                                        <Clock className="w-4 h-4" />
                                        <span>24 Hours Live Sessions</span>
                                    </div>
                                </div>
                            </div>

                            <div className="md:w-2/3">
                                <div className="space-y-8">
                                    {curriculum.map((item, index) => (
                                        <div key={index} className="group border-b border-gray-200 pb-8 last:border-0 hover:pl-4 transition-all duration-300">
                                            <div className="flex flex-col sm:flex-row gap-4 sm:items-baseline mb-3">
                                                <span className="text-sm font-bold tracking-widest uppercase text-gray-400 group-hover:text-gray-900 transition-colors">
                                                    {item.day}
                                                </span>
                                                <h3 className="text-2xl font-bold text-gray-900">
                                                    {item.title}
                                                </h3>
                                            </div>
                                            <p className="text-gray-600 pl-0 sm:pl-20 leading-relaxed">
                                                {item.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Fees & CTA */}
                <section id="register" className="py-24 bg-gray-900 text-white relative overflow-hidden z-10">
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-4xl md:text-6xl font-bold mb-8">Fees & Waiver</h2>
                            <div className="text-2xl md:text-3xl font-light mb-12">
                                The workshop is <span className="font-bold border-b-2 border-white">completely free</span>.
                            </div>

                            <div className="bg-white/10 backdrop-blur-md p-8 md:p-12 border border-white/20 rounded-sm mb-12">
                                <p className="text-lg md:text-xl leading-relaxed mb-8">
                                    To join, simply provide a brief 100-150 word note explaining how this workshop can positively impact you.
                                    Feel free to express yourself in your native language.
                                </p>
                                <Link
                                    href="/submit"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-bold tracking-wide uppercase hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 rounded-sm"
                                >
                                    <span>Apply Now</span>
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </div>

                            <p className="text-sm opacity-60 uppercase tracking-widest">
                                Create a cohort of 20 learners and connect with us
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer className="bg-white/80 backdrop-blur-md mt-24 relative z-10" />
        </div>
    );
}
