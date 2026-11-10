import React from 'react';
import { 
  ShieldCheck, 
  HeartHandshake, 
  Sparkles, 
  ArrowRight, 
  PhoneCall, 
  Bot, 
  CheckCircle2, 
  Award, 
  Clock, 
  Lock 
} from 'lucide-react';
import { ConsultantInfo, formatWhatsAppNumber } from '../types';

interface Props {
  consultant: ConsultantInfo;
  onNavigateToCalculator: () => void;
  onNavigateToProducts: () => void;
  onSwitchToAgentSuite: () => void;
}

export const HeroSection: React.FC<Props> = ({
  consultant,
  onNavigateToCalculator,
  onNavigateToProducts,
  onSwitchToAgentSuite,
}) => {
  const handleWhatsAppConsult = () => {
    const text = `Assalamualaikum ${consultant.name}, saya nak dapatkan sesi konsultasi percuma mengenai pelan Takaful Keluarga Great Eastern Takaful yang sesuai untuk bajet keluarga saya.`;
    window.open(`https://wa.me/${formatWhatsAppNumber(consultant.phone)}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-rose-50/70 via-white to-slate-50 pt-10 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-100">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-rose-200/30 to-amber-100/30 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Shariah Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-100/70 border border-rose-200 text-rose-800 text-xs font-bold uppercase tracking-wider shadow-xs">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
              <span>Great Eastern Takaful Berhad (GETB)</span>
              <span className="text-rose-400">•</span>
              <span className="text-emerald-700 font-extrabold">Patuh Syariah 100%</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Lindungi Kasih Sayang &amp; Masa Depan Keluarga Anda{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-red-600 to-rose-700">
                Tanpa Risaukan Beban Musibah
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Dapatkan pelan Takaful Keluarga terlengkap dari GETB: <strong>Hibah Kasih Sayang</strong> tunai pantas tanpa beku, <strong>Kad Perubatan VIP</strong> tanpa had seumur hidup, dan <strong>Dana Pendidikan Anak</strong> kalis musibah serendah RM3 sehari.
            </p>

            {/* Fast Benefit Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-xl mx-auto lg:mx-0 text-left">
              {[
                'Hibah Mutlak: Wang terus ke waris tanpa bicara faraid',
                'Kad Perubatan VIP: Had tahunan sehingga RM2.5 JUTA',
                'Pelepasan Cukai LHDN sehingga RM3,000/tahun',
                'Jaminan Tabung Khairat Kematian & Badal Haji',
              ].map((point, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onNavigateToCalculator}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-700 hover:to-red-700 text-white font-bold text-sm shadow-lg shadow-rose-200 transition-all flex items-center justify-center space-x-2 group"
              >
                <span>Kira Sumbangan Anda</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleWhatsAppConsult}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-bold text-sm shadow-xs transition-all flex items-center justify-center space-x-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-600" />
                <span>Konsultasi WhatsApp Percuma</span>
              </button>

              <button
                onClick={onSwitchToAgentSuite}
                className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all flex items-center justify-center space-x-1.5"
                title="Buka Pusat Kawalan Ejen AI"
              >
                <Bot className="w-4 h-4 text-rose-400" />
                <span>Buka Suite Ejen AI</span>
              </button>
            </div>

            {/* Consultant endorsement */}
            <div className="pt-3 flex items-center justify-center lg:justify-start space-x-3 text-xs text-slate-500">
              <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                {consultant.name.charAt(0)}
              </div>
              <div>
                <span className="font-bold text-slate-800">{consultant.name}</span>
                <span className="block text-[11px] text-slate-400">
                  Konsultan Rasmi Great Eastern Takaful • {consultant.agencyName} (Kod: {consultant.code})
                </span>
              </div>
            </div>
          </div>

          {/* Right Visual Feature Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4">
              {/* Card 1: Hibah Highlight */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-50 to-red-50 border border-rose-100 flex items-start space-x-3.5">
                <div className="p-2.5 bg-rose-600 text-white rounded-xl shadow-sm shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-200 text-rose-800">
                      Hibah Kasih Sayang
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold">100% Tak Beku</span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-slate-900 mt-1">i-Great Nova GETB</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Pampasan tunai bermula RM250,000 hingga RM1,000,000+ diserahkan terus ke tangan isteri tanpa perlu melalui mahkamah pusaka atau bicara faraid.
                  </p>
                </div>
              </div>

              {/* Card 2: Medical Card Highlight */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 flex items-start space-x-3.5">
                <div className="p-2.5 bg-emerald-600 text-white rounded-xl shadow-sm shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-200 text-emerald-800">
                      Kad Hospital VIP
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold">Cashless GL</span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-slate-900 mt-1">i-Medi Evolusi / Shield Rider</h4>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    Had tahunan sehingga RM2.0 Juta tanpa had seumur hidup. Masuk wad swasta terkemuka dengan surat jaminan (GL) tanpa deposit pendahuluan di hospital pilihan.
                  </p>
                </div>
              </div>

              {/* Card 3: AI Marketing Engine badge */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-rose-950 text-white border border-slate-800 flex items-start space-x-3.5">
                <div className="p-2.5 bg-rose-600/30 text-rose-300 rounded-xl border border-rose-500/40 shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/30 text-rose-200">
                      Sistem AI Terbina
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-sm text-white mt-1">Suite 5 Ejen AI GETB</h4>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                    Dilengkapi ejen cerdas untuk kajian produk, analisis sasaran pasaran, pencipta konten FB/TikTok viral, dan skrip closing bantahan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
