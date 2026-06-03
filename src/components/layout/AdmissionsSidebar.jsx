import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, BookOpen, Medal, Star, Info, X, ExternalLink, ChevronRight } from 'lucide-react';

export default function AdmissionsSidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si el usuario está en móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // 1024px es el breakpoint 'lg' en Tailwind
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Datos de Admisión
  const modalidades = [
    {
      id: "ordinario",
      titulo: "Examen Ordinario",
      icono: BookOpen,
      dirigido: "Egresados de Educación Secundaria.",
      vacantes: "Aprox. 20 vacantes",
      descripcion: "Examen general que evalúa Aptitud Académica y Conocimientos."
    },
    {
      id: "cepunt",
      titulo: "Vía CEPUNT",
      icono: Star,
      dirigido: "Estudiantes del Centro Preuniversitario UNT.",
      vacantes: "Aprox. 15 vacantes",
      descripcion: "Ingreso directo por estricto orden de mérito tras sumatoria de exámenes."
    },
    {
      id: "extraordinario",
      titulo: "Examen Extraordinario",
      icono: Medal,
      dirigido: "1ros y 2dos puestos, deportistas, traslados, etc.",
      vacantes: "Aprox. 5 vacantes",
      descripcion: "Evaluación especial según el reglamento de admisión vigente."
    }
  ];

  return (
    <>
      {/* BOTÓN FLOTANTE PARA MÓVILES */}
      {isMobile && !isMobileOpen && (
        <motion.button
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          onClick={() => setIsMobileOpen(true)}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-[60] bg-[#002D62] text-white p-2 py-4 rounded-r-xl shadow-[4px_0_15px_rgba(0,0,0,0.2)] flex flex-col items-center gap-3 border border-l-0 border-white/20"
        >
          <GraduationCap className="w-6 h-6" />
          <span className="[writing-mode:vertical-lr] rotate-180 font-bold tracking-[0.2em] text-xs">
            ADMISIÓN
          </span>
        </motion.button>
      )}

      {/* BACKDROP OSCURO PARA MÓVILES */}
      <AnimatePresence>
        {isMobile && isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* BARRA LATERAL (Sidebar) */}
      <motion.aside
        className="fixed left-0 z-[70] shadow-2xl overflow-hidden text-white border border-white/10 border-l-0"
        initial={false}
        animate={{
          // En móvil toma el 85% del ancho si está abierto. En PC, varía entre 22rem y 4rem.
          width: isMobile ? (isMobileOpen ? '85%' : '0px') : (isHovered ? '24rem' : '4rem'),
          height: isMobile ? '100vh' : '65vh',
          top: isMobile ? '0%' : '55%',
          y: isMobile ? '0%' : '-50%',
          borderTopRightRadius: isMobile ? '0px' : '24px',
          borderBottomRightRadius: isMobile ? '0px' : '24px',
          backgroundColor: (isHovered || isMobileOpen) ? '#F58220' : '#002D62',
        }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
      >
        {/* Contenedor interno con ancho fijo para evitar que el texto se deforme al achicarse */}
        <div className="w-[24rem] h-full flex flex-col relative pt-6 pl-4 pr-6 pb-6 max-w-full">
          
          {/* Cabecera del Sidebar */}
          <div className="flex items-center justify-between mb-8 shrink-0 relative z-20">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 shrink-0 flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <motion.h2
                className="font-display font-black text-2xl tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: (isHovered || isMobileOpen) ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                ¿Cómo Postular?
              </motion.h2>
            </div>

            {/* Botón de cerrar en versión móvil mejorado */}
            {isMobile && isMobileOpen && (
              <button 
                type="button"
                onClick={() => setIsMobileOpen(false)} 
                className="p-2 bg-black/20 hover:bg-black/30 active:bg-black/40 rounded-full transition-colors cursor-pointer pointer-events-auto shrink-0"
                aria-label="Cerrar menú"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            )}
          </div>

          {/* Texto vertical cuando está colapsado (Solo PC) */}
          {!isHovered && !isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute left-0 w-16 top-24 bottom-0 flex justify-center items-center pointer-events-none pb-8"
            >
              <span className="[writing-mode:vertical-lr] rotate-180 font-bold tracking-[0.25em] text-white/50 text-sm">
                MODALIDADES
              </span>
            </motion.div>
          )}

          {/* Contenido Desplegable */}
          <motion.div
            className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/30 [&::-webkit-scrollbar-track]:bg-transparent pr-2 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: (isHovered || isMobileOpen) ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ pointerEvents: (isHovered || isMobileOpen) ? 'auto' : 'none' }}
          >
            <p className="text-sm text-white/90 mb-6 leading-relaxed">
              Descubre las modalidades de ingreso para formar parte de la Escuela de Educación Primaria.
            </p>

            {/* Tarjetas de Modalidades */}
            <div className="space-y-4 flex-1">
              {modalidades.map((mod) => (
                <div key={mod.id} className="bg-white/10 rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <mod.icono className="w-5 h-5 text-white" />
                    <h3 className="font-display font-bold text-lg">{mod.titulo}</h3>
                  </div>
                  <div className="space-y-1.5 text-sm text-white/90">
                    <p><strong className="text-white font-semibold">Dirigido a:</strong> {mod.dirigido}</p>
                    <p><strong className="text-white font-semibold">Vacantes:</strong> <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold inline-block mt-1">{mod.vacantes}</span></p>
                    <p className="pt-2 text-white/80 text-xs leading-relaxed border-t border-white/10 mt-2">{mod.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Información Útil y Enlace */}
            <div className="mt-8 border-t border-white/20 pt-5 pb-2">
              <h3 className="font-bold flex items-center gap-2 mb-4">
                <Info className="w-4 h-4" /> Información Útil
              </h3>
              <ul className="text-xs space-y-3 text-white/90 mb-6">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-3 h-3 shrink-0 mt-0.5 text-white/70" />
                  <span><strong>Requisitos:</strong> DNI original, certificado de estudios y recibo de pago por derecho de admisión.</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-3 h-3 shrink-0 mt-0.5 text-white/70" />
                  <span><strong>Fechas:</strong> Los exámenes ordinarios suelen realizarse en los meses de Marzo y Setiembre.</span>
                </li>
              </ul>

              <a href="https://admisionunt.edu.pe/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full py-3 bg-white text-[#F58220] font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-md">
                Portal de Admisión UNT <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
}