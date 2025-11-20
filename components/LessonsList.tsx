import React, { useState } from 'react';
import { Lesson, UserProfile } from '../types';
import { CheckCircle, Lock, Award, X, FileText, ChevronRight, ChevronLeft, HelpCircle, AlertCircle, RotateCcw } from 'lucide-react';

// --- EXPANDED DATASET ---
const lessons: Lesson[] = [
  {
    id: 'l1',
    title: 'La Tregua de Navidad',
    year: '1914',
    summary: 'El milagro de 1914 donde soldados enemigos detuvieron la guerra para celebrar juntos.',
    imageUrl: 'https://image.pollinations.ai/prompt/ww1%20soldiers%20playing%20soccer%20in%20snow%20vintage%20photo?width=400&height=300&nologo=true', 
    tags: ['Empatía', 'WWI'],
    xpReward: 10,
    slides: [
      { title: "El Contexto", content: "Diciembre de 1914. La Primera Guerra Mundial había comenzado hace solo 5 meses. La propaganda prometía que la guerra terminaría 'antes de Navidad', pero los soldados se encontraban estancados en trincheras congeladas en el Frente Occidental." },
      { title: "Las Trincheras", content: "Las condiciones eran miserables. Barro, ratas, frío extremo y la constante amenaza de francotiradores. Alemanes y británicos estaban atrincherados a veces a solo 30 o 50 metros de distancia, lo suficientemente cerca para oírse hablar." },
      { title: "Nochebuena", content: "La tarde del 24 de diciembre, el fuego cesó gradualmente. Los soldados británicos notaron luces extrañas en las trincheras alemanas. Eran velas colocadas sobre pequeños árboles de Navidad." },
      { title: "Villancicos", content: "Los alemanes comenzaron a cantar 'Stille Nacht' (Noche de Paz). Los británicos respondieron con 'The First Noel'. Por primera vez, no se gritaban insultos, sino canciones." },
      { title: "El Primer Encuentro", content: "Un soldado alemán se atrevió a salir desarmado a la 'Tierra de Nadie'. Un británico hizo lo mismo. Al ver que no se disparaban, cientos de soldados de ambos bandos salieron de sus agujeros." },
      { title: "Intercambio de Regalos", content: "En medio del campo de batalla, enemigos intercambiaron lo poco que tenían: cigarrillos, botones, chocolates, alcohol y sombreros. Se mostraron fotos de sus familias." },
      { title: "El Partido de Fútbol", content: "La leyenda cuenta que apareció un balón. En el suelo helado de Ypres, Bélgica, alemanes y británicos jugaron un partido improvisado. No había árbitros, solo risas." },
      { title: "Entierros Conjuntos", content: "La tregua también se usó para una tarea triste: enterrar a los muertos que yacían en la Tierra de Nadie. Soldados de ambos bandos ayudaron a cavar tumbas para sus supuestos enemigos." },
      { title: "La Reacción de los Generales", content: "Los altos mandos estaban furiosos. Temían que si los soldados fraternizaban, se negarían a luchar. Se dieron órdenes estrictas de disparar a cualquiera que intentara repetir la tregua." },
      { title: "El Legado", content: "La guerra continuó por 4 años más, costando millones de vidas. Pero la Tregua de 1914 demostró que el odio no es natural en el ser humano; es algo que se enseña y se ordena." }
    ],
    quiz: [
      { question: "¿En qué año ocurrió la Tregua de Navidad?", options: ["1914", "1918", "1939"], correctAnswer: 0 },
      { question: "¿Qué canción comenzaron a cantar los alemanes?", options: ["Jingle Bells", "Noche de Paz (Stille Nacht)", "Ave María"], correctAnswer: 1 },
      { question: "¿Dónde se encontraron los soldados?", options: ["En Berlín", "En Londres", "En la 'Tierra de Nadie'"], correctAnswer: 2 },
      { question: "¿Qué deporte jugaron improvisadamente?", options: ["Béisbol", "Fútbol", "Rugby"], correctAnswer: 1 },
      { question: "¿Cómo reaccionaron los generales ante la tregua?", options: ["La celebraron", "Se unieron a ella", "La prohibieron furiosamente"], correctAnswer: 2 }
    ]
  },
  {
    id: 'l2',
    title: 'Sombras de Hiroshima',
    year: '1945',
    summary: 'El impacto devastador de las armas nucleares y la necesidad urgente del desarme.',
    imageUrl: 'https://image.pollinations.ai/prompt/hiroshima%20atomic%20dome%20ruins%20vintage%20photo%20black%20and%20white?width=400&height=300&nologo=true',
    tags: ['Desarme', 'WWII'],
    xpReward: 10,
    slides: [
      { title: "Proyecto Manhattan", content: "Durante la Segunda Guerra Mundial, EE.UU. desarrolló en secreto la primera bomba atómica, temiendo que la Alemania Nazi lo hiciera primero." },
      { title: "Little Boy", content: "La bomba lanzada sobre Hiroshima se llamaba 'Little Boy'. Era una bomba de uranio. Nunca antes se había usado un arma así contra una población civil." },
      { title: "8:15 AM", content: "El 6 de agosto de 1945, a las 8:15 de la mañana, el bombardero Enola Gay soltó la bomba. Detonó a 600 metros sobre la ciudad para maximizar el daño." },
      { title: "El Destello", content: "Una luz cegadora más brillante que el sol llenó el cielo. La temperatura en el hipocentro alcanzó los 4.000°C, vaporizando todo al instante." },
      { title: "Las Sombras", content: "El calor fue tan intenso que las personas se desintegraron, dejando solo sus 'sombras' grabadas permanentemente en el pavimento y las paredes de piedra." },
      { title: "Lluvia Negra", content: "Poco después, comenzó a caer una lluvia negra y pegajosa. Estaba llena de cenizas radiactivas. Los sobrevivientes sedientos la bebieron, envenenándose sin saberlo." },
      { title: "Nagasaki", content: "Solo tres días después, el 9 de agosto, una segunda bomba ('Fat Man') fue lanzada sobre Nagasaki, matando a otras 70,000 personas." },
      { title: "Hibakusha", content: "Los sobrevivientes son llamados 'Hibakusha'. Durante décadas sufrieron discriminación y enfermedades horribles como leucemia y cáncer debido a la radiación." },
      { title: "Sadako y las Grullas", content: "Sadako Sasaki, una niña expuesta a la radiación, intentó hacer 1,000 grullas de papel para curarse. Hoy, las grullas son un símbolo mundial de paz." },
      { title: "Nunca Más", content: "Hiroshima hoy es una Ciudad de Paz. Su mensaje al mundo es claro: las armas nucleares no deben usarse jamás bajo ninguna circunstancia." }
    ],
    quiz: [
      { question: "¿Cómo se llamaba la bomba lanzada en Hiroshima?", options: ["Fat Man", "Little Boy", "Trinity"], correctAnswer: 1 },
      { question: "¿Qué fenómeno climático ocurrió tras la explosión?", options: ["Nieve roja", "Lluvia negra", "Viento verde"], correctAnswer: 1 },
      { question: "¿Qué son los 'Hibakusha'?", options: ["Los pilotos", "Los científicos", "Los sobrevivientes afectados por radiación"], correctAnswer: 2 },
      { question: "¿Qué ciudad fue bombardeada 3 días después?", options: ["Tokio", "Kioto", "Nagasaki"], correctAnswer: 2 },
      { question: "¿Qué animal de papel simboliza la paz por Sadako?", options: ["La Grulla", "La Paloma", "El Dragón"], correctAnswer: 0 }
    ]
  },
  {
    id: 'l3',
    title: 'La Caída del Muro',
    year: '1989',
    summary: 'La división de Berlín y cómo la voluntad civil derribó la barrera.',
    imageUrl: 'https://image.pollinations.ai/prompt/berlin%20wall%201989%20crowd%20graffiti%20historical?width=400&height=300&nologo=true',
    tags: ['Libertad', 'Guerra Fría'],
    xpReward: 10,
    slides: [
      { title: "Una Alemania Dividida", content: "Tras la WWII, Alemania fue dividida. El Oeste era democrático (RFA) y el Este comunista (RDA). Berlín, aunque en el este, también estaba dividida." },
      { title: "1961: El Cierre", content: "Para evitar que la gente huyera del comunismo al oeste, la RDA construyó el muro de la noche a la mañana el 13 de agosto de 1961. Familias quedaron separadas." },
      { title: "La Franja de la Muerte", content: "No era solo un muro. Había torres de vigilancia, perros, minas y una zona de arena para detectar huellas. Más de 140 personas murieron intentando cruzar." },
      { title: "Intentos de Fuga", content: "La gente fue creativa: túneles subterráneos, globos aerostáticos caseros, coches con doble fondo e incluso tirolesas fueron usados para escapar." },
      { title: "La Stasi", content: "La policía secreta del Este (Stasi) espiaba a todos. Vecinos denunciaban a vecinos. El miedo y la desconfianza reinaban en la RDA." },
      { title: "Vientos de Cambio", content: "En los 80, la economía del este colapsaba. Mijaíl Gorbachov en la URSS inició reformas (Perestroika). La gente en Alemania del Este comenzó a protestar pacíficamente." },
      { title: "4 de Noviembre", content: "Un millón de personas se manifestaron en Alexanderplatz exigiendo libertad. El gobierno comunista estaba perdiendo el control." },
      { title: "El Error de Schabowski", content: "El 9 de Noviembre de 1989, un funcionario leyó mal una nota en TV, diciendo que los viajes al oeste se permitían 'inmediatamente'. La gente corrió al muro." },
      { title: "La Noche Mágica", content: "Los guardias, confundidos y superados en número, abrieron las barreras. Desconocidos se abrazaban llorando. La gente comenzó a picar el muro con martillos." },
      { title: "Reunificación", content: "Menos de un año después, Alemania se reunificó. El Muro de Berlín nos enseña que la libertad es más fuerte que el cemento." }
    ],
    quiz: [
      { question: "¿En qué año se construyó el muro?", options: ["1945", "1961", "1989"], correctAnswer: 1 },
      { question: "¿Cómo se llamaba la policía secreta del Este?", options: ["KGB", "CIA", "Stasi"], correctAnswer: 2 },
      { question: "¿Qué evento precipitó la apertura del muro?", options: ["Una invasión", "Un error en una conferencia de prensa", "La muerte del líder"], correctAnswer: 1 },
      { question: "¿En qué año cayó el muro?", options: ["1989", "1990", "1991"], correctAnswer: 0 },
      { question: "¿Qué separaba el muro?", options: ["Francia y Alemania", "Berlín Este y Oeste", "Norte y Sur de Alemania"], correctAnswer: 1 }
    ]
  },
  {
    id: 'l4',
    title: 'Lecciones de Ruanda',
    year: '1994',
    summary: 'El costo de la indiferencia y el genocidio de 1994.',
    imageUrl: 'https://image.pollinations.ai/prompt/rwanda%20genocide%20memorial%20flame%20somber?width=400&height=300&nologo=true',
    tags: ['DDHH', 'África'],
    xpReward: 10,
    slides: [
      { title: "Raíces Coloniales", content: "Los colonizadores belgas dividieron a la población en Hutus (mayoría) y Tutsis (minoría), creando un odio artificial mediante documentos de identidad étnicos." },
      { title: "La Chispa", content: "En abril de 1994, el avión del presidente (Hutu) fue derribado. Los extremistas Hutu culparon a los Tutsis y comenzaron la matanza esa misma noche." },
      { title: "La Radio del Odio", content: "La radio RTLM transmitía propaganda llamando a los Tutsis 'cucarachas' y ordenando a los vecinos asesinar a sus vecinos. Las palabras fueron armas." },
      { title: "100 Días", content: "El genocidio duró aprox. 100 días. Se estima que entre 800,000 y 1 millón de personas fueron asesinadas, la mayoría con machetes." },
      { title: "Fallo de la ONU", content: "La ONU tenía fuerzas de paz en el país (UNAMIR), pero tenían prohibido usar la fuerza para detener las matanzas. La comunidad internacional retiró tropas en lugar de enviarlas." },
      { title: "Héroes Anónimos", content: "A pesar del horror, hubo Hutus moderados que escondieron y salvaron a Tutsis arriesgando sus vidas, como en el Hotel des Mille Collines." },
      { title: "El Fin", content: "El Frente Patriótico Ruandés (FPR), liderado por Tutsis, tomó el control del país en julio, deteniendo el genocidio pero provocando un éxodo masivo de Hutus." },
      { title: "Justicia Gacaca", content: "Para juzgar a miles de asesinos, se usaron tribunales comunitarios tradicionales 'Gacaca' en el césped, enfocados en la verdad y la reconciliación." },
      { title: "Reconstrucción", content: "Hoy, Ruanda ha prohibido las etiquetas étnicas. Todos son 'Ruandeses'. El país ha avanzado mucho, aunque las cicatrices permanecen." },
      { title: "Responsabilidad de Proteger", content: "Ruanda cambió las normas internacionales. Hoy se acepta que el mundo tiene la 'Responsabilidad de Proteger' (R2P) si un estado ataca a su propia gente." }
    ],
    quiz: [
      { question: "¿Cuánto duró aproximadamente el genocidio?", options: ["1 año", "100 días", "1 semana"], correctAnswer: 1 },
      { question: "¿Qué medio se usó para incitar el odio?", options: ["Televisión", "Radio", "Periódicos"], correctAnswer: 1 },
      { question: "¿Cómo llamaba la propaganda a las víctimas?", options: ["Enemigos", "Cucarachas", "Invasores"], correctAnswer: 1 },
      { question: "¿Qué hizo mayormente la comunidad internacional?", options: ["Intervino de inmediato", "Retiró tropas y miró a otro lado", "Envió armas"], correctAnswer: 1 },
      { question: "¿Qué son los tribunales Gacaca?", options: ["Cortes militares", "Tribunales internacionales", "Tribunales comunitarios tradicionales"], correctAnswer: 2 }
    ]
  },
  {
    id: 'l5',
    title: 'Crisis de Refugiados',
    year: '2011-Hoy',
    summary: 'Comprendiendo la realidad del desplazamiento forzoso en el siglo XXI.',
    imageUrl: 'https://image.pollinations.ai/prompt/syrian%20refugees%20walking%20road%20cinematic%20art?width=400&height=300&nologo=true',
    tags: ['Actualidad', 'Ayuda Humanitaria'],
    xpReward: 10,
    slides: [
      { title: "Primavera Árabe", content: "En 2011, protestas pacíficas en Siria contra el gobierno fueron reprimidas con violencia, desencadenando una brutal guerra civil que continúa hoy." },
      { title: "Cifras Desgarradoras", content: "Más de 13 millones de sirios han tenido que huir de sus hogares. La mitad son niños. Es la mayor crisis de desplazamiento desde la WWII." },
      { title: "Refugiado vs Migrante", content: "Un refugiado cruza fronteras porque su vida corre peligro por guerra o persecución. Tienen protecciones legales especiales que un migrante económico no tiene." },
      { title: "El Viaje Peligroso", content: "Sin vías legales, muchos pagan a traficantes para cruzar el Mediterráneo en botes de goma precarios. Miles han muerto ahogados en el intento." },
      { title: "Zaatari", content: "En Jordania, el campo de refugiados de Zaatari se convirtió en una 'ciudad' con 80,000 personas, escuelas y hospitales, pero sin libertad de movimiento." },
      { title: "La Ruta de los Balcanes", content: "En 2015, un millón de personas caminaron por Europa buscando asilo. Vimos imágenes icónicas como la del niño Aylan Kurdi que conmocionaron al mundo." },
      { title: "Países de Acogida", content: "Contrario a la creencia, la mayoría de refugiados no están en Europa, sino en países vecinos como Turquía, Líbano y Jordania, que soportan la mayor carga." },
      { title: "Desafíos de Integración", content: "Aprender un nuevo idioma, validar títulos universitarios y superar el trauma y la xenofobia son retos enormes para reiniciar una vida." },
      { title: "Niñez Perdida", content: "Muchos niños refugiados pasan años sin ir a la escuela. Existe el riesgo de una 'generación perdida' sin educación ni futuro." },
      { title: "Tu Papel", content: "No podemos detener la guerra solos, pero podemos combatir la xenofobia, donar a ONGs y exigir políticas de asilo humanas. La empatía es el primer paso." }
    ],
    quiz: [
      { question: "¿Cuál fue el detonante principal de la crisis siria actual?", options: ["Un terremoto", "La Guerra Civil iniciada en 2011", "Una invasión extranjera"], correctAnswer: 1 },
      { question: "¿Cuál es la diferencia clave entre refugiado y migrante?", options: ["El refugiado huye por peligro de vida", "El refugiado es más rico", "No hay diferencia"], correctAnswer: 0 },
      { question: "¿Dónde se alojan la mayoría de los refugiados sirios?", options: ["En Estados Unidos", "En Europa", "En países vecinos (Turquía, Líbano)"], correctAnswer: 2 },
      { question: "¿Qué riesgo enfrentan al cruzar el Mediterráneo?", options: ["Ahogamiento y traficantes", "Perder el pasaporte", "Retrasos en ferris"], correctAnswer: 0 },
      { question: "¿Qué proporción de refugiados son niños?", options: ["10%", "Casi la mitad (50%)", "90%"], correctAnswer: 1 }
    ]
  }
];

