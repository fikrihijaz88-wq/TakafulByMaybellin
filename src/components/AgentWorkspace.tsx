import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  FileSearch, 
  Target, 
  Share2, 
  ShieldAlert, 
  Palette, 
  MessageSquare, 
  Copy, 
  Check, 
  Send, 
  RefreshCw, 
  Download, 
  ExternalLink,
  ChevronRight,
  BookOpen,
  Sliders,
  CheckCircle2,
  AlertCircle,
  Calendar as CalendarIcon
} from 'lucide-react';
import { GETB_PRODUCTS, GETBProduct } from '../data/getbProducts';
import { TARGET_PERSONAS, TargetPersona } from '../data/targetPersonas';
import { ConsultantInfo, AgentTab, formatWhatsAppNumber, formatDisplayPhone } from '../types';
import { AppointmentCalendar } from './AppointmentCalendar';

interface Props {
  consultant: ConsultantInfo;
  initialTab?: AgentTab;
  initialProduct?: GETBProduct | null;
  onOpenTemplates: () => void;
}

export const AgentWorkspace: React.FC<Props> = ({
  consultant,
  initialTab = 'product-study',
  initialProduct = null,
  onOpenTemplates,
}) => {
  const [activeTab, setActiveTab] = useState<AgentTab>(initialTab);

  // States for Agent 1: Product Study
  const [selectedProduct, setSelectedProduct] = useState<string>(
    initialProduct ? initialProduct.name : GETB_PRODUCTS[0].name
  );
  const [productCategory, setProductCategory] = useState<string>('Takaful Keluarga & Hibah');
  const [productFocusQuestion, setProductFocusQuestion] = useState<string>(
    'Apakah keunikan utama produk ini berbanding pengendali takaful lain dan bagaimana nak terangkan kepada prospek dengan mudah?'
  );
  const [productStudyOutput, setProductStudyOutput] = useState<string>('');
  const [loadingProductStudy, setLoadingProductStudy] = useState(false);

  // States for Agent 2: Target Market
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('young-parents');
  const [customTargetNotes, setCustomTargetNotes] = useState<string>('');
  const [targetMarketOutput, setTargetMarketOutput] = useState<string>('');
  const [loadingTargetMarket, setLoadingTargetMarket] = useState(false);

  // States for Agent 3: Social Content
  const [contentPlatform, setContentPlatform] = useState<string>('facebook');
  const [contentType, setContentType] = useState<string>('Storytelling Emosi');
  const [contentProduct, setContentProduct] = useState<string>('i-Great Nova (Pelan Hibah Takaful)');
  const [contentAudience, setContentAudience] = useState<string>('Suami & Ayah yang ada anak kecil');
  const [contentTopic, setContentTopic] = useState<string>(
    'Realiti akaun bank beku bila suami meninggal dan cara selamatkan anak isteri guna Hibah GETB'
  );
  const [contentTone, setContentTone] = useState<string>('Menyentuh Jiwa & Prihatin');
  const [socialContentOutput, setSocialContentOutput] = useState<string>('');
  const [loadingSocialContent, setLoadingSocialContent] = useState(false);

  // States for Agent 4: Objection Handler
  const [objectionType, setObjectionType] = useState<string>(
    'Saya dah ada insurans / medical card syarikat majikan, tak perlu ambil takaful peribadi.'
  );
  const [prospectProfile, setProspectProfile] = useState<string>(
    'Eksekutif swasta 32 tahun, baru ada seorang anak'
  );
  const [objectionOutput, setObjectionOutput] = useState<string>('');
  const [loadingObjection, setLoadingObjection] = useState(false);

  // States for Agent 5: Creative Campaign
  const [campaignTheme, setCampaignTheme] = useState<string>(
    'Kempen Kasih Sayang Ayah: Jangan Biarkan Air Mata Isteri Disusuli Air Mata Hutang'
  );
  const [campaignProduct, setCampaignProduct] = useState<string>('i-Great Nova (Hibah GETB)');
  const [campaignFormat, setCampaignFormat] = useState<string>('Poster Media Sosial (1:1 Square) & Facebook Ad Banner');
  const [creativeOutput, setCreativeOutput] = useState<string>('');
  const [loadingCreative, setLoadingCreative] = useState(false);

  // States for Agent 6: Chat with Agency Coach
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: `Assalamualaikum ${consultant.name}! Saya ialah Penasihat & Jurulatih Agensi AI Great Eastern Takaful anda. Apa strategi promosi atau sokongan closing yang saya boleh bantu anda hari ini?`,
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [loadingChat, setLoadingChat] = useState(false);

  // Copy feedback state
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCopy = (text: string, sectionId: string) => {
    // Inject consultant phone number into WhatsApp links if present
    const processed = text.replace(/\[Link WhatsApp Anda\]/g, `https://wa.me/${formatWhatsAppNumber(consultant.phone)}`);
    navigator.clipboard.writeText(processed);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // 1. Run Agent: Product Study
  const handleRunProductStudy = async () => {
    setLoadingProductStudy(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/agent/product-study', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: selectedProduct,
          productCategory,
          targetMarket: contentAudience,
          specificQuestion: productFocusQuestion,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setProductStudyOutput(data.analysis);
      } else {
        setErrorMessage(data.error || 'Gagal memproses kajian produk.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Ralat sambungan pelayan.');
    } finally {
      setLoadingProductStudy(false);
    }
  };

  // 2. Run Agent: Target Market
  const handleRunTargetMarket = async () => {
    setLoadingTargetMarket(true);
    setErrorMessage(null);
    const persona = TARGET_PERSONAS.find((p) => p.id === selectedPersonaId);
    try {
      const res = await fetch('/api/agent/target-market', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personaTitle: persona ? persona.title : 'Segmen Khusus',
          ageRange: persona ? persona.ageGroup : '25-45 tahun',
          incomeLevel: persona ? persona.incomeLevel : 'RM3,000 - RM8,000',
          primaryNeed: persona ? persona.recommendedPlans.join(', ') : 'Hibah & Kad Perubatan',
          marketingGoal: customTargetNotes || 'Menjana 20 leads sebulan dari Facebook & TikTok',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setTargetMarketOutput(data.strategy);
      } else {
        setErrorMessage(data.error || 'Gagal merancang pasaran sasaran.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Ralat sambungan pelayan.');
    } finally {
      setLoadingTargetMarket(false);
    }
  };

  // 3. Run Agent: Social Content
  const handleRunSocialContent = async () => {
    setLoadingSocialContent(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/agent/social-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platform: contentPlatform,
          contentType,
          productName: contentProduct,
          targetAudience: contentAudience,
          coreTopic: contentTopic,
          toneStyle: contentTone,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSocialContentOutput(data.content);
      } else {
        setErrorMessage(data.error || 'Gagal menjana kandungan media sosial.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Ralat sambungan pelayan.');
    } finally {
      setLoadingSocialContent(false);
    }
  };

  // 4. Run Agent: Objection Handler
  const handleRunObjection = async () => {
    setLoadingObjection(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/agent/objection-handler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          objectionText: objectionType,
          prospectContext: prospectProfile,
          preferredTone: 'Empatik, santai dan berfakta',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setObjectionOutput(data.solutions);
      } else {
        setErrorMessage(data.error || 'Gagal menjana skrip closing.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Ralat sambungan pelayan.');
    } finally {
      setLoadingObjection(false);
    }
  };

  // 5. Run Agent: Creative Visual Campaign
  const handleRunCreative = async () => {
    setLoadingCreative(true);
    setErrorMessage(null);
    try {
      const res = await fetch('/api/agent/campaign-creative', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaignTheme,
          targetProduct: campaignProduct,
          mediumType: campaignFormat,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCreativeOutput(data.creative);
      } else {
        setErrorMessage(data.error || 'Gagal menjana konsep kempen.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Ralat sambungan pelayan.');
    } finally {
      setLoadingCreative(false);
    }
  };

  // 6. Run Coach Chat
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim() || loadingChat) return;

    const userText = inputQuery.trim();
    const updatedMessages = [...chatMessages, { role: 'user' as const, text: userText }];
    setChatMessages(updatedMessages);
    setInputQuery('');
    setLoadingChat(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/agent/coach-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.text,
          })),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setChatMessages([...updatedMessages, { role: 'assistant', text: data.reply }]);
      } else {
        setErrorMessage(data.error || 'Gagal berbual dengan jurulatih agensi.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Ralat sambungan pelayan.');
    } finally {
      setLoadingChat(false);
    }
  };

  const navTabs = [
    {
      id: 'product-study',
      label: '1. Kajian Produk GETB',
      subtitle: 'Analisis USP & Formula Pitching',
      icon: FileSearch,
      color: 'text-rose-600',
    },
    {
      id: 'target-market',
      label: '2. Target Market & Persona',
      subtitle: 'Psikologi Prospek & Pain Points',
      icon: Target,
      color: 'text-amber-600',
    },
    {
      id: 'social-content',
      label: '3. Copywriting & Content Viral',
      subtitle: 'FB Story, IG Carousel & TikTok',
      icon: Share2,
      color: 'text-blue-600',
    },
    {
      id: 'objection-handler',
      label: '4. Skrip Patahkan Bantahan',
      subtitle: 'Closing WhatsApp & Atasi Alasan',
      icon: ShieldAlert,
      color: 'text-emerald-600',
    },
    {
      id: 'campaign-creative',
      label: '5. Pengarah Kempen & AI Prompt',
      subtitle: 'Konsep Poster & Prompt Midjourney',
      icon: Palette,
      color: 'text-purple-600',
    },
    {
      id: 'calendar',
      label: 'Kalendar & Reminder Klien',
      subtitle: 'Jadual Temujanji & Peringatan WA',
      icon: CalendarIcon,
      color: 'text-teal-600',
    },
    {
      id: 'coach-chat',
      label: 'Bual Terbuka Jurulatih Agensi',
      subtitle: 'Konsultasi Strategi Khusus',
      icon: MessageSquare,
      color: 'text-rose-700',
    },
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-rose-900/40 mb-8 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-rose-400" />
              <span>Suite 5 Ejen AI Great Eastern Takaful Berhad</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              Pusat Kawalan Pemasaran & Operasi Promosi Konsultan GETB
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-2xl leading-relaxed">
              Manfaatkan 5 ejen AI pintar khas untuk mengkaji produk GETB, merungkai psikologi pasaran sasaran, menjana copywriting media sosial viral, dan menjawab sebarang bantahan prospek dengan pantas.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={onOpenTemplates}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold backdrop-blur-sm transition-all flex items-center space-x-2"
            >
              <BookOpen className="w-4 h-4 text-rose-400" />
              <span>Koleksi Templat Siap Guna</span>
            </button>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <div className="flex-1">
            <span className="font-bold">Perhatian: </span>
            {errorMessage}
          </div>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-rose-600 font-bold hover:underline"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Main Grid: Left Tabs Nav, Right Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Navigation Tabs */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
            Pilih Ejen AI Yang Diperlukan:
          </div>
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AgentTab)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center space-x-3.5 ${
                  isActive
                    ? 'bg-white border-rose-500 shadow-md ring-2 ring-rose-500/20 text-slate-900'
                    : 'bg-white/70 border-slate-200 text-slate-600 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl transition-colors ${
                    isActive ? 'bg-rose-50' : 'bg-slate-100'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${tab.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">{tab.label}</div>
                  <div className="text-[11px] text-slate-500 truncate">{tab.subtitle}</div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    isActive ? 'text-rose-600 translate-x-0.5' : 'text-slate-300'
                  }`}
                />
              </button>
            );
          })}

          {/* Consultant Quick Status Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mt-4 text-xs">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Konsultan Aktif:
            </div>
            <div className="font-bold text-slate-800 mt-0.5">{consultant.name}</div>
            <div className="text-slate-500 text-[11px]">{consultant.agencyName} • {formatDisplayPhone(consultant.phone)} • Kod: {consultant.code}</div>
          </div>
        </div>

        {/* Right Tab Content */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 min-h-[620px] flex flex-col justify-between">
          {/* TAB 1: PRODUCT STUDY */}
          {activeTab === 'product-study' && (
            <div className="space-y-6 flex-1">
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
                      <FileSearch className="w-5 h-5" />
                    </span>
                    <h3 className="font-heading font-extrabold text-xl text-slate-900">
                      Agen 1: Pakar Kajian & Analisis Produk GETB
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Kaji mana-mana produk Takaful Keluarga GETB untuk dapatkan formula USP, perbandingan pasaran, dan contoh skrip pembuka perbualan.
                  </p>
                </div>
              </div>

              {/* Input Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Pilih Produk GETB Untuk Dikaji:
                  </label>
                  <select
                    value={selectedProduct}
                    onChange={(e) => {
                      setSelectedProduct(e.target.value);
                      const match = GETB_PRODUCTS.find((p) => p.name === e.target.value);
                      if (match) setProductCategory(match.categoryLabel);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 font-medium"
                  >
                    {GETB_PRODUCTS.map((prod) => (
                      <option key={prod.id} value={prod.name}>
                        {prod.name} — ({prod.categoryLabel})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Soalan Khusus Atau Fokus Analisis Anda:
                  </label>
                  <textarea
                    rows={2}
                    value={productFocusQuestion}
                    onChange={(e) => setProductFocusQuestion(e.target.value)}
                    placeholder="cth: Bagaimanakah cara paling meyakinkan untuk terangkan pelan ini kepada seorang ayah berumur 35 tahun?"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="flex items-center justify-end">
                  <button
                    onClick={handleRunProductStudy}
                    disabled={loadingProductStudy}
                    className="py-2.5 px-5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-200 transition-all flex items-center space-x-2 disabled:opacity-50"
                  >
                    {loadingProductStudy ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Menganalisis Data Produk...</span>
                      </>
                    ) : (
                      <>
                        <Bot className="w-4 h-4" />
                        <span>Jana Kajian Lengkap Produk</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Output Display */}
              {productStudyOutput && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Hasil Analisis Pakar Produk GETB:
                    </span>
                    <button
                      onClick={() => handleCopy(productStudyOutput, 'product-study')}
                      className="px-3 py-1 rounded-lg text-xs font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors flex items-center space-x-1"
                    >
                      {copiedSection === 'product-study' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Nota</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed font-sans whitespace-pre-wrap max-h-96 overflow-y-auto">
                    {productStudyOutput}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: TARGET MARKET */}
          {activeTab === 'target-market' && (
            <div className="space-y-6 flex-1">
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
                      <Target className="w-5 h-5" />
                    </span>
                    <h3 className="font-heading font-extrabold text-xl text-slate-900">
                      Agen 2: Strategis Pasaran Sasaran & Persona
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Fahami kehendak terpendam prospek, rasa takut mereka, bajet ideal, dan skrip hook yang menyentuh jiwa.
                  </p>
                </div>
              </div>

              {/* Persona Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Pilih Profil Persona Prospek:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {TARGET_PERSONAS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedPersonaId(p.id)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        selectedPersonaId === p.id
                          ? 'border-amber-500 bg-amber-50/40 ring-2 ring-amber-500/20 shadow-sm'
                          : 'border-slate-200 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-bold text-xs text-slate-900">{p.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{p.subtitle}</div>
                      <div className="text-[10px] text-amber-700 font-semibold mt-1">Bajet: {p.budgetPreference}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Matlamat Kempen Atau Nota Tambahan:
                </label>
                <input
                  type="text"
                  value={customTargetNotes}
                  onChange={(e) => setCustomTargetNotes(e.target.value)}
                  placeholder="cth: Sasaran 15 closing Hibah Takaful bulan ini melalui iklan Facebook"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center justify-end">
                <button
                  onClick={handleRunTargetMarket}
                  disabled={loadingTargetMarket}
                  className="py-2.5 px-5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md shadow-amber-200 transition-all flex items-center space-x-2 disabled:opacity-50"
                >
                  {loadingTargetMarket ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Merangka Strategi Sasaran...</span>
                    </>
                  ) : (
                    <>
                      <Target className="w-4 h-4" />
                      <span>Rangka Pelan Sasaran Pasaran</span>
                    </>
                  )}
                </button>
              </div>

              {/* Strategy Output */}
              {targetMarketOutput && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Pelan Tindakan Pasaran Sasaran:
                    </span>
                    <button
                      onClick={() => handleCopy(targetMarketOutput, 'target-market')}
                      className="px-3 py-1 rounded-lg text-xs font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors flex items-center space-x-1"
                    >
                      {copiedSection === 'target-market' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Pelan</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200 text-xs text-slate-800 leading-relaxed font-sans whitespace-pre-wrap max-h-96 overflow-y-auto">
                    {targetMarketOutput}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SOCIAL CONTENT */}
          {activeTab === 'social-content' && (
            <div className="space-y-6 flex-1">
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                      <Share2 className="w-5 h-5" />
                    </span>
                    <h3 className="font-heading font-extrabold text-xl text-slate-900">
                      Agen 3: Pencipta Kandungan & Copywriting Viral
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Jana posting Facebook beremosi, carousel Instagram berilmu, atau skrip video TikTok yang ada 'hook' 3 saat pertama.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Platform Media Sosial:
                  </label>
                  <select
                    value={contentPlatform}
                    onChange={(e) => setContentPlatform(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="facebook">Facebook Post (Storytelling / Edukasi)</option>
                    <option value="instagram">Instagram Carousel (Multi-Slide & Caption)</option>
                    <option value="tiktok">TikTok / Reels Video Script (Hook 3 Saat)</option>
                    <option value="threads">Threads / X (Tweet Edukasi)</option>
                    <option value="calendar">Jadual Kandungan 30 Hari (Content Calendar)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Gaya / Format Penulisan:
                  </label>
                  <select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Storytelling Emosi (Kisah Balu & Anak)">Storytelling Emosi (Kisah Realiti)</option>
                    <option value="Fakta & Statistik Bil Hospital">Fakta & Statistik Kos Perubatan</option>
                    <option value="Mitos vs Realiti Takaful">Mitos vs Realiti Urus Pusaka</option>
                    <option value="Hard Sell / Promosi Terhad">Tawaran Promosi & Sebut Harga Pantas</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Produk GETB Difokuskan:
                  </label>
                  <input
                    type="text"
                    value={contentProduct}
                    onChange={(e) => setContentProduct(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Nada / Tone of Voice:
                  </label>
                  <select
                    value={contentTone}
                    onChange={(e) => setContentTone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Menyentuh Jiwa & Prihatin (Empati)">Menyentuh Jiwa & Prihatin</option>
                    <option value="Santai & Mesra (Gaya Kawan)">Santai & Mesra (Friendly Chat)</option>
                    <option value="Tegas & Membuka Minda (Data-Driven)">Tegas & Membuka Minda (Logik)</option>
                    <option value="Profesional Korporat">Profesional & Berwibawa</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Topik Teras Posting:
                </label>
                <textarea
                  rows={2}
                  value={contentTopic}
                  onChange={(e) => setContentTopic(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center justify-end">
                <button
                  onClick={handleRunSocialContent}
                  disabled={loadingSocialContent}
                  className="py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-200 transition-all flex items-center space-x-2 disabled:opacity-50"
                >
                  {loadingSocialContent ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Menjana Copywriting Viral...</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4" />
                      <span>Cipta Kandungan Media Sosial</span>
                    </>
                  )}
                </button>
              </div>

              {/* Content Output */}
              {socialContentOutput && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Copywriting Siap Guna:
                    </span>
                    <button
                      onClick={() => handleCopy(socialContentOutput, 'social-content')}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all flex items-center space-x-1.5 shadow-sm"
                    >
                      {copiedSection === 'social-content' ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Tersalin ke Papan Keratan!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Ke WhatsApp / FB</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-5 rounded-2xl bg-blue-50/40 border border-blue-200 text-xs text-slate-800 leading-relaxed font-sans whitespace-pre-wrap max-h-96 overflow-y-auto">
                    {socialContentOutput}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: OBJECTION HANDLER */}
          {activeTab === 'objection-handler' && (
            <div className="space-y-6 flex-1">
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                      <ShieldAlert className="w-5 h-5" />
                    </span>
                    <h3 className="font-heading font-extrabold text-xl text-slate-900">
                      Agen 4: Pakar Patahkan Bantahan & Skrip Closing
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Tukarkan alasan "Tengok dulu", "Dah ada kad syarikat", "Bajet ketat" menjadi persetujuan dengan skrip berhemah dan berstruktur.
                  </p>
                </div>
              </div>

              {/* Preset Objections */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Pilih Atau Tulis Bantahan Prospek:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                  {[
                    'Saya dah ada insurans / medical card syarikat majikan, rasa tak perlu ambil peribadi.',
                    'Bajet tengah ketat sekarang, nak tengok-tengok dulu la nanti.',
                    'Saya sihat lagi dan masih muda, lambat lagi nak kena sakit.',
                    'Takaful ni menipu, nanti nak claim susah agen lari.',
                    'Saya nak bincang dengan isteri / suami dulu.',
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setObjectionType(preset)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                        objectionType === preset
                          ? 'border-emerald-500 bg-emerald-50/50 text-emerald-950 font-semibold'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      "{preset}"
                    </button>
                  ))}
                </div>

                <textarea
                  rows={2}
                  value={objectionType}
                  onChange={(e) => setObjectionType(e.target.value)}
                  placeholder="Atau taip bantahan khusus prospek anda di sini..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Latar Belakang Prospek:
                </label>
                <input
                  type="text"
                  value={prospectProfile}
                  onChange={(e) => setProspectProfile(e.target.value)}
                  placeholder="cth: Jurutera swasta 30 tahun, ada 1 anak, baru beli rumah"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end">
                <button
                  onClick={handleRunObjection}
                  disabled={loadingObjection}
                  className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-200 transition-all flex items-center space-x-2 disabled:opacity-50"
                >
                  {loadingObjection ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Menjana Skrip Closing...</span>
                    </>
                  ) : (
                    <>
                      <ShieldAlert className="w-4 h-4" />
                      <span>Jana 3 Jawapan Meyakinkan</span>
                    </>
                  )}
                </button>
              </div>

              {/* Objection Solutions Output */}
              {objectionOutput && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Cadangan Skrip Jawapan & Closing:
                    </span>
                    <button
                      onClick={() => handleCopy(objectionOutput, 'objection-handler')}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center space-x-1.5 shadow-sm"
                    >
                      {copiedSection === 'objection-handler' ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Skrip Jawapan</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200 text-xs text-slate-800 leading-relaxed font-sans whitespace-pre-wrap max-h-96 overflow-y-auto">
                    {objectionOutput}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: CAMPAIGN CREATIVE */}
          {activeTab === 'campaign-creative' && (
            <div className="space-y-6 flex-1">
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
                      <Palette className="w-5 h-5" />
                    </span>
                    <h3 className="font-heading font-extrabold text-xl text-slate-900">
                      Agen 5: Pengarah Kreatif & Prompt Gambar AI
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Reka idea visual poster yang memikat serta sediakan prompt bahasa Inggeris untuk AI Image Generator (Midjourney / Imagen / Gemini).
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tema Kempen Promosi:
                  </label>
                  <input
                    type="text"
                    value={campaignTheme}
                    onChange={(e) => setCampaignTheme(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Produk Sasaran:
                    </label>
                    <input
                      type="text"
                      value={campaignProduct}
                      onChange={(e) => setCampaignProduct(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Format Iklan:
                    </label>
                    <select
                      value={campaignFormat}
                      onChange={(e) => setCampaignFormat(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="Poster Media Sosial (1:1 Square)">Square Poster (1:1) - FB/IG Feed</option>
                      <option value="Story & Reels Poster (9:16 Vertical)">Story & Reels Vertical (9:16)</option>
                      <option value="Banner Facebook Cover (16:9)">Landscape Banner (16:9)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <button
                    onClick={handleRunCreative}
                    disabled={loadingCreative}
                    className="py-2.5 px-5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-200 transition-all flex items-center space-x-2 disabled:opacity-50"
                  >
                    {loadingCreative ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Merekabentuk Konsep Poster...</span>
                      </>
                    ) : (
                      <>
                        <Palette className="w-4 h-4" />
                        <span>Jana Konsep Visual & Prompt AI</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Creative Output */}
              {creativeOutput && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Cadangan Visual Poster & Prompt AI:
                    </span>
                    <button
                      onClick={() => handleCopy(creativeOutput, 'campaign-creative')}
                      className="px-3 py-1 rounded-lg text-xs font-medium border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors flex items-center space-x-1"
                    >
                      {copiedSection === 'campaign-creative' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Prompt & Konsep</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-5 rounded-2xl bg-purple-50/40 border border-purple-200 text-xs text-slate-800 leading-relaxed font-sans whitespace-pre-wrap max-h-96 overflow-y-auto">
                    {creativeOutput}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: CALENDAR & CLIENT REMINDER */}
          {activeTab === 'calendar' && (
            <div className="flex-1">
              <AppointmentCalendar consultant={consultant} />
            </div>
          )}

          {/* TAB 6: COACH CHAT */}
          {activeTab === 'coach-chat' && (
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
                      <MessageSquare className="w-5 h-5" />
                    </span>
                    <h3 className="font-heading font-extrabold text-xl text-slate-900">
                      Bual Langsung Jurulatih Agensi GETB (AI Coach)
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Tanya apa sahaja soalan berkenaan produk, syarat kelayakan perubatan, skrip panggilan sejuk (cold call), atau strategi kempen peribadi anda.
                  </p>
                </div>
              </div>

              {/* Chat Thread */}
              <div className="flex-1 overflow-y-auto max-h-[420px] space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${
                      msg.role === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div className="text-[10px] text-slate-400 font-semibold mb-1 px-1">
                      {msg.role === 'user' ? consultant.name : 'GETB Agency Coach (AI)'}
                    </div>
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                        msg.role === 'user'
                          ? 'bg-rose-600 text-white rounded-br-none shadow-sm shadow-rose-200'
                          : 'bg-white text-slate-800 rounded-bl-none border border-slate-200 shadow-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {loadingChat && (
                  <div className="flex items-center space-x-2 text-xs text-slate-400 p-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-rose-600" />
                    <span>GETB Coach sedang menaip jawapan...</span>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendChatMessage} className="pt-2">
                <div className="relative">
                  <input
                    type="text"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder="Taip soalan atau bincang strategi promosi GETB anda..."
                    className="w-full pl-4 pr-24 py-3 rounded-2xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-sm"
                  />
                  <button
                    type="submit"
                    disabled={loadingChat || !inputQuery.trim()}
                    className="absolute right-2 top-2 px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all disabled:opacity-40 flex items-center space-x-1"
                  >
                    <span>Hantar</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Quick Disclaimer / Footer note */}
          <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Dikuasakan oleh Model AI Gemini 3.8 Flash • Khusus untuk GETB Consultant</span>
            <button
              onClick={onOpenTemplates}
              className="text-rose-600 hover:underline font-semibold"
            >
              Buka Koleksi Skrip Sedia Guna →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
