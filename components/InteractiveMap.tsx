import React, { useEffect, useRef, useState } from 'react';
import { Maximize2, Minimize2, Map as MapIcon, Layers, AlertTriangle, History, Baby, Globe2, X } from 'lucide-react';

interface ConflictLocation {
  id: number;
  name: string;
  coords: [number, number];
  type: string;
  affected: string;
  description: string;
  historicalContext: string;
  childCasualties: string;
  geopoliticalFactors: string;
}

const conflicts: ConflictLocation[] = [
  {
    id: 1,
    name: "Guerra Ruso-Ucraniana",
    coords: [48.3794, 31.1656],
    type: "Conflicto Internacional",
    affected: "3.7M+ Desplazados internos",
    description: "Invasión a gran escala que ha causado una crisis humanitaria masiva en Europa del Este.",
    historicalContext: "Escalada de la anexión de Crimea en 2014 y el conflicto en el Donbás. Tensiones históricas post-soviéticas.",
    childCasualties: "Más de 600 niños muertos y 1,300 heridos verificados por la ONU. Trauma generalizado.",
    geopoliticalFactors: "Expansión de la OTAN, seguridad energética europea y control del Mar Negro."
  },
  {
    id: 2,
    name: "Crisis en Gaza",
    coords: [31.3547, 34.3088],
    type: "Conflicto Armado",
    affected: "1.9M+ Desplazados (85% de la población)",
    description: "Intensos bombardeos y operaciones terrestres con alto impacto en población civil.",
    historicalContext: "Conflicto israelí-palestino de décadas. Bloqueo desde 2007 y escalada tras ataques de Oct 2023.",
    childCasualties: "Más de 13,000 niños reportados muertos. 'La guerra contra los niños' según UNICEF.",
    geopoliticalFactors: "Estabilidad regional en Medio Oriente, relaciones con Irán y acuerdos árabes."
  },
  {
    id: 3,
    name: "Guerra Civil Sudanesa",
    coords: [15.5007, 32.5599],
    type: "Guerra Civil",
    affected: "8M+ Desplazados (Crisis de desplazamiento más grande)",
    description: "Enfrentamientos entre el ejército (SAF) y fuerzas paramilitares (RSF) por el control del país.",
    historicalContext: "Transición fallida tras la caída de Omar al-Bashir en 2019. Rivalidad entre generales.",
    childCasualties: "3M+ de niños huyendo de la violencia. Escasez crítica de alimentos y medicina.",
    geopoliticalFactors: "Control de recursos de oro, acceso al Mar Rojo e influencia de potencias regionales."
  },
  {
    id: 4,
    name: "Crisis en Yemen",
    coords: [15.5527, 48.5164],
    type: "Guerra Civil / Proxy",
    affected: "21M+ Necesitan ayuda humanitaria",
    description: "Una de las peores crisis humanitarias del mundo, con hambruna y falta de acceso médico.",
    historicalContext: "Inició en 2014 cuando los hutíes tomaron la capital. Intervención de coalición liderada por Arabia Saudita.",
    childCasualties: "11,000+ niños muertos o mutilados desde 2015. Malnutrición aguda severa.",
    geopoliticalFactors: "Rivalidad Irán-Arabia Saudita, seguridad del estrecho de Bab el-Mandeb."
  },
  {
    id: 5,
    name: "Conflicto en Myanmar",
    coords: [21.9162, 95.9560],
    type: "Guerra Civil",
    affected: "2.6M+ Desplazados",
    description: "Resistencia armada generalizada contra la junta militar tras el golpe de estado de 2021.",
    historicalContext: "Décadas de insurgencia étnica reactivadas tras el fin de la democracia parcial.",
    childCasualties: "Ataques aéreos a escuelas y reclutamiento forzado de menores.",
    geopoliticalFactors: "Influencia de China e India, corredores comerciales y recursos naturales."
  },
  {
    id: 6,
    name: "Conflicto Kivu (RDC)",
    coords: [-1.6585, 29.2205],
    type: "Conflicto Regional",
    affected: "6.9M+ Desplazados internos en RDC",
    description: "Múltiples grupos armados (M23, CODECO) luchan por recursos y territorio en el este.",
    historicalContext: "Secuelas del genocidio de Ruanda y las guerras del Congo de los 90.",
    childCasualties: "Altas tasas de reclutamiento de niños soldado y violencia sexual.",
    geopoliticalFactors: "Extracción de cobalto y coltán vitales para la tecnología global."
  },
  {
    id: 7,
    name: "Guerra Civil Siria",
    coords: [34.8021, 38.9968],
    type: "Guerra Civil",
    affected: "12M+ Desplazados (Internos y Refugiados)",
    description: "Conflicto prolongado que ha devastado infraestructura y causado migraciones masivas.",
    historicalContext: "Protestas de la Primavera Árabe en 2011 reprimidas violentamente.",
    childCasualties: "Una generación entera nacida en guerra. 30,000+ niños muertos.",
    geopoliticalFactors: "Presencia militar de Rusia, EE.UU., Turquía e Irán."
  },
  {
    id: 8,
    name: "Conflicto en Somalia",
    coords: [5.1521, 46.1996],
    type: "Insurgencia",
    affected: "3.8M+ Desplazados",
    description: "Lucha continua contra Al-Shabaab combinada con crisis climática severa.",
    historicalContext: "Colapso estatal en 1991 e insurgencia islamista desde mediados de los 2000.",
    childCasualties: "Reclutamiento forzado masivo y muertes por fuego cruzado.",
    geopoliticalFactors: "Seguridad en el Cuerno de África y rutas marítimas."
  },
  {
    id: 9,
    name: "Crisis en el Sahel (Mali)",
    coords: [17.5707, -3.9962],
    type: "Insurgencia",
    affected: "400k+ Refugiados",
    description: "Inestabilidad política y ataques de grupos yihadistas en la región central.",
    historicalContext: "Rebelión Tuareg de 2012 secuestrada por grupos extremistas.",
    childCasualties: "Cierre de 1,700 escuelas. Niños privados de educación y seguridad.",
    geopoliticalFactors: "Retirada de fuerzas francesas/ONU y entrada de mercenarios Wagner."
  },
  {
    id: 10,
    name: "Crisis de Pandillas en Haití",
    coords: [18.5944, -72.3074],
    type: "Violencia Civil",
    affected: "360k+ Desplazados",
    description: "Colapso del orden público y control territorial por parte de grupos armados.",
    historicalContext: "Asesinato del presidente Moïse en 2021 y vacío de poder institucional.",
    childCasualties: "Niños reclutados por pandillas y sin acceso a salud básica.",
    geopoliticalFactors: "Crisis migratoria en el Caribe y narcotráfico."
  }
];

