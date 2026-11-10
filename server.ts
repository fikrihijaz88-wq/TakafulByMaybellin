import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini API client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const DEFAULT_MODEL = 'gemini-3.8-flash';

// Helper function to call Gemini safely
async function callGemini(systemInstruction: string, userPrompt: string): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY belum dikonfigurasikan di persekitaran pelayan.');
  }

  const response = await ai.models.generateContent({
    model: DEFAULT_MODEL,
    contents: userPrompt,
    config: {
      systemInstruction: systemInstruction,
    },
  });

  return response.text ?? 'Tiada respon dijana oleh model.';
}

// 1. Endpoint: Agen Kajian Produk GETB (GETB Product Specialist)
app.post('/api/agent/product-study', async (req: Request, res: Response) => {
  try {
    const { productName, productCategory, targetMarket, specificQuestion } = req.body;

    const systemPrompt = `Anda ialah Ketua Pakar Produk & Aktuari Latihan Kanan di Great Eastern Takaful Berhad (GETB).
Tugas anda ialah mengkaji, menganalisis, dan mempersembahkan maklumat produk Takaful Keluarga GETB dengan tepat, profesional, dan meyakinkan untuk membantu konsultan/ejen membuat promosi berkualiti tinggi.

Gunakan format Bahasa Melayu yang kemas, profesional, berstruktur, menggunakan poin dan bolding yang cantik.
Struktur respon anda mesti merangkumi:
1. 🌟 RUMUSAN EKSEKUTIF PRODUK & USP (Keunikan Utama Berbanding Pasaran)
2. 🛡️ CIRI-CIRI MANFAAT UTAMA & NILAI PERLINDUNGAN
3. 🎯 ANGLE JUALAN TERBAIK (Bagaimana nak 'pitch' kepada prospek agar mereka rasa terdesak nak ambil sekarang)
4. 💡 STRATEGI PENGGABUNGAN RIDER (Cadangan rider tambahan seperti Waiver, Kad Perubatan, atau Kemalangan)
5. 📊 SIMULASI CONTOH KES NYATA (Contoh umur, caruman bulanan anggaran, dan pampasan yang diterima)
6. ⚠️ PERINGATAN KELAYAKAN & PEMATUHAN SYARIAH (Bebas riba/maisir/gharar, proses underwriting asas).`;

    const userPrompt = `Sila kaji dan sediakan analisis komprehensif bagi produk GETB berikut:
Nama Produk: ${productName || 'i-Great Nova (Hibah Takaful) & i-Medi Evolusi / Shield Rider (Kad Hospital)'}
Kategori: ${productCategory || 'Takaful Keluarga & Kesihatan'}
Sasaran Pasaran Fokus: ${targetMarket || 'Ibu bapa muda dan pencari nafkah'}
Fokus / Soalan Khusus: ${specificQuestion || 'Bagaimana nak terangkan kelebihan pelan ini secara santai tetapi padu kepada prospek?'}`;

    const result = await callGemini(systemPrompt, userPrompt);
    res.json({ success: true, analysis: result });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Ralat semasa menjana kajian produk.';
    console.error('Error in /api/agent/product-study:', error);
    res.status(500).json({ success: false, error: message });
  }
});

// 2. Endpoint: Agen Perancang Pasaran Sasaran (Target Market Strategist)
app.post('/api/agent/target-market', async (req: Request, res: Response) => {
  try {
    const { personaTitle, ageRange, incomeLevel, primaryNeed, marketingGoal } = req.body;

    const systemPrompt = `Anda ialah Pengarah Strategi Pemasaran Pengguna & Tingkah Laku Pasaran Takaful Malaysia (Specialist Great Eastern Takaful).
Tugas anda ialah merancang strategi penembusan pasaran (market penetration strategy) yang tepat untuk segmen prospek yang dipilih.

Keluarkan pelan bertindak yang tajam dan praktikal dalam Bahasa Melayu mengandungi:
1. 👤 PROFIL PSIKOGRAFIK & KEADAAN EMOSI (Apa yang mereka fikirkan sebelum tidur mengenai kewangan keluarga)
2. ⚡ 3 'PAIN POINTS' PALING MENYAKITKAN & KETAKUTAN TERPENDAM
3. 💰 SKALA DAYA BELI & KESELAMATAN BAJET (Berapa anggaran caruman ideal yang mereka rasa tak membebankan)
4. 🪝 3 HOOK UTAMA PEMASARAN (Ayat pembuka emosi, ayat fakta mengejutkan, dan analogi kehidupan)
5. 📱 SALURAN MEDIA SOSIAL TERBAIK & WAKTU POSTING IDEAL
6. 🧭 FORMULA TAWARAN YANG SUKAR DITOLAK (Offer stacking yang sesuai untuk segmen ini).`;

    const userPrompt = `Sila buat perancangan strategi target market untuk segmen berikut:
Profil Prospek: ${personaTitle || 'Ibu Bapa Muda Anak Kecil'}
Lingkungan Umur: ${ageRange || '26 - 36 tahun'}
Anggaran Pendapatan: ${incomeLevel || 'RM3,500 - RM7,000 sekeluarga'}
Keperluan Utama: ${primaryNeed || 'Perlindungan Hibah Kasih Sayang & Kad Perubatan Anak'}
Matlamat Kempen: ${marketingGoal || 'Mendapatkan 30 leads berkualiti sebulan melalui media sosial'}`;

    const result = await callGemini(systemPrompt, userPrompt);
    res.json({ success: true, strategy: result });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Ralat semasa merancang target market.';
    console.error('Error in /api/agent/target-market:', error);
    res.status(500).json({ success: false, error: message });
  }
});

