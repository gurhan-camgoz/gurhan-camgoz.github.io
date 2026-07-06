/**
 * Lab Demo Registry
 *
 * Mirrors the aiProjects.ts pattern: a flat, typed, data-driven array.
 * `/ai/lab` renders cards from this list. Live/building demos link to a
 * real route; planned demos render greyed with a "planned" badge and no
 * link — the roadmap is part of the story.
 *
 * See src/components/ai/lab/README.md for how to add a new demo.
 */

export type DemoStatus = 'live' | 'building' | 'planned';

export interface LabDemo {
    id: string;
    title: string;
    /** One sentence: the argument this demo makes you feel, not just read. */
    claim: string;
    status: DemoStatus;
    /** Thesis section(s) this demo reproduces. Empty string if forward-looking. */
    thesisRef: string;
    repoUrl: string;
    tags: string[];
    /** Route path. Present only once the demo page actually exists. */
    path?: string;
}

export const labDemos: LabDemo[] = [
    {
        id: 'preference-collapse-explorer',
        title: 'Preference Collapse Explorer',
        claim:
            'A single A/B click collapses five dimensions of human judgment into one bit — re-weight them and watch the winner flip.',
        status: 'live',
        thesisRef: '§3.3 / §4.4',
        repoUrl: 'https://github.com/gurhan-camgoz/ethno-colleague-llm',
        tags: ['RLHF', 'preference-learning', 'Vector-HCAS', 'interpretability'],
        path: '/ai/lab/preference-collapse-explorer',
    },
    {
        id: 'feedback-clustering-playground',
        title: 'Feedback Clustering Playground',
        claim:
            'Five theoretical dimensions collapse into three empirical clusters — run k-means yourself on real feedback comments.',
        // NOTE: flips to 'live' at the end of Phase 4, once the interactive build lands.
        status: 'building',
        thesisRef: '§4.4.3',
        repoUrl: 'https://github.com/gurhan-camgoz/ethno-colleague-llm',
        tags: ['clustering', 'TF-IDF', 'k-means', 'interpretability'],
        path: '/ai/lab/feedback-clustering-playground',
    },
    {
        id: 'digital-colleague',
        title: 'Digital Colleague',
        claim:
            'A chat interface onto the fine-tuned model itself — closing the loop from critique back to a working collaborator.',
        status: 'planned',
        thesisRef: '',
        repoUrl: 'https://github.com/gurhan-camgoz/ethno-colleague-llm',
        tags: ['deployment', 'inference'],
    },
    {
        id: 'rlhf-pipeline-walkthrough',
        title: 'RLHF Pipeline Walkthrough',
        claim:
            'SFT → reward model → PPO (failed on VRAM) → IPO pivot — the pipeline that actually happened, step by step.',
        status: 'planned',
        thesisRef: '§3.1–§4.3',
        repoUrl: 'https://github.com/gurhan-camgoz/ethno-colleague-llm',
        tags: ['RLHF', 'PPO', 'IPO', 'pipeline'],
    },
];
