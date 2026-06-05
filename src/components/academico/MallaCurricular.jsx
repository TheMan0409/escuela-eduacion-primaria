import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Handle,
  Position,
  useNodesState,
  useEdgesState
} from 'reactflow';
import { Download, BookOpen, Clock, Award, X, HelpCircle } from 'lucide-react';

import 'reactflow/dist/style.css';

// ==========================================
// DATA DEL PLAN DE ESTUDIOS (EDUCACIÓN PRIMARIA)
// ==========================================
const CURRICULUM_DATA = [
  // CICLO I (X = 0)
  { id: 'G-1', name: 'Desarrollo Personal', type: 'general', credits: 3, hoursT: 2, hoursP: 2, cycle: 'Ciclo I', isElective: false, description: 'Contribuye al logro de capacidades terminales referidas a la inteligencia emocional y principios éticos.' },
  { id: 'G-2', name: 'Desarrollo del Pensamiento Lógico Matemático', type: 'general', credits: 3, hoursT: 2, hoursP: 2, cycle: 'Ciclo I', isElective: false, description: 'Desarrollo de habilidades lógicas y resolución de problemas matemáticos básicos.' },
  { id: 'G-3', name: 'Gestión de los Aprendizajes y Estrategias de Estudio', type: 'general', credits: 3, hoursT: 2, hoursP: 2, cycle: 'Ciclo I', isElective: false, description: 'Estrategias de autoaprendizaje y metaprendizaje colaborativo autónomo.' },
  { id: 'G-4', name: 'Lectura Crítica y Redacción de Textos Académicos', type: 'general', credits: 3, hoursT: 2, hoursP: 2, cycle: 'Ciclo I', isElective: false, description: 'Comprensión lectora y producción de textos académicos con rigor gramatical.' },
  { id: 'G-5', name: 'Historia de la Cultura (Optativo)', type: 'general', credits: 4, hoursT: 4, hoursP: 2, cycle: 'Ciclo I', isElective: false, description: 'Comprensión de la evolución cultural en el mundo y América.' },
  { id: 'ES-1', name: 'Psicología del Desarrollo Humano', type: 'especifico', credits: 4, hoursT: 3, hoursP: 2, cycle: 'Ciclo I', isElective: false, description: 'Estudio del ciclo vital con énfasis en la niñez, adolescencia y juventud.' },
  { id: 'E-1', name: 'Taller de Técnicas de Comunicación Eficaz', type: 'general', credits: 2, hoursT: 0, hoursP: 4, cycle: 'Ciclo I', isElective: true, description: 'Taller electivo enfocado en mejorar las competencias comunicativas y el trabajo en equipo.' },

  // CICLO II (X = 320)
  { id: 'G-6', name: 'Sociedad, Cultura y Ecología', type: 'general', credits: 3, hoursT: 4, hoursP: 1, cycle: 'Ciclo II', isElective: false, description: 'Análisis de problemáticas sociales, culturales y del medio ambiente.' },
  { id: 'G-7', name: 'Cultura Investigativa y Pensamiento Crítico', type: 'general', credits: 3, hoursT: 2, hoursP: 2, cycle: 'Ciclo II', isElective: false, description: 'Formulación de soluciones viables mediante el método científico.' },
  { id: 'G-8', name: 'Ética, Convivencia Humana y Ciudadanía', type: 'general', credits: 3, hoursT: 2, hoursP: 2, cycle: 'Ciclo II', isElective: false, description: 'Práctica de principios morales y convivencia pacífica democrática.' },
  { id: 'G-9', name: 'Identidad Cultural Regional, Nacional e Internacional', type: 'general', credits: 3, hoursT: 2, hoursP: 2, cycle: 'Ciclo II', isElective: false, description: 'Procesos de construcción de la identidad frente a la diversidad cultural.' },
  { id: 'G-10', name: 'Fundamentos de Filosofía (Optativo)', type: 'general', credits: 4, hoursT: 2, hoursP: 4, cycle: 'Ciclo II', isElective: false, description: 'Corrientes filosóficas contemporáneas y consecuencias éticas de la ciencia.' },
  { id: 'ES-2', name: 'Psicología del Aprendizaje', type: 'especifico', credits: 3, hoursT: 2, hoursP: 1, cycle: 'Ciclo II', isElective: false, description: 'Explicación y aplicación de las teorías conductistas, cognitivas y humanistas del aprendizaje.' },
  { id: 'ES-3', name: 'Historia de la Educación', type: 'especifico', credits: 2, hoursT: 2, hoursP: 1, cycle: 'Ciclo II', isElective: false, description: 'Evolución histórica de la educación con eje Perú-Mundo.' },
  { id: 'E-2', name: 'Taller de Manejo de TIC', type: 'general', credits: 2, hoursT: 0, hoursP: 4, cycle: 'Ciclo II', isElective: true, description: 'Uso creativo de procesadores de texto científicos, LaTeX y herramientas en la nube.' },

  // CICLO III (X = 640)
  { id: 'ES-4', name: 'Neurociencia y Aprendizaje', type: 'especifico', credits: 3, hoursT: 2, hoursP: 2, cycle: 'Ciclo III', isElective: false, description: 'Procesos neurobiológicos y su implicancia en los modelos instruccionales.' },
  { id: 'ES-5', name: 'Pedagogía', type: 'especifico', credits: 3, hoursT: 2, hoursP: 2, cycle: 'Ciclo III', isElective: false, description: 'Comprensión del carácter científico de la Pedagogía y sus modelos teóricos.' },
  { id: 'ES-6', name: 'Didáctica General', type: 'especifico', credits: 4, hoursT: 2, hoursP: 3, cycle: 'Ciclo III', isElective: false, description: 'Estrategias metodológicas modernas para optimizar el proceso de enseñanza-aprendizaje.' },
  { id: 'ES-7', name: 'Políticas Educativas y Realidad Nacional', type: 'especifico', credits: 3, hoursT: 2, hoursP: 2, cycle: 'Ciclo III', isElective: false, description: 'Impacto de las políticas globales en la estructura educativa peruana.' },
  { id: 'ES-8', name: 'Teoría Curricular', type: 'especifico', credits: 3, hoursT: 2, hoursP: 2, cycle: 'Ciclo III', isElective: false, description: 'Análisis de enfoques, dimensiones y elementos curriculares.' },
  { id: 'ES-9', name: 'Evaluación de los Aprendizajes', type: 'especifico', credits: 4, hoursT: 2, hoursP: 3, cycle: 'Ciclo III', isElective: false, description: 'Diseño técnico de criterios, indicadores e instrumentos de evaluación por competencias.' },
  { id: 'ES-10', name: 'Ludopedagogía', type: 'especifico', credits: 3, hoursT: 2, hoursP: 2, cycle: 'Ciclo III', isElective: false, description: 'El juego como eje del bienestar físico, social y emocional infantil.' },

  // CICLO IV (X = 960)
  { id: 'EP-1', name: 'Técnicas de Programación Curricular', type: 'especialidad', credits: 3, hoursT: 2, hoursP: 2, cycle: 'Ciclo IV', isElective: false, description: 'Diversificación curricular y diseño de unidades y proyectos a corto plazo.' },
  { id: 'ES-11', name: 'Investigación Integral I', type: 'especifico', credits: 3, hoursT: 2, hoursP: 2, cycle: 'Ciclo IV', isElective: false, description: 'Técnicas de fichaje, argumentación y redacción de monografías.' },
  { id: 'EP-2', name: 'Didáctica de la Lectura y Escritura', type: 'especialidad', credits: 4, hoursT: 2, hoursP: 3, cycle: 'Ciclo IV', isElective: false, description: 'Bases teóricas de la adquisición de la lectoescritura según enfoques actuales.' },
  { id: 'EP-3', name: 'Didáctica de la Iniciación Matemática', type: 'especialidad', credits: 4, hoursT: 2, hoursP: 3, cycle: 'Ciclo IV', isElective: false, description: 'Matemática lúdica y resolución de problemas para nociones pre-numéricas.' },
  { id: 'ES-12', name: 'Consejería y Tutoría', type: 'especifico', credits: 3, hoursT: 2, hoursP: 2, cycle: 'Ciclo IV', isElective: false, description: 'Modelos de intervención tutorial y planes de acción tutorial en la escuela.' },
  { id: 'ES-13', name: 'Educación Emocional y Sexual para Niños', type: 'especifico', credits: 3, hoursT: 2, hoursP: 2, cycle: 'Ciclo IV', isElective: false, description: 'Orientaciones psicopedagógicas para el soporte emocional infantil.' },
  { id: 'ES-14', name: 'Nutrición Escolar', type: 'especifico', credits: 3, hoursT: 2, hoursP: 2, cycle: 'Ciclo IV', isElective: false, description: 'Salud, alimentación balanceada infantil y prevención de la desnutrición.' },

  // CICLO V (X = 1280)
  { id: 'ES-15', name: 'Investigación Integral II', type: 'especifico', credits: 3, hoursT: 2, hoursP: 2, cycle: 'Ciclo V', isElective: false, description: 'Diseño de proyectos de investigación científica cuantitativa.' },
  { id: 'EP-4', name: 'Didáctica para la Comprensión de Textos', type: 'especialidad', credits: 3, hoursT: 2, hoursP: 2, cycle: 'Ciclo V', isElective: false, description: 'Enfoque del área de comunicación y estrategias de estimulación oral y lectora.' },
  { id: 'EP-5', name: 'Práctica Pre-profesional I', type: 'especialidad', credits: 3, hoursT: 1, hoursP: 4, cycle: 'Ciclo V', isElective: false, description: 'Conocimiento del contexto escolar urbano marginal y diseño de sesiones básicas.' },
  { id: 'EP-6', name: 'Didáctica de las Ciencias Sociales I', type: 'especialidad', credits: 3, hoursT: 2, hoursP: 2, cycle: 'Ciclo V', isElective: false, description: 'Construcción de la identidad y participación democrática en el nivel primario.' },
  { id: 'EP-7', name: 'Didáctica de la Matemática I', type: 'especialidad', credits: 4, hoursT: 3, hoursP: 1, cycle: 'Ciclo V', isElective: false, description: 'Problemas de regularidad, equivalencia, cambio, forma y localización.' },
  { id: 'EP-8', name: 'Atención a Niños con Habilidades Diferentes', type: 'especialidad', credits: 4, hoursT: 3, hoursP: 2, cycle: 'Ciclo V', isElective: false, description: 'Enfoques inclusivos, adaptaciones curriculares y necesidades educativas especiales.' },
  { id: 'E-3', name: 'Didáctica del Idioma Inglés para Niños I', type: 'especialidad', credits: 3, hoursT: 1, hoursP: 4, cycle: 'Ciclo V', isElective: true, description: 'Módulos de didáctica comunicativa de lenguas extranjeras aplicadas a infantes.' },

  // CICLO VI (X = 1600)
  { id: 'EP-9', name: 'Didáctica de la Ciencia y Tecnología I', type: 'especialidad', credits: 4, hoursT: 3, hoursP: 2, cycle: 'Ciclo VI', isElective: false, description: 'Estudio y aplicación de metodologías para la enseñanza de las ciencias.' },
  { id: 'EP-10', name: 'Didáctica de la Producción de Textos', type: 'especialidad', credits: 3, hoursT: 2, hoursP: 2, cycle: 'Ciclo VI', isElective: false, description: 'Estrategias para el desarrollo de la escritura y producción textual en primaria.' },
  { id: 'ES-16', name: 'Investigación Integral III', type: 'especifico', credits: 3, hoursT: 2, hoursP: 2, cycle: 'Ciclo VI', isElective: false, description: 'Desarrollo de competencias investigativas y metodologías cuantitativas/cualitativas.' },
  { id: 'EP-11', name: 'Práctica Pre-Profesional II', type: 'especialidad', credits: 3, hoursT: 1, hoursP: 4, cycle: 'Ciclo VI', isElective: false, description: 'Práctica en instituciones educativas para la observación y diseño de sesiones.' },
  { id: 'EP-12', name: 'Didáctica de la Matemática II', type: 'especialidad', credits: 3, hoursT: 2, hoursP: 2, cycle: 'Ciclo VI', isElective: false, description: 'Estrategias metodológicas para la enseñanza de operaciones y problemas complejos.' },
  { id: 'EP-13', name: 'Didáctica de las Ciencias Sociales II', type: 'especialidad', credits: 3, hoursT: 2, hoursP: 2, cycle: 'Ciclo VI', isElective: false, description: 'Profundización en la enseñanza de la historia, geografía y economía.' },
  { id: 'E-4', name: 'Didáctica del Idioma Inglés para Niños II', type: 'especialidad', credits: 3, hoursT: 1, hoursP: 4, cycle: 'Ciclo VI', isElective: true, description: 'Metodologías para la enseñanza del inglés como segunda lengua en niños.' },
  { id: 'E-5', name: 'Didáctica de la Danza para Niños II', type: 'especialidad', credits: 3, hoursT: 1, hoursP: 4, cycle: 'Ciclo VI', isElective: true, description: 'Uso de la danza y expresión corporal como recurso pedagógico.' },
  { id: 'E-6', name: 'Didáctica de las TICs para Niños II', type: 'especialidad', credits: 0, hoursT: 1, hoursP: 4, cycle: 'Ciclo VI', isElective: true, description: 'Integración de tecnologías de la información en el proceso de enseñanza.' },

  // CICLO VII (X = 1920)
  { id: 'ES-17', name: 'Informática Educativa', type: 'especifico', credits: 3, hoursT: 1, hoursP: 4, cycle: 'Ciclo VII', isElective: false, description: 'Uso de herramientas informáticas aplicadas a la gestión y procesos educativos.' },
  { id: 'EP-14', name: 'Educación Básica Alternativa', type: 'especialidad', credits: 3, hoursT: 4, hoursP: 1, cycle: 'Ciclo VII', isElective: false, description: 'Fundamentos y didáctica para la educación de jóvenes y adultos.' },
  { id: 'ES-18', name: 'Investigación Integral IV', type: 'especifico', credits: 4, hoursT: 3, hoursP: 2, cycle: 'Ciclo VII', isElective: false, description: 'Elaboración y ejecución de proyectos de investigación educativa.' },
  { id: 'EP-15', name: 'Práctica Pre-Profesional III', type: 'especialidad', credits: 3, hoursT: 1, hoursP: 4, cycle: 'Ciclo VII', isElective: false, description: 'Intervención directa en el aula de nivel primaria, diseño y conducción del aprendizaje.' },
  { id: 'EP-16', name: 'Proyectos Productivos', type: 'especialidad', credits: 3, hoursT: 4, hoursP: 1, cycle: 'Ciclo VII', isElective: false, description: 'Diseño e implementación de proyectos productivos escolares.' },
  { id: 'EP-17', name: 'Didáctica de la Ciencia y Tecnología II', type: 'especialidad', credits: 3, hoursT: 2, hoursP: 2, cycle: 'Ciclo VII', isElective: false, description: 'Estrategias avanzadas y proyectos de experimentación científica escolar.' },
  { id: 'E-7', name: 'Didáctica del Idioma Inglés para Niños III', type: 'especialidad', credits: 3, hoursT: 4, hoursP: 1, cycle: 'Ciclo VII', isElective: true, description: 'Práctica y aplicación de estrategias avanzadas de inglés para primaria.' },
  { id: 'E-8', name: 'Didáctica de la Danza para Niños III', type: 'especialidad', credits: 3, hoursT: 4, hoursP: 1, cycle: 'Ciclo VII', isElective: true, description: 'Desarrollo de proyectos coreográficos y su evaluación pedagógica.' },
  { id: 'E-9', name: 'Didáctica de la Enseñanza de las TICs para Niños III', type: 'especialidad', credits: 0, hoursT: 3, hoursP: 1, cycle: 'Ciclo VII', isElective: true, description: 'Creación de recursos educativos digitales e interactivos.' },

  // CICLO VIII (X = 2240)
  { id: 'ES-19', name: 'Entornos Virtuales para la Enseñanza Aprendizaje', type: 'especifico', credits: 3, hoursT: 1, hoursP: 4, cycle: 'Ciclo VIII', isElective: false, description: 'Gestión de plataformas virtuales, e-learning y recursos online.' },
  { id: 'EP-18', name: 'Educación Rural', type: 'especialidad', credits: 4, hoursT: 4, hoursP: 2, cycle: 'Ciclo VIII', isElective: false, description: 'Características, desafíos y adaptaciones curriculares para la escuela rural.' },
  { id: 'ES-20', name: 'Investigación Integral V', type: 'especifico', credits: 3, hoursT: 3, hoursP: 1, cycle: 'Ciclo VIII', isElective: false, description: 'Sistematización de resultados y redacción del informe de investigación.' },
  { id: 'EP-19', name: 'Práctica Pre-Profesional IV', type: 'especialidad', credits: 3, hoursT: 0, hoursP: 4, cycle: 'Ciclo VIII', isElective: false, description: 'Consolidación de la práctica docente en diversas realidades y contextos.' },
  { id: 'EP-20', name: 'Didáctica de Educación Física', type: 'especialidad', credits: 3, hoursT: 2, hoursP: 4, cycle: 'Ciclo VIII', isElective: false, description: 'Psicomotricidad, juegos y deportes adaptados al nivel primario.' },
  { id: 'ES-21', name: 'Proyectos de Inversión e Innovación Educativa', type: 'especifico', credits: 3, hoursT: 2, hoursP: 2, cycle: 'Ciclo VIII', isElective: false, description: 'Formulación de proyectos orientados a la mejora continua y obtención de fondos.' },
  { id: 'E-10', name: 'Práctica en Instituciones Educativas Bilingüe: Español Inglés', type: 'especialidad', credits: 0, hoursT: 1, hoursP: 4, cycle: 'Ciclo VIII', isElective: true, description: 'Práctica preprofesional en aulas bilingües.' },
  { id: 'E-11', name: 'Práctica en la II.EE: Taller de Danzas', type: 'especialidad', credits: 3, hoursT: 1, hoursP: 4, cycle: 'Ciclo VIII', isElective: true, description: 'Aplicación práctica de talleres artísticos en el centro educativo.' },
  { id: 'E-12', name: 'Práctica en II.EE. Laboratorio de Cómputo/ Aula de Innovación', type: 'especialidad', credits: 0, hoursT: 1, hoursP: 4, cycle: 'Ciclo VIII', isElective: true, description: 'Gestión y docencia en el aula de innovación pedagógica.' },

  // CICLO IX (X = 2560)
  { id: 'ES-22', name: 'Gestión Educativa', type: 'especifico', credits: 3, hoursT: 1, hoursP: 4, cycle: 'Ciclo IX', isElective: false, description: 'Administración escolar, liderazgo directivo y documentos de gestión institucional.' },
  { id: 'ES-23', name: 'Seminario de Tesis I', type: 'especifico', credits: 3, hoursT: 1, hoursP: 4, cycle: 'Ciclo IX', isElective: false, description: 'Elaboración y sustentación del proyecto de tesis para obtención del título.' },
  { id: 'EP-21', name: 'Práctica Preprofesional V', type: 'especialidad', credits: 16, hoursT: 0, hoursP: 32, cycle: 'Ciclo IX', isElective: false, description: 'Inmersión total en la institución educativa asumiendo el rol docente a tiempo completo.' },

  // CICLO X (X = 2880)
  { id: 'ES-24', name: 'Ética Profesional', type: 'especifico', credits: 3, hoursT: 4, hoursP: 1, cycle: 'Ciclo X', isElective: false, description: 'Deontología docente, valores profesionales y responsabilidad social.' },
  { id: 'ES-25', name: 'Seminario de Tesis II', type: 'especifico', credits: 3, hoursT: 4, hoursP: 1, cycle: 'Ciclo X', isElective: false, description: 'Desarrollo, culminación y defensa de la tesis de grado.' },
  { id: 'EP-22', name: 'Práctica Pre Profesional VI', type: 'especialidad', credits: 16, hoursT: 0, hoursP: 28, cycle: 'Ciclo X', isElective: false, description: 'Culminación de la práctica preprofesional con evaluación integral de desempeño docente.' }
];

