import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, User, ChevronDown, LogOut, LayoutDashboard, BookOpen } from 'lucide-react';
import { NavItem, UserProfile } from '../types';

const navItems: NavItem[] = [
  { label: 'Misión', href: '#mission' },
  { label: 'Cuerpo de Paz', href: '#peace-corps' },
  { label: 'Lecciones', href: '#lessons' },
  { label: 'Juegos', href: '#games' },
  { label: 'Datos', href: '#data' },
  { label: 'Mapa', href: '#map' },
];

interface NavigationProps {
  onJoinClick: () => void;
  user: UserProfile | null;
  onLogout?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onJoinClick, user, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const handleJoin = (e: React.MouseEvent) => {
    e.preventDefault();
    onJoinClick();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
        isScrolled ? 'bg-brand-dark/95 backdrop-blur-sm border-b border-white/10 py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" onClick={handleLogoClick} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Shield className="w-8 h-8 text-brand-accent" strokeWidth={1.5} />
          <span className="font-heading text-xl md:text-2xl font-bold tracking-widest text-white">
            CHILD & DUTY
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-xs xl:text-sm uppercase tracking-widest text-slate-300 hover:text-brand-accent transition-colors"
            >
              {item.label}
            </a>
          ))}
          
          {user ? (
            <div className="relative group">
              <div className="flex items-center gap-3 border border-white/10 bg-white/5 pl-2 pr-4 py-1.5 rounded-full cursor-pointer hover:bg-white/10 transition-colors">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-brand-accent/50 bg-slate-800 flex items-center justify-center">
                  {user.avatar ? (
                    <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-brand-accent font-bold uppercase leading-none">{user.division}</span>
                  <span className="text-xs font-bold text-white uppercase leading-none mt-1 max-w-[100px] truncate">{user.nickname}</span>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-brand-accent transition-colors" />
              </div>

              {/* Dropdown Menu */}
              <div className="absolute top-full right-0 mt-2 w-64 bg-brand-charcoal border border-white/10 shadow-2xl rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="p-4 border-b border-white/5 bg-slate-900/50">
                   <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Experiencia de Misión</p>
                   <div className="flex justify-between items-end">
                      <p className="text-2xl font-heading font-bold text-brand-accent">{user.xp || 0} XP</p>
                      <p className="text-xs text-slate-400 mb-1">{user.completedLessonIds?.length || 0} Lecciones</p>
                   </div>
                   <div className="w-full bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-brand-accent h-full" style={{ width: `${Math.min(((user.xp || 0) / 100) * 100, 100)}%` }}></div>
                   </div>
                </div>
                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left text-xs uppercase tracking-wider text-slate-300 hover:bg-white/5 hover:text-white flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    Panel de Misiones
                  </button>
                  <button className="w-full px-4 py-2 text-left text-xs uppercase tracking-wider text-slate-300 hover:bg-white/5 hover:text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Mis Lecciones
                  </button>
                  <button className="w-full px-4 py-2 text-left text-xs uppercase tracking-wider text-slate-300 hover:bg-white/5 hover:text-white flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Mis Insignias
                  </button>
                  {onLogout && (
                    <button 
                      onClick={onLogout}
                      className="w-full px-4 py-2 text-left text-xs uppercase tracking-wider text-red-400 hover:bg-red-900/20 hover:text-red-300 flex items-center gap-2 mt-2 border-t border-white/5 pt-3"
                    >
                      <LogOut className="w-4 h-4" />
                      Cerrar Sesión
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <a 
              href="#peace-corps"
              onClick={handleJoin}
              className="border border-brand-accent text-brand-accent px-6 py-2 text-xs font-bold uppercase tracking-widest hover:bg-brand-accent hover:text-white transition-all duration-300"
            >
              Unirse
            </a>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-brand-dark border-b border-white/10 p-6 lg:hidden flex flex-col gap-4 shadow-2xl h-screen overflow-y-auto">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-slate-300 hover:text-brand-accent py-3 border-b border-white/5 text-sm tracking-widest uppercase"
            >
              {item.label}
            </a>
          ))}
          {user ? (
            <div className="pt-4 border-t border-white/10">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-brand-accent/50 overflow-hidden">
                    {user.avatar && <img src={user.avatar} className="w-full h-full object-cover" />}
                  </div>
                  <div>
                    <p className="text-brand-accent text-xs font-bold uppercase">{user.division}</p>
                    <p className="text-white font-bold uppercase">{user.nickname}</p>
                    <p className="text-xs text-slate-400 mt-1">{user.xp || 0} XP</p>
                  </div>
               </div>
               <button onClick={() => setIsMobileMenuOpen(false)} className="text-slate-300 text-sm uppercase tracking-wider block py-2">Mi Panel</button>
               <button onClick={() => { onLogout?.(); setIsMobileMenuOpen(false); }} className="text-red-400 text-sm uppercase tracking-wider block py-2">Cerrar Sesión</button>
            </div>
          ) : (
            <a
              href="#peace-corps"
              onClick={handleJoin}
              className="text-brand-accent font-bold py-4 text-center border border-brand-accent mt-4"
            >
              UNIRSE AL CUERPO DE PAZ
            </a>
          )}
        </div>
      )}
    </nav>
  );
};