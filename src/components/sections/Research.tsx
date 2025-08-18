import { Section } from '../ui/Section';

export const Research: React.FC = () => {
  return (
    <Section id="research">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center mb-12">
          <span className="text-stone-400 font-mono text-lg mr-4">02.</span>
          <h2 className="text-3xl font-bold text-stone-700 mr-8">Research</h2>
          <div className="flex-1 h-px bg-stone-600"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Content */}
          <div className="md:col-span-2 space-y-6">
            <p className="text-stone-700 leading-relaxed text-lg">
              Lorem ipsum
            </p>
            
            <p className="text-stone-700 leading-relaxed text-lg">
             Dummy
            </p>
            
            <p className="text-stone-700 leading-relaxed text-lg">
              Come on now
            </p>


          </div>


        </div>
      </div>
    </Section>
  );
};

