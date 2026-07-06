import type { ReactElement } from 'react';
import {
    Scene1Stage,
    Scene2Stage,
    Scene3Stage,
    Scene4Stage,
    Scene5Stage,
    Scene6Stage,
    Scene7Stage,
    Scene8Stage,
    Scene9Stage,
    type StageProps,
} from './rlhfStages';

export type {
    LossPoint,
    HistogramBin,
    MarginPoint,
    ScatterPoint,
    SeriesState,
    StageCtx,
    StageProps,
} from './rlhfStages';

/**
 * Scene registry for the RLHF Pipeline Walkthrough: the essay prose (which
 * carries the page) plus a reference to each scene's Stage renderer from
 * rlhfStages.tsx.
 */
export interface RlhfScene {
    id: string;
    heading: string;
    paragraphs: string[];
    /** Small mono provenance caption shown with the figure. */
    caption: string;
    /** The Wall breaks the two-column grid: full-width, near-black beat. */
    fullBleed?: boolean;
    Stage: (props: StageProps) => ReactElement;
}

export const STAGE_VIEWBOX = { w: 640, h: 480 };

export const RLHF_SCENES: RlhfScene[] = [
    {
        id: 'mirror',
        heading: 'The Mirror',
        paragraphs: [
            "I began where the textbooks begin: supervised fine-tuning. I curated 511 examples around Spradley's question taxonomy, the ethnographer's old interview scaffolding repurposed as training data: 37.8% descriptive questions, 34.4% structural, 27.8% contrast. Then I fine-tuned Mistral-7B-Instruct-v0.3 with QLoRA: 4-bit quantization, LoRA rank 16, alpha 32, adapters on the attention projections, three epochs at a learning rate of 2e-4. It worked the way the papers promise. Training loss fell from 1.77 to 0.83, and the model began to sound like an anthropologist.",
            'That was the problem. It sounded like an anthropologist the way a mirror looks like a room. It had learned the register of the disciplinary canon without anything I could honestly call judgment. I had built a competent mirror, and a mirror was never the point. To find out whether it could think with someone, I had to put it in front of people whose thinking I trusted.',
        ],
        caption: 'fig: SFT loss and Spradley taxonomy mix · source: thesis §3 · loss series is a flagged placeholder pending notebook export',
        Stage: Scene1Stage,
    },
    {
        id: 'contact',
        heading: 'Contact',
        paragraphs: [
            'Getting a 7B model in front of seven working researchers taught me that deployment is a second fieldwork site, with worse informants. The model spoke fluent ethnography but not fluent JSON: the wrapper schema rejected its answers. The Docker image I built on my laptop was arm64; the cloud wanted amd64, and every correction meant a multi-gigabyte rebuild. IAM denied me permissions I could not see, for reasons it would not name. Infrastructure has its own culture, and I entered it the way anthropologists usually enter: by getting things wrong in public.',
            'Then, for one week, it was simply up: an endpoint, online, and seven researchers reading paired responses to real ethnographic vignettes and telling me which they would want as a colleague. Sixty-four feedback instances came back. Small by industry standards, but every one was a judgment I could interrogate, from a person I could ask.',
        ],
        caption: 'fig: deployment event sequence (illustrative order) · source: thesis §3',
        Stage: Scene2Stage,
    },
    {
        id: 'refusal',
        heading: 'The Refusal',
        paragraphs: [
            'The interface followed the standard RLHF script: response A, response B, pick one. I had added a third button almost as a courtesy, labeled "Ambiguous." The participants turned the courtesy into a finding. Of 64 judgments, A won 20 and B won 14. "Ambiguous" won 30, or 46.9%, the largest single outcome in the study.',
            "The obvious reading is indecision. The comments refuse it. Within the ambiguous selections, 63.3% said both responses were poor. Not \"I can't choose\" but \"you've given me nothing worth choosing.\" Another 23.3% marked cases where a response never arrived at all. These were researchers doing exactly what I asked: evaluating carefully. It was the format that assumed every pair contains a winner. Nearly half the time, my participants looked at the binary and declined it. Preference learning treats the human as an oracle that emits bits. Mine kept emitting arguments.",
        ],
        caption: 'fig: selection distribution, n=64 · source: thesis §3.3',
        Stage: Scene3Stage,
    },
    {
        id: 'flattening',
        heading: 'The Flattening',
        paragraphs: [
            'Sixty-four judgments cannot train a reward model, so I did what the field does: I scaled synthetically. A human-seeded pipeline generated 448 new items in the image of the original 64, for 512 in total. To score them I wrote a "Reflexive Critic", a prompted judge rewarding what my participants had rewarded (the Insightful Analyst, who grounds and reframes) and penalizing what they had penalized (the Narrative Hijacker, who abandons your fieldnote to write fiction).',
            "Then came the violent part. Every response, whatever its discipline, groundedness, or ethical attention, became a single number: 1,024 (prompt, response, score) triplets. The distribution came out bimodal, mean 4.09, median 3.00. A pile of failures, a pile of successes, and almost nothing in between. Nobody decided judgment was one-dimensional. The pipeline's next stage simply couldn't eat anything else.",
        ],
        caption: 'fig: five dimensions collapsing to one scalar; score histogram (n=1,024) · source: thesis §3 · histogram bins are a flagged placeholder shaped to the real mean/median',
        Stage: Scene4Stage,
    },
    {
        id: 'illusion',
        heading: 'The Illusion of Success',
        paragraphs: [
            'On that flattened diet I trained a reward model: same Mistral base, QLoRA again, one free Kaggle T4, about four and a half hours. It converged politely and scored 72.5% validation accuracy.',
            "I know what that number does in a slide deck. It is the moment the pipeline looks like it is working: a model that knows what good ethnographic reasoning is, to one decimal place. The competence is real. But hold the number against the histogram behind it. The reward model is 72.5% accurate at reproducing the flattening, at ranking scalar shadows of judgments that were never scalar. The measure had quietly become the target's understudy. This is the most instructive failure in the pipeline, because nothing about it looks like failure.",
        ],
        caption: 'fig: 72.5% validation accuracy over the score distribution it learned · source: thesis §3',
        Stage: Scene5Stage,
    },
    {
        id: 'wall',
        heading: 'The Wall',
        paragraphs: [
            'PPO is the canonical next step, and PPO has a non-negotiable appetite: the policy being trained and a frozen reference copy, resident in memory together. Two 7-billion-parameter models. One 15GB T4.',
            'It never reached step one. CUDA out of memory: not mid-training, no warning signs, the arithmetic simply refused. Vertex AI had already given its answer when I asked for a bigger machine: RESOURCE_EXHAUSTED. Colab\'s answer was a usage cap. For an independent researcher on free-tier compute, the industry-standard alignment method was not difficult. It was priced out of existence. I had read about the accessibility gap in the critical literature. It is different to hit it with your forehead. Who gets to align models is not a rhetorical question. It has a numeric answer, denominated in gigabytes of VRAM, and that week the answer did not include me.',
        ],
        caption: 'fig: two 7B models against a 15GB T4 · source: thesis §3',
        fullBleed: true,
        Stage: Scene6Stage,
    },
    {
        id: 'detour',
        heading: 'The Detour',
        paragraphs: [
            'The way around the wall was to stop holding a reward model in memory at all. IPO, run through the DPOTrainer with loss_type="ipo" and β=0.1, optimizes directly on preference pairs, with a squared-error loss that stays sensitive to how hard each pair is instead of saturating once it gets the order right. One model in memory. Three epochs, about seven hours, on the same single T4 that PPO had refused.',
            'It trained. Loss fell from 25.0 to around 21.2, and the reward margins, the gap between what the model assigns the chosen response and the rejected one, climbed steadily. A calibrated, honest, compute-poor success. But I want to keep my own books honest too. IPO changed how the preference signal is consumed, not what it is. Under the improved loss curve sits the same collapsed bit, chosen and rejected, that my participants had spent a week refusing.',
        ],
        caption: 'fig: IPO reward margin (chosen − rejected), placeholder series pending W&B export · loss endpoints from thesis §3',
        Stage: Scene7Stage,
    },
    {
        id: 'always-there',
        heading: 'What Was Always There',
        paragraphs: [
            'So I went back to the only place the multi-dimensionality had survived: the comments. Of the 64 feedback instances, 47 carried substantive written critique through filtering. I ran TF-IDF over them and clustered with k-means. The elbow settled at k=3, with a slow slide toward five.',
            "Three modes of evaluation: response quality and context handling; the balance of analytical against narrative work; the competence of the model's questioning. Beneath them, the five dimensions I had theorized turned out to be hierarchically present, not uniformly: Narrative Discipline in 50.8% of comments, Productive Defamiliarization in 43.0%, Analytical Grounding in 42.0%, then a long drop to Ethical Scrutiny at 8.8% and Creative Synthesis at 6.1%. The structure the pipeline had spent five stages flattening had been sitting in the comment box the whole time, waiting to be read as data rather than exhaust.",
        ],
        caption: 'fig: synthetic-tier comment points settling into k=3 clusters; dimension presence · cited statistics from the human-inclusive analysis · source: thesis §4',
        Stage: Scene8Stage,
    },
    {
        id: 'coda',
        heading: 'Coda: Vector-HCAS',
        paragraphs: [
            'The honest summary of this pipeline is that its failures were its findings. The refusal of the binary, the bimodal scores, the wall, the scalar detour: each is the same fact in different clothes. Human judgment about interpretive work arrives as a vector, and standard alignment stores it as a scalar.',
            'Vector-HCAS is my name for taking the vector seriously: alignment scored along five dimensions rather than one. Three robust core dimensions show up almost everywhere (narrative discipline, productive defamiliarization, analytical grounding); two emergent ones (ethical scrutiny, creative synthesis) surface when the material calls for them, and a scalar average would erase them entirely. That is the argument. The rest of this Lab lets you check it with your own hands: collapse a judgment yourself in the Preference Collapse Explorer, re-run the clustering in the Playground, and eventually argue with the Digital Colleague this pipeline was trying to build.',
        ],
        caption: 'fig: one axis becoming five: Vector-HCAS, core solid, emergent dashed · source: thesis §4',
        Stage: Scene9Stage,
    },
];
