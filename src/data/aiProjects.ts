import { BookOpen, MessageSquare, Database } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface AIProject {
    id: string;
    title: string;
    roleInSystem: string;
    description: string[];
    status: 'COMPLETED' | 'ACTIVE' | 'EXPERIMENTAL';
    stack: string[];
    links: {
        repo?: string;
        /** Internal Lab route (starts with /ai) or external URL. */
        demo?: string;
        thesis?: string;
        article?: string;
    };
    icon: LucideIcon;
}

/**
 * The real system components the Lab demos are built from. Each maps to a
 * layer of the architecture and links to the Lab demo that makes its
 * argument interactive.
 */
export const aiProjects: AIProject[] = [
    {
        id: 'thesis-system',
        title: 'Beyond the Academic Mirror: Thesis System',
        roleInSystem: 'End-to-end pipeline: Orchestration + Alignment + Data + Training + Deployment',
        description: [
            'Agentic LLM system for interpretive reasoning with multi-dimensional alignment (Vector-HCAS, 5 dimensions)',
            'SFT on 511 curated examples (QLoRA, 4-bit); reward model at 72.5% validation accuracy; IPO after PPO exceeded the 15GB VRAM budget',
            'Docker + GCP deployment; evaluated live by 7 researchers over one week',
        ],
        status: 'COMPLETED',
        stack: ['Python', 'React', 'Transformers', 'Docker', 'GCP'],
        links: {
            repo: 'https://github.com/gurhan-camgoz/ethno-colleague-llm',
            demo: '/ai/lab/rlhf-walkthrough',
            thesis: '/master_theses/MasterThesis_AI_GurhanCamgoz.pdf',
        },
        icon: BookOpen,
    },
    {
        id: 'feedback-interface',
        title: 'Human Feedback Collection Interface',
        roleInSystem: 'Interface + Evaluation layer',
        description: [
            'Web interface for structured A/B evaluation of paired model responses, with a third "Ambiguous" option',
            'Collected 64 feedback instances from 7 researchers during one week live on GCP',
            '46.9% of judgments chose "Ambiguous": participants resisting the binary format itself',
        ],
        status: 'COMPLETED',
        stack: ['React', 'Python', 'FastAPI'],
        links: {
            repo: 'https://github.com/gurhan-camgoz/ethno-colleague-llm/tree/main/web-app',
            demo: '/ai/lab/preference-collapse-explorer',
        },
        icon: MessageSquare,
    },
    {
        id: 'synthetic-finetuning',
        title: 'Synthetic Data + Fine-Tuning Pipeline',
        roleInSystem: 'Data + Training/Adaptation layer',
        description: [
            'Human-seeded generation: 448 synthetic items from the 64-instance seed set (512-entry master dataset)',
            'Clustering analysis (k=3 beneath the 5-dimension framework) informed diversity preservation',
            'Its synthetic tier is the only data shipped publicly; it powers every Lab demo',
        ],
        status: 'COMPLETED',
        stack: ['Python', 'PEFT', 'Transformers', 'scikit-learn'],
        links: {
            repo: 'https://github.com/gurhan-camgoz/ethno-colleague-llm/tree/main/sft-files',
            demo: '/ai/lab/feedback-clustering-playground',
            article: '/master_theses/Ethnographers-Digital-Colleague-Gurhan-Camgoz.pdf',
        },
        icon: Database,
    },
];
