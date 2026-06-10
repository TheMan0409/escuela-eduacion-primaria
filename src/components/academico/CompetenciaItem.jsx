import React from 'react';
import { motion } from 'framer-motion';

export default function CompetenciaItem({ competencia, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-accent transition-colors"
    >
      <div className="flex-shrink-0 w-12 h-12 bg-[#D4A017]/15 rounded-full flex items-center justify-center text-[#D4A017] font-bold text-xl">
        {index + 1}
      </div>
      <div>
        <h4 className="text-xl font-display font-bold text-primary mb-2">{competencia.area}</h4>
        <p className="text-gray-600 font-body text-sm leading-relaxed">{competencia.descripcion}</p>
      </div>
    </motion.div>
  );
}