import { SeoHead } from '../../components/shared/SeoHead';
import { Section } from '../../components/ui/Section';
import { Layout } from '../../components/anthro/Layout';
import photo1 from "../../assets/photography/1.jpg";
import photo2 from "../../assets/photography/2.jpg";
import photo3 from "../../assets/photography/3.jpg";
import photo4 from "../../assets/photography/4.jpg";
import photo5 from "../../assets/photography/5.jpg";
import photo6 from "../../assets/photography/6.jpg";
import photo7 from "../../assets/photography/7.jpg";
import photo8 from "../../assets/photography/8.jpg";

const photographyItems = [
    {
        image: photo1,
        link: "https://www.behance.net/gallery/204888899/Eclipse-Digital",
    },
    {
        image: photo2,
        link: "https://www.behance.net/gallery/204888521/Analog-13MF",
    },
    {
        image: photo3,
        link: "https://www.behance.net/gallery/204888359/Analog-12MA",
    },
    {
        image: photo4,
        link: "https://www.behance.net/gallery/204887345/Analog-10",
    },
    {
        image: photo5,
        link: "https://www.behance.net/gallery/204887215/Analog-09",
    },
    {
        image: photo6,
        link: "https://www.behance.net/gallery/204886859/Analog-07",
    },
    {
        image: photo7,
        link: "https://www.behance.net/gallery/204885913/Analog-05",
    },
    {
        image: photo8,
        link: "https://www.behance.net/gallery/204885851/Analog-04",
    },
];

export function AnthroPhotography() {
    return (
        <>
            <SeoHead
                title="Photography | Gurhan Camgoz"
                description="Documentary and artistic photography. Full series available on Behance."
                path="/anthro/photography"
            />
            <Layout>
                <Section id="photography">
                    <div className="max-w-6xl mx-auto">
                        {/* Section Header */}
                        <div className="flex items-center mb-12">
                            <span className="text-stone-100 font-mono text-lg mr-4">01.</span>
                            <h2 className="text-3xl font-bold text-stone-100 mr-8">
                                Photography
                            </h2>
                            <div className="flex-1 h-px bg-stone-400"></div>
                        </div>

                        <p className="text-stone-950 font-medium font-mono leading-relaxed text-lg mb-10">
                            Selected documentary and artistic photography. Full series are
                            available on Behance.
                        </p>

                        {/* Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {photographyItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative block overflow-hidden rounded-lg border border-stone-300"
                                >
                                    <img
                                        src={item.image}
                                        alt={`Photography ${index + 1}`}
                                        className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-105"
                                        loading="lazy"
                                    />

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-stone-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <span className="font-mono text-white text-sm tracking-wide">
                                            View on Behance →
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </Section>
            </Layout>
        </>
    );
}
