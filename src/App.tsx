import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Research } from './components/sections/Research';
import { Articles } from './components/sections/Articles';
import { Projects } from './components/sections/Projects';
import { Photography } from './components/sections/Photography';
import { Contact } from './components/sections/Contact';

function App() {
  return (
    <div className="min-h-screen bg-stone-200">
      <Header />
      <Hero />
      <About />
      <Research />
      <Articles />
      <Projects />
      <Photography />
      <Contact />
    </div>
  );
}

export default App;