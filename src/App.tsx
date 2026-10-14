import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { LearningJourney } from './components/LearningJourney';
import { GitHubSection } from './components/GitHubSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AIAssistant } from './components/AIAssistant/AIAssistant';
import { CursorSpotlight } from './components/CursorSpotlight';
import { useScrollReveal } from './hooks/useScrollReveal';

export function App() {
  const [activeSection, setActiveSection] = useState('home');
  useScrollReveal();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 160;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-indigo-600/30 selection:text-indigo-200">
      {/* Interactive Cursor Spotlight */}
      <CursorSpotlight />

      {/* Subtle Understated Animated Background */}
      <div 
        aria-hidden="true" 
        className="fixed inset-0 pointer-events-none -z-20 overflow-hidden"
      >
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />

        {/* Slow drifting ambient gradient orbs */}
        <div 
          className="absolute -top-[120px] -left-[100px] w-[650px] h-[650px] rounded-full bg-indigo-600/[0.035] blur-[140px] animate-ambient-drift pointer-events-none" 
        />
        <div 
          className="absolute top-[45%] -right-[120px] w-[600px] h-[600px] rounded-full bg-cyan-500/[0.025] blur-[130px] animate-ambient-drift pointer-events-none"
          style={{ animationDelay: '-8s' }} 
        />
        <div 
          className="absolute bottom-[-100px] left-[30%] w-[550px] h-[550px] rounded-full bg-violet-600/[0.03] blur-[140px] animate-ambient-drift pointer-events-none"
          style={{ animationDelay: '-4s' }} 
        />
      </div>

      <Navbar activeSection={activeSection} />
      
      <main className="flex-1 relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <LearningJourney />
        <GitHubSection />
        <Contact />
      </main>

      <Footer />
      <AIAssistant />
    </div>
  );
}

export default App;
