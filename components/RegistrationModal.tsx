import React, { useState } from 'react';
import { X, Shield, User, Fingerprint, CheckCircle, Loader2 } from 'lucide-react';
import { GoogleGenAI, Modality } from "@google/genai";
import { UserProfile } from '../types';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: (profile: UserProfile) => void;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, onRegisterSuccess }) => {
  const [step, setStep] = useState<'form' | 'processing' | 'id-card'>('form');
  const [formData, setFormData] = useState({
    nickname: '',
    age: '',
    gender: 'Niño',
    division: 'Cadete'
  });
  const [generatedAvatar, setGeneratedAvatar] = useState<string | null>(null);

  if (!isOpen) return null;

  const generateAvatar = async () => {
    try {
      // Safe API Key access
      const apiKey = (() => {
        try {
          return process.env.API_KEY;
        } catch (e) {
          return undefined;
        }
      })();

      if (!apiKey) {
        console.warn("No API Key found, skipping generation");
        return null;
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `Cartoon style illustration of a ${formData.gender === 'Niña' ? 'girl' : 'boy'} child peacekeeper wearing a blue United Nations style helmet. Friendly expression, heroic pose. Vector art style, flat colors, simple background. High quality character design.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          responseModalities: [Modality.IMAGE],
        },
      });

      const part = response.candidates?.[0]?.content?.parts?.[0];
      if (part && part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    } catch (error) {
      console.error("Error generating avatar:", error);
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    // Generate Avatar
    const avatarUrl = await generateAvatar();
    if (avatarUrl) {
      setGeneratedAvatar(avatarUrl);
    }

    setStep('id-card');
  };

  const handleComplete = () => {
    onRegisterSuccess({
      nickname: formData.nickname,
      age: formData.age,
      division: formData.division,
      avatar: generatedAvatar,
      xp: 0,
      completedLessonIds: []
    });
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-dark/90 backdrop-blur-md transition-opacity" 
        onClick={step === 'id-card' ? handleComplete : undefined}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-brand-charcoal border border-white/10 shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/10 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <Shield className="text-brand-accent w-6 h-6" />
            <span className="font-heading font-bold text-xl text-white tracking-widest">
              ALTA EN CUERPO DE PAZ
            </span>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X />
          </button>
        </div>

        <div className="p-8">
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-white font-bold text-2xl mb-2">Identificación Requerida</h3>
                <p className="text-slate-400 text-sm">
                  Ingresa tus datos para generar tu credencial oficial y tu avatar digital único.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-brand-accent uppercase tracking-widest mb-2">
                    Nombre en Clave (Nickname)
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                    <input 
                      type="text" 
                      required
                      className="w-full bg-slate-900 border border-white/10 rounded-sm py-3 pl-12 pr-4 text-white focus:outline-none focus:border-brand-accent transition-colors font-mono uppercase"
                      placeholder="EJ: AGENTE_01"
                      value={formData.nickname}
                      onChange={(e) => setFormData({...formData, nickname: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <label className="block text-xs font-bold text-brand-accent uppercase tracking-widest mb-2">
                      Edad
                    </label>
                    <input 
                      type="number" 
                      required
                      min="5"
                      max="99"
                      className="w-full bg-slate-900 border border-white/10 rounded-sm py-3 px-4 text-white focus:outline-none focus:border-brand-accent transition-colors font-mono"
                      placeholder="00"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                    />
                  </div>
                  <div className="col-span-1">
                     <label className="block text-xs font-bold text-brand-accent uppercase tracking-widest mb-2">
                      Género
                    </label>
                    <select 
                      value={formData.gender}
                      onChange={(e) => setFormData({...formData, gender: e.target.value})}
                      className="w-full bg-slate-900 border border-white/10 rounded-sm py-3 px-4 text-white focus:outline-none focus:border-brand-accent transition-colors font-mono uppercase appearance-none"
                    >
                      <option value="Niño">Niño</option>
                      <option value="Niña">Niña</option>
                    </select>
                  </div>
                  <div className="col-span-1">
                     <label className="block text-xs font-bold text-brand-accent uppercase tracking-widest mb-2">
                      División
                    </label>
                    <select 
                      value={formData.division}
                      onChange={(e) => setFormData({...formData, division: e.target.value})}
                      className="w-full bg-slate-900 border border-white/10 rounded-sm py-3 px-4 text-white focus:outline-none focus:border-brand-accent transition-colors font-mono uppercase appearance-none"
                    >
                      <option>Cadete</option>
                      <option>Logística</option>
                      <option>Diplomacia</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  className="w-full bg-brand-accent text-brand-dark font-bold py-4 uppercase tracking-widest hover:bg-white transition-colors shadow-lg flex justify-center items-center gap-2"
                >
                  <Fingerprint className="w-5 h-5" />
                  Generar Credencial & Avatar
                </button>
              </div>
            </form>
          ) : step === 'processing' ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-accent/20 blur-xl rounded-full"></div>
                <Loader2 className="w-16 h-16 text-brand-accent animate-spin relative z-10" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-white font-bold text-xl">Generando Identidad...</h3>
                <p className="text-slate-400 text-sm">Creando avatar único con IA y asignando ID.</p>
              </div>
            </div>
          ) : (
            <div className="text-center animate-fade-in-up">
              <div className="mb-6 flex justify-center">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <h3 className="text-white font-bold text-2xl mb-2">¡Bienvenido, {formData.nickname}!</h3>
              <p className="text-slate-400 text-sm mb-8">
                Tu credencial ha sido generada exitosamente.
              </p>

              {/* Digital ID Card Preview */}
              <div className="bg-slate-900 border border-white/10 p-6 rounded-sm relative overflow-hidden max-w-md mx-auto text-left group hover:border-brand-accent/50 transition-colors shadow-2xl">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/10 rounded-full blur-2xl" />
                  <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl" />
                  
                  <div className="flex flex-row gap-6 items-center relative z-10">
                    <div className="w-28 h-28 bg-slate-800 border-2 border-white/20 shrink-0 flex items-center justify-center relative overflow-hidden">
                       {generatedAvatar ? (
                         <img src={generatedAvatar} alt="Avatar Generado" className="w-full h-full object-cover" />
                       ) : (
                         <User className="w-12 h-12 text-slate-600" />
                       )}
                    </div>
                    
                    <div className="flex-1 space-y-2 w-full">
                      <div className="flex justify-between items-start border-b border-white/10 pb-2">
                        <div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider">Agente</div>
                          <div className="font-heading text-xl text-white font-bold uppercase truncate max-w-[150px]">{formData.nickname}</div>
                        </div>
                        <Shield className="text-brand-accent w-6 h-6" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider">Rango</div>
                          <div className="text-white font-bold text-sm">{formData.division}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider">Estado</div>
                          <div className="text-green-500 font-bold text-sm uppercase">Activo</div>
                        </div>
                         <div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider">Edad</div>
                          <div className="text-white font-bold text-sm">{formData.age} Años</div>
                        </div>
                      </div>
                      <div className="text-[10px] text-brand-accent font-mono pt-1">ID: #CD-{Math.floor(Math.random() * 10000)}</div>
                    </div>
                  </div>
              </div>

              <div className="mt-8">
                 <button 
                  onClick={handleComplete}
                  className="bg-white/10 hover:bg-white/20 text-white text-sm py-3 px-8 font-bold uppercase tracking-widest transition-colors"
                 >
                   Aceptar Misión
                 </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};