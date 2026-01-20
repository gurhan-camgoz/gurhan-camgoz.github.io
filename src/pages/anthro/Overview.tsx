import { Link } from 'react-router-dom';
import { Hero } from '../../components/anthro/Hero';
import { About } from '../../components/anthro/About';
import { SeoHead } from '../../components/shared/SeoHead';
import { BookOpen, Film, Camera, Mail } from 'lucide-react';

export function AnthroOverview() {
    return (
        <>
            <SeoHead
                title="Media & Anthropology | Gurhan Camgoz"
                description="Ethnography, visual culture, education, and audiovisual production. Explore my work in media anthropology."
                path="/anthro"
            />
            <div className="min-h-screen">
                <Hero />
                <About />

                {/* Navigation Cards Section */}
                <section className="py-20 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center mb-12">
                            <span className="text-stone-100 font-mono text-lg mr-4">02.</span>
                            <h2 className="text-3xl font-bold text-stone-100 mr-8">Explore My Work</h2>
                            <div className="flex-1 h-px bg-stone-400"></div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Link
                                to="/anthro/research"
                                className="p-6 bg-gradient-to-br from-amber-800/40 to-stone-700/40 rounded-lg border border-amber-700/30 hover:border-amber-500/50 transition-all group"
                            >
                                <BookOpen className="text-amber-400 mb-4" size={32} />
                                <h3 className="text-lg font-bold text-stone-100 mb-2 group-hover:text-amber-400 transition-colors">
                                    Research & Writing
                                </h3>
                                <p className="text-sm text-stone-300">
                                    Anthropology research, thesis work, and published articles.
                                </p>
                            </Link>

                            <Link
                                to="/anthro/productions"
                                className="p-6 bg-gradient-to-br from-amber-800/40 to-stone-700/40 rounded-lg border border-amber-700/30 hover:border-amber-500/50 transition-all group"
                            >
                                <Film className="text-amber-400 mb-4" size={32} />
                                <h3 className="text-lg font-bold text-stone-100 mb-2 group-hover:text-amber-400 transition-colors">
                                    Productions
                                </h3>
                                <p className="text-sm text-stone-300">
                                    Documentaries, music videos, and audiovisual work.
                                </p>
                            </Link>

                            <Link
                                to="/anthro/photography"
                                className="p-6 bg-gradient-to-br from-amber-800/40 to-stone-700/40 rounded-lg border border-amber-700/30 hover:border-amber-500/50 transition-all group"
                            >
                                <Camera className="text-amber-400 mb-4" size={32} />
                                <h3 className="text-lg font-bold text-stone-100 mb-2 group-hover:text-amber-400 transition-colors">
                                    Photography
                                </h3>
                                <p className="text-sm text-stone-300">
                                    Documentary and artistic photography on Behance.
                                </p>
                            </Link>

                            <a
                                href="mailto:gurhan.camgoz@gmail.com"
                                className="p-6 bg-gradient-to-br from-amber-800/40 to-stone-700/40 rounded-lg border border-amber-700/30 hover:border-amber-500/50 transition-all group"
                            >
                                <Mail className="text-amber-400 mb-4" size={32} />
                                <h3 className="text-lg font-bold text-stone-100 mb-2 group-hover:text-amber-400 transition-colors">
                                    Contact
                                </h3>
                                <p className="text-sm text-stone-300">
                                    Get in touch for collaboration or inquiries.
                                </p>
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
