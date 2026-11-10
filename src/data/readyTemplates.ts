export interface SocialTemplate {
  id: string;
  category: 'facebook' | 'instagram' | 'tiktok' | 'whatsapp' | 'objection';
  title: string;
  description: string;
  content: string;
  tags: string[];
  hookStrength: string;
}

export const READY_TEMPLATES: SocialTemplate[] = [
  {
    id: 'fb-hibah-story',
    category: 'facebook',
    title: 'Storytelling Viral: Realiti Akaun Bank Beku & Hibah GETB',
    description: 'Post emosi gaya penceritaan kisah benar yang menyentuh hati ketua keluarga tentang apa berlaku kepada isteri selepas kematian suami.',
    content: `Kisah benar seorang balu umur 29 tahun...

"Bang, saya nak beli pampers anak petang ni tapi kad bank abang kena tolak (declined)."

Baru 12 hari suami tercinta dijemput Ilahi akibat serangan jantung mengejut. Ramai tak tahu, sebaik sijil kematian didaftarkan di JPN:
❌ Semua akaun bank arwah dibekukan serta-merta.
❌ Duit simpanan arwah tak boleh dikeluarkan walau seringgit untuk beli susu anak.
❌ Kereta dan rumah atas nama arwah masuk proses tuntutan pusaka & mahkamah faraid yang boleh makan masa 6 bulan hingga 2 tahun.

Tapi tahukah anda, apa satu-satunya wang yang TIDAK AKAN DIBEKUKAN?

WANG HIBAH TAKAFUL KELUARGA. 🛡️

Dalam polisi Hibah Great Eastern Takaful (i-Great Nova):
✅ Wang pampasan tunai diserahkan terus ke tangan isteri tanpa perlu bicara faraid.
✅ Tiada perebutan waris kerana ia adalah HIBAH MUTLAK (hadiah kasih sayang).
✅ Cek tunai atau pindahan bank terus kepada penama dalam tempoh seawal 14 hari!

Abang-abang yang bergelar suami dan ayah... Sayang isteri bukan sekadar belikan rantai emas atau bawa makan sedap. Kasih sayang sebenar adalah pastikan anak isteri tidak merempat dan meminta-minta simpati jika kita tiada esok hari.

Sediakan sekurang-kurangnya RM250,000 - RM500,000 Dana Hibah Kasih Sayang Great Eastern Takaful.
Caruman serendah RM3 sehari sahaja (kurang daripada harga secawan kopi).

Komen 'HIBAH' atau klik link WhatsApp di bawah untuk saya buatkan sebut harga percuma mengikut bajet anda. 👇
[Link WhatsApp Anda]

#GreatEasternTakaful #GETB #HibahTakaful #TakafulKeluarga #KasihSayang #PerancanganHarta`,
    tags: ['Facebook', 'Storytelling', 'Hibah', 'Viral'],
    hookStrength: 'Sangat Tinggi (Emosi Kekeluargaan)'
  },
  {
    id: 'fb-medical-card-bill',
    category: 'facebook',
    title: 'Post Perbandingan Fakta: Inflasi Bil Hospital Swasta',
    description: 'Post berbentuk edukasi realistik kos pembedahan hospital swasta di Malaysia.',
    content: `Kaji selidik kos rawatan hospital swasta di Malaysia tahun ini:

💉 Pembedahan Apendiks: RM14,000 - RM22,000
🫀 Pembedahan Bypass Jantung: RM65,000 - RM120,000
🦴 Patah Kaki & Masuk Besi: RM25,000 - RM40,000
🦠 Rawatan Denggi / Influenza (4 hari wad): RM4,500 - RM8,000

Persoalannya:
Kalau malam ni anak kita demam panas 40°C sawan, atau kita sendiri mengadu sakit dada...
Adakah kita sanggup tunggu 10 jam di zon kecemasan hospital awam yang sesak?
Atau kita ada tunai RM30,000 dalam bank untuk deposit hospital swasta tanpa kad medikal?

Dengan Kad Perubatan i-Medi Evolusi / Shield Rider dari Great Eastern Takaful:
⭐ Had tahunan sehingga RM2.5 JUTA (Tiada had seumur hidup).
⭐ Kemasukan pantas tanpa tunai (Cashless Guarantee Letter terus diluluskan).
⭐ Bilik wad selesa dan jururawat prihatin menjaga anda & keluarga.
⭐ Rawatan kanser dan dialisis buah pinggang pesakit luar ditanggung penuh.

Jangan tunggu sakit baru nak cari Takaful, sebab waktu itu borang permohonan akan ditolak. Ambil waktu sihat, guna waktu gawat.

Klik link di bio untuk dapatkan quotation percuma sekarang! 🏥

#GreatEasternTakaful #KadPerubatan #MedicalCard #HospitalSwasta #GETB`,
    tags: ['Facebook', 'Fakta', 'Medical Card', 'Kesihatan'],
    hookStrength: 'Tinggi (Ketakutan Kos & Kesedaran)'
  },
  {
    id: 'ig-carousel-slides',
    category: 'instagram',
    title: 'Instagram Carousel 5 Slide: 5 Kesilapan Urus Harta Lepas Kematian',
    description: 'Format carousel edukasi tinggi save & share dengan visual teks minimalis.',
    content: `[SLIDE 1 - HOOK COVER]
"Ramai Ingat Isteri Boleh Terus Ambil Duit Suami Lepas Meninggal. Sebenarnya... 5 Mitos Pusaka Ini Boleh Jerat Keluarga Anda!"
(Swipe ke kiri ➡️)

[SLIDE 2 - SLIDE DUA]
Mitos 1: "Akaun bank bersama (joint account) auto jadi milik isteri."
FAKTA: Bank akan beku 50% bahagian simpanan arwah serta merta sebaik terima notis kematian. Isteri tak boleh sentuh selagi tiada surat kuasa mahkamah.

[SLIDE 3 - SLIDE TIGA]
Mitos 2: "Faraid selesaikan semua masalah serta-merta."
FAKTA: Faraid adalah hukum pembahagian yang adil, TETAPI proses dokumentasi, carian waris, dan perbicaraan pejabat tanah mengambil masa berbulan-bulan hingga bertahun. Sementara tunggu faraid selesai, siapa nak bagi nafkah dapur isteri?

[SLIDE 4 - SLIDE EMPAT]
Mitos 3: "Kereta dan rumah arwah isteri boleh terus pakai."
FAKTA: Waris lain (adik-beradik arwah suami jika tiada anak lelaki) mempunyai hak ke atas harta pusaka tersebut. Jika timbul salah faham, rumah boleh dipaksa jual.

[SLIDE 5 - SLIDE CALL TO ACTION]
Solusi Terbaik: HIBAH TAKAFUL GETB (i-Great Nova)
Duit pampasan 100% hak mutlak isteri/anak.
Tak perlu masuk mahkamah.
Tak beku. Cair dalam beberapa minggu!

👉 Save post ini untuk rujukan anda dan share kepada pasangan anda sekarang.
DM saya "HIBAH" untuk semak pelan keluarga anda.

#TakafulMalaysia #HibahGETB #KeluargaBahagia #PerancanganKewangan #InstagramTips`,
    tags: ['Instagram', 'Carousel', 'Edukasi', 'Pusaka'],
    hookStrength: 'Sangat Tinggi (Save & Share Magnet)'
  },
  {
    id: 'tiktok-reels-script',
    category: 'tiktok',
    title: 'TikTok / Reels Script (45 Saat): "Dah Ada Kad Company, Perlu Ke Takaful Sendiri?"',
    description: 'Skrip video pendek dengan hook visual 3 saat pertama yang memecahkan mitos popular.',
    content: `[0:00 - 0:03] HOOK VISUAL & SUARA:
(Kamera zoom in muka dengan mimik terkejut, pegang lanyard ID kerja)
"Tolong jangan buat silap ni kalau tak nak menyesal macam kawan saya!"

[0:04 - 0:15] PERMASALAHAN:
"Ramai sangat orang kata: 'Bro, syarikat aku cover medical card RM50,000 sekelip mata, buat apa aku nak membazir bayar takaful peribadi?'

Dengar sini baik-baik..."

[0:16 - 0:30] PLOT TWIST:
"Kalau esok doktor sahkan anda kena kanser atau buah pinggang rosak...
Berapa lama syarikat anda boleh tahan bayar gaji anda tanpa datang kerja? 3 bulan? 6 bulan?
Bila syarikat tamatkan perkhidmatan anda (terminate)...
Kad perubatan syarikat anda juga akan tamat serta merta!

Dan masa anda tengah sakit kanser tu... ada ke syarikat takaful lain nak terima permohonan anda?
JAWAPANNYA: 100% REJECT!"

[0:31 - 0:45] SOLUSI & CTA:
"Sebab tu anda perlukan Kad Perubatan Peribadi Great Eastern Takaful sebagai perisai kekal anda. Ada kerja atau tak ada kerja, anda tetap dilindungi.

Komen umur anda di bawah, biar saya tolong semak caruman paling jimat untuk anda hari ini!"

[Teks Atas Skrin]: Kad Kompeni vs Kad Peribadi. Jangan tunggu diberhentikan!`,
    tags: ['TikTok', 'Reels', 'Video Script', 'Objection Breaker'],
    hookStrength: 'Viral High-Retention'
  },
  {
    id: 'objection-company-card',
    category: 'objection',
    title: 'Bantahan: "Saya Dah Ada Insurans / Medical Card Majikan"',
    description: 'Skrip respon WhatsApp & bersemuka yang diplomatis, logik dan tidak menyerang prospek.',
    content: `Respon WhatsApp Mesra & Profesional:

"Alhamdulillah Tuan [Nama], tahniah sebab bertuah bekerja dengan majikan yang prihatin sediakan faedah perubatan. Itu satu kelebihan besar! 👏

Cuma ada satu perkara penting yang ramai orang terlupa nak perhatikan:

1. Kad majikan adalah milik syarikat, bukan hak peribadi kita. Kalau kita berhenti kerja, bertukar syarikat, bersara, atau dipendekkan perkhidmatan sebab sakit berpanjangan... faedah itu serta-merta terbatal.
2. Ketika umur 55-60 tahun bila bersara nanti, risiko sakit kritikal paling tinggi. Tapi waktu itu kita dah tiada perlindungan majikan, dan jika nak mohon takaful baru waktu berumur, caruman jadi sangat mahal atau mungkin ditolak terus sebab ada rekod darah tinggi/kolesterol.
3. Great Eastern Takaful ada pelan fleksibel khas (Deductible Plan) yang boleh digandingkan dengan kad majikan Tuan. Majikan bayar kos awal, dan kad GETB bertindak sebagai perlindungan lebihan (Booster jutaan ringgit) dengan caruman serendah RM60-RM70 saja sebulan.

Bila ada kad sendiri, Tuan ada jaminan perlindungan seumur hidup sehingga umur 80-100 tahun walau apa pun status pekerjaan Tuan nanti.

Boleh saya kongsikan cadangan pelan gandingan bijak ini untuk Tuan teliti santai-santai?"`,
    tags: ['Objection', 'WhatsApp', 'Majikan', 'Closing'],
    hookStrength: 'Sopan & Meyakinkan'
  },
  {
    id: 'objection-no-budget',
    category: 'objection',
    title: 'Bantahan: "Bajet Tengah Ketat / Tengok Dulu La Nanti"',
    description: 'Skrip menangani alasan bajet dengan mengalihkan fokus kepada perbandingan kos musibah.',
    content: `Respon Santai & Empati:

"Saya faham sangat keadaan sekarang Tuan [Nama], kos sara hidup memang mencabar dan kita kena berjimat-cermat dalam setiap perbelanjaan harian. 🤝

Tetapi izinkan saya berkongsi satu analogi mudah:
Jika hari ini kita rasa bajet bulanan kita ketat untuk ketepikan RM3 atau RM4 sehari bagi perlindungan Takaful...
Bayangkan betapa jauh lebih 'ketat' dan tertekannya kewangan keluarga kita jika tiba-tiba doktor minta RM30,000 tunai untuk bayar deposit hospital esok?

Takaful ini bukan untuk orang yang banyak duit berlebih-lebihan.
Sebenarnya orang yang bajet ketatlah yang PALING PERLUKAN Takaful, sebab kita tiada simpanan tunai ratusan ribu jika berlaku musibah mengejut.

Di Great Eastern Takaful, kita ada pelan asas serendah RM45 - RM70 sebulan (serendah harga sebungkus nasi lemak sehari). Kita mulakan dengan apa yang termampu dulu untuk lindungi anak isteri.

Boleh saya tahu anggaran bajet bulanan yang Tuan rasa selesa tanpa ganggu belanja dapur? Biar saya rekakan pelan yang muat-muat bajet Tuan."`,
    tags: ['Objection', 'Bajet', 'Empati', 'Follow-up'],
    hookStrength: 'Empatik & Realistik'
  },
  {
    id: 'whatsapp-closing-formula',
    category: 'whatsapp',
    title: 'Formula Follow-Up WhatsApp 3 Hari Lepas Beri Quotation',
    description: 'Mesej susulan lembut yang tidak memaksa (non-pushy) tetapi mencipta kesedaran bertindak.',
    content: `Assalamualaikum & Selamat Pagi Tuan [Nama],

Harap Tuan sekeluarga sihat ceria hendaknya hari ini. 😊

Saya nak susulan (follow-up) ringkas mengenai proposal cadangan Pelan Takaful GETB yang saya hantarkan tempoh hari. Ada mana-mana bahagian manfaat atau pampasan yang Tuan nak saya jelaskan lebih terperinci?

Tiada paksaan sama sekali Tuan, matlamat saya adalah untuk pastikan Tuan dapat maklumat yang jelas dan tepat. 

Sebagai info ringkas, permohonan sekarang sangat pantas dan boleh dibuat 100% secara dalam talian (online signature) tanpa perlu borang kertas tebal.

Jika Tuan ada kelapangan 5 minit petang nanti, saya boleh hubungi Tuan untuk jawab apa-apa soalan. Atau jika Tuan rasa nak saya ubah suai bajet/pampasan mengikut keselesaan Tuan, beritahu saja ya Tuan! 👍`,
    tags: ['WhatsApp', 'Follow-up', 'Soft Closing', 'Mesra'],
    hookStrength: 'Hubungan Mesra'
  }
];
