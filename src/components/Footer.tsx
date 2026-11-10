import React from 'react';
import { ShieldCheck, PhoneCall, Mail, MapPin, ExternalLink, Heart } from 'lucide-react';
import { ConsultantInfo, formatWhatsAppNumber, formatDisplayPhone } from '../types';

interface Props {
  consultant: ConsultantInfo;
  onOpenProfile: () => void;
  onSwitchToAgentSuite: () => void;
}

export const Footer: React.FC<Props> = ({
  consultant,
  onOpenProfile,
  onSwitchToAgentSuite,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-rose-600 flex items-center justify-center text-white font-black text-sm">
                GE
              </div>
              <span className="font-heading font-extrabold text-base text-white tracking-tight">
                GREAT EASTERN TAKAFUL
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-400">
              Portal promosi rasmi produk Takaful Keluarga Great Eastern Takaful Berhad (GETB) yang dikendalikan oleh perunding bertauliah. Memberikan perlindungan berkualiti tinggi dan patuh syariah untuk setiap rakyat Malaysia.
            </p>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-emerald-400 text-[11px] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Patuh Syariah Penuh</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white mb-3">Produk Utama GETB</h4>
            <ul className="space-y-2 text-[11px]">
              <li>i-Great Nova (Pelan Hibah Takaful)</li>
              <li>i-Medi Evolusi / Shield (Kad Perubatan VIP)</li>
              <li>i-Great Evo (Perlindungan Keluarga)</li>
              <li>i-Great Chinta (Pendidikan & Belas Kasihan)</li>
              <li>i-Great Yaqeen (61 Penyakit Kritikal)</li>
              <li>i-Great Majestik (Simpanan & Booster)</li>
              <li>i-Great Murni 2.0 (Pantas Dalam Talian)</li>
            </ul>
          </div>

          {/* Agent Suite Links */}
          <div>
            <h4 className="font-heading font-bold text-sm text-white mb-3">Pusat Operasi AI Ejen</h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button
                  onClick={onSwitchToAgentSuite}
                  className="hover:text-white transition-colors text-left"
                >
                  • Agen 1: Kajian Produk & USP
                </button>
              </li>
              <li>
                <button
                  onClick={onSwitchToAgentSuite}
                  className="hover:text-white transition-colors text-left"
                >
                  • Agen 2: Target Market & Persona
                </button>
              </li>
              <li>
                <button
                  onClick={onSwitchToAgentSuite}
                  className="hover:text-white transition-colors text-left"
                >
                  • Agen 3: Copywriter FB & TikTok
                </button>
              </li>
              <li>
                <button
                  onClick={onSwitchToAgentSuite}
                  className="hover:text-white transition-colors text-left"
                >
                  • Agen 4: Skrip Closing & Bantahan
                </button>
              </li>
              <li>
                <button
                  onClick={onSwitchToAgentSuite}
                  className="hover:text-white transition-colors text-left"
                >
                  • Agen 5: Pengarah Visual & AI Prompt
                </button>
              </li>
            </ul>
          </div>

          {/* Consultant Contacts */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white mb-3">Hubungi Perunding Anda</h4>
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-2 text-[11px]">
              <div className="font-bold text-white text-xs">{consultant.name}</div>
              <div className="text-slate-400">Agensi: {consultant.agencyName}</div>
              <div className="text-slate-400">Kod Ejen: {consultant.code}</div>
              <div className="flex items-center space-x-1.5 text-rose-400 font-semibold pt-1">
                <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                <a
                  href={`https://wa.me/${formatWhatsAppNumber(consultant.phone)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  {formatDisplayPhone(consultant.phone)}
                </a>
              </div>
            </div>

            <button
              onClick={onOpenProfile}
              className="w-full py-2 px-3 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-[11px] font-medium text-center"
            >
              Kemaskini Profil Konsultan Saya
            </button>
          </div>
        </div>

        {/* Regulatory & PIDM Disclaimer */}
        <div className="pt-8 border-t border-slate-800 text-[10px] text-slate-500 leading-relaxed space-y-2">
          <p>
            <strong>Penafian Kawal Selia:</strong> Great Eastern Takaful Berhad (201001032332 / 916562-K) dilesenkan di bawah Akta Perkhidmatan Kewangan Islam 2013 dan dikawal selia oleh Bank Negara Malaysia (BNM). Semua produk dan operasi diluluskan oleh Jawatankuasa Pengawasan Syariah Great Eastern Takaful Berhad.
          </p>
          <p>
            <strong>Perlindungan PIDM:</strong> Manfaat yang layak di bawah sijil Takaful yang dikeluarkan oleh Great Eastern Takaful Berhad dilindungi oleh Perbadanan Insurans Deposit Malaysia (PIDM) di bawah Sistem Perlindungan Manfaat Takaful dan Insurans (TIPS) sehingga had perlindungan yang ditetapkan (sehingga RM500,000). Sila rujuk brosur PIDM TIPS untuk maklumat lanjut.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 text-slate-500 text-[11px] gap-2">
            <div>
              © {new Date().getFullYear()} Great Eastern Takaful Berhad. Hak Cipta Terpelihara.
            </div>
            <div className="flex items-center space-x-1 text-slate-400">
              <span>Dibina khas untuk promosi Takaful Keluarga GETB</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
