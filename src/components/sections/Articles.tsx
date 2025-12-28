import { Section } from "../ui/Section";
import { Layout } from "../layout/Layout";
import academia from '../../assets/thumbnails/academia.webp';
import cumhuriyet from '../../assets/thumbnails/cumhuriyet.webp';
import evolution from '../../assets/thumbnails/evolution.webp';
import urban from '../../assets/thumbnails/urban.webp';
import waking from '../../assets/thumbnails/waking.jpeg.webp';
import digital from '../../assets/thumbnails/digital.png';

export const Articles: React.FC = () => {
  return (
    <Layout>
      <Section id="articles">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center mb-12">
            <span className="text-stone-100 font-mono text-lg mr-4">03.</span>
            <h2 className="text-3xl font-bold text-stone-100 mr-8">Articles</h2>
            <div className="flex-1 h-px bg-stone-400"></div>
          </div>

          <p className="text-stone-950 font-medium font-mono leading-relaxed text-lg mb-10">
            Selected editorial and academic articles written in international media and academic
            contexts, focusing on education, science, academia, and social inquiry.
          </p>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* Academia */}
            <ArticleCard
              title="Turkish government’s measures on academia decrease research output"
              source="140journos"
              image={academia}
              link="https://140journos.com/turkish-governments-measures-on-academia-decrease-research-output-3a54671a2434"
            />

            {/* Cumhuriyet */}
            <ArticleCard
              title="Turkey’s Cumhuriyet journalists in terrorism trial"
              source="140journos"
              image={cumhuriyet}
              link="https://140journos.com/turkey-starts-trying-cumhuriyet-journalists-61316bfda29d"
            />

            {/* Evolution */}
            <ArticleCard
              title="The banned theory: Evolution"
              source="140journos"
              image={evolution}
              link="https://140journos.com/the-banned-theory-evolution-e772fa968339"
            />

            {/* Urban Transformation */}
            <ArticleCard
              title="The cost of urban transformation for Turkey"
              source="140journos"
              image={urban}
              link="https://140journos.com/cost-of-urban-transformation-for-turkey-33b01cd734d0"
            />

            {/* Diggit */}
            <ArticleCard
              title="Waking Life and Aesthetics of Liminality"
              source="Diggit Magazine"
              image={waking}
              link="https://www.diggitmagazine.com/papers/waking-life-and-aesthetics-liminality"
            />
             {/* Drive */}
            <ArticleCard
              title="Ethnographer’s Digital Colleague: Prototyping a Reflexive AI Partner for Fieldwork Analysis"
              source="Drive"
              image={digital}
              link="https://drive.google.com/file/d/16uWmqTIRL4ZF7WM5K-rpa1szMEyIkdRP/view?usp=sharing"
            />
            
          </div>
        </div>
      </Section>
    </Layout>
  );
};

interface ArticleCardProps {
  title: string;
  source: string;
  image: string;
  link: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, source, image, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border border-stone-300 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="aspect-video overflow-hidden bg-stone-200">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          loading="lazy"
        />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-mono font-bold text-blue-200 text-lg leading-snug group-hover:underline">
          {title}
        </h3>
        <span className="font-mono text-sm text-stone-200">{source}</span>
      </div>
    </a>
  );
};
