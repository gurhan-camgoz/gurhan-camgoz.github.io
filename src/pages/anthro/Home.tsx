import { Header } from '../../components/anthro/Header';
import { Hero } from '../../components/anthro/Hero';
import { About } from '../../components/anthro/About';
import { Research } from '../../components/anthro/Research';
import { Articles } from '../../components/anthro/Articles';
import { Projects } from '../../components/anthro/Projects';
import { Photography } from '../../components/anthro/Photography';
import { Contact } from '../../components/anthro/Contact';

export function AnthroHome() {
    return (
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
    );
}
