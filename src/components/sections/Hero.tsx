import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, ArrowDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { personalInfo } from '../../utils/constants';

export const Hero: React.FC = () => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const randomDelay = Math.random() * 2;
      textRef.current.style.setProperty('--random-delay', randomDelay.toString());
    }
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-l from-amber-800 via-stone-500 to-amber-800 animate-gradient" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.p
          className="text-5xl md:text-7xl lg:text-8xl font-mono font-bold text-transparent mb-4 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <span
            ref={textRef}
            className="text-stroke text-stroke-green-500 opacity-0 animate-random-pulse"
          >
            Mașallah
          </span>
        </motion.p>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-stone-300 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {personalInfo.name}
        </motion.h1>

        <motion.h2
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-stone-800 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
         Bridging Computer Science and Anthropology
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-xl md:text-2xl text-stone-300 mb-2 font-medium">
            {personalInfo.title}
          </p>
          <p className="text-lg text-stone-900 mb-8">
            {personalInfo.location}
          </p>
        </motion.div>

        <motion.p
          className="text-lg text-stone-800 max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {personalInfo.bio}
        </motion.p>

        <motion.div
          className="flex justify-center flex-wrap gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {personalInfo.links.github && (
            <a href={personalInfo.links.github} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="md" className="border-2 border-stone-600 text-stone-300 hover:border-stone-400 hover:text-stone-400">
                <Github size={18} className="mr-2" />
                GitHub
              </Button>
            </a>
          )}
          {personalInfo.links.linkedin && (
            <a href={personalInfo.links.linkedin} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="md" className="border-2 border-stone-600 text-stone-300 hover:border-green-400 hover:text-stone-400">
                <Linkedin size={18} className="mr-2" />
                LinkedIn
              </Button>
            </a>
          )}

        </motion.div>
      </div>
    </section>
  );
};

