import React from 'react';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { perfilIngresante } from '../../constants/academico';
import { Check } from 'lucide-react';

export default function PerfilIngresante() {
  return (
    <div id="perfil-ingresante" className="scroll-mt-24 w-full">
      <SectionTitle 
        title="Perfil del Ingresante" 
        center={false}
        subtitle="Habilidades y actitudes ideales para formar parte de la carrera de Educación Primaria." 
      />
      <div className="mt-8 bg-white p-6 md:p-8 rounded-xl shadow-md border-t-4 border-t-secondary">
        <ul className="space-y-4">
          {perfilIngresante.map((comp, idx) => (
            <li key={idx} className="flex gap-3 items-start">
              <div className="bg-[#D4A017]/15 text-[#D4A017] rounded-full p-1 flex-shrink-0 mt-0.5">
                <Check className="w-4 h-4" strokeWidth={3} />
              </div>
              <div>
                <span className="font-bold text-pucp-blue-dark">{comp.area}: </span>
                <span className="text-gray-600 font-body text-sm leading-relaxed">{comp.descripcion}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
