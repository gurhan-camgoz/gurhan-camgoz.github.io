import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, ArrowDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { personalInfo } from '../../utils/constants';

export const Hero: React.FC = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.p
          className="text-primary-400 text-lg mb-4 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Hi, my name is
        </motion.p>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-100 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {personalInfo.name}
        </motion.h1>

        <motion.h2
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-400 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          I build things for the web.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-xl md:text-2xl text-primary-300 mb-2 font-medium">
            {personalInfo.title}
          </p>
          <p className="text-lg text-slate-400 mb-8">
            {personalInfo.location}
          </p>
        </motion.div>

        <motion.p
          className="text-lg text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed"
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
              <Button variant="outline" size="md" className="border-slate-600 text-slate-300 hover:border-primary-400 hover:text-primary-400">
                <Github size={18} className="mr-2" />
                GitHub
              </Button>
            </a>
          )}
          {personalInfo.links.linkedin && (
            <a href={personalInfo.links.linkedin} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="md" className="border-slate-600 text-slate-300 hover:border-primary-400 hover:text-primary-400">
                <Linkedin size={18} className="mr-2" />
                LinkedIn
              </Button>
            </a>
          )}
          {personalInfo.links.scholar && (
            <a href={personalInfo.links.scholar} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="md" className="border-slate-600 text-slate-300 hover:border-primary-400 hover:text-primary-400">
                <ExternalLink size={18} className="mr-2" />
                Scholar
              </Button>
            </a>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Button
            size="lg"
            className="bg-transparent border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10 px-8 py-4 text-lg"
            onClick={scrollToAbout}
          >
            <Mail size={20} className="mr-3" />
            Get In Touch
          </Button>
        </motion.div>

        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="cursor-pointer"
            onClick={scrollToAbout}
          >
            <ArrowDown size={24} className="text-slate-400 hover:text-primary-400 transition-colors" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
