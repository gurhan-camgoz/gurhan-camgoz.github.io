import { Link } from 'react-router-dom';
import { Layout } from './Layout';
import { Section } from '../ui/Section';
import { BookOpen, Film, Camera, Mail } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <Layout>
      <Section id="about">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center mb-12">
            <span className="text-stone-100 font-mono text-lg mr-4"></span>
            <h2 className="text-3xl font-bold text-stone-100 mr-8">About Me</h2>
            <div className="flex-1 h-px bg-stone-400"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 items-start">
            {/* Content */}
            <div className="md:col-span-2 space-y-6">
              <p className="text-stone-950 font-medium font-mono leading-relaxed text-lg">
                I am a communication and audiovisual producer with a research background in anthropology and artificial intelligence,
                focusing on translating complex scientific and technological topics into{" "}
                <span className="font-bold text-blue-200"> accessible educational and media formats.</span> My work combines
                documentary filmmaking, video editing, and editorial writing with interdisciplinary research.
              </p>

              <p className="text-stone-950 font-medium font-mono leading-relaxed text-lg">
                Drawing on both computational methods and ethnographic theory, I work at the intersection of{" "}
                <span className="font-bold text-blue-200"> science, education, and digital technologies </span>
                to communicate issues such as AI, digital citizenship, and knowledge production to diverse audiences.
              </p>

              <p className="text-stone-950 font-medium font-mono leading-relaxed text-lg">
                Alongside my media practice, I research the methodological and ethical conditions under which AI systems{" "}
                <span className="font-bold text-blue-200"> participate in social and educational inquiry, </span>
                with the broader aim of supporting responsible, human-centred approaches to technology and learning.
              </p>
            </div>
            <div className="relative group">
              <div className="relative">
                <img
                  src="/Profile.jpeg"
                  alt="Gurhan Camgoz - Media researcher and audiovisual producer"
                  className="w-full aspect-square bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg border border-primary-500/30 object-cover"
                />
                {/* Decorative border */}
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-green-400 rounded-lg -z-10 group-hover:top-3 group-hover:left-3 group-hover:border-purple-400 transition-all duration-300"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Cards Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="flex items-center mb-12">
            <span className="text-stone-100 font-mono text-lg mr-4"></span>
            <h2 className="text-3xl font-bold text-stone-100 mr-8">Explore My Work</h2>
            <div className="flex-1 h-px bg-stone-400"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              to="/anthro/research"
              className="p-6 bg-gradient-to-br from-amber-800/40 to-stone-700/40 rounded-lg border border-amber-700/30 hover:border-amber-500/50 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <BookOpen className="text-amber-400 mb-4" size={32} aria-hidden="true" />
              <h3 className="text-lg font-bold text-stone-100 mb-2 group-hover:text-amber-400 transition-colors">
                Research & Writing
              </h3>
              <p className="text-sm text-stone-300">
                Anthropology research, thesis work, and published articles.
              </p>
            </Link>

            <Link
              to="/anthro/productions"
              className="p-6 bg-gradient-to-br from-amber-800/40 to-stone-700/40 rounded-lg border border-amber-700/30 hover:border-amber-500/50 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <Film className="text-amber-400 mb-4" size={32} aria-hidden="true" />
              <h3 className="text-lg font-bold text-stone-100 mb-2 group-hover:text-amber-400 transition-colors">
                Productions
              </h3>
              <p className="text-sm text-stone-300">
                Documentaries, music videos, and audiovisual work.
              </p>
            </Link>

            <Link
              to="/anthro/photography"
              className="p-6 bg-gradient-to-br from-amber-800/40 to-stone-700/40 rounded-lg border border-amber-700/30 hover:border-amber-500/50 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <Camera className="text-amber-400 mb-4" size={32} aria-hidden="true" />
              <h3 className="text-lg font-bold text-stone-100 mb-2 group-hover:text-amber-400 transition-colors">
                Photography
              </h3>
              <p className="text-sm text-stone-300">
                Documentary and artistic photography on Behance.
              </p>
            </Link>

            <a
              href="mailto:gurhan.camgoz@gmail.com"
              className="p-6 bg-gradient-to-br from-amber-800/40 to-stone-700/40 rounded-lg border border-amber-700/30 hover:border-amber-500/50 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <Mail className="text-amber-400 mb-4" size={32} aria-hidden="true" />
              <h3 className="text-lg font-bold text-stone-100 mb-2 group-hover:text-amber-400 transition-colors">
                Contact
              </h3>
              <p className="text-sm text-stone-300">
                Get in touch for collaboration or inquiries.
              </p>
            </a>
          </div>
        </div>

        {/* Cross-link to AI branch */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="p-6 rounded-lg bg-gradient-to-br from-stone-800/40 to-stone-700/30 border border-stone-600/30 hover:border-amber-500/30 transition-colors">
            <h3 className="text-lg font-bold text-stone-100 mb-2">Looking for my other work?</h3>
            <p className="text-stone-300 mb-4">
              Explore my agentic AI and research engineering portfolio.
            </p>
            <Link
              to="/ai"
              className="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded"
            >
              Visit AI Lab →
            </Link>
          </div>
        </div>
      </Section>
    </Layout>
  );
};
