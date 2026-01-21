import { Link } from 'react-router-dom';
import { SeoHead } from '../../components/shared/SeoHead';
import { Section } from '../../components/ui/Section';
import { Layout } from '../../components/anthro/Layout';
import academia from '../../assets/thumbnails/academia.webp';
import cumhuriyet from '../../assets/thumbnails/cumhuriyet.webp';
import evolution from '../../assets/thumbnails/evolution.webp';
import urban from '../../assets/thumbnails/urban.webp';
import waking from '../../assets/thumbnails/waking.jpeg.webp';
import digital from '../../assets/thumbnails/digital.png';

export function AnthroResearch() {
    return (
        <>
            <SeoHead
                title="Tremble Lasts Forever | Master's Thesis (Web Edition) | Gürhan Camgöz"
                description="Cultural Tectonics and Seismopolitics — A selective web edition of a master's thesis in Social and Cultural Anthropology examining earthquakes as epistemic disturbances."
                path="/anthro/research"
            />
            <Layout>
                {/* ═══════════════════════════════════════════════════════════════════ */}
                {/* THESIS WEB EDITION                                                   */}
                {/* ═══════════════════════════════════════════════════════════════════ */}
                <Section id="thesis">
                    <article className="max-w-3xl mx-auto">
                        {/* Thesis Header */}
                        <header className="mb-12">
                            <h1 className="text-4xl font-bold text-stone-100 mb-2">Tremble Lasts Forever</h1>
                            <h2 className="text-2xl font-medium text-stone-200 mb-8">Cultural Tectonics and Seismopolitics</h2>

                            <div className="space-y-1 text-stone-300 font-mono text-sm mb-6">
                                <p><strong className="text-stone-100">Author:</strong> Gürhan Camgöz</p>
                                <p><strong className="text-stone-100">Degree:</strong> Master's Thesis — Social and Cultural Anthropology</p>
                                <p><strong className="text-stone-100">Year:</strong> 2022–2023</p>
                                <p><strong className="text-stone-100">Web Edition:</strong> v0.1 (Selective Excerpts)</p>
                                <p><strong className="text-stone-100">Last updated:</strong> 2026-01-21</p>
                            </div>

                            <nav className="flex flex-wrap gap-4 text-sm font-mono">
                                <a href="#key-excerpts" className="text-amber-300 hover:text-amber-200 underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded">
                                    Read the web edition ↓
                                </a>
                                <span className="text-stone-400">|</span>
                                <span className="text-stone-400 italic">Download PDF (forthcoming)</span>
                                <span className="text-stone-400">|</span>
                                <a href="#references--citation" className="text-amber-300 hover:text-amber-200 underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded">
                                    Cite ↓
                                </a>
                            </nav>
                        </header>

                        <hr className="border-stone-500 my-12" />

                        {/* Opening Orientation */}
                        <section id="opening-orientation" className="scroll-mt-24 mb-12">
                            <h2 className="text-2xl font-bold text-stone-100 mb-6">Opening Orientation: How This Text Exists Here</h2>

                            <div className="space-y-4 text-stone-200 leading-relaxed">
                                <p>
                                    This page presents a selective web edition of a master's thesis written in the aftermath of earthquakes and alongside lives that continued within their duration. It does not reproduce the thesis in full, nor does it attempt to translate it into a more accessible or resolved form. Instead, it stages a partial encounter: fragments, arguments, and excerpts arranged to foreground the conditions under which the thesis was written and the limits it insists upon.
                                </p>
                                <p>
                                    The web format is not treated here as a container for completion, but as a surface for exposure. Certain passages are brought forward; others are withheld. This is not a gesture of simplification, but of constraint. The thesis proceeds from the recognition that instability cannot be rendered fully coherent without doing violence to what it seeks to understand. Any presentation that promises closure would therefore misrepresent its analytic commitments.
                                </p>
                                <p>
                                    Readers are not asked to follow a linear path. The structure of this page allows for scanning, lingering, and interruption. Concepts appear as operators rather than definitions; ethnographic scenes are presented without resolution; methodological limits are named without compensation. The aim is not to guide the reader toward an argument's conclusion, but to make visible the conditions under which the argument holds—and where it refuses to hold.
                                </p>
                                <p>
                                    This orientation matters because the thesis does not begin from ground. It begins from tremor. What follows should be read with that in mind.
                                </p>
                            </div>
                        </section>

                        <hr className="border-stone-500 my-12" />

                        {/* Abstract */}
                        <section id="abstract" className="scroll-mt-24 mb-12">
                            <h2 className="text-2xl font-bold text-stone-100 mb-6">Abstract (Web Edition)</h2>

                            <div className="space-y-4 text-stone-200 leading-relaxed">
                                <p>
                                    This thesis examines earthquakes not as empirical objects or discrete events, but as epistemic disturbances that unsettle the grounds upon which anthropological knowledge, political categories, and scales of analysis are formed. Drawing on ethnographic research conducted in the context of disaster housing projects, it argues that earthquakes expose the instability of foundations that are often treated as given—particularly those organizing notions of recovery, temporariness, and post-disaster life.
                                </p>
                                <p>
                                    To address this instability, the thesis develops a set of analytic operators, most notably <em>cultural tectonics</em> and <em>seismopolitics</em>. Rather than functioning as metaphors for change, these operators are mobilized to think culture, politics, and scale as fractal and contested formations that persist beyond the event of rupture. Through attention to everyday routines in disaster housing, the analysis demonstrates how instability becomes durational, lived through waiting, maintenance, and adjustment rather than resolved through reconstruction.
                                </p>
                                <p>
                                    Methodologically, the thesis advances <em>non-dwelling</em> as a constraint on anthropological analysis. Non-dwelling names a refusal to ground interpretation in stable foundations or explanatory closure when such grounding risks reproducing the violence of coherence imposed upon unstable conditions. By proceeding through fragments, hesitations, and unresolved tensions, the thesis argues for an anthropology that remains accountable to instability without converting it into deficiency. In doing so, it contributes to debates on disaster, scale, and epistemology by foregrounding the limits of representation as a condition of rigorous inquiry rather than its failure.
                                </p>
                            </div>
                        </section>

                        <hr className="border-stone-500 my-12" />

                        {/* Table of Contents */}
                        <nav id="toc" className="scroll-mt-24 mb-12">
                            <h2 className="text-2xl font-bold text-stone-100 mb-6">Contents</h2>

                            <ul className="space-y-2 text-stone-200 font-mono text-sm">
                                <li><a href="#conceptual-operators" className="text-amber-300 hover:text-amber-200 underline underline-offset-2">Conceptual Operators</a></li>
                                <li><a href="#argument-map" className="text-amber-300 hover:text-amber-200 underline underline-offset-2">Argument Map</a></li>
                                <li><a href="#key-excerpts" className="text-amber-300 hover:text-amber-200 underline underline-offset-2">Key Excerpts (Web Edition)</a></li>
                                <li><a href="#method--field-context" className="text-amber-300 hover:text-amber-200 underline underline-offset-2">Method & Field Context</a></li>
                                <li><a href="#media-as-evidence" className="text-amber-300 hover:text-amber-200 underline underline-offset-2">Media as Evidence</a></li>
                                <li><a href="#references--citation" className="text-amber-300 hover:text-amber-200 underline underline-offset-2">References & Citation</a></li>
                                <li><a href="#bridge-to-ai-thesis" className="text-amber-300 hover:text-amber-200 underline underline-offset-2">Bridge to AI Thesis</a></li>
                            </ul>
                        </nav>

                        <hr className="border-stone-500 my-12" />

                        {/* Conceptual Operators */}
                        <section id="conceptual-operators" className="scroll-mt-24 mb-12">
                            <h2 className="text-2xl font-bold text-stone-100 mb-6">Conceptual Operators</h2>
                            <p className="text-stone-300 mb-8 italic">
                                The following operators are not metaphors but analytic instruments developed in the course of the thesis.
                            </p>

                            <div className="space-y-8">
                                <OperatorCard
                                    name="Cultural Tectonics"
                                    definition="Cultural tectonics names a condition in which culture, scale, and foundation are themselves in motion rather than stable substrates upon which change occurs. It treats fracture, resonance, and displacement as constitutive forces rather than anomalies."
                                    analyticFunction="Enables attention to instability across scales without presuming a stable ground."
                                    excerptFragment="What appears solid is continuously reassembled through fractures that exceed representation."
                                />
                                <OperatorCard
                                    name="Seismopolitics"
                                    definition="Seismopolitics designates the analytic necessity of thinking political life from instability rather than order. It refuses to treat earthquakes as external shocks to otherwise coherent systems."
                                    analyticFunction="Reframes scale, power, and governance as contested formations revealed through rupture."
                                    excerptFragment="The political emerges not after the tremor, but through it."
                                />
                                <OperatorCard
                                    name="Non-Dwelling"
                                    definition="Non-dwelling marks a methodological refusal to settle analysis on stable foundations."
                                    analyticFunction="Holds instability as a constraint rather than a failure of method."
                                    excerptFragment="To dwell analytically would be to reproduce the violence of grounding."
                                />
                                <OperatorCard
                                    name="Theory-Quake"
                                    definition="Theory-quake describes moments where conceptual frameworks fail under the pressure of empirical conditions."
                                    analyticFunction="Exposes limits of theory without demanding resolution."
                                    excerptFragment="What trembles is not only the ground, but the concept itself."
                                />
                                <OperatorCard
                                    name="Echo / Reverberation"
                                    definition="Echo names the persistence of rupture beyond the event, as distortion rather than residue."
                                    analyticFunction="Attends to how instability repeats unevenly across time and scale."
                                    excerptFragment="The aftermath does not follow; it reverberates."
                                />
                            </div>
                        </section>

                        <hr className="border-stone-500 my-12" />

                        {/* Argument Map */}
                        <section id="argument-map" className="scroll-mt-24 mb-12">
                            <h2 className="text-2xl font-bold text-stone-100 mb-6">Argument Map</h2>

                            <p className="text-stone-200 leading-relaxed mb-8">
                                This thesis argues that earthquakes demand a reconfiguration of anthropological analysis—not as empirical objects or exceptional events, but as epistemic disturbances that expose the instability of scale, foundation, and political life.
                            </p>

                            <div className="space-y-6">
                                <ClaimCard
                                    number={1}
                                    claim="Earthquakes are epistemic events, not empirical objects"
                                    destabilizes="Event-based and object-centered analyses of disaster."
                                    makesPossible="An understanding of earthquakes as disturbances that persist beyond the moment of rupture."
                                />
                                <ClaimCard
                                    number={2}
                                    claim="Cultural tectonics operates as an analytic operator, not a metaphor"
                                    destabilizes="Metaphorical accounts of cultural change that presume stable ground."
                                    makesPossible="Operator-driven analysis attentive to fractality and instability."
                                />
                                <ClaimCard
                                    number={3}
                                    claim="Disaster housing reveals the temporal failure of 'post-disaster' categories"
                                    destabilizes="Concepts of recovery, transition, and temporariness."
                                    makesPossible="An ethnographic account of disaster as durational and unresolved."
                                />
                                <ClaimCard
                                    number={4}
                                    claim="Non-dwelling is a methodological constraint, not an ethical posture"
                                    destabilizes="The demand for analytical grounding and explanatory closure."
                                    makesPossible="A rigorous anthropology that remains accountable to instability."
                                />
                            </div>

                            <div className="mt-8 p-4 border-l-2 border-stone-500">
                                <h3 className="text-stone-100 font-bold mb-2">What this argument does <em>not</em> attempt</h3>
                                <ul className="text-stone-300 space-y-1 text-sm">
                                    <li>• It does not offer a comprehensive theory of disasters.</li>
                                    <li>• It does not resolve instability through closure.</li>
                                    <li>• It does not propose non-dwelling as an alternative foundation.</li>
                                </ul>
                            </div>
                        </section>

                        <hr className="border-stone-500 my-12" />

                        {/* Key Excerpts */}
                        <section id="key-excerpts" className="scroll-mt-24 mb-12">
                            <h2 className="text-2xl font-bold text-stone-100 mb-8">Key Excerpts (Web Edition)</h2>

                            {/* Excerpt 1 */}
                            <div id="excerpt-1" className="scroll-mt-24 mb-12">
                                <h3 className="text-xl font-bold text-stone-100 mb-3">Excerpt 1: Cultural Tectonics and the Emergence of Seismopolitics</h3>
                                <p className="text-stone-400 italic text-sm mb-4">
                                    This excerpt draws from the Prologue and early conceptual framing of the thesis, where cultural tectonics and seismopolitics are introduced as analytic operators rather than descriptive metaphors.
                                </p>
                                <blockquote className="border-l-4 border-amber-600/50 pl-6 space-y-4 text-stone-200 leading-relaxed">
                                    <p>
                                        The present study concerns itself with earthquakes; which, rather than being its objects, become the inspiration for its initiation. The earthquake is considered here not as an event to be grasped, but as that which makes a beginning in the limit between the no-longer and the not-yet. To be shaken by seismic waves is to be affected by immanence. Such a beginning does not coincide with an origin or an end; it resists capture. Those who claim to have grasped the earthquake have only grasped its debris.
                                    </p>
                                    <p>
                                        Earthquakes unsettle not only the foundations of buildings, but also the grounds upon which concepts stand. What is commonly called a fault line reveals itself less as a rupture than as a trace of fractality—an instability that traverses scales rather than separating them. It is in this sense that earthquakes make visible the problem of scale: how political, cultural, and epistemic formations are imagined as stable only by suppressing the turbulence that sustains them.
                                    </p>
                                    <p>
                                        It is from this disturbance that the notion of <em>cultural tectonics</em> is seized. While the term has been used to describe cultural change as analogous to plate movements, such analogies remain insufficient so long as they preserve the illusion of a stable ground upon which culture unfolds. Here, cultural tectonics is displaced from metaphor to operator. It names a condition in which culture, scale, and foundation are themselves in motion—where what appears solid is continuously reassembled through fractures, resonances, and shifts that exceed representation.
                                    </p>
                                    <p>
                                        From this condition emerges <em>seismopolitics</em>. Seismopolitics does not describe the politics of earthquakes, nor does it reduce politics to disaster. Rather, it names the analytic necessity of thinking political life from the perspective of instability.
                                    </p>
                                </blockquote>
                            </div>

                            <hr className="border-stone-600 my-8" />

                            {/* Excerpt 2 */}
                            <div id="excerpt-2" className="scroll-mt-24 mb-12">
                                <h3 className="text-xl font-bold text-stone-100 mb-3">Excerpt 2: Life in Disaster Housing Projects</h3>
                                <p className="text-stone-400 italic text-sm mb-4">
                                    This excerpt draws from fieldwork conducted in disaster housing projects, focusing on everyday routines and the temporal condition of "temporary" settlement after rupture.
                                </p>
                                <blockquote className="border-l-4 border-amber-600/50 pl-6 space-y-4 text-stone-200 leading-relaxed">
                                    <p>
                                        Life in the disaster housing projects unfolds through routines that are at once provisional and enduring. The housing units are described as temporary, yet the rhythms that emerge within them do not feel transitional. People wake, cook, clean, wait, and adjust to spaces that were never meant to hold the weight of everyday life for long.
                                    </p>
                                    <p>
                                        Much of daily life is structured around maintenance. Waiting becomes a shared condition: waiting for repairs, for information, for relocation, for an end point that remains undefined. Time is not marked by progress toward reconstruction, but by repetition and suspension.
                                    </p>
                                    <p>
                                        What appears as stability from the outside is sustained through continuous adjustment. Categories such as recovery or transition fail to capture the texture of this condition, which is neither emergency nor resolution. The ground does not continue to shake, yet instability persists.
                                    </p>
                                </blockquote>
                            </div>

                            <hr className="border-stone-600 my-8" />

                            {/* Excerpt 3 */}
                            <div id="excerpt-3" className="scroll-mt-24">
                                <h3 className="text-xl font-bold text-stone-100 mb-3">Excerpt 3: Non-Dwelling as Methodological Refusal</h3>
                                <p className="text-stone-400 italic text-sm mb-4">
                                    This excerpt draws from the section on non-dwelling, where the thesis articulates a methodological refusal to ground analysis in stable foundations or resolutions.
                                </p>
                                <blockquote className="border-l-4 border-amber-600/50 pl-6 space-y-4 text-stone-200 leading-relaxed">
                                    <p>
                                        Non-dwelling does not name a lack of home, nor a condition to be overcome. It names a methodological refusal. To dwell analytically—to seek firm foundations or definitive representations—would be to reproduce the violence of grounding that earthquakes themselves expose.
                                    </p>
                                    <p>
                                        Rather than assembling a totalizing account, the analysis proceeds through fragments, hesitations, and partial connections. What remains unresolved is not a failure of method, but an indication of its limits. The task is not to restore coherence where it has been lost, but to remain with the tremor.
                                    </p>
                                </blockquote>
                            </div>
                        </section>

                        <hr className="border-stone-500 my-12" />

                        {/* Method & Field Context */}
                        <section id="method--field-context" className="scroll-mt-24 mb-12">
                            <h2 className="text-2xl font-bold text-stone-100 mb-6">Method & Field Context</h2>

                            <div className="space-y-4 text-stone-200 leading-relaxed">
                                <p>
                                    Fieldwork was conducted in disaster-affected regions through sustained engagement with residents of post-earthquake housing projects. The research followed everyday practices rather than exceptional events, prioritizing duration, routine, and waiting as analytic sites.
                                </p>
                                <p>
                                    Methodologically, the thesis proceeds ethnographically while refusing explanatory closure. Analysis is shaped by constraint, fragmentation, and hesitation rather than synthesis.
                                </p>
                                <p className="text-stone-400 italic">
                                    What remains unresolved is treated not as absence but as condition.
                                </p>
                            </div>
                        </section>

                        <hr className="border-stone-500 my-12" />

                        {/* Media as Evidence */}
                        <section id="media-as-evidence" className="scroll-mt-24 mb-12">
                            <h2 className="text-2xl font-bold text-stone-100 mb-6">Media as Evidence</h2>

                            <p className="text-stone-300 italic">
                                Selected audiovisual and photographic works accompany the thesis as analytic artifacts, offering forms of attention unavailable to text alone.
                            </p>
                            {/* TODO: Add curated media items */}
                        </section>

                        <hr className="border-stone-500 my-12" />

                        {/* References & Citation */}
                        <section id="references--citation" className="scroll-mt-24 mb-12">
                            <h2 className="text-2xl font-bold text-stone-100 mb-6">References & Citation</h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-stone-100 font-bold mb-2">Suggested citation (APA)</h3>
                                    <p className="text-stone-200 font-mono text-sm">
                                        Camgöz, G. (2023). <em>Tremble lasts forever: Cultural tectonics and seismopolitics</em> (Master's thesis).
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-stone-100 font-bold mb-2">Keywords</h3>
                                    <p className="text-stone-300 font-mono text-sm">
                                        <code className="bg-stone-700/50 px-1 rounded">seismopolitics</code> · <code className="bg-stone-700/50 px-1 rounded">cultural tectonics</code> · <code className="bg-stone-700/50 px-1 rounded">non-dwelling</code> · <code className="bg-stone-700/50 px-1 rounded">disaster anthropology</code> · <code className="bg-stone-700/50 px-1 rounded">epistemic instability</code>
                                    </p>
                                </div>

                                <p className="text-stone-400 text-sm">
                                    <strong>Version note:</strong> Web edition v0.1 · Selective excerpts · Last updated 2026-01-21
                                </p>
                            </div>
                        </section>

                        <hr className="border-stone-500 my-12" />

                        {/* Bridge to AI Thesis */}
                        <section id="bridge-to-ai-thesis" className="scroll-mt-24 mb-12">
                            <h2 className="text-2xl font-bold text-stone-100 mb-6">Bridge to AI Thesis</h2>

                            <div className="space-y-4 text-stone-200 leading-relaxed">
                                <p>
                                    The questions that organize this thesis do not end with anthropology. They travel.
                                </p>
                                <p>
                                    At stake throughout this work is a concern with what happens when instability is treated as noise to be eliminated rather than as a condition to be reckoned with. This methodological refusal—<em>non-dwelling</em>—carries directly into my work on agentic AI systems, where scalar optimization often collapses complex judgment into single metrics.
                                </p>
                                <p>
                                    My AI research responds to this problem through vector-based evaluation frameworks that preserve multiplicity and constraint. The continuity between these projects is methodological: both ask how judgment can remain accountable to instability without mistaking it for failure.
                                </p>
                            </div>

                            <div className="mt-6">
                                <p className="text-stone-100 font-bold mb-2">Suggested next reading:</p>
                                <Link
                                    to="/ai/thesis"
                                    className="text-amber-300 hover:text-amber-200 underline underline-offset-2 font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded"
                                >
                                    → Vector Human-Critique-Informed Adversarial Scoring (Vector-HCAS): Architecture & Evaluation
                                </Link>
                            </div>
                        </section>
                    </article>
                </Section>

                {/* ═══════════════════════════════════════════════════════════════════ */}
                {/* SECONDARY: OTHER RESEARCH & WRITING                                  */}
                {/* ═══════════════════════════════════════════════════════════════════ */}
                <Section id="other-research">
                    <div className="max-w-5xl mx-auto">
                        {/* Visual Separator */}
                        <div className="flex items-center mb-12">
                            <div className="flex-1 h-px bg-stone-500"></div>
                            <span className="text-stone-400 font-mono text-sm px-4">Other Research & Writing</span>
                            <div className="flex-1 h-px bg-stone-500"></div>
                        </div>

                        <p className="text-stone-300 font-mono leading-relaxed text-sm mb-10">
                            Selected editorial and academic articles written in international media and academic
                            contexts, focusing on education, science, academia, and social inquiry.
                        </p>

                        {/* Articles Grid */}
                        <div className="grid md:grid-cols-2 gap-10">
                            <ArticleCard
                                title="Turkish government's measures on academia decrease research output"
                                source="140journos"
                                image={academia}
                                link="https://140journos.com/turkish-governments-measures-on-academia-decrease-research-output-3a54671a2434"
                            />

                            <ArticleCard
                                title="Turkey's Cumhuriyet journalists in terrorism trial"
                                source="140journos"
                                image={cumhuriyet}
                                link="https://140journos.com/turkey-starts-trying-cumhuriyet-journalists-61316bfda29d"
                            />

                            <ArticleCard
                                title="The banned theory: Evolution"
                                source="140journos"
                                image={evolution}
                                link="https://140journos.com/the-banned-theory-evolution-e772fa968339"
                            />

                            <ArticleCard
                                title="The cost of urban transformation for Turkey"
                                source="140journos"
                                image={urban}
                                link="https://140journos.com/cost-of-urban-transformation-for-turkey-33b01cd734d0"
                            />

                            <ArticleCard
                                title="Waking Life and Aesthetics of Liminality"
                                source="Diggit Magazine"
                                image={waking}
                                link="https://www.diggitmagazine.com/papers/waking-life-and-aesthetics-liminality"
                            />

                            <ArticleCard
                                title="Ethnographer's Digital Colleague: Prototyping a Reflexive AI Partner for Fieldwork Analysis"
                                source="Drive"
                                image={digital}
                                link="https://drive.google.com/file/d/16uWmqTIRL4ZF7WM5K-rpa1szMEyIkdRP/view?usp=sharing"
                            />
                        </div>
                    </div>
                </Section>
            </Layout>
        </>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/* SUBCOMPONENTS                                                                */
/* ═══════════════════════════════════════════════════════════════════════════ */

interface OperatorCardProps {
    name: string;
    definition: string;
    analyticFunction: string;
    excerptFragment: string;
}

const OperatorCard: React.FC<OperatorCardProps> = ({ name, definition, analyticFunction, excerptFragment }) => (
    <div className="space-y-2">
        <h3 className="text-lg font-bold text-stone-100">{name}</h3>
        <p className="text-stone-200 leading-relaxed">{definition}</p>
        <p className="text-stone-300 text-sm"><strong className="text-stone-100">Analytic function:</strong> {analyticFunction}</p>
        <p className="text-stone-400 text-sm italic">"{excerptFragment}"</p>
    </div>
);

interface ClaimCardProps {
    number: number;
    claim: string;
    destabilizes: string;
    makesPossible: string;
}

const ClaimCard: React.FC<ClaimCardProps> = ({ number, claim, destabilizes, makesPossible }) => (
    <div className="p-4 border-l-2 border-amber-600/50">
        <h3 className="text-stone-100 font-bold mb-2">Claim {number} — {claim}</h3>
        <p className="text-stone-300 text-sm"><strong className="text-stone-200">Destabilizes:</strong> {destabilizes}</p>
        <p className="text-stone-300 text-sm"><strong className="text-stone-200">Makes possible:</strong> {makesPossible}</p>
    </div>
);

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
            className="group block border border-stone-300 rounded-lg overflow-hidden hover:shadow-md transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
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
