import { Outlet } from 'react-router-dom';

export function AnthroLayout() {
    return (
        <div className="theme-anthro font-sans text-stone-800">
            <Outlet />
        </div>
    );
}
