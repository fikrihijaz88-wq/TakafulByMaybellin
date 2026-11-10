export interface GETBProduct {
  id: string;
  name: string;
  codeName: string;
  category: 'hibah' | 'medical' | 'savings' | 'ci' | 'accident' | 'education' | 'family';
  categoryLabel: string;
  tagline: string;
  description: string;
  entryAge: string;
  coverageTerm: string;
  minContribution: string;
  keyBenefits: string[];
  suitableFor: string[];
  usp: string; // Unique Selling Proposition
  shariahHighlight: string;
  sampleTargetAudience: string;
  popularRiders: string[];
  brochurePoints: string[];
  color: string;
  badge?: string;
  officialStatus: 'Produk Rasmi Flagship' | 'Pelan Atas Talian' | 'Rider Perubatan' | 'Pelan Warisan';
}

export const GETB_PRODUCTS: GETBProduct[] = [
  {
    id: 'i-great-nova',
    name: 'i-Great Nova (Pelan Hibah Takaful Keluarga)',
    codeName: 'i-Great Nova',
    category: 'hibah',
    categoryLabel: 'Hibah Kasih Sayang & Legasi',
    tagline: 'Perlindungan Hibah Bernilai Tinggi Bermula RM250,000 Demi Kelangsungan Waris',
    description: 'Pelan Takaful Hibah Keluarga berkeupayaan tinggi rasmi dari GETB yang direka khusus untuk memastikan waris tersayang menerima jaminan kewangan segera sekiranya berlaku musibah kepada pencari nafkah. Menawarkan jumlah perlindungan asas (Basic Sum Covered) tinggi bermula dari RM250,000 dengan fleksibiliti tempoh perlindungan sehingga umur 80 tahun dan manfaat gandaan semasa menunaikan ibadah Haji atau Umrah.',
    entryAge: '30 hari sehingga 70 tahun',
    coverageTerm: 'Sehingga umur 70 atau 80 tahun',
    minContribution: 'Bermula dari serendah RM60 - RM150/bulan (bergantung umur & had perlindungan)',
    keyBenefits: [
      'Jumlah Perlindungan Asas (Sum Covered) tinggi bermula dari RM250,000 ke atas',
      'Pampasan Tambahan Kematian semasa menunaikan Ibadah Haji atau Umrah',
      'Pilihan Penambahan Jumlah Perlindungan secara automatik tanpa pengunderaitan perubatan tambahan',
      'Pemberian Hibah Mutlak yang disalurkan terus kepada penama tanpa melalui proses pembekuan mahkamah faraid',
      'Pelepasan Cukai Pendapatan LHDN di bawah pelepasan insurans nyawa & takaful keluarga sehingga RM3,000 setahun'
    ],
    suitableFor: [
      'Ketua keluarga dan suami yang merupakan punca nafkah utama rumah tangga',
      'Ibu bapa yang mempunyai tanggungan anak kecil dan komitmen ansuran rumah',
      'Peniaga dan peminjam modal yang memerlukan dana pelindung liabiliti hutang',
      'Jemaah yang merancang menunaikan Haji dan Umrah dengan perlindungan menyeluruh'
    ],
    usp: 'Perlindungan Hibah tinggi serendah RM250k dengan ciri penambahan perlindungan automatik dan perlindungan khas semasa Haji & Umrah.',
    shariahHighlight: 'Berasaskan konsep Tabarru’ dan Wakalah bil Ujrah, diluluskan oleh Jawatankuasa Pengawasan Syariah Great Eastern Takaful Berhad.',
    sampleTargetAudience: 'Suami & bapa berumur 25-45 tahun yang mahu sediakan sekurang-kurangnya RM250k - RM500k tunai untuk isteri.',
    popularRiders: ['i-Contributor Benefit (Waiver)', 'Critical Illness Benefit', 'Accidental Shield'],
    brochurePoints: [
      'Perlindungan sehingga umur 80 tahun',
      'Pilihan tempoh caruman fleksibel mengikut perancangan kewangan anda',
      '100% Hak Mutlak penerima hibah tanpa perebutan harta pusaka'
    ],
    color: 'from-rose-600 to-red-700',
    badge: 'Produk Rasmi Flagship',
    officialStatus: 'Produk Rasmi Flagship'
  },
  {
    id: 'i-great-evo',
    name: 'i-Great Evo (Perlindungan Keluarga & Kesihatan Komprehensif)',
    codeName: 'i-Great Evo',
    category: 'family',
    categoryLabel: 'Perlindungan Komprehensif & Kesihatan',
    tagline: 'Perlindungan Fleksibel Yang Berevolusi Mengikut Peringkat Kehidupan Anda',
    description: 'Pelan perlindungan keluarga dan kesihatan komprehensif terkini di laman web rasmi GETB. i-Great Evo menawarkan perlindungan kematian, Hilang Upaya Kekal Menyeluruh (TPD), pilihan caruman bulanan yang fleksibel dan mampu milik, serta ciri pelanjutan perlindungan automatik bagi memastikan anda dan keluarga sentiasa dilindungi tanpa gangguan.',
    entryAge: '14 hari sehingga 65 tahun',
    coverageTerm: 'Pilihan tempoh fleksibel sehingga umur 70, 80 atau 99 tahun',
    minContribution: 'Bermula dari RM75 - RM180/bulan',
    keyBenefits: [
      'Perlindungan Kematian dan Hilang Upaya Kekal Menyeluruh (TPD)',
      'Ciri Pelanjutan Perlindungan Automatik (Automatic Extension of Coverage)',
      'Fleksibiliti melampirkan rider perubatan (i-Medi Evolusi / i-Medi Shield)',
      'Kadar caruman mampu milik dan berpatutan dengan kemampuan kewangan keluarga',
      'Ganjaran kematangan sijil dan potensi nilai tunai pelaburan'
    ],
    suitableFor: [
      'Keluarga moden yang mencari pelan asas kukuh boleh ditambah rider mengikut bajet',
      'Individu bekerjaya yang mahukan pelan boleh disesuaikan bila pendapatan meningkat',
      'Pasangan muda yang inginkan pakej perlindungan hayat dan kad perubatan serentak'
    ],
    usp: 'Pelan yang fleksibel berevolusi mengikut fasa hidup dengan pelanjutan automatik tanpa perlu mohon semula.',
    shariahHighlight: 'Patuh syariah sepenuhnya, dana dilaburkan dalam instrumen sukuk dan ekuiti patuh syariah.',
    sampleTargetAudience: 'Eksekutif muda dan keluarga berumur 25-40 tahun yang mahukan fleksibiliti jangka panjang.',
    popularRiders: ['i-Medi Evolusi Rider', 'Critical Illness Protector', 'Payor Waiver'],
    brochurePoints: [
      'Pilihan gabungan perlindungan hayat + rawatan hospital swasta VIP',
      'Tempoh bayaran fleksibel: 10, 20 tahun atau sepanjang tempoh sijil',
      'Proses permohonan mudah dengan underwriting ringkas'
    ],
    color: 'from-emerald-600 to-teal-700',
    badge: 'Paling Diminati 2026',
    officialStatus: 'Produk Rasmi Flagship'
  },
  {
    id: 'i-medi-shield-evolusi',
    name: 'i-Medi Evolusi / i-Medi Shield Rider (Kad Perubatan VIP Hospital Swasta)',
    codeName: 'i-Medi Evolusi / Shield',
    category: 'medical',
    categoryLabel: 'Kad Perubatan & Pembedahan',
    tagline: 'Akses Rawatan Hospital Swasta VIP Tanpa Tunai Sehingga RM2.0 Juta',
    description: 'Rider kad perubatan komprehensif rasmi GETB yang melindungi anda dan keluarga daripada inflasi kos perubatan hospital swasta yang tinggi. Menawarkan Had Tahunan Keseluruhan sehingga RM2 Juta, pilihan bilik hospital persendirian yang selesa, pilihan deduktibel untuk menjimatkan caruman, serta kemudahan surat jaminan tanpa tunai (Cashless Guarantee Letter) di lebih 150 hospital panel terpilih di seluruh Malaysia.',
    entryAge: '30 hari sehingga 70 tahun',
    coverageTerm: 'Sehingga umur 80, 90 atau 100 tahun',
    minContribution: 'Bermula dari RM85 - RM220/bulan (boleh dilampirkan bersama i-Great Evo atau i-Great Nova)',
    keyBenefits: [
      'Had Tahunan Keseluruhan Tinggi sehingga RM2.0 JUTA dengan Tiada Had Seumur Hidup',
      'Kemasukan Tanpa Tunai (Cashless Admission) di 150+ hospital panel swasta di seluruh Malaysia',
      'Pengecualian Deposit Pendahuluan di Hospital Pilihan GETB (Preferred Hospitals)',
      'Perlindungan Rawatan Kanser & Dialisis Buah Pinggang Pesakit Luar ditanggung penuh',
      'Pilihan Pelan Deduktibel Mengikut Kemampuan (Jimat caruman sehingga 30%-50%)',
      'Elaun Tunai Harian Wad dan Bantuan Kecemasan Antarabangsa SOS 24 Jam'
    ],
    suitableFor: [
      'Semua individu dan keluarga yang ingin mengelakkan antrean lama di hospital awam',
      'Pekerja swasta yang mahukan kad perubatan sokongan (back-up) kepada kad majikan',
      'Kanak-kanak yang mudah terdedah kepada jangkitan seperti Influenza, RSV, Pneumonia, dan Denggi'
    ],
    usp: 'Had tahunan jutaan ringgit, kemudahan hospital pilihan tanpa deposit, dan pilihan deduktibel fleksibel mengikut bajet anda.',
    shariahHighlight: 'Akad Tabarru’ perkongsian risiko sesama peserta Takaful untuk tolong-menolong ketika musibah sakit.',
    sampleTargetAudience: 'Ibu bapa dengan anak kecil, profesional, dan individu yang mahu ketenangan minda dari bil hospital RM30k-RM100k.',
    popularRiders: ['Smart Medical Booster', 'Hospital Income Shield', 'Deductible Waiver'],
    brochurePoints: [
      'Aplikasi mudah alih GETB e-Connect untuk semakan baki had dan surat jaminan (GL)',
      'Pelan bilik daripada RM150, RM200 sehingga bilik Single VIP RM300/malam',
      'Diskaun tanpa tuntutan dan sokongan kemudahan kecemasan pantas'
    ],
    color: 'from-blue-600 to-cyan-700',
    badge: 'Keperluan Utama',
    officialStatus: 'Rider Perubatan'
  },
  {
    id: 'i-great-generasi',
    name: 'i-Great GENerasi (Pelan Hibah Generasi Fleksibel)',
    codeName: 'i-Great GENerasi',
    category: 'hibah',
    categoryLabel: 'Hibah Legasi Multi-Generasi',
    tagline: 'Bina Legasi Kewangan Kukuh Yang Melangkaui Generasi Anak dan Cucu',
    description: 'Pelan Takaful Hibah rasmi GETB yang direka khusus untuk membina dan mewariskan kekayaan keluarga merentas generasi. Membolehkan ibu bapa atau datuk/nenek menyediakan dana perlindungan dan warisan bernilai tinggi untuk anak cucu dengan struktur caruman yang berpatutan.',
    entryAge: '30 hari sehingga 70 tahun',
    coverageTerm: 'Sehingga umur 80 atau 90 tahun',
    minContribution: 'Bermula dari RM100/bulan',
    keyBenefits: [
      'Pampasan Kematian & Hilang Upaya Menyeluruh Kekal (TPD) bernilai tinggi',
      'Pemberian Hibah Mutlak yang sah mengikut Jadual 10 IFSA 2013',
      'Perancangan legasi keluarga terjamin daripada risiko pertikaian harta',
      'Gandaan pampasan bagi kemalangan di pengangkutan awam atau luar negara',
      'Boleh digandingkan dengan perkhidmatan Wasiat dan Wakaf GETB'
    ],
    suitableFor: [
      'Ibu bapa yang ingin meninggalkan bekalan modal perniagaan atau rumah untuk anak-anak',
      'Golongan M40 & T20 yang merancang pengurusan harta pusaka secara teratur',
      'Pemilik aset yang mahu pastikan generasi penerus bebas dari beban hutang piutang'
    ],
    usp: 'Pelan legasi khusus yang direka untuk menjamin kesejahteraan keturunan generasi ke generasi.',
    shariahHighlight: 'Menepati prinsip Maqasid Syariah dalam menjaga keturunan (Hifz an-Nasl) dan harta (Hifz al-Mal).',
    sampleTargetAudience: 'Pasangan matang 30-55 tahun yang ingin membina payung kewangan kukuh untuk generasi seterusnya.',
    popularRiders: ['Waiver of Contribution', 'Accidental Multiplier', 'Badal Hajj Service'],
    brochurePoints: [
      'Pampasan terus kepada generasi waris dalam masa 14-30 hari',
      'Pilihan fleksibel jumlah perlindungan mengikut saiz keluarga',
      'Perlindungan berpanjangan dengan bayaran berstruktur'
    ],
    color: 'from-purple-600 to-indigo-800',
    badge: 'Warisan Generasi',
    officialStatus: 'Pelan Warisan'
  },
  {
    id: 'i-great-chinta',
    name: 'i-Great Chinta (Takaful Keluarga & Tabung Pendidikan Anak)',
    codeName: 'i-Great Chinta',
    category: 'education',
    categoryLabel: 'Pendidikan Anak & Keluarga',
    tagline: 'Perlindungan Kasih Abadi Untuk Pasangan Dan Masa Depan Pendidikan Anak',
    description: 'Pelan Takaful Keluarga rasmi GETB yang menggabungkan perlindungan pasangan dan persediaan tabung pendidikan anak-anak. Dilengkapi manfaat belas kasihan (compassionate benefit) serta perlindungan hilang upaya, sangat ideal sebagai tabung masa depan anak melangkah ke universiti.',
    entryAge: 'Anak: 30 hari - 15 tahun | Ibu Bapa: 18 - 60 tahun',
    coverageTerm: 'Sehingga anak berumur 21 atau 25 tahun, atau seumur hidup ibu bapa',
    minContribution: 'Bermula dari RM90 - RM200/bulan',
    keyBenefits: [
      'Manfaat Belas Kasihan (Compassionate Benefit) tunai segera untuk keluarga',
      'Jaminan Dana Pendidikan apabila anak melangkah ke institusi pengajian tinggi',
      'Perlindungan Kematian & Hilang Upaya Kekal Menyeluruh (TPD)',
      'Manfaat Pengecualian Caruman (Payor Benefit): Caruman percuma diteruskan oleh GETB jika ibu bapa meninggal dunia/lumpuh',
      'Pelepasan Cukai Pendapatan LHDN untuk caruman pendidikan/insurans keluarga'
    ],
    suitableFor: [
      'Ibu bapa yang baru menyambut kelahiran bayi atau mempunyai anak bersekolah',
      'Keluarga yang mahukan perlindungan serentak untuk pasangan dan anak',
      'Mereka yang berazam memastikan impian menara gading anak tidak terkubur walau apa jua musibah berlaku'
    ],
    usp: 'Gabungan perlindungan belas kasihan tunai segera dan tabung pendidikan anak dengan pengecualian caruman automatik.',
    shariahHighlight: 'Pelaburan berlandaskan syariah yang memberkati perjalanan ilmu dan masa depan generasi muda.',
    sampleTargetAudience: 'Ibu bapa muda berumur 24-42 tahun yang ada anak kecil bawah 12 tahun.',
    popularRiders: ['Payor Waiver of Contribution', 'Child Critical Illness Rider', 'EduSave Booster'],
    brochurePoints: [
      'Ganjaran tunai kejayaan akademik untuk motivasi anak',
      'Caruman tidak hilang sekiranya pembayar mengalami musibah',
      'Jaminan tunai tersedia pada waktu anak masuk universiti'
    ],
    color: 'from-amber-600 to-yellow-700',
    badge: 'Pendidikan & Belas Kasihan',
    officialStatus: 'Produk Rasmi Flagship'
  },
  {
    id: 'i-great-yaqeen',
    name: 'i-Great Yaqeen (Perlindungan 61 Penyakit Kritikal & Penggantian Gaji)',
    codeName: 'i-Great Yaqeen',
    category: 'ci',
    categoryLabel: 'Penyakit Kritikal & Pengganti Gaji',
    tagline: 'Perisai Kewangan Menyeluruh Sehingga 61 Penyakit Kritikal Dengan Manfaat Gaji',
    description: 'Pelan perlindungan penyakit kritikal terkemuka dari GETB yang melindungi sehingga 61 jenis penyakit kritikal dari peringkat awal hingga akhir. Menawarkan pampasan tunai sekaligus (lump-sum) dan manfaat penggantian pendapatan (income protection) untuk membiayai kelangsungan hidup keluarga semasa anda menjalani tempoh rawatan dan pemulihan panjang.',
    entryAge: '30 hari sehingga 65 tahun',
    coverageTerm: 'Sehingga umur 70, 80 atau 90 tahun',
    minContribution: 'Bermula dari RM70 - RM190/bulan',
    keyBenefits: [
      'Melindungi sehingga 61 Jenis Penyakit Kritikal utama di Malaysia',
      'Pampasan Tunai Segera 100% apabila disahkan menghidap penyakit kritikal',
      'Manfaat Penggantian Pendapatan (Income Protection) berterusan',
      'Perlindungan Kanser Khusus Gender (Kanser Payudara, Serviks, Prostat)',
      'Pengecualian caruman serta merta selepas tuntutan diluluskan'
    ],
    suitableFor: [
      'Individu yang mempunyai komitmen bulanan tinggi (ansuran rumah, kereta, perbelanjaan dapur)',
      'Pencari nafkah tunggal yang tidak mampu kehilangan pendapatan bulanan jika terlantar sakit',
      'Mereka yang ada sejarah kesihatan keluarga menghidap kanser, strok atau penyakit jantung'
    ],
    usp: 'Melindungi sehingga 61 jenis penyakit kritikal dengan perlindungan penggantian gaji tunai tanpa bergantung resit hospital.',
    shariahHighlight: 'Dana kebajikan Takaful yang membantu peserta meneruskan kehidupan dengan tenang tanpa tertekan hutang.',
    sampleTargetAudience: 'Individu berumur 28-50 tahun yang peka dengan risiko serangan jantung, kanser dan strok mengejut.',
    popularRiders: ['Early Care CI Rider', 'Cancer Shield Extra', 'Waiver of Contribution'],
    brochurePoints: [
      'Pampasan tunai masuk terus ke akaun peribadi peserta',
      'Boleh digabung dengan kad perubatan untuk perlindungan 360 darjah',
      'Pelan fleksibel mengikut tahap pampasan yang diperlukan'
    ],
    color: 'from-rose-700 to-pink-800',
    badge: 'Perlindungan 61 CI',
    officialStatus: 'Produk Rasmi Flagship'
  },
  {
    id: 'i-great-majestik',
    name: 'i-Great Majestik (Pelan Simpanan Jangka Panjang & Pelaburan)',
    codeName: 'i-Great Majestik',
    category: 'savings',
    categoryLabel: 'Simpanan & Pelaburan Syariah',
    tagline: 'Tumbuhkan Dana Masa Depan Anda Berserta Ganjaran Kematangan & Pelaburan Booster',
    description: 'Pelan Takaful simpanan dan pelaburan jangka panjang rasmi GETB yang direka untuk memaksimumkan pulangan simpanan anda melalui gabungan perlindungan hayat, Maturity Booster, dan Investment Booster. Sesuai untuk persediaan tabung persaraan mewah, dana haji/umrah, atau dana kecemasan keluarga.',
    entryAge: '14 hari sehingga 65 tahun',
    coverageTerm: 'Boleh disesuaikan (20 tahun atau sehingga umur 70/80)',
    minContribution: 'Bermula dari RM150/bulan',
    keyBenefits: [
      'Ganjaran Maturity Booster (Ganjaran Kematangan Sijil tambahan)',
      'Ganjaran Investment Booster secara berkala ke dalam akaun pelaburan anda',
      'Akses kepada portfolio Dana Sukuk dan Ekuiti Syariah berprestasi teguh',
      'Perlindungan Kematian & Hilang Upaya Kekal Menyeluruh (TPD)',
      'Fleksibiliti pengeluaran separa dana untuk waktu kecemasan atau persaraan'
    ],
    suitableFor: [
      'Penyimpan berdisiplin yang mahukan pulangan lebih baik daripada akaun simpanan biasa',
      'Individu yang merancang tabung persaraan selesa atau tabung haji/umrah',
      'Peniaga yang mahu instrumen simpanan kalis kebocoran wang'
    ],
    usp: 'Dilengkapi Maturity & Investment Booster yang menambah nilai simpanan anda secara berganda seiring perlindungan takaful.',
    shariahHighlight: 'Pelaburan 100% patuh syariah yang dipantau ketat oleh Suruhanjaya Sekuriti dan Jawatankuasa Syariah GETB.',
    sampleTargetAudience: 'Eksekutif dan peniaga umur 26-50 tahun yang mencari gabungan disiplin simpanan + dividen syariah.',
    popularRiders: ['Payor Waiver Rider', 'Critical Illness Protector', 'Accidental Shield'],
    brochurePoints: [
      'Pilihan pertukaran dana (fund switching) percuma',
      'Potensi pulangan modal jangka panjang yang menarik',
      'Jaminan perlindungan kekal aktif walaupun pasaran berfluktuasi'
    ],
    color: 'from-amber-700 to-yellow-800',
    badge: 'Maturity & Investment Booster',
    officialStatus: 'Produk Rasmi Flagship'
  },
  {
    id: 'i-great-mega-plus',
    name: 'i-Great Mega Plus (Takaful Hayat & Pelaburan Berkala)',
    codeName: 'i-Great Mega Plus',
    category: 'savings',
    categoryLabel: 'Takaful Pelaburan & Perlindungan',
    tagline: 'Perlindungan Hayat Menyeluruh Disokong Pertumbuhan Nilai Tunai Pelaburan',
    description: 'Pelan Takaful Keluarga berkaitan pelaburan (Investment-Linked) caruman berkala dari GETB. Menggabungkan perlindungan kematian, TPD, pampasan tambahan kemalangan diri, serta akaun pelaburan peserta yang fleksibel untuk mencapai matlamat kewangan jangka panjang anda.',
    entryAge: '30 hari sehingga 70 tahun',
    coverageTerm: 'Sehingga umur 80, 90 atau 99 tahun',
    minContribution: 'Bermula dari RM100 - RM250/bulan',
    keyBenefits: [
      'Perlindungan Kematian, TPD, dan Tambahan Kemalangan Diri',
      'Akaun Pelaburan Peserta (PIA) dengan pelbagai pilihan dana syariah tempatan & global',
      'Fleksibiliti menambah caruman (single top-up) bila-bila masa',
      'Pemberian Hibah Mutlak kepada waris tersayang tanpa beku',
      'Boleh dilampirkan pelbagai rider perlindungan perubatan dan penyakit kritikal'
    ],
    suitableFor: [
      'Pencari nafkah yang mahukan pakej serba lengkap (Hayat + Pelaburan + Kad Medikal)',
      'Eksekutif korporat yang mahukan perlindungan tinggi dengan potensi nilai tunai',
      'Ibu bapa yang ingin membina tabung pelindung serbaguna'
    ],
    usp: 'Pelan berkaitan pelaburan fleksibel dengan pampasan kemalangan berganda dan pilihan riders komprehensif.',
    shariahHighlight: 'Pelaburan telus dalam instrumen syariah yang diawasi oleh panel aktuari dan syariah GETB.',
    sampleTargetAudience: 'Golongan pekerja swasta dan profesional berumur 25-45 tahun.',
    popularRiders: ['i-Medi Shield Rider', 'Waiver of Contribution', 'Critical Illness Care'],
    brochurePoints: [
      'Penyata pelaburan tahunan yang telus',
      'Pengeluaran tunai fleksibel ketika kecemasan',
      'Perlindungan berpanjangan sehingga umur 99 tahun'
    ],
    color: 'from-slate-700 to-slate-900',
    badge: 'Pelan Serba Lengkap',
    officialStatus: 'Produk Rasmi Flagship'
  },
  {
    id: 'i-great-idaman',
    name: 'i-Great Idaman (Pelan Simpanan Tunai Berkala & Perlindungan)',
    codeName: 'i-Great Idaman',
    category: 'savings',
    categoryLabel: 'Simpanan Tunai Dwi-Tahunan',
    tagline: 'Nikmati Pembayaran Tunai Berkala Setiap 2 Tahun Berserta Perlindungan Takaful',
    description: 'Pelan Takaful simpanan dan perlindungan rasmi GETB yang memberikan ganjaran Pembayaran Tunai Dijamin (Guaranteed Cash Payout) secara berkala bermula setiap 2 tahun. Peserta boleh memilih sama ada mengeluarkan wang tunai ini untuk percutian/keperluan harian atau menyimpannya semula untuk menjana keuntungan pelaburan terkumpul.',
    entryAge: '30 hari sehingga 60 tahun',
    coverageTerm: 'Tempoh matang 20 atau 30 tahun',
    minContribution: 'Bermula dari RM120/bulan',
    keyBenefits: [
      'Pembayaran Tunai Berkala (Regular Cash Payout) setiap 2 tahun',
      'Pilihan mengeluarkan tunai atau melaburkannya semula dalam dana syariah',
      'Perlindungan Kematian dan Hilang Upaya Kekal Menyeluruh (TPD)',
      'Pampasan Kematian Kemalangan Tambahan',
      'Manfaat Kematangan (Maturity Benefit) tunai lumayan pada hujung tempoh sijil'
    ],
    suitableFor: [
      'Mereka yang gemar menerima pulangan tunai berkala untuk ganjaran diri atau keluarga',
      'Ibu bapa yang mahu wang belanja tambahan berkala untuk persediaan persekolahan anak',
      'Individu yang mahukan kepastian pulangan tunai berstruktur'
    ],
    usp: 'Pembayaran tunai setiap 2 tahun yang boleh dinikmati sepanjang tempoh sijil masih berjalan.',
    shariahHighlight: 'Perkongsian keuntungan pelaburan syariah yang telus dan berintegriti.',
    sampleTargetAudience: 'Penjawat awam, pekerja swasta dan peniaga yang sukakan ganjaran tunai berkala.',
    popularRiders: ['Payor Waiver Rider', 'Hospital Cash Income'],
    brochurePoints: [
      'Tunai berkala setiap 2 tahun terus ke akaun bank',
      'Jaminan perlindungan hayat berterusan',
      'Bantuan kewangan tambahan mengikut jadual'
    ],
    color: 'from-teal-600 to-emerald-800',
    badge: 'Tunai Setiap 2 Tahun',
    officialStatus: 'Pelan Warisan'
  },
  {
    id: 'i-great-murni',
    name: 'i-Great Murni 2.0 (Pelan Perlindungan Pantas Atas Talian)',
    codeName: 'i-Great Murni 2.0',
    category: 'family',
    categoryLabel: 'Takaful Pantas Dalam Talian',
    tagline: 'Perlindungan Segera Sehingga RM500,000 Tanpa Pemeriksaan Kesihatan Rumit',
    description: 'Pelan Takaful Keluarga atas talian rasmi GETB yang menawarkan proses permohonan yang mudah, cepat dan bebas kerumitan (hassle-free). Memberikan perlindungan kematian dan khairat pengurusan jenazah sehingga RM500,000 dengan soalan kesihatan yang sangat ringkas.',
    entryAge: '18 sehingga 60 tahun',
    coverageTerm: '10, 15, 20 tahun atau sehingga umur 70 tahun',
    minContribution: 'Bermula dari serendah RM30 - RM65/bulan',
    keyBenefits: [
      'Perlindungan Kematian akibat sebarang sebab sehingga RM500,000',
      'Gandaan Pampasan Kematian Kemalangan Diri',
      'Manfaat Khairat Pengurusan Jenazah Tunai Pantas',
      'Kelulusan serta-merta tanpa perlu pemeriksaan doktor untuk had yang layak',
      'Caruman bulanan yang amat menjimatkan poket'
    ],
    suitableFor: [
      'Pekerja ekonomi gig (penunggang p-hailing, e-hailing, freelancer)',
      'Golongan muda atau bujang yang mahukan perlindungan asas segera',
      'Individu yang mahukan pendaftaran segera secara digital tanpa borang tebal'
    ],
    usp: 'Proses permohonan atas talian yang sangat pantas dengan caruman murah serendah RM1 sehari.',
    shariahHighlight: 'Tabarru’ kebajikan tulen untuk tolong-menolong sesama komuniti.',
    sampleTargetAudience: 'Pekerja muda 20-35 tahun, rider, pekerja gig yang mahu perlindungan serta-merta.',
    popularRiders: ['Accidental Booster', 'Khairat Plus'],
    brochurePoints: [
      'Permohonan 100% digital',
      'Perlindungan aktif sejurus kelulusan',
      'Sangat mesra bajet untuk golongan B40 & M40'
    ],
    color: 'from-amber-600 to-orange-700',
    badge: 'Pantas & Digital',
    officialStatus: 'Pelan Atas Talian'
  },
  {
    id: 'i-great-critical-care',
    name: 'i-Great Critical Care (50 Penyakit Kritikal Atas Talian)',
    codeName: 'i-Great Critical Care',
    category: 'ci',
    categoryLabel: 'Penyakit Kritikal Atas Talian',
    tagline: 'Perlindungan 50 Penyakit Kritikal Sehingga RM500,000 Tanpa Pemeriksaan Doktor',
    description: 'Pelan Takaful penyakit kritikal atas talian komprehensif rasmi dari GETB yang melindungi 50 jenis penyakit kritikal utama. Peserta boleh memohon jumlah perlindungan asas sehingga RM500,000 tanpa perlu melalui pemeriksaan perubatan awal, memberikan wang pampasan tunai sekaligus apabila berlaku diagnosis kritikal.',
    entryAge: '18 sehingga 55 tahun',
    coverageTerm: 'Sehingga umur 70 tahun',
    minContribution: 'Bermula dari RM45 - RM120/bulan',
    keyBenefits: [
      'Melindungi 50 jenis penyakit kritikal utama (Kanser, Jantung, Strok, Kegagalan Organ, dll)',
      'Jumlah perlindungan sehingga RM500,000 tunai sekaligus',
      'Tiada pemeriksaan perubatan awal diperlukan',
      'Pampasan tunai penggantian pendapatan terus ke akaun peserta',
      'Pendaftaran mudah secara dalam talian'
    ],
    suitableFor: [
      'Mereka yang ingin menambah perlindungan penyakit kritikal dengan cepat',
      'Individu yang sudah ada kad hospital tetapi tiada pampasan tunai jika hilang punca rezeki',
      'Pekerja sibuk yang mahukan perlindungan segera tanpa perlu temu janji klinik'
    ],
    usp: 'Melindungi 50 penyakit kritikal sehingga RM500,000 terus atas talian tanpa perlu pemeriksaan perubatan.',
    shariahHighlight: 'Pampasan kebajikan patuh syariah untuk membantu pesakit ketika fasa rawatan genting.',
    sampleTargetAudience: 'Profesional dan pekerja swasta umur 25-45 tahun.',
    popularRiders: ['Special Care Protector'],
    brochurePoints: [
      'Proses digital pantas',
      'Wang tunai bebas digunakan untuk apa jua keperluan peribadi',
      'Perlindungan 24/7 di seluruh dunia'
    ],
    color: 'from-red-600 to-rose-800',
    badge: '50 Penyakit Kritikal',
    officialStatus: 'Pelan Atas Talian'
  },
  {
    id: 'i-great-harapan',
    name: 'i-Great Harapan / Harapan Plus (Badal Haji & Wakaf)',
    codeName: 'i-Great Harapan',
    category: 'hibah',
    categoryLabel: 'Wakaf, Badal Haji & Khairat',
    tagline: 'Gabungan Perlindungan Keluarga Dan Saham Akhirat Melalui Wakaf & Badal Haji',
    description: 'Pelan Takaful bernilai murni rasmi GETB yang menggabungkan perlindungan kewangan keluarga dengan amal jariah berterusan. Peserta boleh menyalurkan sebahagian pampasan kepada perkhidmatan Badal Haji dan Wakaf tunai melalui institusi wakaf sah berdaftar di Malaysia.',
    entryAge: '30 hari sehingga 70 tahun',
    coverageTerm: 'Sehingga umur 80 atau 99 tahun',
    minContribution: 'Bermula dari RM80/bulan',
    keyBenefits: [
      'Perkhidmatan Badal Haji dan Upah Haji untuk peserta',
      'Saluran sebahagian pampasan ke Yayasan Wakaf rasmi sebagai sedekah jariah',
      'Pampasan Kematian & Hilang Upaya Kekal Menyeluruh (TPD)',
      'Khairat Kematian Tunai Segera untuk urusan jenazah',
      'Pemberian Hibah kepada waris keluarga tercinta'
    ],
    suitableFor: [
      'Individu yang mementingkan bekalan amal jariah untuk alam akhirat',
      'Mereka yang belum sempat menunaikan haji dan mahu jaminan badal haji terlaksana',
      'Keluarga yang mahu legasi keberkatan berkekalan'
    ],
    usp: 'Perlindungan duniawi untuk anak isteri berserta perkhidmatan Badal Haji dan Wakaf sah untuk bekalan ukhrawi.',
    shariahHighlight: 'Disokong kerjasama institusi agama dan wakaf rasmi di bawah kawalan pihak berkuasa Islam.',
    sampleTargetAudience: 'Muslim berumur 30-65 tahun yang peka dengan kepentingan sedekah jariah dan badal haji.',
    popularRiders: ['Badal Hajj Benefit', 'Khairat Booster', 'Endowment Rider'],
    brochurePoints: [
      'Sijil penyertaan wakaf rasmi',
      'Pengurusan badal haji bertauliah',
      'Ketenangan jiwa dunia dan akhirat'
    ],
    color: 'from-emerald-700 to-teal-900',
    badge: 'Amal & Badal Haji',
    officialStatus: 'Pelan Warisan'
  }
];
