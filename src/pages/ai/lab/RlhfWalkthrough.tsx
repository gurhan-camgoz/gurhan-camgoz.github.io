import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SeoHead } from '../../../components/shared/SeoHead';
import { AINav } from '../../../components/ai/AINav';
import { DemoShell } from '../../../components/ai/lab/DemoShell';
import { useDemoData, type DemoDataState } from '../../../components/ai/lab/useDemoData';
import { labDemos } from '../../../data/labDemos';
import { kMeans, type Point2D } from './kmeans';
import type { ClusteringData } from './FeedbackClusteringInteractive';
import {
    RLHF_SCENES,
    STAGE_VIEWBOX,
    type HistogramBin,
    type LossPoint,
    type MarginPoint,
    type RlhfScene,
    type ScatterPoint,
    type SeriesState,
    type StageCtx,
} from './rlhfScenes';

const demo = labDemos.find((d) => d.id === 'rlhf-pipeline-walkthrough')!;

/** Shapes of the static JSON files under public/data/pipeline/. */
interface SftLossFile {
    PLACEHOLDER?: boolean;
    series: LossPoint[];
}
interface ScoreHistogramFile {
    PLACEHOLDER?: boolean;
    bins: HistogramBin[];
}
interface IpoMarginsFile {
    PLACEHOLDER?: boolean;
    series: MarginPoint[];
}

function toSeries<F, T>(state: DemoDataState<F>, pick: (file: F) => T): SeriesState<T> {
    if (state.status === 'success') return { status: 'ready', data: pick(state.data) };
    return { status: state.status, data: null };
}

function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
    useEffect(() => {
        const mq = window.matchMedia(query);
        const listener = () => setMatches(mq.matches);
        mq.addEventListener('change', listener);
        return () => mq.removeEventListener('change', listener);
    }, [query]);
    return matches;
}

/**
 * Scroll-driven scene state: the active scene is the last step whose top has
 * crossed the reading line (60% down the viewport); progress is how far that
 * step has travelled past it. Pure function of scroll position, so scrolling
 * up reverses cleanly. Native scroll only; rAF-throttled, passive listener.
 */
function useScrollyScenes(count: number, enabled: boolean) {
    const stepRefs = useRef<(HTMLElement | null)[]>([]);
    const [state, setState] = useState({ active: 0, progress: 0 });

    useEffect(() => {
        if (!enabled) return;
        // Measured synchronously in the scroll handler: nine rect reads per
        // event is cheap, and rAF deferral can stall in throttled tabs.
        const measure = () => {
            const readingLine = window.innerHeight * 0.6;
            let active = 0;
            let progress = 0;
            stepRefs.current.forEach((el, i) => {
                if (!el) return;
                const rect = el.getBoundingClientRect();
                if (rect.top < readingLine) {
                    active = i;
                    progress = Math.min(1, Math.max(0, (readingLine - rect.top) / Math.max(rect.height, 1)));
                }
            });
            setState((prev) => (prev.active === active && prev.progress === progress ? prev : { active, progress }));
        };
        measure();
        window.addEventListener('scroll', measure, { passive: true });
        window.addEventListener('resize', measure);
        return () => {
            window.removeEventListener('scroll', measure);
            window.removeEventListener('resize', measure);
        };
    }, [enabled, count]);

    return { stepRefs, ...state };
}