// 3. Endpoint: Agen Pencipta Kandungan Media Sosial (Social Content Creator)
app.post('/api/agent/social-content', async (req: Request, res: Response) => {
  try {
    const { platform, contentType, productName, targetAudience, coreTopic, toneStyle } = req.body;

    const systemPrompt = `Anda ialah Copywriter Viral & Pengarah Kreatif Media Sosial Takaful nombor satu di Malaysia untuk Great Eastern Takaful Berhad.
Anda pakar menghasilkan posting Facebook yang tinggi shares, Carousel Instagram yang tinggi simpanan (saves), dan Skrip TikTok/Reels yang mengekalkan penonton hingga ke saat terakhir (high retention).

PANDUAN PENULISAN:
- Gaya Bahasa: Sesuai dengan gaya orang Malaysia (natural, menyentuh jiwa, tidak terlalu robotik).
- Jangan guna 'slop' klise murahan. Gunakan penceritaan emosi, data perubatan sebenar, atau analogi kehidupan harian (cth: susu anak, ansuran kereta, bil hospital swasta vs awam, akaun bank beku).
- Sertakan Call To Action (CTA) padu yang memudahkan prospek terus klik ke WhatsApp.
- Sertakan cadangan hashtag relevan dan visual prompt gambar.`;

    const userPrompt = `Cipta kandungan media sosial siap guna mengikut spesifikasi berikut:
Platform: ${platform || 'Facebook & TikTok'}
Format Kandungan: ${contentType || 'Storytelling Emosi & Skrip Video Pendek'}
Produk GETB: ${productName || 'i-Great Nova (Hibah) & i-Medi Evolusi (Kad Perubatan)'}
Sasaran Penonton: ${targetAudience || 'Suami & Ayah Muda'}
Topik Teras: ${coreTopic || 'Kenapa akaun bank beku bila suami meninggal dan betapa pentingnya Hibah Kasih Sayang segera'}
Nada/Tone: ${toneStyle || 'Menyentuh Emosi & Prihatin (Empati)'}

Sila sediakan:
1. COPYWRITING LENGKAP SIAP UNTUK DISALIN (Termasuk Hook Tajuk, Isi Cerita, CTA, dan Hashtag)
2. CADANGAN GAMBAR / VIDEO (Arahan visual apa yang patut dipaparkan pada poster/video)
3. SKRIP BALASAN PERTAMA DI RUANGAN KOMEN untuk tarik prospek ke DM/WhatsApp.`;

    const result = await callGemini(systemPrompt, userPrompt);
    res.json({ success: true, content: result });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Ralat semasa menjana kandungan.';
    console.error('Error in /api/agent/social-content:', error);
    res.status(500).json({ success: false, error: message });
  }
});

// 4. Endpoint: Agen Mengatasi Bantahan & Skrip Closing (Objection Handler)
app.post('/api/agent/objection-handler', async (req: Request, res: Response) => {
  try {
    const { objectionText, prospectContext, preferredTone } = req.body;

    const systemPrompt = `Anda ialah Jurulatih Jualan & Pakar Psikologi Closing Takaful Elit di Great Eastern Takaful.
Tugas anda ialah menukarkan bantahan prospek (objection) menjadi peluang kesedaran tanpa membuatkan prospek berasa diserang atau tertekan. Anda menggunakan teknik 'Feel, Felt, Found', soalan berbalik (counter-inquiry), dan analogi santai.

Berikan 3 versi skrip jawapan dalam Bahasa Melayu:
1. VERSI WHATSAPP SANTAI & MESRA (Panjang sederhana, emoji comel, terus ada soalan pemudah cara)
2. VERSI ANALOGI LOGIK & REALITI (Membuatkan prospek berfikir secara mendalam tentang risiko)
3. VERSI CLOSING PADU (Pemberian pilihan mudah A atau B untuk terus dapatkan tarikh temu janji/quotation).`;

    const userPrompt = `Bantahan Prospek: "${objectionText || 'Saya dah ada insurans company, rasa tak perlu ambil takaful peribadi lagi.'}"
Konteks Prospek: ${prospectContext || 'Eksekutif swasta berumur 32 tahun, baru ada anak seorang'}
Gaya Nada Diingini: ${preferredTone || 'Sopan, diplomatik, meyakinkan'}`;

    const result = await callGemini(systemPrompt, userPrompt);
    res.json({ success: true, solutions: result });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Ralat semasa menjana skrip closing.';
    console.error('Error in /api/agent/objection-handler:', error);
    res.status(500).json({ success: false, error: message });
  }
});