// RELACIÓN DE LÍNEAS DE PRERREQUISITOS (Muestra de flujos lógicos)
const PREREQUISITES_EDGES = [
  { id: 'e-1', source: 'ES-1', target: 'ES-2', animated: true, style: { stroke: '#f97316', strokeWidth: 2 } },
  { id: 'e-2', source: 'ES-3', target: 'ES-5', animated: true, style: { stroke: '#f97316', strokeWidth: 2 } },
  { id: 'e-3', source: 'ES-8', target: 'EP-1', animated: true, style: { stroke: '#38bdf8', strokeWidth: 2 } },
  { id: 'e-4', source: 'EP-2', target: 'EP-4', animated: true, style: { stroke: '#38bdf8', strokeWidth: 2 } },
  { id: 'e-5', source: 'EP-3', target: 'EP-7', animated: true, style: { stroke: '#38bdf8', strokeWidth: 2 } },
  { id: 'e-6', source: 'ES-15', target: 'ES-16', animated: true, style: { stroke: '#f97316', strokeWidth: 2 } },
  { id: 'e-7', source: 'ES-16', target: 'ES-18', animated: true, style: { stroke: '#f97316', strokeWidth: 2 } },
  { id: 'e-8', source: 'ES-18', target: 'ES-20', animated: true, style: { stroke: '#f97316', strokeWidth: 2 } },
  { id: 'e-9', source: 'ES-20', target: 'ES-23', animated: true, style: { stroke: '#f97316', strokeWidth: 2 } },
  { id: 'e-10', source: 'ES-23', target: 'ES-25', animated: true, style: { stroke: '#f97316', strokeWidth: 2 } },
  { id: 'e-11', source: 'EP-5', target: 'EP-11', animated: true, style: { stroke: '#38bdf8', strokeWidth: 2 } },
  { id: 'e-12', source: 'EP-11', target: 'EP-15', animated: true, style: { stroke: '#38bdf8', strokeWidth: 2 } },
  { id: 'e-13', source: 'EP-15', target: 'EP-19', animated: true, style: { stroke: '#38bdf8', strokeWidth: 2 } },
  { id: 'e-14', source: 'EP-19', target: 'EP-21', animated: true, style: { stroke: '#38bdf8', strokeWidth: 2 } },
  { id: 'e-15', source: 'EP-21', target: 'EP-22', animated: true, style: { stroke: '#38bdf8', strokeWidth: 2 } }
];

