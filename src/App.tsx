import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MasterLayout } from './layouts/MasterLayout';
import { Landing } from './pages/Landing';
import { AnthroLayout } from './layouts/AnthroLayout';
import { AnthroOverview } from './pages/anthro/Overview';
import { AnthroResearch } from './pages/anthro/Research';
import { AnthroThesis } from './pages/anthro/Thesis';
import { AnthroProductions } from './pages/anthro/Productions';
import { AnthroPhotography } from './pages/anthro/Photography';
import { AILayout } from './layouts/AILayout';
import { AIOverview } from './pages/ai/Overview';
import { AIProjects } from './pages/ai/Projects';
import { AIArchitecture } from './pages/ai/Architecture';
import { AIEvaluation } from './pages/ai/Evaluation';

// Lab routes are lazy-loaded so the demo code (and, later, k-means/data
// parsing logic) never lands in the initial /ai bundle.
const AILab = lazy(() => import('./pages/ai/Lab').then((m) => ({ default: m.AILab })));
const PreferenceCollapseExplorer = lazy(() => import('./pages/ai/lab/PreferenceCollapseExplorer'));
const FeedbackClusteringPlayground = lazy(() => import('./pages/ai/lab/FeedbackClusteringPlayground'));

function LabRouteFallback() {
    return (
        <div className="min-h-screen flex items-center justify-center text-slate-500 font-mono text-sm">
            Loading…
        </div>
    );
}

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
          <Route path="thesis" element={<AnthroThesis />} />
          <Route path="productions" element={<AnthroProductions />} />
          <Route path="photography" element={<AnthroPhotography />} />
        </Route>

        <Route path="/ai" element={<AILayout />}>
          <Route index element={<AIOverview />} />
          <Route path="projects" element={<AIProjects />} />
          <Route path="architecture" element={<AIArchitecture />} />
          <Route path="evaluation" element={<AIEvaluation />} />
          <Route
            path="lab"
            element={
              <Suspense fallback={<LabRouteFallback />}>
                <AILab />
              </Suspense>
            }
          />
          <Route
            path="lab/preference-collapse-explorer"
            element={
              <Suspense fallback={<LabRouteFallback />}>
                <PreferenceCollapseExplorer />
              </Suspense>
            }
          />
          <Route
            path="lab/feedback-clustering-playground"
            element={
              <Suspense fallback={<LabRouteFallback />}>
                <FeedbackClusteringPlayground />
              </Suspense>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;