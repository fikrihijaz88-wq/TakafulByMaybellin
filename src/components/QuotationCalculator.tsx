import React, { useState, useId } from 'react';
import { Calculator, PhoneCall, Shield, Sparkles, CheckCircle2, User, HelpCircle, Heart, ArrowRight } from 'lucide-react';
import { ConsultantInfo, QuotationState, formatWhatsAppNumber } from '../types';

interface Props {
  consultant: ConsultantInfo;
}

export const QuotationCalculator: React.FC<Props> = ({ consultant }) => {
  const ageId = useId();
  const sumCoveredId = useId();

  const [state, setState] = useState<QuotationState>({
    age: 30,
    gender: 'male',
    smoker: 'non-smoker',
    occupationClass: 1,
    planType: 'hibah',
    sumCovered: 250000,
    medicalRoomRate: 200,
  });

  // Calculate realistic estimated contribution based on actuarial rule of thumbs for GETB
  const calculateEstimate = () => {
    let baseRate = 0;

    if (state.planType === 'hibah') {
      // Hibah: roughly RM0.35 per RM1,000 sum covered per year for age 30, plus age curve
      const ageFactor = 1 + Math.max(0, (state.age - 25) * 0.04);
      const genderFactor = state.gender === 'male' ? 1.15 : 0.95;
      const smokerFactor = state.smoker === 'smoker' ? 1.35 : 1.0;
      const occFactor = 1 + (state.occupationClass - 1) * 0.1;

      // Base monthly calculation
      const thousandUnits = state.sumCovered / 1000;
      const monthlyRate = (thousandUnits * 0.32 * ageFactor * genderFactor * smokerFactor * occFactor);
      baseRate = Math.max(45, Math.round(monthlyRate));
    } else if (state.planType === 'medical') {
      // Medical card: Age curve
      const ageBase = state.age < 20 ? 75 : state.age < 35 ? 95 : state.age < 45 ? 135 : state.age < 55 ? 195 : 290;
      const smokerFactor = state.smoker === 'smoker' ? 1.2 : 1.0;
      const occFactor = 1 + (state.occupationClass - 1) * 0.08;
      const roomFactor = state.medicalRoomRate === 300 ? 1.25 : 1.0;
      baseRate = Math.round(ageBase * smokerFactor * occFactor * roomFactor);
    } else if (state.planType === 'ci') {
      // Critical Illness
      const ageFactor = 1 + Math.max(0, (state.age - 25) * 0.055);
      const smokerFactor = state.smoker === 'smoker' ? 1.4 : 1.0;
      const thousandUnits = state.sumCovered / 1000;
      baseRate = Math.max(65, Math.round(thousandUnits * 0.38 * ageFactor * smokerFactor));
    } else {
      // Education / Savings
      baseRate = 150; // standard recommended starter
    }

    return baseRate;
  };

  const estimatedMonthly = calculateEstimate();
  const estimatedDaily = (estimatedMonthly / 30).toFixed(1);

  const handleSendWhatsAppProposal = () => {
    const planName = 
      state.planType === 'hibah' ? 'Pelan Hibah Kasih Sayang Rasmi (i-Great Nova)' :
      state.planType === 'medical' ? 'Kad Perubatan VIP Hospital Swasta (i-Medi Evolusi / Shield Rider)' :
      state.planType === 'ci' ? 'Pampasan Penyakit Kritikal 61 CI (i-Great Yaqeen)' :
      'Pelan Takaful Keluarga & Tabung Pendidikan (i-Great Chinta)';

    const details = `
*PERMOHONAN SEBUT HARGA TAKAFUL GETB*
---------------------------------------
Pelan Pilihan: ${planName}
Umur: ${state.age} tahun
Jantina: ${state.gender === 'male' ? 'Lelaki' : 'Perempuan'}
Status Merokok: ${state.smoker === 'smoker' ? 'Perokok' : 'Bukan Perokok'}
Kelas Pekerjaan: Kelas ${state.occupationClass}
${state.planType === 'medical' ? `Kadar Bilik Hospital: RM${state.medicalRoomRate}/malam` : `Nilai Pampasan Dihasratkan: RM${state.sumCovered.toLocaleString()}`}
Anggaran Sumbangan: Sekitar RM${estimatedMonthly}/bulan (RM${estimatedDaily}/hari)
---------------------------------------
Assalamualaikum ${consultant.name}, saya telah mencuba kalkulator takaful di portal anda. Boleh sediakan proposal rasmi untuk semakan saya? Terima kasih.`;

    window.open(`https://wa.me/${formatWhatsAppNumber(consultant.phone)}?text=${encodeURIComponent(details)}`, '_blank');
  };

  return (
    <section id="kalkulator" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-rose-950 rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-2xl relative overflow-hidden border border-slate-700">
        {/* Glow circles */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Form: Inputs */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Calculator className="w-4 h-4 text-rose-400" />
                <span>Kalkulator Anggaran Pantas GETB</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                Ketahui Berapa Sumbangan Takaful Anda Dalam 30 Saat
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Kira anggaran sumbangan bulanan anda mengikut umur dan perlindungan yang diperlukan tanpa sebarang komitmen.
              </p>
            </div>

            {/* Plan Type Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Pilih Jenis Perlindungan Utama:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'hibah', label: 'Hibah Waris', icon: '🛡️' },
                  { id: 'medical', label: 'Kad Perubatan', icon: '🏥' },
                  { id: 'ci', label: 'Penyakit Kritikal', icon: '🫀' },
                  { id: 'savings', label: 'Pendidikan Anak', icon: '🎓' },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setState({ ...state, planType: p.id as any })}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      state.planType === p.id
                        ? 'bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-900/40 ring-2 ring-rose-400/30'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-lg block mb-1">{p.icon}</span>
                    <span className="text-xs font-bold block">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Age Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor={ageId} className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Umur Anda Sekarang:
                </label>
                <span className="text-sm font-bold text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-lg border border-rose-500/20">
                  {state.age} Tahun
                </span>
              </div>
              <input
                id={ageId}
                type="range"
                min="18"
                max="65"
                value={state.age}
                onChange={(e) => setState({ ...state, age: Number(e.target.value) })}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>18 Tahun</span>
                <span>40 Tahun</span>
                <span>65 Tahun</span>
              </div>
            </div>

            {/* Gender & Smoker in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Jantina:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setState({ ...state, gender: 'male' })}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      state.gender === 'male'
                        ? 'bg-rose-600/30 border-rose-500 text-rose-200'
                        : 'bg-slate-800/80 border-slate-700 text-slate-400'
                    }`}
                  >
                    Lelaki
                  </button>
                  <button
                    type="button"
                    onClick={() => setState({ ...state, gender: 'female' })}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      state.gender === 'female'
                        ? 'bg-rose-600/30 border-rose-500 text-rose-200'
                        : 'bg-slate-800/80 border-slate-700 text-slate-400'
                    }`}
                  >
                    Perempuan
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Tabiat Merokok / Vape:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setState({ ...state, smoker: 'non-smoker' })}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      state.smoker === 'non-smoker'
                        ? 'bg-emerald-600/30 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 border-slate-700 text-slate-400'
                    }`}
                  >
                    Bukan Perokok
                  </button>
                  <button
                    type="button"
                    onClick={() => setState({ ...state, smoker: 'smoker' })}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                      state.smoker === 'smoker'
                        ? 'bg-amber-600/30 border-amber-500 text-amber-200'
                        : 'bg-slate-800/80 border-slate-700 text-slate-400'
                    }`}
                  >
                    Merokok / Vape
                  </button>
                </div>
              </div>
            </div>

            {/* Sum Covered Slider for Hibah / CI */}
            {state.planType !== 'medical' && (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor={sumCoveredId} className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Jumlah Pampasan Yang Dikehendaki:
                  </label>
                  <span className="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-lg border border-emerald-500/20">
                    RM {state.sumCovered.toLocaleString()}
                  </span>
                </div>
                <input
                  id={sumCoveredId}
                  type="range"
                  min="100000"
                  max="1000000"
                  step="50000"
                  value={state.sumCovered}
                  onChange={(e) => setState({ ...state, sumCovered: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>RM100,000</span>
                  <span>RM500,000</span>
                  <span>RM1,000,000</span>
                </div>
              </div>
            )}

            {/* Medical Card Room Option */}
            {state.planType === 'medical' && (
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Pilihan Bilik & Penginapan Hospital Swasta:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setState({ ...state, medicalRoomRate: 200 })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      state.medicalRoomRate === 200
                        ? 'bg-rose-600/30 border-rose-500 text-white'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold">Bilik Semi-Private / Standard</div>
                    <div className="text-[11px] text-slate-400">RM200/malam | Had RM1.5 Juta/tahun</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setState({ ...state, medicalRoomRate: 300 })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      state.medicalRoomRate === 300
                        ? 'bg-rose-600/30 border-rose-500 text-white'
                        : 'bg-slate-800/80 border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold">Bilik Single VIP (Privasi)</div>
                    <div className="text-[11px] text-slate-400">RM300/malam | Had RM2.5 Juta/tahun</div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Result Card: Quote Output */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-800/90 to-slate-900/90 rounded-2xl p-6 sm:p-8 border border-slate-700/80 shadow-xl backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Anggaran Sumbangan Kasih Sayang
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Patuh Syariah GETB
                </span>
              </div>

              <div className="text-center py-4">
                <div className="text-xs text-slate-400 font-medium">Bermula Dari Hanya</div>
                <div className="text-4xl sm:text-5xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-rose-300 to-amber-300 my-1">
                  RM {estimatedMonthly}
                  <span className="text-lg font-normal text-slate-400"> /bulan</span>
                </div>
                <div className="text-xs text-rose-300 font-medium">
                  Atau bersamaan lebih kurang <span className="underline font-bold">RM{estimatedDaily} sehari</span>
                </div>
              </div>

              {/* Breakdown List */}
              <div className="space-y-2.5 py-4 border-t border-slate-700 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Nilai Perlindungan Waris:</span>
                  <span className="font-bold text-white">
                    {state.planType === 'medical'
                      ? `Had RM${state.medicalRoomRate === 300 ? '2.5 Juta' : '1.5 Juta'}/tahun`
                      : `RM ${state.sumCovered.toLocaleString()} Tunai Segera`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Status Pembekuan Bank:</span>
                  <span className="font-bold text-emerald-400">100% Tidak Beku (Hibah)</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Pelepasan Cukai LHDN:</span>
                  <span className="font-bold text-white">Sehingga RM3,000/tahun</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Khairat Kematian Segera:</span>
                  <span className="font-bold text-white">RM2,000 - RM5,000</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp proposal CTA */}
            <div className="pt-5 border-t border-slate-700">
              <button
                onClick={handleSendWhatsAppProposal}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-900/50 transition-all flex items-center justify-center space-x-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Minta Sebut Harga Rasmi di WhatsApp</span>
              </button>
              <p className="text-[10px] text-center text-slate-400 mt-2">
                Konsultan sah: <strong className="text-slate-300">{consultant.name}</strong> ({consultant.agencyName} - Kod: {consultant.code}) • Percuma tanpa sebarang paksaan
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