interface LessonsListProps {
  user: UserProfile | null;
  onCompleteLesson: (lessonId: string, xp: number) => void;
}

export const LessonsList: React.FC<LessonsListProps> = ({ user, onCompleteLesson }) => {
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quizMode, setQuizMode] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: number}>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const resetState = () => {
    setActiveLesson(null);
    setCurrentSlide(0);
    setQuizMode(false);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  const handleOpenLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setCurrentSlide(0);
    setQuizMode(false);
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const handleNextSlide = () => {
    if (!activeLesson) return;
    if (currentSlide < activeLesson.slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      setQuizMode(true);
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleOptionSelect = (questionIdx: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [questionIdx]: optionIdx }));
  };

  const submitQuiz = () => {
    if (!activeLesson) return;
    
    let correctCount = 0;
    activeLesson.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctAnswer) {
        correctCount++;
      }
    });

    setQuizScore(correctCount);
    setQuizSubmitted(true);

    // Check for perfection to award XP
    if (correctCount === 5 && user && !user.completedLessonIds.includes(activeLesson.id)) {
      onCompleteLesson(activeLesson.id, activeLesson.xpReward);
    }
  };

  const retryQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {lessons.map((lesson) => {
        const isCompleted = user?.completedLessonIds.includes(lesson.id);
        
        return (
          <div 
            key={lesson.id} 
            className={`
              relative bg-brand-charcoal border p-6 flex flex-col group transition-all duration-300
              ${isCompleted ? 'border-green-500/50 opacity-75' : 'border-white/10 hover:border-brand-accent'}
            `}
          >
            <div className="absolute top-4 right-4">
              {isCompleted ? (
                <CheckCircle className="text-green-500 w-6 h-6" />
              ) : (
                <FileText className="text-slate-600 group-hover:text-brand-accent transition-colors w-6 h-6" />
              )}
            </div>

            <div className="mb-4">
              <span className="text-xs font-mono text-brand-accent bg-brand-accent/10 px-2 py-1 rounded uppercase tracking-widest">
                Archivo {lesson.year}
              </span>
            </div>

            <h3 className="font-heading text-xl text-white font-bold mb-2 leading-tight group-hover:text-brand-accent transition-colors">
              {lesson.title}
            </h3>
            
            <p className="text-slate-400 text-sm mb-6 line-clamp-3 flex-grow">
              {lesson.summary}
            </p>

            <div className="relative w-full h-32 mb-4 rounded overflow-hidden border border-white/5">
               <div className="absolute inset-0 bg-brand-accent/10 group-hover:bg-transparent transition-colors" />
               <img 
                  src={lesson.imageUrl} 
                  alt={lesson.title}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  onError={(e) => {
                     (e.target as HTMLImageElement).src = 'https://placehold.co/400x300/1e293b/FFF?text=No+Image';
                  }}
               />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
              <div className="flex gap-2">
                {lesson.tags.map(tag => (
                  <span key={tag} className="text-[10px] text-slate-500 uppercase font-bold">#{tag}</span>
                ))}
              </div>
              
              {user ? (
                <button 
                  onClick={() => handleOpenLesson(lesson)}
                  className={`
                    px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2
                    ${isCompleted 
                      ? 'text-green-500 cursor-default' 
                      : 'bg-white/5 hover:bg-brand-accent hover:text-brand-dark text-white'
                    }
                  `}
                >
                  {isCompleted ? 'Repasar' : 'Iniciar Misión'}
                </button>
              ) : (
                 <div className="flex items-center gap-1 text-xs text-slate-500 uppercase">
                    <Lock size={12} />
                    <span>Requiere Acceso</span>
                 </div>
              )}
            </div>
          </div>
        );
      })}

      {/* --- LESSON MODAL --- */}
      {activeLesson && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 bg-brand-dark/95 backdrop-blur-sm">
          <div className="bg-brand-charcoal w-full max-w-4xl border border-white/10 shadow-2xl h-[85vh] flex flex-col animate-fade-in-up relative overflow-hidden">
             
             {/* Header */}
             <div className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-900/50">
                <div>
                   <span className="text-brand-accent text-xs font-bold uppercase tracking-widest">Misión de Inteligencia</span>
                   <h2 className="text-2xl font-heading font-bold text-white">{activeLesson.title}</h2>
                </div>
                <button onClick={resetState} className="text-slate-400 hover:text-white p-2 bg-white/5 rounded-full transition-colors">
                   <X size={24} />
                </button>
             </div>

             {/* Content Area */}
             <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10">
                
                {!quizMode ? (
                  /* --- SLIDES MODE --- */
                  <div className="max-w-3xl mx-auto h-full flex flex-col">
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800 h-1 mb-8 rounded-full overflow-hidden">
                      <div 
                        className="bg-brand-accent h-full transition-all duration-300" 
                        style={{ width: `${((currentSlide + 1) / activeLesson.slides.length) * 100}%` }}
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-center animate-fade-in-up" key={currentSlide}>
                       <div className="mb-4">
                          <span className="text-6xl font-heading font-bold text-white/5 absolute -ml-4 -mt-8 select-none">
                            {currentSlide + 1 < 10 ? `0${currentSlide + 1}` : currentSlide + 1}
                          </span>
                          <span className="relative text-brand-accent text-sm font-bold uppercase tracking-widest mb-2 block">
                             Informe {currentSlide + 1}/{activeLesson.slides.length}
                          </span>
                          <h3 className="relative text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                            {activeLesson.slides[currentSlide].title}
                          </h3>
                       </div>
                       
                       <p className="text-lg md:text-xl text-slate-300 leading-relaxed border-l-4 border-brand-accent/20 pl-6 py-2">
                         {activeLesson.slides[currentSlide].content}
                       </p>
                       
                       {/* Placeholder for slide specific imagery if we had it in data */}
                       <div className="mt-8 h-40 bg-gradient-to-r from-slate-800 to-transparent rounded opacity-50 border border-white/5 flex items-center justify-center">
                          <FileText className="text-white/10 w-12 h-12" />
                       </div>
                    </div>

                    <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/5">
                      <button 
                        onClick={handlePrevSlide}
                        disabled={currentSlide === 0}
                        className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest px-4 py-2 rounded transition-colors ${currentSlide === 0 ? 'text-slate-600 cursor-not-allowed' : 'text-white hover:bg-white/5'}`}
                      >
                        <ChevronLeft size={16} /> Anterior
                      </button>

                      <button 
                        onClick={handleNextSlide}
                        className="flex items-center gap-2 bg-brand-accent text-brand-dark px-6 py-3 font-bold uppercase tracking-widest hover:bg-white transition-colors shadow-lg"
                      >
                        {currentSlide === activeLesson.slides.length - 1 ? 'Tomar Examen' : 'Siguiente'}
                        {currentSlide === activeLesson.slides.length - 1 ? <Award size={18} /> : <ChevronRight size={18} />}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* --- QUIZ MODE --- */
                  <div className="max-w-2xl mx-auto animate-fade-in-up pb-12">
                    <div className="text-center mb-10">
                       <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <HelpCircle className="w-8 h-8 text-brand-accent" />
                       </div>
                       <h3 className="text-3xl font-heading font-bold text-white mb-2">Examen de Certificación</h3>
                       <p className="text-slate-400">Responde correctamente las 5 preguntas para ganar tus puntos de misión.</p>
                    </div>

                    <div className="space-y-8">
                      {activeLesson.quiz.map((q, idx) => (
                        <div key={idx} className="bg-slate-900/50 border border-white/5 p-6 rounded-sm">
                          <p className="text-lg text-white font-bold mb-4 flex gap-3">
                            <span className="text-brand-accent">{idx + 1}.</span> 
                            {q.question}
                          </p>
                          <div className="space-y-2 pl-6">
                            {q.options.map((opt, optIdx) => {
                              let buttonClass = "w-full text-left p-3 border text-sm transition-all ";
                              
                              if (quizSubmitted) {
                                if (optIdx === q.correctAnswer) {
                                   buttonClass += "bg-green-900/30 border-green-500 text-green-400";
                                } else if (quizAnswers[idx] === optIdx) {
                                   buttonClass += "bg-red-900/30 border-red-500 text-red-400";
                                } else {
                                   buttonClass += "border-white/10 text-slate-500 opacity-50";
                                }
                              } else {
                                if (quizAnswers[idx] === optIdx) {
                                  buttonClass += "bg-brand-accent text-brand-dark border-brand-accent font-bold";
                                } else {
                                  buttonClass += "border-white/10 text-slate-300 hover:bg-white/5";
                                }
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handleOptionSelect(idx, optIdx)}
                                  disabled={quizSubmitted}
                                  className={buttonClass}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-10 text-center">
                      {!quizSubmitted ? (
                        <button 
                          onClick={submitQuiz}
                          disabled={Object.keys(quizAnswers).length < 5}
                          className="bg-brand-accent text-brand-dark px-10 py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-xl text-lg"
                        >
                          Evaluar Respuestas
                        </button>
                      ) : (
                        <div className="animate-fade-in-up bg-slate-800 p-8 border border-white/10">
                           <div className="text-4xl font-bold mb-2 text-white">
                             Puntuación: <span className={quizScore === 5 ? 'text-green-500' : 'text-red-500'}>{quizScore}/5</span>
                           </div>
                           
                           {quizScore === 5 ? (
                             <div className="space-y-4">
                               <p className="text-green-400 font-bold uppercase tracking-wider">¡Misión Cumplida! Has dominado esta lección.</p>
                               {!user?.completedLessonIds.includes(activeLesson.id) && (
                                 <div className="inline-block bg-brand-accent/20 text-brand-accent px-4 py-2 rounded border border-brand-accent/50 font-bold">
                                   +10 XP Ganados
                                 </div>
                               )}
                               <button onClick={resetState} className="block w-full mt-4 bg-white text-black font-bold py-3 uppercase hover:bg-slate-200">
                                 Volver al Centro de Mando
                               </button>
                             </div>
                           ) : (
                             <div className="space-y-4">
                               <p className="text-red-400 flex items-center justify-center gap-2">
                                 <AlertCircle size={20} />
                                 Necesitas 5/5 para aprobar. Revisa tus errores.
                               </p>
                               <button 
                                 onClick={retryQuiz}
                                 className="flex items-center justify-center gap-2 mx-auto bg-white/10 hover:bg-white/20 text-white px-6 py-3 font-bold uppercase tracking-widest transition-colors"
                               >
                                 <RotateCcw size={18} /> Intentar de Nuevo
                               </button>
                             </div>
                           )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};