import { SeoHead } from '../../../components/shared/SeoHead';
import { AINav } from '../../../components/ai/AINav';
import { DemoShell } from '../../../components/ai/lab/DemoShell';
import { DemoDataBoundary } from '../../../components/ai/lab/DemoDataBoundary';
import { useDemoData } from '../../../components/ai/lab/useDemoData';
import { labDemos } from '../../../data/labDemos';
import {
    FeedbackClusteringInteractive,
    type ClusteringData,
} from './FeedbackClusteringInteractive';

const demo = labDemos.find((d) => d.id === 'feedback-clustering-playground')!;

const PIPELINE_URL =
    'https://github.com/gurhan-camgoz/ethno-colleague-llm/blob/main/data-scaling/synthetic_data_generator.py';

export function FeedbackClusteringPlayground() {
    const dataState = useDemoData<ClusteringData>('/data/clustering.json');

    return (
        <>
            <SeoHead
                title="Feedback Clustering Playground | AI Lab"
                description={demo.claim}
                path="/ai/lab/feedback-clustering-playground"
            />
            <div className="bg-transparent text-slate-50 font-mono selection:bg-blue-500/30">
                <AINav pageTitle="LAB :: CLUSTERING" />

                <main className="container mx-auto px-6 py-20">
                    <DemoShell
                        demoId={demo.id}
                        status={demo.status}
                        title={demo.title}
                        claim={demo.claim}
                        fieldnote="Reproduces the clustering analysis from §4.4.3: five theorized dimensions, but a k=3 empirical structure — dimensional compression. The cited structure comes from the human-inclusive analysis of the 512-entry master dataset; the points you're clustering here are the synthetic tier."
                        repoUrl={demo.repoUrl}
                        methodsAndData={
                            <>
                                <p>
                                    <span className="text-slate-300">Displayed — synthetic tier only:</span> every
                                    point is a feedback comment from the 448-entry synthetic tier of the thesis
                                    dataset. The 64 human-participant comments are never displayed: they came from 7
                                    participants in a small academic network, and verbatim display risks
                                    re-identification. A pattern screen also excluded any comment resembling a name,
                                    email, phone number, or URL.
                                </p>
                                <p>
                                    <span className="text-slate-300">Cited:</span> the k=3 cluster structure, its
                                    three names, and the five dimension-presence percentages are findings from the
                                    thesis's human-inclusive analysis, quoted as results only.
                                </p>
                                <p>
                                    <span className="text-slate-300">Processing:</span> TF-IDF vectorization and 2-D
                                    PCA were computed offline by the author's preprocessing script
                                    (scripts/prepare-clustering-data.ts) and shipped as static coordinates and
                                    per-comment top terms.
                                </p>
                                <p>
                                    <span className="text-slate-300">Live vs. precomputed:</span> k-means itself
                                    (k-means++ init, seeded RNG, best-of-3 restarts) and the elbow curve are
                                    recomputed in your browser every time you move the k slider or re-run. Everything
                                    else is precomputed static JSON.
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
                                data.points.length === 0 ? (
                                    <div className="border border-slate-800 rounded-lg p-6 bg-slate-800/20 text-sm text-slate-400">
                                        No points in the data file yet — see the{' '}
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
                                    <FeedbackClusteringInteractive data={data} />
                                )
                            }
                        </DemoDataBoundary>
                    </DemoShell>
                </main>
            </div>
        </>
    );
}

export default FeedbackClusteringPlayground;
