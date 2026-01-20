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
                title="Research & Writing | Gurhan Camgoz"
                description="Anthropology research, thesis work, and published articles on science, education, and media."
                path="/anthro/research"
            />
            <Layout>
                <Section id="research">
                    <div className="max-w-4xl mx-auto">
                        {/* Section Header */}
                        <div className="flex items-center mb-12">
                            <span className="text-stone-100 font-mono text-lg mr-4">01.</span>
                            <h2 className="text-3xl font-bold text-stone-100 mr-8">Research</h2>
                            <div className="flex-1 h-px bg-stone-400"></div>
                        </div>

                        <div className="space-y-10">
                            {/* Research Focus */}
                            <div className="space-y-4">
                                <h3 className="text-stone-100 font-mono text-xl font-bold">Research Focus</h3>

                                <ul className="list-disc pl-6 space-y-2 text-stone-950 font-medium font-mono leading-relaxed text-lg">
                                    <li>
                                        How <span className="font-bold text-blue-200">meaning, judgment, and uncertainty</span> are shaped through
                                        mediation
                                    </li>
                                    <li>How systems stabilize interpretation by filtering ambiguity</li>
                                    <li>How AI can support interpretation rather than replace it</li>
                                </ul>

                                <p className="text-stone-950 font-medium font-mono leading-relaxed text-lg">
                                    My research bridges anthropology and artificial intelligence to explore how{" "}
                                    <span className="font-bold text-blue-200">reflexivity, feedback, and uncertainty</span> can be preserved in
                                    both human and machine-mediated systems.
                                </p>
                            </div>

                            {/* Anthropology → AI Trajectory */}
                            <div className="space-y-4">
                                <h3 className="text-stone-100 font-mono text-xl font-bold">Anthropology → AI Trajectory</h3>

                                <ul className="list-disc pl-6 space-y-2 text-stone-950 font-medium font-mono leading-relaxed text-lg">
                                    <li>
                                        <span className="font-bold text-blue-200">Anthropology:</span> ethnography, epistemology, mediation, lived
                                        uncertainty
                                    </li>
                                    <li>
                                        <span className="font-bold text-blue-200">Core concern:</span> what is lost when complexity is reduced
                                    </li>
                                    <li>
                                        <span className="font-bold text-blue-200">Transition to AI:</span> translating these questions into
                                        alignment, feedback, and evaluation design
                                    </li>
                                </ul>

                                <p className="text-stone-950 font-medium font-mono leading-relaxed text-lg">
                                    My anthropology research examined how dominant knowledge frameworks produce coherence by excluding rupture,
                                    noise, and distortion. These concerns directly informed how I approach alignment and evaluation in LLM-based
                                    systems.
                                </p>
                            </div>

                            {/* AI Thesis Cross-Link */}
                            <div className="p-6 bg-gradient-to-br from-amber-800/30 to-stone-700/30 rounded-lg border border-amber-700/30">
                                <h3 className="text-stone-100 font-mono text-xl font-bold mb-4">
                                    AI Master's Thesis — <span className="text-blue-200">Beyond the Academic Mirror</span>
                                </h3>
                                <p className="text-stone-950 font-medium font-mono leading-relaxed text-lg mb-4">
                                    For detailed technical documentation of my AI thesis work, including the Vector-HCAS framework,
                                    agentic architecture, and evaluation methodology, see the AI Lab section.
                                </p>
                                <div className="flex gap-4">
                                    <Link
                                        to="/ai/architecture"
                                        className="inline-block px-4 py-2 bg-amber-700/50 hover:bg-amber-600/50 text-stone-100 font-mono text-sm rounded transition-colors"
                                    >
                                        View Architecture →
                                    </Link>
                                    <Link
                                        to="/ai/evaluation"
                                        className="inline-block px-4 py-2 bg-stone-700/50 hover:bg-stone-600/50 text-stone-100 font-mono text-sm rounded transition-colors"
                                    >
                                        View Evaluation →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Articles Section */}
                <Section id="articles">
                    <div className="max-w-5xl mx-auto">
                        {/* Section Header */}
                        <div className="flex items-center mb-12">
                            <span className="text-stone-100 font-mono text-lg mr-4">02.</span>
                            <h2 className="text-3xl font-bold text-stone-100 mr-8">Articles</h2>
                            <div className="flex-1 h-px bg-stone-400"></div>
                        </div>

                        <p className="text-stone-950 font-medium font-mono leading-relaxed text-lg mb-10">
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
            className="group block border border-stone-300 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
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
