import type { DemoStatus } from '../../../data/labDemos';
import { statusStyles, statusLabel } from './statusStyles';

export function StatusBadge({ status }: { status: DemoStatus }) {
    return (
        <span className={`px-2 py-1 text-[11px] font-bold rounded-full border ${statusStyles[status]}`}>
            {statusLabel[status]}
        </span>
    );
}
