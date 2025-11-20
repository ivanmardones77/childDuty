import React from 'react';
import { Clock } from 'lucide-react';

interface TimelineEvent {
  id: string;
  name: string;
  yearStart: number;
  yearEnd?: number; 
  category: 'conflict' | 'crisis';
}

const events: TimelineEvent[] = [
  { id: '1', name: 'Guerra en Afganistán', yearStart: 2001, yearEnd: 2021, category: 'conflict' },
  { id: '2', name: 'Invasión de Irak', yearStart: 2003, yearEnd: 2011, category: 'conflict' },
  { id: '3', name: 'Guerra Civil Siria', yearStart: 2011, category: 'conflict' },
  { id: '4', name: 'Guerra Civil en Yemen', yearStart: 2014, category: 'crisis' },
  { id: '5', name: 'Guerra Ruso-Ucraniana', yearStart: 2014, category: 'conflict' },
  { id: '6', name: 'Guerra de Tigray', yearStart: 2020, yearEnd: 2022, category: 'conflict' },
  { id: '7', name: 'Guerra Israel-Gaza', yearStart: 2023, category: 'conflict' },
];

export const Timeline: React.FC = () => {
  const startYear = 2000;
  const endYear = 2025;
  const totalYears = endYear - startYear;

  const getLeft = (year: number) => ((year - startYear) / totalYears) * 100;
  const getWidth = (start: number, end: number = endYear) => {
     const w = ((end - start) / totalYears) * 100;
     // Ensure minimal visibility for short conflicts
     return Math.max(w, 1.5);
  };

  return (
    <div className="mt-16 border-t border-white/5 pt-12">
       <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-accent/10 rounded-full">
                <Clock className="text-brand-accent w-5 h-5" />
            </div>
            <div>
                <h3 className="text-white font-heading font-bold text-xl tracking-wide">Cronología de Impacto</h3>
                <p className="text-slate-500 text-xs uppercase tracking-widest">Conflictos Mayores (2000 - Presente)</p>
            </div>
          </div>
          
          <div className="flex gap-4 text-xs font-mono text-slate-400">
             <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-alert"></span>
                <span>Guerra Activa</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <span>Crisis Humanitaria</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                <span>Finalizado</span>
             </div>
          </div>
       </div>

       <div className="bg-brand-charcoal/50 border border-white/5 rounded-xl p-6 overflow-x-auto custom-scrollbar relative">
          <div className="min-w-[700px] relative pt-8 pb-2">
             {/* Axis Labels */}
             <div className="flex justify-between text-xs font-mono text-slate-600 mb-4 select-none">
                {[2000, 2005, 2010, 2015, 2020, 2025].map(year => (
                    <span key={year} className="absolute -top-2" style={{ left: `${getLeft(year)}%`, transform: 'translateX(-50%)' }}>{year}</span>
                ))}
             </div>

             {/* Grid Lines Background */}
             <div className="absolute inset-0 top-8 h-full w-full pointer-events-none">
                {[2000, 2005, 2010, 2015, 2020, 2025].map(year => (
                    <div key={year} className="absolute top-0 bottom-0 w-px border-l border-dashed border-white/5" style={{ left: `${getLeft(year)}%` }}></div>
                ))}
             </div>

             {/* Tracks */}
             <div className="space-y-5 relative z-10">
                {events.map((ev) => {
                    const isOngoing = !ev.yearEnd;
                    const width = getWidth(ev.yearStart, ev.yearEnd);
                    const left = getLeft(ev.yearStart);
                    
                    return (
                        <div key={ev.id} className="relative h-8 flex items-center group">
                            {/* The Bar */}
                            <div 
                                className={`
                                    absolute h-2 rounded-full shadow-lg transition-all duration-300 group-hover:h-3 group-hover:shadow-brand-accent/20 cursor-pointer
                                    ${!isOngoing 
                                        ? 'bg-slate-600 opacity-60' 
                                        : ev.category === 'conflict' ? 'bg-brand-alert' : 'bg-orange-500'
                                    }
                                `}
                                style={{ left: `${left}%`, width: `${width}%` }}
                            >
                                {isOngoing && (
                                    <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
                                )}
                            </div>
                            
                            {/* Label */}
                            <div 
                                className="absolute text-xs font-bold text-slate-400 group-hover:text-white transition-all whitespace-nowrap pl-3 group-hover:pl-4"
                                style={{ left: `${left + width}%` }}
                            >
                                {ev.name} 
                                <span className="ml-2 text-[10px] text-brand-accent font-normal opacity-0 group-hover:opacity-100 transition-opacity">
                                    {ev.yearStart} - {ev.yearEnd || 'Activo'}
                                </span>
                            </div>
                        </div>
                    );
                })}
             </div>
          </div>
       </div>
    </div>
  );
};