import React, { useState } from 'react';
import { 
  ShieldCheck, 
  HeartHandshake, 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  HelpCircle, 
  FileText, 
  Bot, 
  Share2, 
  Scale, 
  PhoneCall,
  Search,
  Check
} from 'lucide-react';
import { GETB_PRODUCTS, GETBProduct } from '../data/getbProducts';
import { ConsultantInfo, formatWhatsAppNumber, formatDisplayPhone } from '../types';

interface Props {
  consultant: ConsultantInfo;
  onOpenStudyWithAI: (product: GETBProduct) => void;
  onOpenComparison: (productId?: string) => void;
}

export const ProductCatalog: React.FC<Props> = ({
  consultant,
  onOpenStudyWithAI,
  onOpenComparison,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProduct, setActiveModalProduct] = useState<GETBProduct | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = [
    { id: 'all', label: 'Semua Produk' },
    { id: 'hibah', label: 'Hibah & Legasi Waris' },
    { id: 'medical', label: 'Kad Perubatan' },
    { id: 'savings', label: 'Pelaburan & Simpanan' },
    { id: 'ci', label: 'Penyakit Kritikal' },
    { id: 'education', label: 'Pendidikan Anak' },
    { id: 'family', label: 'Keluarga & Mampu Milik' },
  ];

  const filteredProducts = GETB_PRODUCTS.filter((prod) => {
    const matchesCat = selectedCategory === 'all' || prod.category === selectedCategory;
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleWhatsAppConsult = (product: GETBProduct) => {
    const text = `Assalamualaikum ${consultant.name}, saya berminat nak dapatkan proposal dan sebut harga percuma bagi produk *${product.name}* (${product.categoryLabel}). Boleh bantu saya?`;
    window.open(`https://wa.me/${formatWhatsAppNumber(consultant.phone)}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareProduct = (product: GETBProduct) => {
    const shareText = `*${product.name}* - Great Eastern Takaful Berhad\n${product.tagline}\n\nHubungi Konsultan Sah GETB: ${consultant.name} (${formatDisplayPhone(consultant.phone)})\nWhatsApp: https://wa.me/${formatWhatsAppNumber(consultant.phone)}`;
    navigator.clipboard.writeText(shareText);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="produk" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-4 h-4 text-rose-600" />
          <span>Koleksi Rasmi Takaful Keluarga GETB</span>
          <span className="text-slate-300">•</span>
          <span className="text-emerald-700 font-extrabold flex items-center space-x-1">
            <span>Disemak Laman Rasmi GETB</span>
          </span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Produk Takaful Patuh Syariah Untuk Setiap Fasa Kehidupan Anda
        </h2>
        <p className="mt-3 text-base text-slate-600">
          Koleksi pelan rasmi yang terdapat di laman web <strong className="text-slate-800">Great Eastern Takaful Berhad</strong>: daripada perlindungan waris tanpa beku menerusi Hibah, hinggalah rawatan hospital swasta tanpa had seumur hidup.
        </p>

        {/* Action Button: Compare products */}
        <div className="mt-4 flex items-center justify-center space-x-3">
          <button
            onClick={() => onOpenComparison()}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-300 hover:border-rose-400 hover:text-rose-600 shadow-sm transition-all"
          >
            <Scale className="w-4 h-4 text-rose-600" />
            <span>Bandingkan Pelan Utama</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-1.5 justify-center md:justify-start">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === c.id
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-200'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="w-full md:w-72 relative">
          <input
            type="text"
            placeholder="Cari produk GETB..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-sm"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-rose-300 transition-all duration-300 flex flex-col group relative"
          >
            {/* Top Accent Gradient Bar */}
            <div className={`h-2.5 bg-gradient-to-r ${prod.color}`} />

            {/* Card Content */}
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex flex-wrap items-center justify-between gap-1.5 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {prod.categoryLabel}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {prod.officialStatus}
                </span>
              </div>

              <h3 className="font-heading font-bold text-xl text-slate-900 group-hover:text-rose-600 transition-colors">
                {prod.name}
              </h3>

              <p className="text-xs text-rose-700 font-medium italic mt-1 mb-3">
                "{prod.tagline}"
              </p>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                {prod.description}
              </p>

              {/* Price / Contribution highlight */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 mb-4">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Anggaran Sumbangan:</div>
                <div className="text-xs font-bold text-slate-900 mt-0.5">{prod.minContribution}</div>
              </div>

              {/* Key Benefits List */}
              <div className="space-y-2 mb-6 flex-1">
                <div className="text-xs font-bold text-slate-700">Manfaat Perlindungan Utama:</div>
                {prod.keyBenefits.slice(0, 3).map((benefit, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-600">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-col space-y-2">
                <button
                  onClick={() => handleWhatsAppConsult(prod)}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white text-xs font-bold shadow-md shadow-rose-200 transition-all flex items-center justify-center space-x-2"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Dapatkan Sebut Harga WhatsApp</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setActiveModalProduct(prod)}
                    className="py-2 px-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-xs font-medium hover:bg-slate-50 transition-colors flex items-center justify-center space-x-1"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    <span>Perincian & Brosur</span>
                  </button>

                  <button
                    onClick={() => onOpenStudyWithAI(prod)}
                    className="py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-xs font-semibold transition-colors flex items-center justify-center space-x-1"
                    title="Kaji pelan ini menggunakan Agen AI GETB"
                  >
                    <Bot className="w-3.5 h-3.5 text-rose-600" />
                    <span>Kaji dgn AI</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className={`p-6 bg-gradient-to-r ${activeModalProduct.color} text-white shrink-0`}>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm">
                    {activeModalProduct.categoryLabel}
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl mt-2">{activeModalProduct.name}</h3>
                  <p className="text-xs text-white/90 mt-1 italic">{activeModalProduct.tagline}</p>
                </div>
                <button
                  onClick={() => setActiveModalProduct(null)}
                  className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-slate-700 text-xs">
              <div>
                <h4 className="font-heading font-bold text-sm text-slate-900 mb-2">Penerangan Penuh Pelan</h4>
                <p className="text-slate-600 leading-relaxed text-xs">{activeModalProduct.description}</p>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Umur Kelayakan Masuk</div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5">{activeModalProduct.entryAge}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Tempoh Perlindungan</div>
                  <div className="text-xs font-bold text-slate-800 mt-0.5">{activeModalProduct.coverageTerm}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 col-span-2 sm:col-span-1">
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Anggaran Sumbangan</div>
                  <div className="text-xs font-bold text-rose-700 mt-0.5">{activeModalProduct.minContribution}</div>
                </div>
              </div>

              {/* USP Box */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <div className="font-bold text-amber-900 text-xs mb-1 flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Keunikan Utama (USP) di Pasaran:</span>
                </div>
                <p className="text-amber-800 text-[11px] leading-relaxed">{activeModalProduct.usp}</p>
              </div>

              {/* All Benefits */}
              <div>
                <h4 className="font-heading font-bold text-sm text-slate-900 mb-2">Senarai Penuh Manfaat:</h4>
                <div className="space-y-2">
                  {activeModalProduct.keyBenefits.map((b, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-slate-600">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Riders Available */}
              <div>
                <h4 className="font-heading font-bold text-sm text-slate-900 mb-2">Rider Tambahan Pilihan:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalProduct.popularRiders.map((r, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                      + {r}
                    </span>
                  ))}
                </div>
              </div>

              {/* Shariah Statement */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                <div className="font-bold text-xs mb-0.5">Jaminan Syariah:</div>
                <p className="text-[11px] text-emerald-800">{activeModalProduct.shariahHighlight}</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3 shrink-0">
              <button
                onClick={() => handleShareProduct(activeModalProduct)}
                className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-white text-slate-700 text-xs font-medium flex items-center space-x-1.5"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Disalin!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>Salin Info Produk</span>
                  </>
                )}
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    const prod = activeModalProduct;
                    setActiveModalProduct(null);
                    onOpenStudyWithAI(prod);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold flex items-center space-x-1.5"
                >
                  <Bot className="w-3.5 h-3.5 text-rose-400" />
                  <span>Kaji Dalam AI Suite</span>
                </button>

                <button
                  onClick={() => handleWhatsAppConsult(activeModalProduct)}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-200 flex items-center space-x-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Minta Quotation WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
