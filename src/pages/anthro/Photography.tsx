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
        alt: "Eclipse - Digital photography series",
        title: "Eclipse Digital Series on Behance",
    },
    {
        image: photo2,
        link: "https://www.behance.net/gallery/204888521/Analog-13MF",
        alt: "Analog 13MF - Medium format film photography",
        title: "Analog 13MF Series on Behance",
    },
    {
        image: photo3,
        link: "https://www.behance.net/gallery/204888359/Analog-12MA",
        alt: "Analog 12MA - Film photography series",
        title: "Analog 12MA Series on Behance",
    },
    {
        image: photo4,
        link: "https://www.behance.net/gallery/204887345/Analog-10",
        alt: "Analog 10 - Documentary film photography",
        title: "Analog 10 Series on Behance",
    },
    {
        image: photo5,
        link: "https://www.behance.net/gallery/204887215/Analog-09",
        alt: "Analog 09 - Street and urban photography",
        title: "Analog 09 Series on Behance",
    },
    {
        image: photo6,
        link: "https://www.behance.net/gallery/204886859/Analog-07",
        alt: "Analog 07 - Black and white film photography",
        title: "Analog 07 Series on Behance",
    },
    {
        image: photo7,
        link: "https://www.behance.net/gallery/204885913/Analog-05",
        alt: "Analog 05 - Portrait photography series",
        title: "Analog 05 Series on Behance",
    },
    {
        image: photo8,
        link: "https://www.behance.net/gallery/204885851/Analog-04",
        alt: "Analog 04 - Artistic film photography",
        title: "Analog 04 Series on Behance",
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
                            <span className="text-stone-100 font-mono text-lg mr-4"></span>
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
                                    aria-label={item.title}
                                    className="group relative block overflow-hidden rounded-lg border border-stone-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.alt}
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