// 5. Endpoint: Agen Pengarah Kempen & Prompt Gambar Visual (Creative Director)
app.post('/api/agent/campaign-creative', async (req: Request, res: Response) => {
  try {
    const { campaignTheme, targetProduct, mediumType } = req.body;

    const systemPrompt = `Anda ialah Pengarah Seni & Kreatif Pemasaran Digital bagi kempen Great Eastern Takaful Berhad.
Tugas anda ialah mereka konsep visual iklan, teks poster (headline & sub-headline), serta PROMPT BAHASA INGGERIS terperinci untuk penjana imej AI (seperti Midjourney / Imagen / Gemini) yang menggambarkan keharmonian keluarga Malaysia, profesionalisme, atau perlindungan takaful syariah yang estetik tanpa kelihatan murahan.

Sertakan:
1. 🎨 KONSEP TEMA & EMOSI POSTER (Palet warna GETB Crimson Red, Warm Gold, Soft Slate, dan Pure White)
2. ✍️ HEADLINE & COPY PADA GAMBAR (Teks ringkas 4-8 patah perkataan yang senang dibaca di telefon)
3. 🖼️ PROMPT PENUH BAHASA INGGERIS UNTUK PENJANA IMEJ AI (High resolution, photorealistic, cinematic lighting, authentic Malaysian family, no distorted text)
4. 💡 TIPS SUSUN ATUR GRAFIK (Di mana nak letak logo GETB, no WhatsApp, dan badge Syariah).`;

    const userPrompt = `Sila reka konsep kreatif visual untuk kempen berikut:
Tema Kempen: ${campaignTheme || 'Kempen Kasih Sayang Hibah GETB: Legasi Tak Beku'}
Produk Sasaran: ${targetProduct || 'i-Great Mega (Hibah Takaful)'}
Saluran / Format: ${mediumType || 'Iklan Facebook Feeds & Instagram Square Poster (1:1)'}`;

    const result = await callGemini(systemPrompt, userPrompt);
    res.json({ success: true, creative: result });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Ralat semasa menjana konsep kreatif.';
    console.error('Error in /api/agent/campaign-creative:', error);
    res.status(500).json({ success: false, error: message });
  }
});

// 6. Endpoint: Konsultasi Interaktif Ejen AI (Agency Coach Chat)
app.post('/api/agent/coach-chat', async (req: Request, res: Response) => {
  try {
    const { messages, userRole } = req.body;

    const systemPrompt = `Anda ialah 'GETB AI Agency Director' — pembantu pintar dan jurulatih peribadi untuk konsultan dan ejen Great Eastern Takaful Berhad (GETB).
Anda menguasai sepenuhnya:
1. Seluruh rangkaian produk Takaful Keluarga rasmi GETB (i-Great Nova, i-Medi Evolusi / Shield Rider, i-Great Evo, i-Great Chinta, i-Great GENerasi, i-Great Yaqeen 61 CI, i-Great Majestik, i-Great Mega Plus, i-Great Idaman, i-Great Murni 2.0, i-Great Critical Care, i-Great Harapan, dll).
2. Peraturan dan undang-undang Syariah Takaful di Malaysia (Akad Tabarru', Wakalah, Hibah bersyarat vs mutlak, Akta Perkhidmatan Kewangan Islam 2013).
3. Strategi pemasaran digital (Meta Ads, TikTok Organic, WhatsApp Funnel, Booth & Cold Calling).
4. Pengiraan anggaran pampasan dan caruman mengikut umur, pekerjaan dan tabiat merokok.

Jawablah dengan nada penuh semangat, mesra, membina motivasi, dan memberikan langkah tindakan (actionable steps) yang boleh terus digunakan hari ini. Gunakan Bahasa Melayu yang profesional dan menarik.`;

    // Format chat history
    let promptText = '';
    if (Array.isArray(messages)) {
      promptText = messages.map((m: { role: string; content: string }) => `${m.role === 'user' ? 'Konsultan' : 'GETB Coach'}: ${m.content}`).join('\n\n');
    } else {
      promptText = String(messages);
    }

    const result = await callGemini(systemPrompt, promptText);
    res.json({ success: true, reply: result });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Ralat semasa konsultasi ejen AI.';
    console.error('Error in /api/agent/coach-chat:', error);
    res.status(500).json({ success: false, error: message });
  }
});

// Start server with Vite middleware in development or static in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`GETB Takaful Promotion & AI Agent Suite Server running at http://0.0.0.0:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer().catch((err) => {
    console.error('Failed to start server:', err);
  });
}

export default app;
