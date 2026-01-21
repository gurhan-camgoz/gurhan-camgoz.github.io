import { Link } from 'react-router-dom';
import { SeoHead } from '../../components/shared/SeoHead';
import { Section } from '../../components/ui/Section';
import { Layout } from '../../components/anthro/Layout';
import academia from '../../assets/thumbnails/academia.webp';
import cumhuriyet from '../../assets/thumbnails/cumhuriyet.webp';
import evolution from '../../assets/thumbnails/evolution.webp';
import urban from '../../assets/thumbnails/urban.webp';
import waking from '../../assets/thumbnails/waking.jpeg.webp';
import digital from '../../assets/thumbnails/digital.png';

export function AnthroResearch() {
    return (
        <>
            <SeoHead
                title="Tremble Lasts Forever | Master's Thesis (Web Edition) | Gürhan Camgöz"
                description="Cultural Tectonics and Seismopolitics — A selective web edition of a master's thesis in Social and Cultural Anthropology examining earthquakes as epistemic disturbances."
                path="/anthro/research"
            />
            <Layout>
                {/* ═══════════════════════════════════════════════════════════════════ */}
                {/* FEATURED THESIS CARD                                                 */}
                {/* ═══════════════════════════════════════════════════════════════════ */}
                <Section id="thesis">
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold text-stone-100 mb-8 text-center">Master's Thesis</h2>

                        {/* Featured Thesis Card - 2x size of article cards */}
                        <Link
                            to="/anthro/thesis"
                            className="group block border border-stone-300 rounded-lg overflow-hidden hover:shadow-xl hover:shadow-amber-900/20 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mb-12"
                        >
                            <div className="grid md:grid-cols-2">
                                <div className="aspect-video md:aspect-auto overflow-hidden bg-stone-200">
                                    <img
                                        src="/assets/thumbnails/anthro-thesis.jpg"
                                        alt="Tremble Lasts Forever - Master's Thesis"
                                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="p-8 flex flex-col justify-center bg-stone-800/50">
                                    <span className="text-amber-400 font-mono text-xs uppercase tracking-wider mb-2">Web Edition</span>
                                    <h3 className="font-bold text-stone-100 text-2xl md:text-3xl leading-tight mb-4 group-hover:text-amber-200 transition-colors">
                                        Tremble Lasts Forever
                                    </h3>
                                    <p className="text-stone-300 text-lg mb-4">
                                        Cultural Tectonics and Seismopolitics
                                    </p>
                                    <p className="text-stone-400 text-sm leading-relaxed mb-6">
                                        A selective web edition of a master's thesis in Social and Cultural Anthropology examining earthquakes as epistemic disturbances that unsettle the grounds upon which knowledge, politics, and scale are formed.
                                    </p>
                                    <div className="flex flex-wrap gap-2 text-xs font-mono">
                                        <span className="bg-stone-700/50 text-stone-300 px-2 py-1 rounded">seismopolitics</span>
                                        <span className="bg-stone-700/50 text-stone-300 px-2 py-1 rounded">cultural tectonics</span>
                                        <span className="bg-stone-700/50 text-stone-300 px-2 py-1 rounded">non-dwelling</span>
                                    </div>
                                    <div className="mt-6 flex items-center text-amber-300 group-hover:text-amber-200 font-mono text-sm">
                                        <span>Read the web edition</span>
                                        <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </Section>

                {/* ═══════════════════════════════════════════════════════════════════ */}
                {/* SECONDARY: OTHER RESEARCH & WRITING                                  */}
                {/* ═══════════════════════════════════════════════════════════════════ */}
                <Section id="other-research">
                    <div className="max-w-5xl mx-auto">
                        {/* Visual Separator */}
                        <div className="flex items-center mb-12">
                            <div className="flex-1 h-px bg-stone-500"></div>
                            <span className="text-stone-400 font-mono text-sm px-4">Other Research & Writing</span>
                            <div className="flex-1 h-px bg-stone-500"></div>
                        </div>

                        <p className="text-stone-300 font-mono leading-relaxed text-sm mb-10">
                            Selected editorial and academic articles written in international media and academic
                            contexts, focusing on education, science, academia, and social inquiry.
                        </p>

                        {/* Articles Grid */}
                        <div className="grid md:grid-cols-2 gap-10">
                            <ArticleCard
                                title="Turkish government's measures on academia decrease research output"
                                source="140journos"
                                image={academia}
                                link="https://140journos.com/turkish-governments-measures-on-academia-decrease-research-output-3a54671a2434"
                            />

                            <ArticleCard
                                title="Turkey's Cumhuriyet journalists in terrorism trial"
                                source="140journos"
                                image={cumhuriyet}
                                link="https://140journos.com/turkey-starts-trying-cumhuriyet-journalists-61316bfda29d"
                            />

                            <ArticleCard
                                title="The banned theory: Evolution"
                                source="140journos"
                                image={evolution}
                                link="https://140journos.com/the-banned-theory-evolution-e772fa968339"
                            />

                            <ArticleCard
                                title="The cost of urban transformation for Turkey"
                                source="140journos"
                                image={urban}
                                link="https://140journos.com/cost-of-urban-transformation-for-turkey-33b01cd734d0"
                            />

                            <ArticleCard
                                title="Waking Life and Aesthetics of Liminality"
                                source="Diggit Magazine"
                                image={waking}
                                link="https://www.diggitmagazine.com/papers/waking-life-and-aesthetics-liminality"
                            />

                            <ArticleCard
                                title="Ethnographer's Digital Colleague: Prototyping a Reflexive AI Partner for Fieldwork Analysis"
                                source="Drive"
                                image={digital}
                                link="https://drive.google.com/file/d/16uWmqTIRL4ZF7WM5K-rpa1szMEyIkdRP/view?usp=sharing"
                            />
                        </div>
                    </div>
                </Section>
            </Layout>
        </>
    );
}


interface ArticleCardProps {
    title: string;
    source: string;
    image: string;
    link: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, source, image, link }) => {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border border-stone-300 rounded-lg overflow-hidden hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
            <div className="aspect-video overflow-hidden bg-stone-200">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    loading="lazy"
                />
            </div>

            <div className="p-4 space-y-2">
                <h3 className="font-mono font-bold text-blue-200 text-lg leading-snug group-hover:underline">
                    {title}
                </h3>
                <span className="font-mono text-sm text-stone-200">{source}</span>
            </div>
        </a>
    );
};