// ==========================================
// NODE TEMPLATE: CONFIGURACIÓN VISUAL EXACTA DE COLORES
// ==========================================
const CourseNode = ({ data }) => {
  // Colores solicitados de forma explícita por el usuario
  const typeStyles = {
    general: 'border-l-emerald-500 bg-emerald-50 text-emerald-950 hover:bg-emerald-100/70',
    especifico: 'border-l-orange-400 bg-orange-50 text-orange-950 hover:bg-orange-100/70',
    especialidad: 'border-l-sky-400 bg-sky-50 text-sky-950 hover:bg-sky-100/70'
  };

  return (
    <div className={`w-64 p-3 shadow-md rounded border border-slate-200 border-l-4 transition-all ${typeStyles[data.type]} bg-white`}>
      <Handle type="target" position={Position.Left} className="opacity-40 !bg-slate-400" />
      
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[9px] font-bold tracking-wider uppercase opacity-60">{data.cycle}</span>
        <div className="flex gap-1">
          {data.isElective && (
            <span className="bg-purple-100 text-purple-800 text-[8px] px-1 font-bold rounded">
              ELECTIVO
            </span>
          )}
          <span className="bg-white/90 border border-slate-200 text-slate-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-sm">
            {data.credits} CR
          </span>
        </div>
      </div>
      
      <h3 className="text-xs font-bold leading-tight line-clamp-2 select-none h-8 flex items-center">
        {data.name}
      </h3>
      
      <div className="mt-2 pt-1.5 border-t border-slate-200/50 text-[9px] opacity-80 flex justify-between items-center">
        <span>HT: {data.hoursT}h | HP: {data.hoursP}h</span>
        <span className="font-semibold underline cursor-pointer hover:text-blue-700">Detalles</span>
      </div>

      <Handle type="source" position={Position.Right} className="opacity-40 !bg-slate-400" />
    </div>
  );
};