function StageSvg({ children, label }: { children: React.ReactNode; label?: string }) {
    return (
        <svg
            viewBox={`0 0 ${STAGE_VIEWBOX.w} ${STAGE_VIEWBOX.h}`}
            className="w-full h-full"
            {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
        >
            {children}
        </svg>
    );
}

function SceneProse({
    scene,
    index,
    scrolly,
    ctx,
    refCallback,
}: {
    scene: RlhfScene;
    index: number;
    scrolly: boolean;
    ctx: StageCtx;
    refCallback: (el: HTMLElement | null) => void;
}) {
    return (
        <section
            id={scene.id}
            ref={refCallback}
            className={scrolly ? 'min-h-[85vh] flex flex-col justify-center py-10 scroll-mt-24' : 'py-8 scroll-mt-24'}
        >
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-slate-100">
                <span className="text-slate-500 mr-2">{index + 1} ·</span>
                {scene.heading}
            </h2>
            {scene.paragraphs.map((paragraph, j) => (
                <p key={j} className="text-sm text-slate-300 leading-relaxed mb-4">
                    {paragraph}
                </p>
            ))}
            {!scrolly && (
                <figure className="mt-4">
                    <div className="aspect-[4/3] border border-slate-800 rounded-lg bg-slate-900/50 overflow-hidden">
                        <StageSvg label={scene.caption}>
                            <scene.Stage progress={1} ctx={ctx} />
                        </StageSvg>
                    </div>
                    <figcaption className="text-[11px] text-slate-500 mt-2 leading-relaxed">{scene.caption}</figcaption>
                </figure>
            )}
        </section>
    );
}

function StickyStage({ scene, progress, ctx }: { scene: RlhfScene; progress: number; ctx: StageCtx }) {
    return (
        <div className="sticky top-24">
            <div className="aspect-[4/3] border border-slate-800 rounded-lg bg-slate-900/50 overflow-hidden">
            <StageSvg>
                    <g key={scene.id} className="rlhf-fade">
                        <scene.Stage progress={progress} ctx={ctx} />
                    </g>
                </StageSvg>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">{scene.caption}</p>
        </div>
    );
}

const WALL_INDEX = RLHF_SCENES.findIndex((s) => s.fullBleed);
const BEFORE_WALL = RLHF_SCENES.slice(0, WALL_INDEX);
const WALL_SCENE = RLHF_SCENES[WALL_INDEX];
const AFTER_WALL = RLHF_SCENES.slice(WALL_INDEX + 1);

export function RlhfWalkthrough() {
    const wide = useMediaQuery('(min-width: 900px)');
    const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
    // Reduced motion gets the mobile treatment at all widths: static final-state
    // figures inline, no sticky stage, no transitions.
    const scrolly = wide && !reducedMotion;

    const lossState = useDemoData<SftLossFile>('/data/pipeline/sft-loss.json');
    const histState = useDemoData<ScoreHistogramFile>('/data/pipeline/score-histogram.json');
    const marginState = useDemoData<IpoMarginsFile>('/data/pipeline/ipo-margins.json');
    // Scene 8 reuses the Clustering Playground's synthetic-tier points file.
    const clusterState = useDemoData<ClusteringData>('/data/clustering.json');

    // Subsample the 445 points for the stage and assign k=3 clusters once
    // (same k-means, fixed seed) rather than on every scroll frame.
    const scatterPoints = useMemo<ScatterPoint[] | null>(() => {
        if (clusterState.status !== 'success') return null;
        const points = clusterState.data.points.filter((_, i) => i % 3 === 0);
        const coords = points.map((p) => [p.x, p.y] as const as Point2D);
        const { assignments } = kMeans(coords, 3, 42);
        return points.map((p, i) => ({ x: p.x, y: p.y, cluster: assignments[i] }));
    }, [clusterState]);

    const ctx: StageCtx = {
        sftLoss: toSeries(lossState, (f) => f.series),
        scoreHistogram: toSeries(histState, (f) => f.bins),
        ipoMargins: toSeries(marginState, (f) => f.series),
        clusterPoints: scatterPoints
            ? { status: 'ready', data: scatterPoints }
            : { status: clusterState.status === 'error' ? 'error' : 'loading', data: null },
    };

    const { stepRefs, active, progress } = useScrollyScenes(RLHF_SCENES.length, scrolly);

    // Scene anchors (#mirror, #wall, #detour, ...) deep-link from Architecture
    // and Evaluation. Router navigation doesn't scroll to hashes on its own.
    const { hash } = useLocation();
    useEffect(() => {
        if (!hash) return;
        document.getElementById(hash.slice(1))?.scrollIntoView();
    }, [hash]);

    // Stage A serves scenes before the wall, stage B the ones after; each
    // clamps so it holds its edge state while the reader is elsewhere.
    const stageAIndex = Math.min(active, WALL_INDEX - 1);
    const stageAProgress = active < WALL_INDEX ? progress : 1;
    const stageBIndex = Math.max(active, WALL_INDEX + 1);
    const stageBProgress = active > WALL_INDEX ? progress : 0;
    const wallProgress = active < WALL_INDEX ? 0 : active > WALL_INDEX ? 1 : progress;

    const refCallback = (i: number) => (el: HTMLElement | null) => {
        stepRefs.current[i] = el;
    };

    return (
        <>
            <SeoHead
                title="RLHF Pipeline Walkthrough | AI Lab"
                description="A first-person walkthrough of an RLHF alignment pipeline for ethnographic reasoning: SFT on 511 curated examples, human feedback from 7 researchers, a 46.9% refusal of the binary, synthetic scaling, a 72.5% reward model, a PPO failure on a 15GB T4, an IPO pivot, and the k=3 cluster structure that argued for vector-valued alignment."
                path="/ai/lab/rlhf-walkthrough"
            />
            <div className="bg-transparent text-slate-50 font-mono selection:bg-blue-500/30">
                <AINav pageTitle="LAB :: RLHF_WALKTHROUGH" />

                <main className="container mx-auto px-6 py-20">
                    <DemoShell
                        wide
                        demoId={demo.id}
                        status={demo.status}
                        title={demo.title}
                        claim={demo.claim}
                        fieldnote="The essay version of §3 and §4: the alignment pipeline in the order it actually happened, failures included, with the numbers it actually produced."
                        repoUrl={demo.repoUrl}
                    >
                        {scrolly ? (
                            <>
                                {/* Scenes before the wall: two-column with sticky stage A.
                                    No items-start: the stage column must stretch to the full
                                    grid height or its sticky child has no room to travel. */}
                                <div className="grid grid-cols-2 gap-10">
                                    <div className="min-w-0 max-w-prose">
                                        {BEFORE_WALL.map((scene, i) => (
                                            <SceneProse key={scene.id} scene={scene} index={i} scrolly ctx={ctx} refCallback={refCallback(i)} />
                                        ))}
                                    </div>
                                    <div className="min-w-0">
                                        <StickyStage scene={RLHF_SCENES[stageAIndex]} progress={stageAProgress} ctx={ctx} />
                                    </div>
                                </div>

                                {/* The Wall: the one scene allowed to break the grid. Prose
                                    first, then a full-width near-black stage that pins while
                                    the gauge overflows and the error line cuts in. */}
                                <section id={WALL_SCENE.id} ref={refCallback(WALL_INDEX)} className="py-10 scroll-mt-24">
                                    <div className="max-w-prose">
                                        <h2 className="text-xl md:text-2xl font-bold mb-4 text-slate-100">
                                            <span className="text-slate-500 mr-2">{WALL_INDEX + 1} ·</span>
                                            {WALL_SCENE.heading}
                                        </h2>
                                        {WALL_SCENE.paragraphs.map((paragraph, j) => (
                                            <p key={j} className="text-sm text-slate-300 leading-relaxed mb-4">
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                    <div className="relative min-h-[130vh] mt-8">
                                        <div className="sticky top-24 h-[70vh] rounded-lg border border-slate-800 overflow-hidden bg-[#020617] flex items-center justify-center">
                                            <svg
                                                viewBox={`0 0 ${STAGE_VIEWBOX.w} ${STAGE_VIEWBOX.h}`}
                                                className="h-full w-auto max-w-full"
                                                aria-hidden
                                            >
                                                <WALL_SCENE.Stage progress={wallProgress} ctx={ctx} />
                                            </svg>
                                        </div>
                                        <p className="absolute bottom-0 text-[11px] text-slate-500 leading-relaxed">
                                            {WALL_SCENE.caption}
                                        </p>
                                    </div>
                                </section>

                                {/* Scenes after the wall: second two-column grid, sticky stage B. */}
                                <div className="grid grid-cols-2 gap-10">
                                    <div className="min-w-0 max-w-prose">
                                        {AFTER_WALL.map((scene, i) => (
                                            <SceneProse
                                                key={scene.id}
                                                scene={scene}
                                                index={WALL_INDEX + 1 + i}
                                                scrolly
                                                ctx={ctx}
                                                refCallback={refCallback(WALL_INDEX + 1 + i)}
                                            />
                                        ))}
                                    </div>
                                    <div className="min-w-0">
                                        <StickyStage scene={RLHF_SCENES[stageBIndex]} progress={stageBProgress} ctx={ctx} />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="max-w-prose">
                                {RLHF_SCENES.map((scene, i) => (
                                    <SceneProse key={scene.id} scene={scene} index={i} scrolly={false} ctx={ctx} refCallback={refCallback(i)} />
                                ))}
                            </div>
                        )}

                        {/* Sources: replaces the interactive demos' Methods & data disclosure. */}
                        <section className="mt-12 border-t border-slate-800 pt-6">
                            <h2 className="text-xs uppercase tracking-widest text-slate-500 mb-3">Sources</h2>
                            <ul className="text-xs text-slate-400 leading-relaxed space-y-1.5">
                                <li>Thesis §3 (SFT configuration, deployment, feedback study, synthetic scaling, reward model, PPO attempt, IPO) and §4 (clustering analysis, Vector-HCAS).</li>
                                <li>
                                    Training notebooks in the{' '}
                                    <a
                                        href={demo.repoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
                                    >
                                        thesis repo
                                    </a>{' '}
                                    (SFT and IPO runs).
                                </li>
                                <li>W&amp;B run for the IPO margin series: link pending (TODO: supply run URL).</li>
                                <li>
                                    Scene 8 displays synthetic-tier comment points (the Clustering Playground's data file);
                                    the k=3 structure and dimension percentages are cited from the human-inclusive analysis.
                                </li>
                                <li>
                                    Chart series marked as placeholders carry a PLACEHOLDER flag in{' '}
                                    <span className="text-slate-500">public/data/pipeline/</span> and will be swapped for
                                    exported logs; the table-derived numbers in the prose are from the thesis verbatim.
                                </li>
                            </ul>
                        </section>

                        {/* The hub: this page explains why each of the other demos exists. */}
                        <section className="mt-8 grid sm:grid-cols-2 gap-3">
                            {labDemos
                                .filter((d) => d.id !== demo.id && d.path)
                                .map((d) => (
                                    <Link
                                        key={d.id}
                                        to={d.path!}
                                        className="border border-slate-800 rounded-lg p-4 bg-slate-800/10 hover:border-blue-500/50 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                                    >
                                        <span className="block text-sm font-bold text-slate-200 group-hover:text-blue-300 transition-colors mb-1">
                                            {d.title}
                                        </span>
                                        <span className="block text-xs text-slate-400 leading-relaxed">{d.claim}</span>
                                    </Link>
                                ))}
                        </section>
                    </DemoShell>
                </main>
            </div>
        </>
    );
}

export default RlhfWalkthrough;
