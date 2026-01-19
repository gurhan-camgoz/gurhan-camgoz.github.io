import React from 'react';
import { Section } from '../ui/Section';
import { Layout } from './Layout';

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

          <div className="space-y-10">
            {/* Research Focus */}
            <div className="space-y-4">
              <h3 className="text-stone-100 font-mono text-xl font-bold">Research Focus</h3>

              <ul className="list-disc pl-6 space-y-2 text-stone-950 font-medium font-mono leading-relaxed text-lg">
                <li>
                  How <span className="font-bold text-blue-200">meaning, judgment, and uncertainty</span> are shaped through
                  mediation
                </li>
                <li>How systems stabilize interpretation by filtering ambiguity</li>
                <li>How AI can support interpretation rather than replace it</li>
              </ul>

              <p className="text-stone-950 font-medium font-mono leading-relaxed text-lg">
                My research bridges anthropology and artificial intelligence to explore how{" "}
                <span className="font-bold text-blue-200">reflexivity, feedback, and uncertainty</span> can be preserved in
                both human and machine-mediated systems.
              </p>
            </div>

            {/* Anthropology → AI Trajectory */}
            <div className="space-y-4">
              <h3 className="text-stone-100 font-mono text-xl font-bold">Anthropology → AI Trajectory</h3>

              <ul className="list-disc pl-6 space-y-2 text-stone-950 font-medium font-mono leading-relaxed text-lg">
                <li>
                  <span className="font-bold text-blue-200">Anthropology:</span> ethnography, epistemology, mediation, lived
                  uncertainty
                </li>
                <li>
                  <span className="font-bold text-blue-200">Core concern:</span> what is lost when complexity is reduced
                </li>
                <li>
                  <span className="font-bold text-blue-200">Transition to AI:</span> translating these questions into
                  alignment, feedback, and evaluation design
                </li>
              </ul>

              <p className="text-stone-950 font-medium font-mono leading-relaxed text-lg">
                My anthropology research examined how dominant knowledge frameworks produce coherence by excluding rupture,
                noise, and distortion. These concerns directly informed how I approach alignment and evaluation in LLM-based
                systems.
              </p>
            </div>

            {/* AI Master’s Thesis */}
            <div className="space-y-4">
              <h3 className="text-stone-100 font-mono text-xl font-bold">
                AI Master’s Thesis — <span className="font-bold text-blue-200">Beyond the Academic Mirror</span>
              </h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-stone-950 font-medium font-mono leading-relaxed text-lg">
                    <span className="font-bold text-blue-200">Goal</span>
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-stone-950 font-medium font-mono leading-relaxed text-lg">
                    <li>Move beyond static representations of knowledge in LLMs</li>
                    <li>Design reflexive human–AI collaboration for interpretive and educational contexts</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <p className="text-stone-950 font-medium font-mono leading-relaxed text-lg">
                    <span className="font-bold text-blue-200">Key Contributions</span>
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-stone-950 font-medium font-mono leading-relaxed text-lg">
                    <li>Agentic LLM system designed for qualitative reasoning</li>
                    <li>
                      <span className="font-bold text-blue-200">Vector-HCAS</span>: multi-dimensional alignment framework
                    </li>
                    <li>
                      Modeled evaluative dimensions such as <em>Narrative Discipline</em>, <em>Productive Defamiliarization</em>, and{' '}
                      <em>Analytical Grounding</em>
                    </li>
                  </ul>
                  <p className="text-stone-950 font-medium font-mono leading-relaxed text-lg">
                    Rather than reducing judgment to simplified preferences or scalar rewards, the system preserves multiple
                    evaluative perspectives grounded in human reasoning.
                  </p>
                </div>
              </div>
            </div>

            {/* Methods & System Design */}
            <div className="space-y-4">
              <h3 className="text-stone-100 font-mono text-xl font-bold">Methods & System Design</h3>

              <ul className="list-disc pl-6 space-y-2 text-stone-950 font-medium font-mono leading-relaxed text-lg">
                <li>
                  Fine-tuning: <span className="font-bold text-blue-200">LoRA / QLoRA</span> (efficient, resource-aware)
                </li>
                <li>Evaluation: human-in-the-loop feedback pipelines</li>
                <li>Data: human-seeded synthetic data, clustering-informed augmentation</li>
                <li>Interfaces: lightweight React + Python feedback collection tools</li>
                <li>Deployment: containerized pipelines; cloud-based experimentation</li>
              </ul>

              <p className="text-stone-950 font-medium font-mono leading-relaxed text-lg">
                Evaluative criteria emerged directly from participant and user perspectives, translating anthropological
                concerns with situated judgment into computational form.
              </p>
            </div>

            {/* Applications */}
            <div className="space-y-4">
              <h3 className="text-stone-100 font-mono text-xl font-bold">Applications</h3>

              <ul className="list-disc pl-6 space-y-2 text-stone-950 font-medium font-mono leading-relaxed text-lg">
                <li>Educational assessment and reflective learning tools</li>
                <li>Ethically sensitive AI systems for interpretation-heavy domains</li>
                <li>Human-centred alignment research without large-scale compute</li>
                <li>Agentic AI systems designed around feedback, reflexivity, and failure modes</li>
              </ul>

              <p className="text-stone-950 font-medium font-mono leading-relaxed text-lg">
                More broadly, this work demonstrates how alignment research can support human-centred and pedagogical uses of
                AI without relying on large computational infrastructures.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
};
