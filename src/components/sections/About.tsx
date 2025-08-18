import { Section } from '../ui/Section';
import { Cpu, Database, Server, BookOpen, Webhook, Wand } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <Section id="about">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center mb-12">
          <span className="text-stone-400 font-mono text-lg mr-4">01.</span>
          <h2 className="text-3xl font-bold text-stone-700 mr-8">About Me</h2>
          <div className="flex-1 h-px bg-stone-600"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Content */}
          <div className="md:col-span-2 space-y-6">
            <p className="text-stone-700 leading-relaxed text-lg">
              I am a researcher at the intersection of anthropology and artificial intelligence, specializing
              in the methodological and ethical challenges of {" "} <span className="font-bold text-stone-950"> human-AI collaboration.</span> My master thesis
              developed a normative alignment framework that enables large language models to act as reflexive
              partners in ethnographic analysis.
            </p>
            
            <p className="text-stone-700 leading-relaxed text-lg">
              Drawing on both computational methods and ethnographic theory, my research reframes AI alignment
              in qualitative domains as the preservation of evaluative richness rather than the reduction of human
              judgment to simple preferences. 
            </p>
            
            <p className="text-stone-700 leading-relaxed text-lg">
              Beyond technical design, I explore the infrastructural, normative, and epistemic conditions that shape
              how AI systems participate in social inquiry, with the broader aim of advancing interdisciplinary
              models of genuine human-machine collaboration.
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
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary-500 rounded-lg -z-10 group-hover:top-3 group-hover:left-3 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <span className="text-stone-400 font-mono text-lg mr-4"></span>
          <h2 className="text-3xl font-bold text-stone-700 mr-8">Tech Stack</h2>
          <div className="flex-1 h-px bg-stone-600"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Machine Learning & AI",
              icon: <Cpu className="w-6 h-6 text-stone-700" />,
              items: [
                "Python (experimentation & pipelines)",
                "PyTorch (training, fine-tuning, RLHF)",
                "Hugging Face Transformers (LLM integration)",
                "RLHF frameworks (PPO, DPO, custom pipelines)",
                "Scikit-learn (clustering & validation)"
              ]
            },
            {
              title: "Data Engineering & Processing",
              icon: <Database className="w-6 h-6 text-stone-700" />,
              items: [
                "Pandas / NumPy (data wrangling)",
                "NLTK / SpaCy (text preprocessing)",
                "Synthetic data generation (human-seeded)"
              ]
            },
            {
              title: "Deployment & Infrastructure",
              icon: <Server className="w-6 h-6 text-stone-700" />,
              items: [
                "Flask / FastAPI (feedback collection apps)",
                "Docker (containerization & portability)",
                "Cloud (AWS / GCP / Azure for training)",
                "CUDA / GPU acceleration (resource-constrained RLHF)"
              ]
            },
            {
              title: "Research Methods & Analysis",
              icon: <BookOpen className="w-6 h-6 text-stone-700" />,
              items: [
                "Qualitative coding tools (NVivo / Atlas.ti)",
                "Clustering & dimensionality reduction (k-means, PCA, t-SNE)",
                "Mixed-methods integration (ethnography + computation)"
              ]
            },
            {
              title: "Web & Frontend Development",
              icon: <Webhook className="w-6 h-6 text-stone-700" />,
              items: [
                "TypeScript (typed development for reliability & scalability)",
                "React (UI framework for interactive applications)",
                "Vite (fast build tooling & dev environment)",
                "TailwindCSS (utility-first CSS framework for styling)"
              ]
            },
            {
              title: "Audio-Visual Design & Creative Tools",
              icon: <Wand className="w-6 h-6 text-stone-700" />,
              items: [
                "Ableton Live (music production & sound design)",
                "Adobe Premiere Pro (video editing)",
                "Adobe Lightroom (photo editing)", 
                "Figma (UI/UX design)"
              ]
            }
          ].map((category) => (
            <div
              key={category.title}
              className="bg-stone-50 rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                {category.icon}
                <h3 className="text-lg font-semibold text-stone-800">
                  {category.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start text-stone-700 text-sm leading-relaxed"
                  >
                    <span className="text-stone-500 mr-2">•</span>
                    <span dangerouslySetInnerHTML={{ __html: item.replace(/([^(]+)/, '<strong>$1</strong>') }} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

