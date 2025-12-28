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
  My master’s thesis, <span className="font-bold text-blue-200">Beyond the Academic Mirror</span>, examined how large
  language models can support <span className="font-bold text-blue-200">interpretive and educational practices</span>
  by moving beyond static representations of knowledge toward more reflexive forms of human–AI collaboration.
</p>

<p className="text-stone-950 font-medium font-mono leading-relaxed text-lg">
  At the core of the project is <span className="font-bold text-blue-200">Vector-HCAS</span>, a multi-dimensional
  alignment framework designed to preserve the richness of human reasoning in qualitative domains. Rather than
  reducing judgment to simplified preferences, the framework models evaluative dimensions such as{" "}
  <em>Narrative Discipline</em>, <em>Productive Defamiliarization</em>, and <em>Analytical Grounding</em>.
</p>

<p className="text-stone-950 font-medium font-mono leading-relaxed text-lg">
  Methodologically, the research combined efficient fine-tuning approaches (LoRA/QLoRA), a lightweight human
  feedback collection interface, and synthetic data augmentation informed by clustering analysis. This design
  allowed evaluative criteria to emerge directly from{" "}
  <span className="font-bold text-blue-200">participant and user perspectives</span>, making the system both
  empirically grounded and accessible.
</p>

<p className="text-stone-950 font-medium font-mono leading-relaxed text-lg">
  <span className="font-bold text-blue-200">Potential applications</span> include educational assessment,
  reflective learning tools, and ethically sensitive AI systems that support interpretation rather than automation.
  More broadly, the work demonstrates how alignment research can contribute to{" "}
  <span className="font-bold text-blue-200">human-centred and educational uses of AI</span> without relying on
  large-scale computational resources.
</p>

            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
};
