import type { DemoStatus } from '../../../data/labDemos';

/**
 * Shared status → style/label mapping used by the Lab index cards and
 * DemoShell's eyebrow badge, so the two never drift apart.
 */
export const statusStyles: Record<DemoStatus, string> = {
    live: 'text-teal-300 bg-teal-400/10 border-teal-400/30',
    building: 'text-yellow-300 bg-yellow-400/10 border-yellow-400/30',
    planned: 'text-slate-400 bg-slate-700/30 border-slate-600/40',
};

export const statusLabel: Record<DemoStatus, string> = {
    live: 'Live',
    building: 'Building',
    planned: 'Planned',
};
