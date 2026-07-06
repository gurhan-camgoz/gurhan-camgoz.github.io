/**
 * Plain-TypeScript k-means for the Feedback Clustering Playground.
 * n≈450 points in 2-D — small enough to run on every slider move.
 * Seeded RNG (mulberry32) so results are reproducible; k-means++ init.
 */

export type Point2D = readonly [number, number];

export interface KMeansResult {
    /** Cluster index per input point. */
    assignments: number[];
    centroids: Point2D[];
    /** Sum of squared distances to assigned centroids (SSE / inertia). */
    inertia: number;
    iterations: number;
}

/** Small, fast, seedable PRNG — good enough for centroid seeding. */
export function mulberry32(seed: number): () => number {
    let a = seed >>> 0;
    return () => {
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

function sqDist(a: Point2D, b: Point2D): number {
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    return dx * dx + dy * dy;
}

/** k-means++ seeding: each next centroid drawn ∝ squared distance to the nearest existing one. */
function kMeansPlusPlusInit(points: Point2D[], k: number, rand: () => number): Point2D[] {
    const centroids: Point2D[] = [points[Math.floor(rand() * points.length)]];
    while (centroids.length < k) {
        const d2 = points.map((p) => Math.min(...centroids.map((c) => sqDist(p, c))));
        const total = d2.reduce((s, x) => s + x, 0);
        if (total === 0) {
            centroids.push(points[Math.floor(rand() * points.length)]);
            continue;
        }
        let target = rand() * total;
        let idx = 0;
        while (target > d2[idx] && idx < points.length - 1) {
            target -= d2[idx];
            idx++;
        }
        centroids.push(points[idx]);
    }
    return centroids;
}

function runOnce(points: Point2D[], k: number, rand: () => number, maxIterations: number): KMeansResult {
    let centroids = kMeansPlusPlusInit(points, k, rand);
    let assignments = new Array<number>(points.length).fill(-1);
    let iterations = 0;

    for (; iterations < maxIterations; iterations++) {
        let changed = false;
        const next = points.map((p, i) => {
            let best = 0;
            let bestD = Infinity;
            centroids.forEach((c, j) => {
                const dist = sqDist(p, c);
                if (dist < bestD) {
                    bestD = dist;
                    best = j;
                }
            });
            if (best !== assignments[i]) changed = true;
            return best;
        });
        assignments = next;
        if (!changed && iterations > 0) break;

        const sums = Array.from({ length: k }, () => [0, 0, 0]); // x, y, count
        points.forEach((p, i) => {
            const s = sums[assignments[i]];
            s[0] += p[0];
            s[1] += p[1];
            s[2] += 1;
        });
        centroids = sums.map((s) => {
            if (s[2] === 0) {
                // Empty cluster: re-seed on the point farthest from its centroid.
                let farIdx = 0;
                let farD = -1;
                points.forEach((p, i) => {
                    const dist = sqDist(p, centroids[assignments[i]]);
                    if (dist > farD) {
                        farD = dist;
                        farIdx = i;
                    }
                });
                return points[farIdx];
            }
            return [s[0] / s[2], s[1] / s[2]] as Point2D;
        });
    }

    const inertia = points.reduce((s, p, i) => s + sqDist(p, centroids[assignments[i]]), 0);
    return { assignments, centroids, inertia, iterations };
}

/** Best of `restarts` runs (lowest inertia), all derived deterministically from `seed`. */
export function kMeans(points: Point2D[], k: number, seed: number, restarts = 3, maxIterations = 100): KMeansResult {
    let best: KMeansResult | null = null;
    for (let r = 0; r < restarts; r++) {
        const result = runOnce(points, k, mulberry32(seed * 7919 + r), maxIterations);
        if (!best || result.inertia < best.inertia) best = result;
    }
    return best!;
}

/** SSE for each k in [kMin, kMax] — the elbow curve, computed live. */
export function elbowCurve(points: Point2D[], kMin: number, kMax: number, seed: number): { k: number; inertia: number }[] {
    const curve: { k: number; inertia: number }[] = [];
    for (let k = kMin; k <= kMax; k++) {
        curve.push({ k, inertia: kMeans(points, k, seed).inertia });
    }
    return curve;
}
