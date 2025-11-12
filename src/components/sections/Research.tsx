import { Section } from '../ui/Section';
import { Layout } from '../layout/Layout';

export const Research: React.FC = () => {
  return (
    <Layout>
      <Section id="research">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center mb-12">
            <span className="text-stone-100 font-mono text-lg mr-4">02.</span>
            <h2 className="text-3xl font-bold text-stone-100 mr-8">Research</h2>
            <div className="flex-1 h-px bg-stone-400"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 items-start">
            {/* Content */}
            <div className="md:col-span-2 space-y-6">
              <p className="text-stone-950 font-medium font-mono leading-relaxed text-lg">
                My master’s thesis, <span className="font-bold text-blue-200">Beyond the Academic Mirror</span>, explored how large 
                language models can move from acting as static “mirrors” of knowledge to becoming reflexive partners 
                in <span className="font-bold text-blue-200">ethnographic analysis</span>.
              </p>

              <p className="text-stone-950 font-medium font-mono leading-relaxed text-lg">
                The project developed <span className="font-bold text-blue-200">Vector-HCAS</span>, a multi-dimensional alignment framework that 
                preserves the richness of human reasoning. Instead of reducing judgments to binary preferences, 
                it identifies and models evaluative dimensions such as <em>Narrative Discipline</em>, 
                <em> Productive Defamiliarization</em>, and <em>Analytical Grounding</em>.
              </p>

              <p className="text-stone-950 font-medium font-mono leading-relaxed text-lg">
                Methodologically, the research combined supervised fine-tuning with LoRA/QLoRA for efficient training, 
                a cloud-based human feedback collection app, and synthetic data augmentation with clustering analysis. 
                These approaches allowed the framework to emerge directly from <span className="font-bold text-blue-200">participant evaluations</span>, 
                making the alignment empirically grounded and resource-efficient.
              </p>

              <p className="text-stone-950 font-medium font-mono leading-relaxed text-lg">
                <span className="font-bold text-blue-200">Applications</span> of this work include educational assessment, ethically sensitive 
                therapeutic AI, and creative collaboration tools. More broadly, it demonstrates how alignment methods 
                can be democratized — enabling AI research that is rigorous, reflective, and accessible without massive compute resources.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
};
