import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { GameCard } from './components/GameCard';
import { Timeline } from './components/Timeline';
import { InteractiveMap } from './components/InteractiveMap';
import { RegistrationModal } from './components/RegistrationModal';
import { LessonsList } from './components/LessonsList';
import { GameModule, UserProfile } from './types';
import { 
  Globe2, 
  HeartHandshake, 
  AlertTriangle, 
  Database, 
  Medal, 
  Users, 
  ChevronDown,
  Shield,
  User,
  BookOpen
} from 'lucide-react';

const games: GameModule[] = [
  {
    id: 'tiny-heroes',
    title: 'Tiny Heroes',
    description: 'Los protagonistas son ratas entrenadas para detectar minas antipersona. Un juego de precisión y cuidado.',
    mechanic: 'Detección de minas',
    educationalGoal: 'Enseñar sobre el desminado humanitario y el riesgo de explosivos.',
    imageUrl: 'https://image.pollinations.ai/prompt/heroic%20rat%20sniffing%20landmine%20in%20dirt%20close%20up%20cinematic?width=400&height=300&nologo=true'
  },
  {
    id: 'aid-convoy',
    title: 'Ayuda Humanitaria',
    description: 'Lleva un convoy de ayuda humanitaria a través de territorios peligrosos. La logística salva vidas.',
    mechanic: 'Logística y Estrategia',
    educationalGoal: 'Conceptos de diplomacia, riesgo y protección de civiles.',
    imageUrl: 'https://image.pollinations.ai/prompt/united%20nations%20white%20truck%20convoy%20desert%20dust%20road?width=400&height=300&nologo=true'
  },
  {
    id: 'a-bomb',
    title: 'A-Bomb: Escape',
    description: 'Un juego de supervivencia contrarreloj donde el objetivo es escapar de la radiación invisible.',
    mechanic: 'Supervivencia',
    educationalGoal: 'Impacto de armas nucleares y la urgencia del desarme.',
    imageUrl: 'https://image.pollinations.ai/prompt/nuclear%20explosion%20mushroom%20cloud%20vintage%20photo%20scary?width=400&height=300&nologo=true'
  }
];

