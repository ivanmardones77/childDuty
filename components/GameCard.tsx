import React from 'react';
import { GameModule } from '../types';
import { ArrowRight } from 'lucide-react';

interface GameCardProps {
  game: GameModule;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <div className="group relative overflow-hidden bg-brand-charcoal border border-white/5 hover:border-brand-accent/50 transition-all duration-500 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-brand-accent/10 group-hover:bg-transparent transition-colors z-10" />
        <img 
          src={game.imageUrl} 
          alt={game.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0" 
        />
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-heading text-xl font-bold text-white mb-2 group-hover:text-brand-accent transition-colors">
          {game.title}
        </h3>
        <p className="text-slate-400 text-sm mb-4 flex-1">
          {game.description}
        </p>
        
        <div className="space-y-3 pt-4 border-t border-white/5">
          <div>
            <span className="text-xs font-bold text-brand-accent uppercase tracking-wider block mb-1">Mecánica</span>
            <p className="text-xs text-slate-300">{game.mechanic}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Objetivo Educativo</span>
            <p className="text-xs text-slate-300 italic">"{game.educationalGoal}"</p>
          </div>
        </div>
      </div>

      <div className="bg-black/20 p-4 flex justify-between items-center group-hover:bg-brand-accent group-hover:text-brand-dark transition-colors duration-300 cursor-pointer">
        <span className="text-xs font-bold uppercase tracking-widest">Jugar Demo</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  );
};