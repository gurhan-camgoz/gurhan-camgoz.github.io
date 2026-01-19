import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MasterLayout } from './layouts/MasterLayout';
import { Landing } from './pages/Landing';
import { AnthroLayout } from './layouts/AnthroLayout';
import { AnthroHome } from './pages/anthro/Home';
import { AILayout } from './layouts/AILayout';
import { AIOverview } from './pages/ai/Overview';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MasterLayout />}>
          <Route index element={<Landing />} />
        </Route>

        <Route path="/anthro" element={<AnthroLayout />}>
          <Route index element={<AnthroHome />} />
        </Route>

        <Route path="/ai" element={<AILayout />}>
          <Route index element={<AIOverview />} />
          <Route path="thesis" element={<div className="p-20 text-center">Thesis Page (Coming Soon)</div>} />
          <Route path="projects" element={<div className="p-20 text-center">Projects Page (Coming Soon)</div>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;