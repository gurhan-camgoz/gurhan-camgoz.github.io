import { Outlet } from 'react-router-dom';
import { WaveBackground } from '../components/shared/WaveBackground';

export function AILayout() {
    // overflow-clip, not overflow-hidden: hidden creates a scroll container,
    // which silently disables position:sticky for every descendant (the nav,
    // the RLHF walkthrough stage). clip contains the WaveBackground the same
    // way without that side effect.
    return (
        <div className="theme-ai font-sans text-slate-100 bg-slate-900 min-h-screen relative overflow-clip">
            <WaveBackground
                idPrefix="ai"
                primaryColorStart="rgba(59, 130, 246, 0.5)"
                primaryColorEnd="rgba(37, 99, 235, 0.5)"
                secondaryColorStart="rgba(15, 23, 42, 0.8)"
                secondaryColorEnd="rgba(30, 41, 59, 0.8)"
            />
            <div className="relative z-10">
                <Outlet />
            </div>
        </div>
    );
}
