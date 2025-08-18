import { Section } from '../ui/Section';

export const About: React.FC = () => {
  return (
    <Section id="about">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center mb-12">
          <span className="text-primary-400 font-mono text-lg mr-4">01.</span>
          <h2 className="text-3xl font-bold text-slate-100 mr-8">About Me</h2>
          <div className="flex-1 h-px bg-slate-600"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Content */}
          <div className="md:col-span-2 space-y-6">
            <p className="text-slate-300 leading-relaxed text-lg">
              Hello! I'm a passionate researcher working at the intersection of artificial intelligence 
              and human-centered design. My journey started back in undergraduate studies when I first 
              discovered the power of combining technical innovation with social impact.
            </p>
            
            <p className="text-slate-300 leading-relaxed text-lg">
              Fast-forward to today, and I've had the privilege of working on research projects ranging 
              from <span className="text-primary-400">machine learning algorithms</span> to 
              <span className="text-primary-400"> accessibility tools</span>, always with the goal 
              of making technology more inclusive and beneficial for diverse communities.
            </p>
            
            <p className="text-slate-300 leading-relaxed text-lg">
              My main focus these days is on developing AI systems that are not just powerful, 
              but also transparent, fair, and accessible to everyone. I also enjoy mentoring 
              students and contributing to open-source projects in my spare time.
            </p>

            <p className="text-slate-300 leading-relaxed text-lg">
              Here are a few technologies I've been working with recently:
            </p>

            {/* Tech Stack */}
            <div className="grid grid-cols-2 gap-2 mt-6">
              {[
                'Python & TensorFlow',
                'JavaScript & React',
                'PyTorch & Scikit-learn',
                'Node.js & Express',
                'Human-Computer Interaction',
                'Accessibility Research'
              ].map((tech) => (
                <div key={tech} className="flex items-center">
                  <span className="text-primary-400 mr-3 text-sm">▶</span>
                  <span className="text-slate-300 font-mono text-sm">{tech}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Image Placeholder */}
          <div className="relative group">
            <div className="relative">
              <div className="w-full aspect-square bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg border border-primary-500/30 flex items-center justify-center">
                <span className="text-primary-400 font-mono text-sm">Your Photo</span>
              </div>
              {/* Decorative border */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary-500 rounded-lg -z-10 group-hover:top-3 group-hover:left-3 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

