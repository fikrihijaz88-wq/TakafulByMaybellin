import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProductCatalog } from './components/ProductCatalog';
import { QuotationCalculator } from './components/QuotationCalculator';
import { AgentWorkspace } from './components/AgentWorkspace';
import { ConsultantProfileModal } from './components/ConsultantProfileModal';
import { TemplateLibraryModal } from './components/TemplateLibraryModal';
import { ProductComparisonModal } from './components/ProductComparisonModal';
import { Footer } from './components/Footer';
import { ConsultantInfo, PortalMode, AgentTab, formatWhatsAppNumber, formatDisplayPhone } from './types';
import { GETBProduct } from './data/getbProducts';
import { 
  Shield, 
  HeartHandshake, 
  Sparkles, 
  CheckCircle, 
  Award, 
  Clock, 
  Users, 
  Building2, 
  FileCheck2,
  PhoneCall,
  ArrowRight
} from 'lucide-react';

const DEFAULT_CONSULTANT: ConsultantInfo = {
  name: 'Yow Chee Suan @ Maybellin Yow',
  agencyName: 'GPlus Management',
  phone: '016-6638526',
  email: 'maybellinyow@gmail.com',
  code: '1147271',
  location: 'Kuala Lumpur, Selangor & Seluruh Malaysia (Online)',
};

