import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Research } from './components/sections/Research';

function App() {
  return (
    <div className="min-h-screen bg-stone-200">
      <Header />
      <Hero />
      <About />
      <Research />
      {/* Add more sections as you build them */}
      <div className="h-screen flex items-center justify-center bg-stone-50">
        <p className="text-stone-600">More sections coming soon...</p>
      </div>
    </div>
  );
}

export default App;