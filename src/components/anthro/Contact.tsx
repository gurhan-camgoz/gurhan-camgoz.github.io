import { Section } from "../ui/Section";
import { Layout } from "./Layout";
import { Github, Linkedin, FileUser, Mail, MapPin } from 'lucide-react';
import { Button } from '../ui/Button';
import { personalInfo } from '../../utils/constants';

export const Contact: React.FC = () => {
  return (
    <Layout>
      <Section id="contact">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center mb-12">
            <span className="text-stone-100 font-mono text-lg mr-4">06.</span>
            <h2 className="text-3xl font-bold text-stone-100 mr-8">Contact</h2>
            <div className="flex-1 h-px bg-stone-400"></div>
          </div>

          <div className="space-y-8">
            <p className="text-stone-950 font-medium font-mono leading-relaxed text-lg">
              I am always open to conversations around science education, communication, audiovisual
              production, and interdisciplinary collaboration. The best way to reach me is via email.
            </p>

            {/* Contact Details */}
            <div className="space-y-4 font-mono text-lg">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-blue-200" />
                <a
                  href="mailto:gurhan.camgoz@gmail.com"
                  className="text-blue-200 font-bold hover:underline"
                >
                  gurhan.camgoz@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-blue-200" />
                <span className="text-stone-950">Brussels, Belgium</span>
              </div>
            </div>

            {/* Links */}
            <div className="pt-6 border-t border-stone-400">
              <p className="font-mono text-stone-800 mb-4">
                You can also find me here:
              </p>

              <div className="flex flex-wrap gap-4">
                {personalInfo.links.github && (
                  <a href={personalInfo.links.github} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="md" className="border-2 border-stone-600 text-stone-100 hover:border-green-400 hover:text-stone-800 hover:bg-gradient-to-tl from-green-500 to-purple-500 hover:bg-opacity-20 hover:shadow-lg hover:shadow-green-400/50 transition-all duration-300">
                      <Github size={18} className="mr-2" />
                      GitHub
                    </Button>
                  </a>
                )}
                {personalInfo.links.linkedin && (
                  <a href={personalInfo.links.linkedin} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="md" className="border-2 border-stone-600 text-stone-100 hover:border-green-400 hover:text-stone-800 hover:bg-gradient-to-tl from-green-500 to-purple-500 hover:bg-opacity-20 hover:shadow-lg hover:shadow-green-400/50 transition-all duration-300">
                      <Linkedin size={18} className="mr-2" />
                      LinkedIn
                    </Button>
                  </a>
                )}
                {personalInfo.links.cv && (
                  <a href={personalInfo.links.cv} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="md" className="border-2 border-stone-600 text-stone-100 hover:border-green-400 hover:text-stone-800 hover:bg-gradient-to-tl from-green-500 to-purple-500 hover:bg-opacity-20 hover:shadow-lg hover:shadow-green-400/50 transition-all duration-300">
                      <FileUser size={18} className="mr-2" />
                      CV
                    </Button>
                  </a>
                )}
              </div>
            </div>

            {/* Closing Note */}
            <p className="pt-8 font-mono text-stone-200 italic">
              For project-based collaboration, research communication, or institutional work,
              feel free to get in touch.
            </p>
          </div>
        </div>
      </Section>
    </Layout>
  );
};
