import { useEffect, useState } from 'react';

export type DemoDataState<T> =
    | { status: 'loading' }
    | { status: 'error'; message: string }
    | { status: 'success'; data: T };

/**
 * Fetches a static JSON file from /public/data/* — every Lab demo is fully
 * client-side, so this is always a same-origin `fetch`, never an API call.
 * No caching beyond the browser's own: these files are small and static.
 */
export function useDemoData<T>(path: string): DemoDataState<T> {
    const [state, setState] = useState<DemoDataState<T>>({ status: 'loading' });

    useEffect(() => {
        let cancelled = false;
        setState({ status: 'loading' });

        fetch(path)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`${res.status} ${res.statusText}`);
                }
                return res.json() as Promise<T>;
            })
            .then((data) => {
                if (!cancelled) setState({ status: 'success', data });
            })
            .catch((err: unknown) => {
                if (!cancelled) {
                    const message = err instanceof Error ? err.message : 'Failed to load demo data';
                    setState({ status: 'error', message });
                }
            });

        return () => {
            cancelled = true;
        };
    }, [path]);

    return state;
}
