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
        demo?: string;
        thesis?: string;
        article?: string;
    };
    icon: LucideIcon;
}

export const aiProjects: AIProject[] = [
    {
        id: 'thesis-system',
        title: 'Beyond the Academic Mirror — Thesis System',
        roleInSystem: 'End-to-end pipeline: Orchestration + Alignment + Data + Training + Deployment',
        description: [
            'Agentic LLM system for interpretive reasoning with multi-dimensional alignment (Vector-HCAS)',
            'Human-in-the-loop evaluation with qualitative, dimension-specific feedback',
            'LoRA/QLoRA fine-tuning under compute constraints; Docker + GCP deployment',
        ],
        status: 'COMPLETED',
        stack: ['Python', 'React', 'Transformers', 'Docker', 'GCP'],
        links: {
            repo: 'https://github.com/gurhan-camgoz/ethno-colleague-llm',
            demo: 'TBD',
            thesis: '/master_theses/MasterThesis_AI_GurhanCamgoz.pdf',
        },
        icon: BookOpen,
    },
    {
        id: 'feedback-interface',
        title: 'Human Feedback Collection Interface',
        roleInSystem: 'Interface + Evaluation layer',
        description: [
            'Lightweight web interface for structured qualitative evaluation',
            'Collects dimension-specific feedback (Narrative Discipline, Productive Defamiliarization, Analytical Grounding)',
            'Criteria emerge from participant perspectives, not imposed metrics',
        ],
        status: 'ACTIVE',
        stack: ['React', 'Python', 'FastAPI'],
        links: {
            repo: 'https://github.com/gurhan-camgoz/ethno-colleague-llm/tree/main/web-app',
            demo: 'TBD',
        },
        icon: MessageSquare,
    },
    {
        id: 'synthetic-finetuning',
        title: 'Synthetic Data + Fine-Tuning Pipeline',
        roleInSystem: 'Data + Training/Adaptation layer',
        description: [
            'Human-seeded synthetic data generation informed by clustering analysis',
            'Preserves diversity across feedback patterns; avoids dominant-style overfitting',
            'LoRA/QLoRA parameter-efficient fine-tuning for limited GPU memory',
        ],
        status: 'EXPERIMENTAL',
        stack: ['Python', 'PEFT', 'Transformers', 'scikit-learn'],
        links: {
            repo: 'https://github.com/gurhan-camgoz/ethno-colleague-llm/tree/main/sft-files',
            article: '/master_theses/Ethnographers-Digital-Colleague-Gurhan-Camgoz.pdf',
        },
        icon: Database,
    },
];
