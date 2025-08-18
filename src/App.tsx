import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      {/* Add more sections as you build them */}
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">More sections coming soon...</p>
      </div>
    </div>
  );
}

export default App;