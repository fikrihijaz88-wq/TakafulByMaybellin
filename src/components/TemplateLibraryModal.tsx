import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, BookOpen, MessageSquare, Video, ShieldCheck } from 'lucide-react';
import { READY_TEMPLATES, SocialTemplate } from '../data/readyTemplates';
import { ConsultantInfo, formatWhatsAppNumber } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  consultant: ConsultantInfo;
}

export const TemplateLibraryModal: React.FC<Props> = ({
  isOpen,
  onClose,
  consultant,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'Semua Koleksi' },
    { id: 'facebook', label: 'Facebook Post', icon: BookOpen },
    { id: 'instagram', label: 'Instagram Carousel', icon: Sparkles },
    { id: 'tiktok', label: 'TikTok / Reels Script', icon: Video },
    { id: 'objection', label: 'Skrip Patahkan Bantahan', icon: ShieldCheck },
    { id: 'whatsapp', label: 'Skrip WhatsApp', icon: MessageSquare },
  ];

  const filteredTemplates = READY_TEMPLATES.filter((tpl) => {
    const matchesCat = activeCategory === 'all' || tpl.category === activeCategory;
    const matchesSearch =
      tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleCopy = (template: SocialTemplate) => {
    // Replace placeholder with consultant link
    const waLink = `https://wa.me/${formatWhatsAppNumber(consultant.phone)}?text=${encodeURIComponent(
      `Assalamualaikum ${consultant.name}, saya berminat nak tahu lebih lanjut tentang promosi Takaful GETB ini.`
    )}`;
    const processed = template.content
      .replace(/\[Link WhatsApp Anda\]/g, waLink)
      .replace(/\[Nama\]/g, 'Tuan/Puan');

    navigator.clipboard.writeText(processed);
    setCopiedId(template.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-rose-950 px-6 py-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-heading font-bold text-lg">Koleksi Templat Siap Guna (Viral Copy Bank)</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-rose-600/40 text-rose-200 border border-rose-500/40 font-mono">
                  1-Click Copy
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Templat copywriting, skrip video TikTok, dan skrip closing bantahan sedia salin ke WhatsApp/FB anda
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  activeCategory === c.id
                    ? 'bg-rose-600 text-white shadow-sm shadow-rose-200'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Cari kata kunci (cth: hibah, hospital, bantahan)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 px-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        {/* Content List */}
        <div className="p-6 overflow-y-auto space-y-4">
          {filteredTemplates.map((item) => {
            const isCopied = copiedId === item.id;
            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-slate-200 bg-white hover:border-rose-200 hover:shadow-md transition-all group"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-100">
                        {item.category}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-semibold px-2 py-0.5 rounded bg-emerald-50 border border-emerald-100">
                        Hook: {item.hookStrength}
                      </span>
                    </div>
                    <h4 className="font-heading font-bold text-base text-slate-900 mt-1">{item.title}</h4>
                    <p className="text-xs text-slate-500">{item.description}</p>
                  </div>

                  <button
                    onClick={() => handleCopy(item)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all shadow-sm ${
                      isCopied
                        ? 'bg-emerald-600 text-white shadow-emerald-200'
                        : 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Skrip</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Preformatted text preview */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 font-sans whitespace-pre-wrap max-h-52 overflow-y-auto leading-relaxed">
                  {item.content}
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