const ConflictPopup: React.FC<{ conflict: ConflictLocation }> = ({ conflict }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="font-sans text-left w-full">
      <div className="border-b border-white/10 pb-2 mb-2">
        <h3 className="font-bold text-brand-accent uppercase tracking-wider text-[10px] mb-1">{conflict.type}</h3>
        <h2 className="text-lg font-bold text-white font-serif leading-tight">{conflict.name}</h2>
      </div>
      
      <p className="text-xs text-slate-300 mb-3 leading-relaxed">{conflict.description}</p>
      
      <div className="bg-red-900/20 border border-red-500/30 p-2 rounded mb-3 flex items-start gap-2">
        <AlertTriangle className="w-3 h-3 text-red-400 mt-0.5 shrink-0" />
        <span className="text-[10px] text-red-200 font-bold leading-tight">{conflict.affected}</span>
      </div>

      {isExpanded && (
        <div className="space-y-3 mb-3 animate-fade-in-up bg-slate-800/50 p-3 rounded border border-white/5">
           {/* Geopolitics - Prioritized */}
           <div>
            <div className="flex items-center gap-2 text-blue-400 mb-1">
              <Globe2 size={12} />
              <span className="text-[10px] font-bold uppercase tracking-wider">Factores Geopolíticos</span>
            </div>
            <p className="text-[10px] text-slate-300 leading-relaxed border-l-2 border-blue-500/50 pl-2 bg-blue-500/5 p-1 rounded-r">
              {conflict.geopoliticalFactors}
            </p>
          </div>

          {/* Context */}
          <div>
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <History size={10} />
              <span className="text-[9px] font-bold uppercase tracking-wider">Contexto Histórico</span>
            </div>
            <p className="text-[10px] text-slate-300 leading-relaxed border-l-2 border-slate-600 pl-2">{conflict.historicalContext}</p>
          </div>

          {/* Casualties */}
          <div>
            <div className="flex items-center gap-2 text-brand-accent mb-1">
              <Baby size={10} />
              <span className="text-[9px] font-bold uppercase tracking-wider">Infancia Afectada</span>
            </div>
            <p className="text-[10px] text-slate-300 leading-relaxed border-l-2 border-brand-accent pl-2">{conflict.childCasualties}</p>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full text-[10px] font-bold py-2 transition-colors uppercase tracking-widest flex justify-center items-center gap-2 border ${isExpanded ? 'bg-brand-accent text-brand-dark border-brand-accent' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}
      >
        {isExpanded ? (
            <>
                <Maximize2 className="w-3 h-3 rotate-180" />
                Cerrar Informe
            </>
        ) : (
            <>
                <Globe2 className="w-3 h-3" />
                Ver Factores Geopolíticos
            </>
        )}
      </button>
    </div>
  );
};

export const InteractiveMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [selectedConflict, setSelectedConflict] = useState<ConflictLocation | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    // Safety check for Leaflet global
    if (typeof window !== 'undefined' && (window as any).L) {
      const L = (window as any).L;

      const map = L.map(mapRef.current, {
        center: [20, 10], // Centered slightly north to show more context, zoom 2.2 for better initial fit
        zoom: 2.2,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: true
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Esri'
      }).addTo(map);

      const overlayPane = map.createPane('darkOverlay');
      overlayPane.style.zIndex = "200";
      overlayPane.style.pointerEvents = 'none';

      // Close popup when clicking on map background
      map.on('click', () => {
        setSelectedConflict(null);
      });

      leafletMap.current = map;
    }
  }, []);

  // Add markers effect
  useEffect(() => {
    if (!leafletMap.current || markersRef.current.length > 0) return;
    
    const L = (window as any).L;
    if (!L) return;

    const map = leafletMap.current;

    conflicts.forEach((conflict) => {
      const pulsingIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div class="relative flex items-center justify-center w-6 h-6 group cursor-pointer">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-alert opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-brand-alert border border-white/80 shadow-[0_0_10px_rgba(220,38,38,0.8)]"></span>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });

      const marker = L.marker(conflict.coords, { icon: pulsingIcon }).addTo(map);
      
      // Handle click to show fixed popup state
      marker.on('click', (e: any) => {
        L.DomEvent.stopPropagation(e); // Stop event from hitting the map click listener
        setSelectedConflict(conflict);
        // Center map on the conflict for better visibility
        map.flyTo(conflict.coords, 5, { duration: 2.0 });
      });

      markersRef.current.push(marker);
    });

  }, []);

  // Handle Full Screen Changes
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
      // Force Leaflet to invalidate size after transition to ensure tiles fill the screen
      setTimeout(() => {
        leafletMap.current?.invalidateSize();
      }, 200);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div ref={containerRef} className="relative h-[600px] w-full rounded-sm overflow-hidden border border-white/10 group shadow-2xl bg-slate-900">
      <div ref={mapRef} className="h-full w-full z-0 bg-slate-900" />

      {/* Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none z-[400] bg-gradient-to-t from-brand-dark/90 via-transparent to-brand-dark/40" />
      <div className="absolute inset-0 pointer-events-none z-[400] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20" />

      {/* HUD Header */}
      <div className="absolute top-0 left-0 right-0 p-6 z-[500] flex justify-between items-start pointer-events-none">
        <div className="bg-brand-dark/90 backdrop-blur-md p-4 border-l-2 border-brand-alert max-w-xs pointer-events-auto shadow-lg">
          <div className="flex items-center gap-2 text-brand-alert mb-2">
            <MapIcon size={16} />
            <span className="font-bold text-xs uppercase tracking-widest">Global Conflict Monitor</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-brand-alert rounded-full animate-pulse"></div>
            <p className="text-[10px] text-red-400 font-mono uppercase">Live Data Feed</p>
          </div>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            Los conflictos mostrados utilizan datos verificados por organismos internacionales. Haz clic en un marcador para acceder al informe clasificado.
          </p>
        </div>

        <div className="flex gap-2 pointer-events-auto">
            <div className="bg-brand-dark/80 backdrop-blur p-2 border border-white/10 text-white hover:text-brand-accent cursor-pointer transition-colors" title="Capas">
                <Layers size={18} />
            </div>
        </div>
      </div>

      {/* Fixed Popup HUD */}
      {selectedConflict && (
        <div className="absolute top-24 right-6 z-[600] w-[340px] max-h-[70vh] overflow-y-auto custom-scrollbar bg-slate-900/95 backdrop-blur-md border border-white/20 shadow-2xl animate-fade-in-up rounded-sm">
          <div className="sticky top-0 right-0 flex justify-end p-2 bg-slate-900/90 backdrop-blur z-10">
            <button 
              onClick={() => setSelectedConflict(null)}
              className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
            >
              <X size={20} />
            </button>
          </div>
          <div className="px-6 pb-6 pt-0">
            <ConflictPopup conflict={selectedConflict} />
          </div>
        </div>
      )}

      {/* HUD Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-[500] flex justify-between items-end pointer-events-none">
        <div className="pointer-events-auto hidden md:block">
            <div className="flex items-center gap-4 text-[10px] font-mono text-slate-500 bg-brand-dark/90 px-4 py-2 border-t border-brand-accent/20">
                <span>SYS: ONLINE</span>
                <span>ENC: AES-256</span>
                <span>SAT: SENTINEL-2</span>
            </div>
        </div>
        <button 
          onClick={toggleFullScreen}
          className="pointer-events-auto bg-white/5 backdrop-blur text-white border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest hover:bg-brand-accent hover:text-brand-dark transition-all shadow-lg flex items-center gap-2"
        >
          {isFullScreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          <span>{isFullScreen ? 'Salir' : 'Pantalla Completa'}</span>
        </button>
      </div>
    </div>
  );
};