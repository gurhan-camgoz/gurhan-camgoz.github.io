import { SeoHead } from '../../components/shared/SeoHead';
import { Section } from '../../components/ui/Section';
import { Layout } from '../../components/anthro/Layout';
import food from '../../assets/thumbnails/food.png';
import alternatif from '../../assets/thumbnails/alternatif.png';
import yetti from '../../assets/thumbnails/yetti.jpg';
import bizde from '../../assets/thumbnails/bizde.jpg';
import ornitopoloji from '../../assets/thumbnails/ornitopoloji.jpg';
import aseksuel from '../../assets/thumbnails/aseksuel.png';

export function AnthroProductions() {
    return (
        <>
            <SeoHead
                title="Productions | Gurhan Camgoz"
                description="Documentaries, music videos, and audiovisual production work."
                path="/anthro/productions"
            />
            <Layout>
                <Section id="productions">
                    <div className="max-w-5xl mx-auto">
                        {/* Section Header */}
                        <div className="flex items-center mb-12">
                            <span className="text-stone-100 font-mono text-lg mr-4"></span>
                            <h2 className="text-3xl font-bold text-stone-100 mr-8">Productions</h2>
                            <div className="flex-1 h-px bg-stone-400"></div>
                        </div>

                        <p className="text-stone-950 font-medium font-mono leading-relaxed text-lg mb-10">
                            Selected audiovisual and media projects, including documentary work, music videos,
                            and experimental audiovisual collaborations developed in academic, civic, and collective contexts.
                        </p>

                        {/* Projects Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
                            {/* Documentary & Educational Videos */}
                            <VideoCard
                                title="A Food for Thought"
                                category="Documentary & Educational Video"
                                image={food}
                                link="https://drive.google.com/file/d/1XQOABK8wUs_Q2hEPk-pZWlCfzWKTczo5/view"
                            />

                            <VideoCard
                                title="Alternatif"
                                category="Documentary & Educational Video"
                                image={alternatif}
                                link="https://www.youtube.com/watch?v=1Cwr7CYV1X4"
                            />

                            {/* Music Videos */}
                            <VideoCard
                                title="Gizli Özneler – Yetti"
                                category="Music Videos & Collective Production"
                                image={yetti}
                                link="https://www.youtube.com/watch?v=IIjpuF9Qh3U"
                            />

                            <VideoCard
                                title="Gizli Özneler – Bundan Sonrası Bizde"
                                category="Music Videos & Collective Production"
                                image={bizde}
                                link="https://www.youtube.com/watch?v=0S781HzRvVk"
                            />

                            {/* Experimental Audiovisual Work */}
                            <VideoCard
                                title="xecuc – Ornitopoloji"
                                category="Experimental Audiovisual Work"
                                image={ornitopoloji}
                                link="https://www.youtube.com/watch?v=mUgH7NmtXNY"
                            />
                            <VideoCard
                                title="xecuc – Aseksüel Porn"
                                category="Experimental Audiovisual Work"
                                image={aseksuel}
                                link="https://www.youtube.com/watch?v=VFju_XPVWZE"
                            />
                        </div>
                    </div>
                </Section>
            </Layout>
        </>
    );
}

interface VideoCardProps {
    title: string;
    category: string;
    image: string;
    link: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, category, image, link }) => {
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
                <span className="font-mono text-sm text-stone-200">{category}</span>
            </div>
        </a>
    );
};
