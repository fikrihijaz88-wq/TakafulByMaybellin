export interface TargetPersona {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  ageGroup: string;
  incomeLevel: string;
  familyStatus: string;
  topPainPoints: string[];
  hiddenFears: string[];
  keyDesires: string[];
  recommendedPlans: string[];
  marketingAngles: {
    hook: string;
    trigger: string;
    callToAction: string;
  };
  sampleStory: string;
  budgetPreference: string;
}

export const TARGET_PERSONAS: TargetPersona[] = [
  {
    id: 'young-parents',
    title: 'Ibu Bapa Muda (Millennial Parents)',
    subtitle: 'Mempunyai anak kecil (bawah 7 tahun), komitmen rumah & pengasuh anak',
    iconName: 'Baby',
    ageGroup: '25 - 38 tahun',
    incomeLevel: 'RM3,500 - RM8,000 seisi rumah',
    familyStatus: 'Berkahwin, 1-3 orang anak kecil',
    topPainPoints: [
      'Risau anak jatuh sakit tengah malam (RSV, Influenza, Rotavirus) dan terpaksa tunggu giliran berjam-jam di hospital sesak',
      'Jika berlaku apa-apa pada ketua keluarga, siapa yang nak teruskan bayar ansuran rumah, susu & pampers anak?',
      'Bimbang simpanan pendidikan anak lebur atau terpakai untuk kecemasan'
    ],
    hiddenFears: [
      'Takut anak terabai atau terpaksa meminta-minta simpati orang ramai di media sosial jika ayah meninggal dunia',
      'Takut harta dan akaun bank dibekukan mahkamah faraid dan isteri tiada duit belanja harian'
    ],
    keyDesires: [
      'Mahu anak dapat rawatan bilik selesa di hospital swasta VIP bila demam panas tanpa keluar sesen pun',
      'Mahu tinggalkan sekurang-kurangnya RM250,000 - RM500,000 tunai segera untuk isteri dan anak teruskan hidup dengan tenang'
    ],
    recommendedPlans: [
      'i-Medi Evolusi / Shield Rider (Kad Hospital Swasta VIP Anak & Keluarga)',
      'i-Great Nova (Hibah Kasih Sayang Ayah untuk Isteri & Anak)',
      'i-Great Chinta (Tabung Pendidikan & Manfaat Belas Kasihan dgn Payor Waiver)'
    ],
    marketingAngles: {
      hook: 'Ayah pergi sekelip mata, tapi sewa rumah & susu anak tak pernah ada cuti...',
      trigger: 'Tunjukkan realiti akaun bank beku dan perbezaan ada Hibah vs tiada Hibah.',
      callToAction: 'Sediakan sekurang-kurangnya RM300k Hibah Kasih Sayang serendah RM3 sehari hari ini.'
    },
    sampleStory: 'Puan Sarah kehilangan suami secara mengejut akibat serangan jantung pada umur 34 tahun. Nasib baik arwah ada sediakan Hibah GETB i-Great Nova bernilai RM350k. Dalam tempoh 18 hari, duit masuk ke akaun tanpa beku, membolehkan Puan Sarah melangsaikan baki hutang dan fokus menjaga 2 anak kecil.',
    budgetPreference: 'RM120 - RM250 sebulan'
  },
  {
    id: 'newly-wed',
    title: 'Pasangan Baru Berkahwin (Newlyweds)',
    subtitle: 'Baru membina mahligai, baru beli rumah pertama atau kereta keluarga',
    iconName: 'HeartHandshake',
    ageGroup: '23 - 32 tahun',
    incomeLevel: 'RM3,000 - RM6,500',
    familyStatus: 'Baru berkahwin (0-3 tahun), merancang cahaya mata',
    topPainPoints: [
      'Banyak komitmen baru (pinjaman perumahan, perabot, kos sara hidup meningkat)',
      'Masih rasa "kami muda dan sihat, takkan sakit sekarang"',
      'Belum faham beza insurans syarikat majikan dengan polisi peribadi takaful'
    ],
    hiddenFears: [
      'Takut salah seorang terlantar sakit dan menjadi beban kewangan kepada pasangan tersayang',
      'Risau pasangan terpaksa pikul hutang rumah seorang diri'
    ],
    keyDesires: [
      'Membina tapak kewangan keluarga yang kalis musibah sejak awal perkahwinan',
      'Mempunyai kad perubatan peribadi yang kekal walaupun bertukar kerja'
    ],
    recommendedPlans: [
      'i-Great Nova (Hibah Timbal Balik Suami Isteri Bermula RM250k)',
      'i-Medi Evolusi / Shield Rider (Kad Hospital Peribadi Cashless)',
      'i-Great Evo (Perlindungan Keluarga Berkelanjutan Automatik)'
    ],
    marketingAngles: {
      hook: 'Hadiah kahwin paling bermakna bukan hanya cincin emas, tapi surat cinta berupa Hibah Takaful...',
      trigger: 'Kasih sayang sebenar adalah tidak meninggalkan pasangan dalam keadaan menanggung beban hutang.',
      callToAction: 'Ambil pelan Hibah Berpasangan serendah RM60 sebulan sementara masih sihat & muda.'
    },
    sampleStory: 'Amir dan Aina ambil keputusan ambil Hibah GETB i-Great Nova RM250k saling menamakan pasangan selepas sebulan nikah. Hanya RM75/bulan, mereka tenang memulakan fasa baru kehidupan.',
    budgetPreference: 'RM80 - RM160 sebulan'
  },
  {
    id: 'sme-entrepreneurs',
    title: 'Peniaga & Usahawan SME (Business Owners)',
    subtitle: 'Pemilik kedai, bisnes online, kontraktor dengan pinjaman modal perniagaan',
    iconName: 'Briefcase',
    ageGroup: '28 - 50 tahun',
    incomeLevel: 'RM6,000 - RM30,000+',
    familyStatus: 'Berkahwin, tanggungan staf dan keluarga',
    topPainPoints: [
      'Tiada caruman majikan (tiada SOCSO komprehensif atau skim perubatan korporat)',
      'Pendapatan pasang surut dan bergantung 100% pada kudrat fizikal diri sendiri',
      'Banyak liabiliti bisnes, pinjaman bank, cek tertunggak dan hutang pembekal'
    ],
    hiddenFears: [
      'Jika jatuh sakit kritikal atau lumpuh, bisnes terus lumpuh dan tiada pengganti',
      'Keluarga disaman oleh pemiutang atau rakan kongsi menuntut hak syarikat'
    ],
    keyDesires: [
      'Keyman Protection & Business Continuation Fund untuk selesaikan liabiliti syarikat',
      'Pampasan tunai jutaan ringgit tanpa bayar cukai untuk waris teruskan legasi bisnes'
    ],
    recommendedPlans: [
      'i-Great Nova (Pampasan RM500k - RM2 Juta untuk Keyman / Hibah Perniagaan)',
      'i-Great Yaqeen (Perlindungan 61 Penyakit Kritikal & Penggantian Gaji)',
      'i-Medi Evolusi / Shield Rider (Kad Hospital Swasta VIP Tanpa Deposit)'
    ],
    marketingAngles: {
      hook: 'Bisnes bernilai jutaan ringgit boleh lesap sekelip mata jika "Enjin Utama" syarikat jatuh sakit...',
      trigger: 'Tunjukkan konsep Keyman Takaful dan pemisahan hutang syarikat daripada membebankan anak isteri.',
      callToAction: 'Lindungi empayar perniagaan anda dengan skim Takaful Korporat & Hibah GETB.'
    },
    sampleStory: 'Tuan Razak, pengusaha bengkel katering, sediakan polisi Hibah & CI GETB RM1 Juta. Bila beliau diserang angin ahmar, pampasan tunai RM500k membolehkan beliau membayar gaji pekerja dan sewa premis sementara melantik pengurus baru.',
    budgetPreference: 'RM250 - RM600+ sebulan'
  },
  {
    id: 'civil-servants',
    title: 'Penjawat Awam (Kakitangan Kerajaan)',
    subtitle: 'Guru, jururawat, polis, tentera, pegawai tadbir kerajaan',
    iconName: 'Building2',
    ageGroup: '24 - 55 tahun',
    incomeLevel: 'RM2,800 - RM7,500',
    familyStatus: 'Berkahwin / Bujang, mempunyai potongan gaji perumahan & pinjaman',
    topPainPoints: [
      'Rasa "Hospital kerajaan percuma untuk saya, buat apa ambil Takaful?"',
      'Slip gaji sudah padat dengan pelbagai potongan (LPPSA, koperasi, angkasa)',
      'Tidak sedar pencen terbitan kepada pasangan hanya 50-70% daripada gaji pokok'
    ],
    hiddenFears: [
      'Melihat rakan sekerja yang sakit kanser terpaksa tunggu giliran MRI/PET scan 3-6 bulan di hospital awam',
      'Ubat-ubatan kanser atau implan moden yang tidak ditanggung oleh subsidi kerajaan (perlu bayar sendiri puluhan ribu)'
    ],
    keyDesires: [
      'Kad perubatan back-up untuk dapat rawatan pakar sepantas 24 jam di hospital swasta',
      'Hibah lumayan untuk lunaskan baki pinjaman LPPSA / pembiayaan peribadi agar pencen pasangan tidak terjejas'
    ],
    recommendedPlans: [
      'i-Medi Evolusi / Shield Rider (Kad Perubatan Standby / Deductible mesra bajet)',
      'i-Great Nova (Hibah Tunai Segera)',
      'i-Great Harapan (Badal Haji & Wakaf Rasmi)'
    ],
    marketingAngles: {
      hook: 'Betul rawatan hospital kerajaan percuma... tapi ubat kemoterapi RM8,000 sebulan kerajaan tanggung ke?',
      trigger: 'Realiti masa menunggu rawatan kritikal dan had subsidi ubat khusus di hospital awam.',
      callToAction: 'Miliki Kad Perubatan VIP Pelengkap dengan sumbangan potongan mudah serendah RM65 sebulan.'
    },
    sampleStory: 'Cikgu Azman didiagnosis kanser usus. Walaupun hospital kerajaan ada pakar, ubat target terapi berharga RM12,000 setiap kitaran tidak ditaja. Kad GETB i-Medi Shield beliau menanggung kos rawatan bernilai RM85,000 di hospital swasta dengan lancar.',
    budgetPreference: 'RM90 - RM180 sebulan'
  },
  {
    id: 'gig-freelancers',
    title: 'Pekerja Gig & Freelancer (Self-Employed)',
    subtitle: 'Rider p-hailing, pemandu e-hailing, pereka grafik, jurugambar, peniaga online',
    iconName: 'Bike',
    ageGroup: '20 - 40 tahun',
    incomeLevel: 'RM2,000 - RM5,500 (tidak menentu)',
    familyStatus: 'Bujang atau baru berkeluarga',
    topPainPoints: [
      'Tiada sebarang faedah perubatan majikan, jika kemalangan di jalan raya, hilang punca rezeki harian',
      'Pendapatan tidak tetap membuatkan mereka takut terikat dengan komitmen bulanan mahal',
      'Sering menunggang motosikal / memandu jarak jauh dengan risiko kemalangan tinggi'
    ],
    hiddenFears: [
      'Patah kaki atau lumpuh dan tiada sesiapa tolong bayar sewa bilik dan makan minum',
      'Kematian mengejut meninggalkan hutang motor atau pinjaman kepada ibu bapa di kampung'
    ],
    keyDesires: [
      'Perlindungan kemalangan dengan elaun hospital harian (income protection) yang murah',
      'Pelan digital atas talian yang pantas tanpa perlu periksa kesihatan rumit'
    ],
    recommendedPlans: [
      'i-Great Murni 2.0 (Pelan Perlindungan Pantas Atas Talian)',
      'i-Great Critical Care (50 Penyakit Kritikal Digital)',
      'i-Medi Evolusi / Shield Rider (Kad Hospital Fleksibel)'
    ],
    marketingAngles: {
      hook: 'Hari ni tak kayuh/pusing roda, hari ni tak ada gaji. Macam mana kalau motor eksiden?',
      trigger: 'Ketiadaan jaring keselamatan (safety net) untuk pekerja gig bila kemalangan di jalan raya.',
      callToAction: 'Dapatkan perlindungan Takaful Kemalangan & Hayat RM100k serendah RM1.50 sehari.'
    },
    sampleStory: 'Hafiz, rider penghantar makanan, patah tulang paha selepas dilanggar lari. Pelan GETB beliau bayar elaun hospital harian RM100/hari dan pampasan rawatan kecederaan RM15,000, membantunya bertahan selama 4 bulan rehat.',
    budgetPreference: 'RM40 - RM90 sebulan'
  }
];
