import { Outlet } from 'react-router-dom';
import { WaveBackground } from '../components/shared/WaveBackground';
import { AnthroNav } from '../components/anthro/AnthroNav';

export function AnthroLayout() {
    return (
        <div className="theme-anthro font-sans text-stone-800 bg-stone-200 min-h-screen relative overflow-hidden">
            <WaveBackground
                idPrefix="anthro"
                primaryColorStart="rgba(245, 158, 11, 0.4)"
                primaryColorEnd="rgba(180, 83, 9, 0.4)"
                secondaryColorStart="rgba(120, 113, 108, 0.3)"
                secondaryColorEnd="rgba(168, 162, 158, 0.3)"
            />
            <div className="relative z-10">
                <AnthroNav />
                <Outlet />
            </div>
        </div>
    );
}

