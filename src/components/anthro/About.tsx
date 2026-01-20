import { Layout } from './Layout';
import { Section } from '../ui/Section';

export const About: React.FC = () => {
  return (
    <Layout>
      <Section id="about">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center mb-12">
            <span className="text-stone-100 font-mono text-lg mr-4">01.</span>
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
                  alt="Profile photo"
                  className="w-full aspect-square bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg border border-primary-500/30 object-cover"
                />
                {/* Decorative border */}
                <div className="absolute -top-4 -left-4 w-full h-full border-2 border-green-400 rounded-lg -z-10 group-hover:top-3 group-hover:left-3 group-hover:border-purple-400 transition-all duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
};
