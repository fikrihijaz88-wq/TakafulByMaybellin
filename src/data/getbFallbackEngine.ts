import { GETB_PRODUCTS, GETBProduct } from './getbProducts';
import { TARGET_PERSONAS } from './targetPersonas';

/**
 * Intelligent Fallback Engine for GETB Takaful Promotion Suite
 * Guarantees zero-downtime and high-fidelity output even if Google Gemini API experiences temporary 503/429 spikes.
 */

export function generateFallbackProductStudy(
  productName?: string,
  productCategory?: string,
  targetMarket?: string,
  specificQuestion?: string
): string {
  const query = (productName || '').toLowerCase();
  const matched = GETB_PRODUCTS.find(
    (p) =>
      p.name.toLowerCase().includes(query) ||
      p.codeName.toLowerCase().includes(query) ||
      query.includes(p.codeName.toLowerCase())
  ) || GETB_PRODUCTS[0]; // Default to i-Great Nova

  return `🌟 KAJIAN LENGKAP & STRATEGI PRODUK: ${matched.name.toUpperCase()}
Status: ${matched.officialStatus} | Kategori: ${matched.categoryLabel}
Sasaran Pasaran Fokus: ${targetMarket || matched.sampleTargetAudience}
${specificQuestion ? `Fokus Soalan: "${specificQuestion}"` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. 🌟 RUMUSAN EKSEKUTIF & KEUNIKAN UTAMA (USP)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Tagline: "${matched.tagline}"
• Ringkasan Produk: ${matched.description}
• Keunikan Pasaran (USP): ${matched.usp}
• Kelayakan Umur Penyertaan: ${matched.entryAge}
• Tempoh Matang / Perlindungan: ${matched.coverageTerm}
• Anggaran Caruman Minimum: ${matched.minContribution}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. 🛡️ 5 CIRI-CIRI MANFAAT PERLINDUNGAN UTAMA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${matched.keyBenefits.map((b, idx) => `${idx + 1}. ${b}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. 🎯 ANGLE JUALAN & STRATEGI 'PITCH' PROSPEK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Hook Sentuhan Realiti: "Bila ketua keluarga tiada, akaun bank serta-merta dibekukan untuk proses pusaka. Pelan ${matched.codeName} ini menyalurkan wang pampasan tunai terus ke tangan waris tanpa perlu menunggu perintah mahkamah."
• Segmen Paling Memerlukan:
${matched.suitableFor.map((s) => `  ✓ ${s}`).join('\n')}
• Cadangan Waktu 'Closing': Selepas membentangkan simulasi bajet bulanan yang bersamaan dengan nilai secawan kopi harian.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. 💡 STRATEGI PENGGABUNGAN RIDER DISYORKAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${matched.popularRiders.map((r, idx) => `• Rider ${idx + 1} (${r}): Menambah kelengkapan perlindungan agar pelan tidak terbatal sekiranya berlaku hilang upaya atau sakit kritikal.`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. 📊 SIMULASI CONTOH KES NYATA (ILUSTRASI RINGKAS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Profil: Lelaki, 32 tahun, tidak merokok, bekerja di pejabat.
• Pelan: ${matched.codeName}
• Anggaran Caruman: Sekitar RM90 - RM140 / bulan (anggaran asas).
• Nilai Perlindungan Tunai (Sum Covered): RM300,000 Hibah Kasih Sayang.
• Manfaat Tambahan: Termasuk pelepasan cukai pendapatan LHDN sehingga RM3,000/tahun di bawah insurans nyawa & takaful keluarga.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. ⚠️ PEMATUHAN SYARIAH & PENGUNDERAITAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• ${matched.shariahHighlight}
• Bebas daripada unsur Riba, Maisir (judi), dan Gharar (ketidakpastian).
• Dilindungi oleh PIDM melalui Skim Perlindungan Manfaat Takaful dan Insurans (TIPS) sehingga RM500,000 bagi manfaat layak.
• Proses deklarasi kesihatan telus (Full Disclosure) memastikan tuntutan waris kelak lancar dan dipermudahkan.`;
}

export function generateFallbackTargetMarket(
  personaTitle?: string,
  ageRange?: string,
  incomeLevel?: string,
  primaryNeed?: string,
  marketingGoal?: string
): string {
  const matched = TARGET_PERSONAS.find(
    (p) =>
      p.title.toLowerCase().includes((personaTitle || '').toLowerCase()) ||
      p.id.toLowerCase().includes((personaTitle || '').toLowerCase())
  ) || TARGET_PERSONAS[0];

  return `🧭 PELAN STRATEGI PENEMBUSAN PASARAN: ${matched.title.toUpperCase()}
Sub-segmen: ${matched.subtitle}
Lingkungan Umur: ${ageRange || matched.ageGroup} | Pendapatan: ${incomeLevel || matched.incomeLevel}
Matlamat Kempen: ${marketingGoal || 'Menjana 30 leads berkualiti sebulan'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. 👤 PROFIL PSIKOGRAFIK & EMOSI MEREKA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Mindset Utama: Sentiasa risau tentang keselamatan masa depan anak-anak dan bebanan komitmen hutang yang tinggi (rumah, kereta, kad kredit).
• Keutamaan Kewangan: Mereka mahu perlindungan yang bernilai tinggi tetapi pada caruman yang tidak mengganggu aliran tunai harian (${matched.budgetPreference}).
• Pelan GETB Disyorkan: ${matched.recommendedPlans.join(', ')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. ⚡ 3 'PAIN POINTS' PALING MENYAKITKAN & KETAKUTAN TERPENDAM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${matched.topPainPoints.map((p: string, idx: number) => `• Pain Point ${idx + 1}: ${p}`).join('\n')}
${matched.hiddenFears.map((f: string, idx: number) => `• Ketakutan Terpendam ${idx + 1}: ${f}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. 🪝 3 HOOK UTAMA PEMASARAN (VIRAL HOOKS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Hook Emosi Utama: "${matched.marketingAngles.hook}"
• Picuan Emosi (Emotional Trigger): "${matched.marketingAngles.trigger}"
• Tindakan Segera (Call To Action): "${matched.marketingAngles.callToAction}"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. 📱 SALURAN MEDIA SOSIAL & WAKTU POSTING IDEAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Platform Utama: Facebook (Storytelling & Post Panjang) & TikTok (Video Emosi Realiti Ringkas 30-45s).
• Waktu Posting Terbaik:
  - Pagi (7:30 AM - 8:45 AM): Semasa mereka dalam perjalanan / rehat kopi pertama.
  - Malam (9:00 PM - 10:30 PM): Waktu anak-anak sudah tidur dan mereka meluangkan masa membaca media sosial di katil.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. 🧭 FORMULA TAWARAN YANG SUKAR DITOLAK (IRRESISTIBLE OFFER)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Formula: "Semakan Polisi Percuma + Quotation Peribadi 30 Saat".
• Contoh Mesej Penutup: "Jangan tunggu sehingga kesihatan menurun baru nak mohon. Buat kiraan caruman patuh Syariah hari ini untuk jaminan masa depan mereka."`;
}

export function generateFallbackSocialContent(
  platform?: string,
  contentType?: string,
  productName?: string,
  targetAudience?: string,
  coreTopic?: string,
  toneStyle?: string
): string {
  const chosenProd = productName || 'i-Great Nova (Hibah GETB)';
  const topic = coreTopic || 'Kepentingan Hibah Takaful bila berlaku musibah kepada pencari nafkah';

  return `📱 KANDUNGAN MEDIA SOSIAL SIAP GUNA (VIRAL COPY)
Platform: ${platform || 'Facebook & TikTok'} | Format: ${contentType || 'Storytelling Emosi'}
Produk: ${chosenProd} | Sasaran: ${targetAudience || 'Ayah & Ibu Muda'}
Nada: ${toneStyle || 'Menyentuh Emosi & Prihatin'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. ✍️ COPYWRITING LENGKAP (TINGGAL SALIN & TAMPAL)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"Abang jangan risau, kalau ada apa-apa pada abang, duit dalam bank banyak kan?"

Ramai isteri sangka, bila suami meninggal dunia esok lusa, duit dalam akaun bank suami boleh terus cucuk keluar kat ATM untuk beli susu anak dan bayar rumah.

Kenyataan sebenar?
Sebaik sahaja sijil kematian dikeluarkan, SEMUA akaun bank, akaun simpanan, dan aset atas nama arwah akan DIBEKUKAN secara automatik untuk proses tuntutan pusaka dan faraid.

Ia boleh makan masa berbulan-bulan, malah ada yang bertahun-tahun.

Dalam tempoh tu, siapa nak bayar:
❌ Ansuran rumah RM1,500/bulan?
❌ Belanja dapur & susu pampers anak?
❌ Bil api, air, dan ansuran kereta?

Sebab itulah di Great Eastern Takaful, kami wujudkan pelan *${chosenProd}*.

✅ Duit pampasan HIBAH disalurkan TERUS ke akaun isteri dalam masa beberapa hari.
✅ 100% Hak Mutlak isteri tanpa melalui pembekuan mahkamah atau perebutan waris.
✅ Perlindungan tunai bernilai RM250,000 hingga RM500,000 ke atas dengan caruman bulanan mampu milik.

Jangan tunggu esok, kerana ajal tidak pernah bagi 'reminder'.

👇 Nak tahu anggaran caruman bulanan mengikut umur anda?
Klik link WhatsApp di bawah untuk semakan sebut harga percuma dalam 30 saat:
[Link WhatsApp Anda]

#GreatEasternTakaful #TakafulByMaybellin #HibahTakaful #iGreatNova #PerlindunganKeluarga #GPlusManagement #CelakalahHutangSelamatkanKeluarga

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. 🖼️ ARAHAN VISUAL GAMBAR / VIDEO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Visual Poster: Gambar hangat seorang bapa sedang memeluk anak kecilnya di ruang tamu rumah, dengan pencahayaan lembut (cinematic golden hour).
• Teks Pada Gambar: "Akaun Bank Boleh Beku, Tapi Kasih Sayang Ayah Tak Pernah Beku. Sediakan Dana Hibah Hari Ini."
• Logo: Logo Great Eastern Takaful & Badge '100% Patuh Syariah' di sudut atas kanan.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. 💬 SKRIP BALASAN DI RUANGAN KOMEN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"Terima kasih atas perkongsian! Untuk tuan/puan yang nak buat semakan percuma berapa anggaran caruman bulanan bagi umur anda, boleh terus klik pautan WhatsApp di atas atau DM saya 'HIBAH'. Saya akan bantu kirakan sebut harga rasmi GETB dengan pantas ya 😊"`;
}

export function generateFallbackObjectionHandler(
  objectionText?: string,
  prospectContext?: string,
  preferredTone?: string
): string {
  const objection = objectionText || 'Saya dah ada kad perubatan company, tak perlu takaful peribadi.';

  return `🛡️ SKRIP PENGENDALIAN BANTAHAN (OBJECTION HANDLING)
Bantahan Prospek: "${objection}"
Konteks: ${prospectContext || 'Eksekutif berumur 30-an dengan anak kecil'}
Gaya Nada: ${preferredTone || 'Diplomatik, Berempati, & Meyakinkan'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. VERSI WHATSAPP MESRA & SANTAI (FEEL, FELT, FOUND)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"Alhamdulillah bagus sangat tu Tuan! Memang beruntung company sediakan kad perubatan. Ramai juga klien saya yang pada asalnya fikir macam tu dulu 😊

Tapi kebanyakan mereka akhirnya sedar 1 perkara penting: Medical card company hanya aktif selagi kita sihat dan masih bekerja di situ. Kalau tiba-tiba ditakdirkan diuji sakit kritikal dan tak mampu kerja, biasanya company terpaksa gantikan tempat kita, dan perlindungan tu akan automatik tamat masa kita paling memerlukannya.

Masa tu, nak apply kad baru sendiri dah tak boleh sebab dah ada 'pre-existing illness'.

Sebab tu seeloknya kita backup awal-awal dengan pelan peribadi serendah RM60-RM100/bulan masa tengah sihat ni. Boleh saya kongsikan cadangan ringkas untuk Tuan tengok dulu?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. VERSI ANALOGI LOGIK & REALITI HIDUP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"Analogi mudahnya Tuan, kad perubatan syarikat ibarat payung yang dipinjamkan oleh pejabat. Bila cuaca panas elok, kita rasa selamat bawa payung tu. 

Tapi bila tiba hari ribut kencang (sakit berat / hilang upaya), majikan minta semula payung tu sebab kita dah tak bertugas lagi. 

Takaful peribadi Great Eastern Takaful adalah payung hak milik kekal Tuan sendiri. Tak kira berpindah kerja, pencen, atau diberhentikan, payung ni tetap melindungi Tuan dan keluarga sehingga umur 80-100 tahun."

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. VERSI CLOSING PADU (PILIHAN DUA JALAN)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"Tuan ada dua pilihan hari ini:

Pilihan A: Bergantung 100% pada polisi majikan, dengan risiko hilang perlindungan jika bertukar kerja atau jatuh sakit.
Pilihan B: Simpan sedikit tabungan perlindungan peribadi GETB dari sekarang untuk kunci kelayakan kesihatan Tuan seumur hidup.

Boleh saya sediakan sebut harga ilustrasi untuk Pilihan B supaya Tuan boleh buat perbandingan bajet yang sesuai?"`;
}

export function generateFallbackCampaignCreative(
  campaignTheme?: string,
  targetProduct?: string,
  mediumType?: string
): string {
  const theme = campaignTheme || 'Kempen Kasih Sayang Hibah GETB: Legasi Tak Beku';
  const prod = targetProduct || 'i-Great Nova';

  return `🎨 PELAN KONSEP KREATIF & ARAHAN VISUAL
Tema: ${theme}
Produk: ${prod} | Format: ${mediumType || 'Iklan Facebook & Poster Instagram (1:1)'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. 🎨 PALET WARNA & NADA VISUAL (GETB BRANDING)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Warna Utama: GETB Crimson Red (#B91C1C / #991B1B) - melambangkan keberanian, perlindungan kukuh, dan kasih sayang.
• Warna Aksen: Warm Amber Gold (#F59E0B) - melambangkan kemakmuran, legasi, dan nilai pelaburan masa depan.
• Warna Latar: Soft Slate Grey & Warm Alabaster White (#F8FAFC) - memberikan kesan kemas, korporat moden dan profesional.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. ✍️ HEADLINE & COPY PADA POSTER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Headline Besar: "Sayang Anak Isteri? Jangan Tinggalkan Mereka Dengan Hutang."
• Sub-Headline: "Pelan ${prod} menyediakan dana tunai segera sehingga RM500,000 terus kepada waris tersayang."
• Call To Action: "Semak Caruman Bulanan Anda | Hubungi Maybellin Yow: 016-6638526"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. 🖼️ PROMPT PENUH BAHASA INGGERIS (UNTUK PENJANA IMEJ AI)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Prompt: "A heartwarming, high-resolution cinematic photograph of a modern Malay young family in a bright, modern living room. A loving father in his early 30s holding his smiling 4-year-old daughter, with his supportive wife standing beside him smiling warmly. Warm morning sunlight streaming through sheer curtains, soft golden hour glow, authentic emotional connection, natural skin tones, elegant contemporary interior decor, 8k resolution, photorealistic, cinematic lighting, shot on 85mm lens f/1.8 --ar 1:1 --no cartoon, no distorted hands, no unrealistic text"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. 💡 TIPS SUSUN ATUR GRAFIK (LAYOUT)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Sudut Kanan Atas: Logo Great Eastern Takaful Berhad & Badge '100% Patuh Syariah'.
• Bahagian Bawah: Bar warna merah tua GETB dengan nama 'Yow Chee Suan @ Maybellin Yow (Kod Ejen: 1147271)', Agensi GPlus Management, dan ikon WhatsApp hijau yang jelas.`;
}

export function generateFallbackCoachChat(
  messages: Array<{ role: string; content: string }> | string,
  userRole?: string
): string {
  const lastQuery = Array.isArray(messages)
    ? messages[messages.length - 1]?.content || ''
    : String(messages);

  const queryLower = lastQuery.toLowerCase();

  if (queryLower.includes('medical') || queryLower.includes('i-medi') || queryLower.includes('hospital')) {
    return `Mengenai perlindungan perubatan GETB (*i-Medi Evolusi / Shield Rider*), pelan ini sangat kuat di pasaran kerana tiada had seumur hidup (No Lifetime Limit), had tahunan yang tinggi sehingga RM1.5 juta ke atas, dan kemudahan kemasukan hospital tanpa tunai (Cashless Hospital Admission) melalui e-Medical Card.

💡 **Tips Pitching Kepada Prospek:**
Tekankan inflasi perubatan swasta di Malaysia yang kini mencecah 12-15% setahun. Tunjukkan bahawa bil pembedahan apendiks atau rawatan kecemasan boleh mencecah puluhan ribu ringgit.

Ada sebarang situasi klien tertentu yang anda sedang uruskan untuk pelan ini?`;
  }

  if (queryLower.includes('hibah') || queryLower.includes('nova') || queryLower.includes('faraid')) {
    return `Untuk promosi Hibah (*i-Great Nova / i-Great Evo*), fokus utama adalah konsep **"Kelangsungan Hidup Tanpa Beku"**. 

Ramai prospek keliru antara Hibah dan Faraid. Jelaskan dengan santai:
1. **Faraid** melibatkan pembahagian selepas semua hutang diselesaikan dan aset dibekukan.
2. **Hibah Takaful** adalah hadiah mutlak semasa hidup yang diserahkan terus kepada penama secara tunai tanpa perlu melalui mahkamah atau pembahagian faraid.

Anda boleh gunakan skrip ini di WhatsApp status atau perbualan telefon. Nak saya kirakan contoh caruman untuk umur prospek anda?`;
  }

  return `Bagus soalan anda! Sebagai konsultan di agensi GPlus Management, kunci utama kejayaan promosi adalah konsistensi penceritaan masalah sebenar prospek dan bukan sekadar menjual nombor pelan semata-mata.

Strategi disyorkan:
1. **Kenal pasti Pain Point:** Tanya soalan yang membuka fikiran, contohnya: *"Sekiranya esok gaji terhenti sebab masalah kesihatan, berapa bulan simpanan semasa mampu bertahan?"*
2. **Cadangkan Pelan Yang Realistik:** Mulakan dengan bajet yang mereka selesa (10% daripada pendapatan bulanan).
3. **Sentiasa Follow-up:** Gunakan tab 'Kalendar & Reminder' di sebelah untuk jadualkan peringatan WhatsApp 24 jam sebelum temujanji.

Ada perkara khusus lain yang anda mahu saya sediakan?`;
}
