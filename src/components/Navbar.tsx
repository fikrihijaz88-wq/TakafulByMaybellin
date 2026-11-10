import React from 'react';
import { Shield, Sparkles, Bot, Globe, User, PhoneCall, Settings } from 'lucide-react';
import { ConsultantInfo, PortalMode, formatWhatsAppNumber } from '../types';

interface Props {
  currentMode: PortalMode;
  onModeChange: (mode: PortalMode) => void;
  consultant: ConsultantInfo;
  onOpenProfile: () => void;
  onOpenTemplates: () => void;
}

export const Navbar: React.FC<Props> = ({
  currentMode,
  onModeChange,
  consultant,
  onOpenProfile,
  onOpenTemplates,
}) => {
  const handleQuickWhatsApp = () => {
    const text = `Assalamualaikum ${consultant.name}, saya melayari portal promosi Great Eastern Takaful anda dan ingin bertanyakan pelan yang sesuai untuk saya.`;
    window.open(`https://wa.me/${formatWhatsAppNumber(consultant.phone)}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      {/* Top micro bar for Syariah & PIDM info */}
      <div className="bg-gradient-to-r from-rose-900 via-rose-800 to-red-900 text-white py-1 px-4 text-[11px] font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>100% Patuh Syariah</span>
            </span>
            <span className="hidden sm:inline text-rose-300">•</span>
            <span className="hidden sm:inline">Dilindungi oleh PIDM sehingga RM500,000 (TIPS)</span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-rose-200">Perunding Sah GETB:</span>
            <button
              onClick={onOpenProfile}
              className="font-bold underline decoration-rose-400 hover:text-rose-100 transition-colors flex items-center space-x-1"
            >
              <span>{consultant.name}</span>
              <Settings className="w-3 h-3 ml-0.5 opacity-80" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onModeChange('customer')}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-700 via-red-600 to-rose-500 flex items-center justify-center text-white shadow-md shadow-rose-200 font-heading font-black text-sm tracking-tight">
            MY
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-heading font-extrabold text-base sm:text-lg tracking-tight text-slate-900">
                TAKAFUL BY MAYBELLIN
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                GETB
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium tracking-wide">
              Great Eastern Takaful Berhad • Agensi {consultant.agencyName} (Kod: {consultant.code})
            </p>
          </div>
        </div>

        {/* Center / Right Mode Switcher */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Mode Tabs Switcher */}
          <div className="bg-slate-100 p-1 rounded-2xl flex items-center border border-slate-200/80">
            <button
              onClick={() => onModeChange('customer')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                currentMode === 'customer'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-rose-600" />
              <span className="hidden md:inline">Halaman Promosi</span>
              <span className="md:hidden">Promosi</span>
            </button>

            <button
              onClick={() => onModeChange('agent-suite')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                currentMode === 'agent-suite'
                  ? 'bg-rose-600 text-white shadow-sm shadow-rose-200'
                  : 'text-slate-600 hover:text-rose-600'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Pusat Ejen AI</span>
              <span className="md:hidden">Ejen AI</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-amber-400 text-slate-900 font-mono font-bold ml-0.5">
                5 Ejen
              </span>
            </button>
          </div>

          {/* Quick Script Bank Button */}
          <button
            onClick={onOpenTemplates}
            className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 border border-slate-200 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Skrip Sedia Guna</span>
          </button>

          {/* WhatsApp Direct CTA */}
          <button
            onClick={handleQuickWhatsApp}
            className="px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md shadow-emerald-200 transition-all flex items-center space-x-1.5"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp Konsultan</span>
            <span className="sm:hidden">WhatsApp</span>
          </button>
        </div>
      </div>
    </header>
  );
};