export default function App() {
  const [currentMode, setCurrentMode] = useState<PortalMode>('customer');
  const [consultant, setConsultant] = useState<ConsultantInfo>(() => {
    const saved = localStorage.getItem('getb_consultant_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          parsed.code === 'GETB-88192' || 
          parsed.code === 'GETB-88219' || 
          parsed.name === 'Ahmad Fikri Bin Hijaz' ||
          parsed.agencyName?.includes('Al-Hijaz')
        ) {
          localStorage.setItem('getb_consultant_profile', JSON.stringify(DEFAULT_CONSULTANT));
          return DEFAULT_CONSULTANT;
        }
        return parsed;
      } catch (e) {
        return DEFAULT_CONSULTANT;
      }
    }
    return DEFAULT_CONSULTANT;
  });

  // Modal States
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [comparisonProductId, setComparisonProductId] = useState<string | undefined>(undefined);

  // Agent workspace deep link states
  const [agentInitialTab, setAgentInitialTab] = useState<AgentTab>('product-study');
  const [agentInitialProduct, setAgentInitialProduct] = useState<GETBProduct | null>(null);

  useEffect(() => {
    localStorage.setItem('getb_consultant_profile', JSON.stringify(consultant));
  }, [consultant]);

  const handleSaveConsultant = (newInfo: ConsultantInfo) => {
    setConsultant(newInfo);
  };

  const handleStudyProductWithAI = (product: GETBProduct) => {
    setAgentInitialProduct(product);
    setAgentInitialTab('product-study');
    setCurrentMode('agent-suite');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenComparison = (productId?: string) => {
    setComparisonProductId(productId);
    setIsComparisonModalOpen(true);
  };

  const handleNavigateToCalculator = () => {
    const el = document.getElementById('kalkulator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateToProducts = () => {
    const el = document.getElementById('produk');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-rose-500 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        currentMode={currentMode}
        onModeChange={setCurrentMode}
        consultant={consultant}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenTemplates={() => setIsTemplateModalOpen(true)}
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        {currentMode === 'customer' ? (
          <div>
            {/* Hero Section */}
            <HeroSection
              consultant={consultant}
              onNavigateToCalculator={handleNavigateToCalculator}
              onNavigateToProducts={handleNavigateToProducts}
              onSwitchToAgentSuite={() => {
                setCurrentMode('agent-suite');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Why Great Eastern Takaful Trust Badges */}
            <section className="py-12 bg-white border-b border-slate-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-10 h-10 mx-auto rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-3">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900">100% Syariah</div>
                    <div className="text-xs text-slate-500 mt-1">Diawasi Jawatankuasa Syariah Rasmi</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                      <FileCheck2 className="w-5 h-5" />
                    </div>
                    <div className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900">RM500,000</div>
                    <div className="text-xs text-slate-500 mt-1">Dilindungi PIDM (Skim TIPS)</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-10 h-10 mx-auto rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900">14-30 Hari</div>
                    <div className="text-xs text-slate-500 mt-1">Tuntutan Hibah Pantas Tanpa Beku</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-10 h-10 mx-auto rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900">150+ Hospital</div>
                    <div className="text-xs text-slate-500 mt-1">Rangkaian Panel Swasta Terkemuka</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Product Catalog Section */}
            <ProductCatalog
              consultant={consultant}
              onOpenStudyWithAI={handleStudyProductWithAI}
              onOpenComparison={handleOpenComparison}
            />

            {/* Interactive Calculator Section */}
            <QuotationCalculator consultant={consultant} />

            {/* Educational Value Proposition: Beza Hibah vs Faraid */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                    Kefahaman Pusaka &amp; Takaful
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
                    Mengapa Hibah Kasih Sayang GETB Pilihan Utama Ketua Keluarga?
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2">
                    Ketahui perbezaan kritikal antara wang pampasan Hibah Takaful dengan harta pusaka biasa apabila berlakunya kematian.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left: Harta Pusaka Biasa */}
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex items-center space-x-2 text-rose-700 font-bold text-sm">
                      <span className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-xs">✕</span>
                      <span>Harta Pusaka Biasa (Tanpa Hibah)</span>
                    </div>
                    <ul className="space-y-3 text-xs text-slate-600">
                      <li className="flex items-start space-x-2">
                        <span className="text-rose-500 font-bold">•</span>
                        <span><strong>Akaun Bank Dibekukan:</strong> Simpanan bank, ASB, dan KWSP (jika tiada penama) dibekukan serta merta sebaik sijil kematian dikeluarkan.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-rose-500 font-bold">•</span>
                        <span><strong>Proses Mahkamah Panjang:</strong> Mengambil masa 6 bulan hingga 2 tahun untuk dapatkan Surat Kuasa Mentadbir (LA) atau Probet.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-rose-500 font-bold">•</span>
                        <span><strong>Risiko Perebutan Waris:</strong> Berlaku salah faham atau tuntutan hak antara waris faraid yang melengahkan pengagihan nafkah isteri & anak.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Right: Hibah Takaful GETB */}
                  <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-4">
                    <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-xs">✓</span>
                      <span>Hibah Kasih Sayang GETB (i-Great Nova)</span>
                    </div>
                    <ul className="space-y-3 text-xs text-slate-700">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>100% Tidak Beku:</strong> Wang pampasan disalurkan terus kepada penama (isteri/anak) tanpa melalui proses pembekuan mahkamah.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Cair Sepantas 14-30 Hari:</strong> Duit masuk ke akaun bank isteri untuk terus bayar sewa rumah, nafkah dapur dan yuran sekolah anak.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span><strong>Hadiah Mutlak Yang Sah:</strong> Diiktiraf di bawah Akta Perkhidmatan Kewangan Islam 2013 Jadual 10 sebagai pemberian mutlak yang tidak boleh dipertikaikan waris lain.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <button
                    onClick={() => {
                      const text = `Assalamualaikum ${consultant.name}, saya berminat nak sediakan Hibah Kasih Sayang GETB untuk keluarga saya. Boleh bantu kirakan proposal?`;
                      window.open(`https://wa.me/${formatWhatsAppNumber(consultant.phone)}?text=${encodeURIComponent(text)}`, '_blank');
                    }}
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-200 transition-all"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Daftar Hibah Kasih Sayang Bersama {consultant.name}</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Consultant Showcase Callout */}
            <section className="py-12 bg-gradient-to-r from-rose-900 via-rose-800 to-red-900 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="font-heading font-extrabold text-2xl">
                    Perlukan Sebut Harga Khusus Atau Khidmat Nasihat Bersemuka?
                  </h3>
                  <p className="text-xs sm:text-sm text-rose-200 mt-1 max-w-2xl">
                    Hubungi konsultan bertauliah anda hari ini untuk sesi semakan percuma (Policy Review &amp; Quotation) secara atas talian atau di pejabat kami.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const text = `Assalamualaikum ${consultant.name}, saya ingin menetapkan sesi temujanji semakan polisi Takaful percuma bersama Tuan/Puan.`;
                    window.open(`https://wa.me/${formatWhatsAppNumber(consultant.phone)}?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="px-6 py-3.5 rounded-xl bg-white text-rose-800 font-extrabold text-xs sm:text-sm hover:bg-rose-50 shadow-lg transition-all shrink-0 flex items-center space-x-2"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-600" />
                  <span>Hubungi {formatDisplayPhone(consultant.phone)} di WhatsApp</span>
                </button>
              </div>
            </section>
          </div>
        ) : (
          /* Agent AI Suite View */
          <AgentWorkspace
            consultant={consultant}
            initialTab={agentInitialTab}
            initialProduct={agentInitialProduct}
            onOpenTemplates={() => setIsTemplateModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        consultant={consultant}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onSwitchToAgentSuite={() => {
          setCurrentMode('agent-suite');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Modals */}
      <ConsultantProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        consultant={consultant}
        onSave={handleSaveConsultant}
      />

      <TemplateLibraryModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        consultant={consultant}
      />

      <ProductComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
        consultant={consultant}
        selectedProductId={comparisonProductId}
      />
    </div>
  );
}
