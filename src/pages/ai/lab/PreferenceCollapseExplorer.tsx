import { SeoHead } from '../../../components/shared/SeoHead';
import { AINav } from '../../../components/ai/AINav';
import { DemoShell } from '../../../components/ai/lab/DemoShell';
import { DemoDataBoundary } from '../../../components/ai/lab/DemoDataBoundary';
import { useDemoData } from '../../../components/ai/lab/useDemoData';
import { labDemos } from '../../../data/labDemos';
import {
    PreferenceCollapseInteractive,
    type PreferenceExplorerData,
} from './PreferenceCollapseInteractive';

const demo = labDemos.find((d) => d.id === 'preference-collapse-explorer')!;

const PIPELINE_URL =
    'https://github.com/gurhan-camgoz/ethno-colleague-llm/blob/main/data-scaling/synthetic_data_generator.py';

export function PreferenceCollapseExplorer() {
    const dataState = useDemoData<PreferenceExplorerData>('/data/preference-explorer.json');

    return (
        <>
            <SeoHead
                title="Preference Collapse Explorer | AI Lab"
                description={demo.claim}
                path="/ai/lab/preference-collapse-explorer"
            />
            <div className="bg-transparent text-slate-50 font-mono selection:bg-blue-500/30">
                <AINav pageTitle="LAB :: PREFERENCE_COLLAPSE" />

                <main className="container mx-auto px-6 py-20">
                    <DemoShell
                        demoId={demo.id}
                        status={demo.status}
                        title={demo.title}
                        claim={demo.claim}
                        fieldnote="Reproduces the binary-collapse finding from §3.3 — 46.9% of 64 real judgments came back 'Ambiguous' — and the dimensional-reweighting argument from §4.4 (Vector-HCAS)."
                        repoUrl={demo.repoUrl}
                        methodsAndData={
                            <>
                                <p>
                                    <span className="text-slate-300">Displayed — synthetic tier only:</span> every
                                    vignette, response, and annotation on this page comes from the 448-entry synthetic
                                    tier of the thesis dataset. The human feedback came from 7 participants in a small
                                    academic network; verbatim display risks re-identification, so the interactive
                                    layer uses the study's synthetic tier. No human vignette, response, or feedback
                                    comment ships in this demo's data.
                                </p>
                                <p>
                                    <span className="text-slate-300">Cited:</span> the human-study findings — 64
                                    judgments, 7 participants, 46.9% "Ambiguous" — appear here as statistics only.
                                </p>
                                <p>
                                    <span className="text-slate-300">Scoring:</span> the per-dimension scores (0–10 per
                                    response) were assigned by the author during curation, following the thesis coding
                                    rubric. They are illustrative, not study data.
                                </p>
                                <p>
                                    <span className="text-slate-300">Live vs. precomputed:</span> the weighted scalar
                                    reward and the A/B winner are recomputed in your browser on every slider move.
                                    Everything else — items, default scores, annotations — is precomputed static JSON.
                                </p>
                                <p>
                                    <span className="text-slate-300">Source:</span>{' '}
                                    <a
                                        href={demo.repoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                                    >
                                        thesis repo
                                    </a>{' '}
                                    ·{' '}
                                    <a
                                        href={PIPELINE_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                                    >
                                        synthetic generation pipeline (synthetic_data_generator.py)
                                    </a>
                                </p>
                            </>
                        }
                    >
                        <DemoDataBoundary state={dataState} repoUrl={demo.repoUrl} minHeight="min-h-80">
                            {(data) =>
                                data.items.length === 0 ? (
                                    <div className="border border-slate-800 rounded-lg p-6 bg-slate-800/20 text-sm text-slate-400">
                                        No vignettes in the data file yet — see the{' '}
                                        <a
                                            href={demo.repoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:underline"
                                        >
                                            thesis repo
                                        </a>{' '}
                                        for the underlying dataset.
                                    </div>
                                ) : (
                                    <PreferenceCollapseInteractive data={data} />
                                )
                            }
                        </DemoDataBoundary>
                    </DemoShell>
                </main>
            </div>
        </>
    );
}

export default PreferenceCollapseExplorer;
