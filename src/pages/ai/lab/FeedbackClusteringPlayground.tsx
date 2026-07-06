import { SeoHead } from '../../../components/shared/SeoHead';
import { AINav } from '../../../components/ai/AINav';
import { DemoShell } from '../../../components/ai/lab/DemoShell';
import { DemoDataBoundary } from '../../../components/ai/lab/DemoDataBoundary';
import { useDemoData } from '../../../components/ai/lab/useDemoData';
import { labDemos } from '../../../data/labDemos';

const demo = labDemos.find((d) => d.id === 'feedback-clustering-playground')!;

export interface ClusterPoint {
    id: string;
    x: number;
    y: number;
    comment: string;
    topTerms: string[];
}

export interface ClusteringData {
    points: ClusterPoint[];
    precomputed: { tfidfNote: string };
}

/**
 * Data wiring (skeleton / error / success via DemoDataBoundary) is live now,
 * pointed at the eventual data file. The 2-D scatter, k slider, live
 * k-means, and elbow plot land in Phase 4 — see
 * src/components/ai/lab/README.md.
 */
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
                        fieldnote="Reproduces the clustering analysis from §4.4.3 — a k=3 empirical structure beneath the five-dimensional theoretical framework — across the 512-entry master dataset (64 human + 448 synthetic)."
                        repoUrl={demo.repoUrl}
                        methodsAndData={
                            <>
                                <p>
                                    <span className="text-slate-300">Precomputed:</span> TF-IDF vectorization and
                                    PCA dimensionality reduction on feedback comments, done offline in Python and
                                    shipped here as 2-D coordinates.
                                </p>
                                <p>
                                    <span className="text-slate-300">Live:</span> k-means clustering itself
                                    (k-means++ init, seeded RNG for reproducibility) and the elbow-plot
                                    sum-of-squared-distances curve, both recomputed in your browser as you move
                                    the k slider.
                                </p>
                                <p>
                                    <span className="text-slate-300">Anonymized:</span> feedback comments have
                                    participant names and other identifying details stripped before publication.
                                </p>
                            </>
                        }
                    >
                        <DemoDataBoundary state={dataState} repoUrl={demo.repoUrl} minHeight="min-h-80">
                            {(data) => (
                                <div className="border border-slate-800 rounded-lg p-6 bg-slate-800/20 text-sm text-slate-400">
                                    Loaded {data.points.length} points. The 2-D scatter, k slider, live k-means,
                                    and elbow plot land in Phase 4.
                                </div>
                            )}
                        </DemoDataBoundary>
                    </DemoShell>
                </main>
            </div>
        </>
    );
}

export default FeedbackClusteringPlayground;