const App: React.FC = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  const openRegister = () => setIsRegisterOpen(true);
  
  const handleRegisterSuccess = (profile: UserProfile) => {
    setUser(profile);
    setIsRegisterOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleLessonComplete = (lessonId: string, xpReward: number) => {
    if (user) {
      const currentXp = user.xp || 0;
      const currentLessons = user.completedLessonIds || [];
      
      // Only award if not already completed
      if (!currentLessons.includes(lessonId)) {
        setUser({
          ...user,
          xp: currentXp + xpReward,
          completedLessonIds: [...currentLessons, lessonId]
        });
      }
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation onJoinClick={openRegister} user={user} onLogout={handleLogout} />
      
      <RegistrationModal 
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)}
        onRegisterSuccess={handleRegisterSuccess}
      />

      {/* HERO SECTION */}
      <header className="relative h-screen flex items-center justify-center bg-hero-pattern bg-cover bg-center bg-fixed bg-no-repeat px-6">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-90" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block animate-fade-in-up">
             <span className="px-4 py-1 border border-white/20 rounded-full text-xs uppercase tracking-[0.2em] text-brand-accent mb-4 inline-block backdrop-blur-sm">
               Plataforma Educativa & Cultural
             </span>
          </div>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
            CHILD <span className="text-brand-accent">&</span> DUTY
          </h1>
          <p className="font-serif-text text-xl md:text-2xl text-slate-300 italic max-w-2xl mx-auto leading-relaxed">
            "Visibilizar la crueldad de los conflictos para construir un futuro de paz."
          </p>
          
          <div className="pt-8 flex flex-col md:flex-row gap-4 justify-center items-center">
            {user ? (
              <button className="px-8 py-4 bg-brand-charcoal border border-brand-accent text-brand-accent font-bold uppercase tracking-widest hover:bg-brand-accent hover:text-brand-dark transition-colors shadow-lg flex items-center gap-2">
                <User size={18} />
                Mi Panel de Misión
              </button>
            ) : (
              <button 
                onClick={openRegister}
                className="px-8 py-4 bg-brand-accent text-brand-dark font-bold uppercase tracking-widest hover:bg-white transition-colors shadow-lg shadow-brand-accent/20"
              >
                Unirse al Cuerpo de Paz
              </button>
            )}
            
            <a href="#data" className="px-8 py-4 border border-white/30 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors backdrop-blur-sm">
              Explorar Datos
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-500">
          <ChevronDown size={32} />
        </div>
      </header>

      {/* MISSION SECTION */}
      <section id="mission" className="py-24 px-6 bg-brand-dark border-b border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="font-heading text-4xl font-bold text-white">
              Más que un juego,<br />
              <span className="text-brand-accent">una responsabilidad.</span>
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              CHILD & DUTY es una iniciativa que busca enseñar a niños y jóvenes la complejidad humana de los conflictos armados.
            </p>
            <p className="text-slate-400 leading-relaxed">
              A través de herramientas digitales interactivas, combinamos pedagogía, datos verificables y una estética sobria para promover la empatía sin glorificar la violencia. Ponemos en el centro la protección de la infancia.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="flex items-start gap-3">
                <Globe2 className="text-brand-accent mt-1" />
                <div>
                  <h4 className="font-bold text-white mb-1">Conciencia Global</h4>
                  <p className="text-sm text-slate-500">Entender el impacto real de la guerra.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <HeartHandshake className="text-brand-accent mt-1" />
                <div>
                  <h4 className="font-bold text-white mb-1">Empatía Activa</h4>
                  <p className="text-sm text-slate-500">Conectar con las víctimas y ayudar.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 border border-white/10 rotate-3" />
            <div className="absolute -inset-4 border border-brand-accent/20 -rotate-3" />
            <img 
              src="https://image.pollinations.ai/prompt/sad%20refugee%20child%20sitting%20in%20rubble%20cinematic%20lighting?width=800&height=1000&nologo=true" 
              alt="Refugee child illustration concept" 
              className="relative w-full h-auto shadow-2xl filter brightness-75 contrast-125"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
              <p className="text-white font-heading text-lg">"La primera víctima de la guerra es la inocencia."</p>
            </div>
          </div>
        </div>
      </section>

      {/* PEACE CORPS (GAMIFICATION) */}
      <section id="peace-corps" className="py-24 px-6 bg-brand-charcoal relative overflow-hidden">
        {/* Background textural elements */}
        <div className="absolute top-0 right-0 p-12 opacity-5 text-9xl font-heading font-bold text-white select-none">
          PAZ
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-accent uppercase tracking-widest text-sm font-bold">Gamificación y Progreso</span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mt-4 mb-6">
              Cuerpo de Paz Virtual
            </h2>
            <p className="text-slate-400">
              Al registrarse, cada usuario recibe un Carnet Digital. Completa misiones, aprende historia y ayuda en simulaciones para subir de rango.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1: The ID */}
            <div className="col-span-1 md:col-span-2 bg-slate-900 border border-white/10 p-8 rounded-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/10 rounded-full blur-3xl group-hover:bg-brand-accent/20 transition-all" />
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-40 h-40 bg-slate-800 border-2 border-white/20 shrink-0 flex items-center justify-center relative overflow-hidden">
                   {user && user.avatar ? (
                     <img src={user.avatar} alt="User Avatar" className="w-full h-full object-cover" />
                   ) : (
                     <Users className="w-16 h-16 text-slate-600" />
                   )}
                   <div className="absolute bottom-0 right-0 bg-brand-accent text-black text-xs font-bold px-2 py-1">LVL {user ? Math.floor(((user.xp || 0) / 100) + 1) : '1'}</div>
                </div>
                
                <div className="flex-1 space-y-4 w-full">
                  <div className="flex justify-between items-end border-b border-white/10 pb-2">
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">Nombre en Clave</div>
                      <div className="font-heading text-2xl text-white">{user ? user.nickname : 'PEACE_KEEPER_01'}</div>
                    </div>
                    <Shield className="text-brand-accent w-8 h-8" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">Rango</div>
                      <div className="text-white font-bold">{user ? user.division : 'Embajador Junior'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">Misiones</div>
                      <div className="text-white font-bold">{user ? user.completedLessonIds?.length || 0 : '0'}/50 Completadas</div>
                    </div>
                  </div>

                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-4">
                    <div className="bg-brand-accent h-full" style={{ width: `${user ? Math.min(((user.xp || 0) / 100) * 100, 100) : 0}%` }} />
                  </div>
                  <p className="text-xs text-right text-brand-accent">{user ? (100 - ((user.xp || 0) % 100)) : '100'} Puntos para siguiente rango</p>
                </div>
              </div>
            </div>

            {/* Card 2: Rewards */}
            <div className="bg-slate-900 border border-white/10 p-8 flex flex-col justify-center items-center text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                <Medal className="w-8 h-8 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-bold text-white text-xl mb-2">Recompensas</h3>
                <p className="text-sm text-slate-400">
                  Canjea tus puntos por skins de avatar, insignias temáticas, stickers y merchandising real.
                </p>
              </div>
              <ul className="text-sm text-left space-y-2 text-slate-300 w-full bg-white/5 p-4 rounded">
                <li className="flex justify-between"><span>Skin Casco Azul</span> <span className="text-brand-accent">500 pts</span></li>
                <li className="flex justify-between"><span>Insignia Diplomacia</span> <span className="text-brand-accent">1200 pts</span></li>
                <li className="flex justify-between"><span>Pack Stickers</span> <span className="text-brand-accent">200 pts</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

       {/* LESSONS SECTION */}
      <section id="lessons" className="py-24 px-6 bg-brand-dark border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
               <div className="flex items-center gap-2 text-brand-accent mb-2">
                  <BookOpen size={16} />
                  <span className="uppercase tracking-widest text-sm font-bold">Archivos Históricos</span>
               </div>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-white">
                Lecciones de Conflicto
              </h2>
              <p className="text-slate-400 mt-4">
                Explora los archivos clasificados de los conflictos más significativos de la historia. 
                Aprende del pasado para proteger el futuro. Gana <span className="text-brand-accent font-bold">10 XP</span> por cada lección completada.
              </p>
            </div>
            {!user && (
              <div className="text-right">
                 <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">¿Quieres guardar tu progreso?</p>
                 <button onClick={openRegister} className="text-brand-accent border-b border-brand-accent pb-1 hover:text-white transition-colors font-bold uppercase text-sm">
                    Regístrate ahora
                 </button>
              </div>
            )}
          </div>

          <LessonsList user={user} onCompleteLesson={handleLessonComplete} />
        </div>
      </section>


      {/* GAMES SECTION */}
      <section id="games" className="py-24 px-6 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-brand-accent uppercase tracking-widest text-sm font-bold">Aprendizaje Interactivo</span>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mt-4">
                Simulaciones
              </h2>
              <p className="text-slate-400 mt-4">
                Juegos diseñados con mecánicas simples pero significados profundos.
              </p>
            </div>
            <button className="text-white border-b border-brand-accent pb-1 hover:text-brand-accent transition-colors">
              Ver biblioteca completa
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 h-auto md:h-[500px]">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* DATA & MAP SECTION */}
      <section id="data" className="py-24 px-6 bg-slate-900 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left: Data Text */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Database className="text-brand-accent" />
                  <span className="text-white font-bold uppercase tracking-wider">Base de Datos de Conflictos</span>
                </div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white leading-tight">
                  La verdad detrás de las cifras.
                </h2>
                <p className="text-slate-400 mt-4">
                  Acceso a fichas detalladas verificadas: cronologías, causas, y el costo humano de cada conflicto. Datos actualizados para combatir la desinformación.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-brand-charcoal p-6 border-l-4 border-brand-alert">
                  <span className="text-3xl font-heading font-bold text-white">27+</span>
                  <p className="text-sm text-slate-400 mt-1">Conflictos Activos</p>
                </div>
                <div className="bg-brand-charcoal p-6 border-l-4 border-slate-500">
                  <span className="text-3xl font-heading font-bold text-white">110M+</span>
                  <p className="text-sm text-slate-400 mt-1">Desplazados Forzosos</p>
                </div>
                <div className="bg-brand-charcoal p-6 border-l-4 border-brand-accent col-span-2">
                  <div className="flex justify-between items-center">
                     <div>
                       <span className="text-3xl font-heading font-bold text-white">450</span>
                       <span className="text-xl text-slate-500 ml-1">Misiones</span>
                     </div>
                     <div className="text-right">
                        <p className="text-sm text-brand-accent font-bold uppercase">Ayuda Humanitaria</p>
                        <p className="text-xs text-slate-500">Entregada este mes</p>
                     </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                 <button className="flex items-center gap-2 text-white hover:text-brand-accent transition-colors">
                   <AlertTriangle size={16} />
                   <span className="underline underline-offset-4">Reportar datos incorrectos o actualizar</span>
                 </button>
              </div>
            </div>

            {/* Right: Interactive Map */}
            <div id="map">
              <InteractiveMap />
            </div>
          </div>

          {/* Timeline Component */}
          <Timeline />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-brand-accent" />
              <span className="font-heading text-xl font-bold">CHILD & DUTY</span>
            </div>
            <p className="text-slate-500 max-w-sm text-sm leading-relaxed">
              Una plataforma para educar sobre la paz, la diplomacia y la ayuda humanitaria. Protegiendo la inocencia a través del conocimiento.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-white">Plataforma</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><button onClick={openRegister} className="hover:text-brand-accent text-left">Cuerpo de Paz</button></li>
              <li><a href="#games" className="hover:text-brand-accent">Juegos Educativos</a></li>
              <li><a href="#data" className="hover:text-brand-accent">Base de Datos</a></li>
              <li><a href="#" className="hover:text-brand-accent">Para Escuelas</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-brand-accent">Política de Privacidad (RGPD)</a></li>
              <li><a href="#" className="hover:text-brand-accent">Seguridad Infantil</a></li>
              <li><a href="#" className="hover:text-brand-accent">Términos de Uso</a></li>
              <li><a href="#" className="hover:text-brand-accent">Contacto</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center text-xs text-slate-600">
          &copy; 2024 Child & Duty Initiative. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;