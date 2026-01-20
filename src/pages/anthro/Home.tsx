import { Header } from '../../components/anthro/Header';
import { Hero } from '../../components/anthro/Hero';
import { About } from '../../components/anthro/About';
import { Research } from '../../components/anthro/Research';
import { Articles } from '../../components/anthro/Articles';
import { Projects } from '../../components/anthro/Projects';
import { Photography } from '../../components/anthro/Photography';
import { Contact } from '../../components/anthro/Contact';
import { SeoHead } from '../../components/shared/SeoHead';

export function AnthroHome() {
    return (
        <>
            <SeoHead
                title="Media & Anthropology | Gurhan Camgoz"
                description="Ethnography, visual culture, education, and audiovisual production. Explore my work in media anthropology."
                path="/anthro"
            />
            <div className="min-h-screen bg-stone-200">
                <Header />
                <Hero />
                <About />
                <Research />
                <Articles />
                <Projects />
                <Photography />
                <Contact />
            </div>
        </>
    );
}
