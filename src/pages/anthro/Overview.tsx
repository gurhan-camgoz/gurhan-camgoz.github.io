import { Hero } from '../../components/anthro/Hero';
import { About } from '../../components/anthro/About';
import { SeoHead } from '../../components/shared/SeoHead';

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
            </div>
        </>
    );
}

