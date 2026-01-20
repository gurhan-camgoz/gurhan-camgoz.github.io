import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MasterLayout } from './layouts/MasterLayout';
import { Landing } from './pages/Landing';
import { AnthroLayout } from './layouts/AnthroLayout';
import { AnthroOverview } from './pages/anthro/Overview';
import { AnthroResearch } from './pages/anthro/Research';
import { AnthroProductions } from './pages/anthro/Productions';
import { AnthroPhotography } from './pages/anthro/Photography';
import { AILayout } from './layouts/AILayout';
import { AIOverview } from './pages/ai/Overview';
import { AIProjects } from './pages/ai/Projects';
import { AIArchitecture } from './pages/ai/Architecture';
import { AIEvaluation } from './pages/ai/Evaluation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MasterLayout />}>
          <Route index element={<Landing />} />
        </Route>

        <Route path="/anthro" element={<AnthroLayout />}>
          <Route index element={<AnthroOverview />} />
          <Route path="research" element={<AnthroResearch />} />
          <Route path="productions" element={<AnthroProductions />} />
          <Route path="photography" element={<AnthroPhotography />} />
        </Route>

        <Route path="/ai" element={<AILayout />}>
          <Route index element={<AIOverview />} />
          <Route path="projects" element={<AIProjects />} />
          <Route path="architecture" element={<AIArchitecture />} />
          <Route path="evaluation" element={<AIEvaluation />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;