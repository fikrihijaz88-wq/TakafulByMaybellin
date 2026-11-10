import React from 'react';
import { X, CheckCircle2, ArrowRight, Shield, HeartPulse, PiggyBank, Sparkles } from 'lucide-react';
import { GETB_PRODUCTS, GETBProduct } from '../data/getbProducts';
import { ConsultantInfo, formatWhatsAppNumber } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  consultant: ConsultantInfo;
  selectedProductId?: string;
}

export const ProductComparisonModal: React.FC<Props> = ({
  isOpen,
  onClose,
  consultant,
  selectedProductId,
}) => {
  if (!isOpen) return null;

  // Pick 3 flagship official products to compare
  const comparisonProducts = [
    GETB_PRODUCTS.find((p) => p.id === 'i-great-nova') || GETB_PRODUCTS[0],
    GETB_PRODUCTS.find((p) => p.id === 'i-medi-shield-evolusi') || GETB_PRODUCTS[1],
    GETB_PRODUCTS.find((p) => p.id === 'i-great-evo') || GETB_PRODUCTS[2],
  ];

  const handleConsultWhatsApp = (product: GETBProduct) => {
    const text = `Assalamualaikum ${consultant.name}, saya nak dapatkan perbandingan dan sebut harga bagi pelan ${product.name} untuk diri dan keluarga saya.`;
    window.open(`https://wa.me/${formatWhatsAppNumber(consultant.phone)}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-700 via-red-600 to-rose-900 px-6 py-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-sm">
              <Sparkles className="w-6 h-6 text-rose-100" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg">Perbandingan Pelan Utama Takaful Keluarga GETB</h3>
              <p className="text-xs text-rose-100">
                Pilih kombinasi terbaik antara Perlindungan Waris (Hibah), Rawatan Hospital (Kad Perubatan), dan Simpanan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-rose-100 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {comparisonProducts.map((p) => {
              const isHighlighted = selectedProductId === p.id;
              return (
                <div
                  key={p.id}
                  className={`rounded-2xl border flex flex-col p-5 transition-all ${
                    isHighlighted
                      ? 'border-rose-500 ring-2 ring-rose-500/20 shadow-lg bg-rose-50/20'
                      : 'border-slate-200 bg-white hover:border-slate-300 shadow-sm'
                  }`}
                >
                  <div className="mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
                      {p.categoryLabel}
                    </span>
                    <h4 className="font-heading font-bold text-lg text-slate-900 mt-2">{p.name}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{p.tagline}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 mb-4">
                    <div className="text-[11px] text-slate-400 font-medium">Anggaran Sumbangan:</div>
                    <div className="text-sm font-bold text-slate-900">{p.minContribution}</div>
                  </div>

                  <div className="space-y-3 flex-1 text-xs">
                    <div>
                      <span className="font-semibold text-slate-700 block mb-1">Keunikan Utama (USP):</span>
                      <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[11px] leading-relaxed">
                        {p.usp}
                      </p>
                    </div>

                    <div>
                      <span className="font-semibold text-slate-700 block mb-1.5">Manfaat Utama:</span>
                      <ul className="space-y-1.5">
                        {p.keyBenefits.slice(0, 4).map((b, idx) => (
                          <li key={idx} className="flex items-start space-x-1.5 text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2">
                      <span className="font-semibold text-slate-700 block mb-1">Sesuai Untuk:</span>
                      <div className="flex flex-wrap gap-1">
                        {p.suitableFor.slice(0, 2).map((s, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => handleConsultWhatsApp(p)}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white text-xs font-bold shadow-md shadow-rose-200 transition-all flex items-center justify-center space-x-1.5"
                    >
                      <span>Minta Cadangan Pelan Ini</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Golden Advice Box */}
          <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start space-x-3 text-xs text-amber-900">
            <div className="p-1.5 bg-amber-200/80 rounded-lg shrink-0 mt-0.5">
              <Shield className="w-4 h-4 text-amber-800" />
            </div>
            <div>
              <span className="font-bold block text-sm mb-0.5">Nasihat Pakar Perunding GETB:</span>
              Gabungan ideal untuk sesebuah keluarga adalah **1 Kad Perubatan (i-Medi Evolusi / Shield Rider)** untuk lindungi simpanan daripada bil hospital mengejut, dan **1 Pelan Hibah (i-Great Nova)** sebagai jaminan nafkah makanan dan tempat tinggal anak isteri sekiranya punca pendapatan terputus.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