const nodeTypes = { courseNode: CourseNode };

// ==========================================
// COMPONENTE PRINCIPAL MIGRADO
// ==========================================
export default function MallaCurricular() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Mapeamos los cursos a las coordenadas de React Flow organizándolos por ciclo académico
  const formattedNodes = CURRICULUM_DATA.map((course, index) => {
    // Agrupamos en el eje Y de acuerdo a su orden de aparición por ciclo
    const sameCycleCourses = CURRICULUM_DATA.filter(c => c.cycle === course.cycle);
    const orderInCycle = sameCycleCourses.indexOf(course);
    
    // Mapeo automático de columnas en base a la coordenada X
    const cycleColumns = {
      'Ciclo I': 0,
      'Ciclo II': 320,
      'Ciclo III': 640,
      'Ciclo IV': 960,
      'Ciclo V': 1280,
      'Ciclo VI': 1600,
      'Ciclo VII': 1920,
      'Ciclo VIII': 2240,
      'Ciclo IX': 2560,
      'Ciclo X': 2880
    };

    return {
      id: course.id,
      type: 'courseNode',
      position: { x: cycleColumns[course.cycle] || 0, y: orderInCycle * 110 },
      data: { ...course }
    };
  });

  const [nodes, setNodes, onNodesChange] = useNodesState(formattedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(PREREQUISITES_EDGES);

  const onNodeClick = useCallback((event, node) => {
    setSelectedCourse(node.data);
  }, []);

  return (
    <div className="w-full h-[700px] bg-slate-50 border border-slate-200 rounded-xl relative overflow-hidden font-sans shadow-lg">
      
      {/* ==========================================
          LEYENDA DE COLORES EXPLICITA SOLICITADA
          ========================================== */}
      <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-lg border border-slate-200 max-w-sm">
        <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">
          Estructura de Áreas Curriculares
        </h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 bg-emerald-50 border border-emerald-400 rounded-md"></div>
            <span className="text-slate-700 font-medium">Estudios Generales (Verde claro)</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 bg-orange-50 border border-orange-400 rounded-md"></div>
            <span className="text-slate-700 font-medium">Estudios Específicos (Naranja suave)</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 bg-sky-50 border border-sky-400 rounded-md"></div>
            <span className="text-slate-700 font-medium">Estudios de Especialidad (Celeste)</span>
          </div>
        </div>
      </div>

      {/* Indicador de ayuda al usuario */}
      <div className="absolute bottom-4 left-4 z-10 bg-slate-900/90 text-white text-[11px] px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-md">
        <HelpCircle size={14} className="text-sky-300" />
        <span>Usa el mouse para arrastrar el mapa o hacer zoom. Haz clic en un curso.</span>
      </div>

      {/* Canvas */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
        attributionPosition="bottom-right"
        nodesDraggable={false}
        connectable={false}
      >
        <Background color="#cbd5e1" gap={20} size={1} />
        <Controls className="!bg-white !shadow-lg !border-slate-100 !rounded-lg" />
      </ReactFlow>

      {/* ==========================================
          MODAL DE DETALLE INFORMATIVO (MARKETING + CALIDAD)
          ========================================== */}
      {selectedCourse && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all duration-200 scale-100">
            
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
              <div>
                <div className="flex gap-2 items-center">
                  <span className="text-[9px] bg-slate-200 text-slate-800 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {selectedCourse.cycle}
                  </span>
                  {selectedCourse.isElective && (
                    <span className="text-[9px] bg-purple-100 text-purple-800 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Curso Electivo
                    </span>
                  )}
                </div>
                <h2 className="text-base font-bold text-slate-900 mt-2 leading-tight">
                  {selectedCourse.name}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedCourse(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4">
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <BookOpen size={12} /> Descripción de la asignatura
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {selectedCourse.description}
                </p>
              </div>

              {/* Grid Técnico para el Evaluador */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/60 text-xs">
                <div className="flex items-center gap-2">
                  <Award size={16} className="text-slate-600" />
                  <div>
                    <p className="text-[9px] text-slate-400 font-medium">Valor Académico</p>
                    <p className="font-bold text-slate-700">{selectedCourse.credits} Créditos UNT</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-slate-600" />
                  <div>
                    <p className="text-[9px] text-slate-400 font-medium">Carga Horaria</p>
                    <p className="font-bold text-slate-700">Teoría: {selectedCourse.hoursT}h | Práctica: {selectedCourse.hoursP}h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer con el botón de descarga para Evidencia de Acreditación */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => alert(`Descargando sílabo de: ${selectedCourse.name}`)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-md transition-all duration-150"
              >
                <Download size={14} />
                Descargar Sílabo Oficial
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
