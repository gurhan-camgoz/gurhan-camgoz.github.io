import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ id, title, children, className }) => {
  return (
    <motion.section
      id={id}
      className={`py-16 ${className || ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="mb-8 text-3xl font-bold text-gray-900">{title}</h2>
        )}
        {children}
      </div>
    </motion.section>
  );
};
