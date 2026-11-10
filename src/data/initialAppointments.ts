import { ClientAppointment } from '../types';

// Helper to get formatted date string (YYYY-MM-DD) with day offset from today
const getRelativeDateStr = (dayOffset: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const INITIAL_APPOINTMENTS: ClientAppointment[] = [
  {
    id: 'apt-1',
    clientName: 'Encik Khairul Anuar & Puan Aisyah',
    clientPhone: '012-3456789',
    planInterest: 'i-Great Nova (Hibah Kasih Sayang RM500k)',
    appointmentType: 'consultation',
    typeLabel: 'Konsultasi Pelan Takaful',
    date: getRelativeDateStr(0), // Today
    time: '14:30',
    meetingMode: 'face_to_face',
    locationOrLink: 'Starbucks Mid Valley / Pejabat GPlus Management',
    status: 'scheduled',
    notes: 'Keluarga ada 2 anak kecil. Berminat nak buat perancangan Hibah gantian nafkah isteri tanpa beku.',
    reminderSent: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'apt-2',
    clientName: 'Puan Melissa Tan',
    clientPhone: '017-8899221',
    planInterest: 'i-Medi Evolusi / Shield Rider (Kad Hospital VIP)',
    appointmentType: 'followup_quotation',
    typeLabel: 'Susulan Sebut Harga (Follow-up)',
    date: getRelativeDateStr(0), // Today
    time: '17:00',
    meetingMode: 'online_zoom',
    locationOrLink: 'Google Meet (meet.google.com/abc-xyz)',
    status: 'scheduled',
    notes: 'Nak semak deductible RM500 vs RM0 untuk jimatkan caruman bulanan keluarga.',
    reminderSent: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'apt-3',
    clientName: 'Tuan Haji Razak Bin Osman',
    clientPhone: '019-2233445',
    planInterest: 'i-Great Harapan (Wakaf & Badal Haji)',
    appointmentType: 'policy_delivery',
    typeLabel: 'Penyerahan Sijil Polisi',
    date: getRelativeDateStr(1), // Tomorrow
    time: '11:00',
    meetingMode: 'face_to_face',
    locationOrLink: 'Restoran Nelayan Bangi',
    status: 'scheduled',
    notes: 'Serah buku polisi fizikal & terangkan cara semak sijil melalui portal e-Connect GETB.',
    reminderSent: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'apt-4',
    clientName: 'Dr. Firdaus Wong',
    clientPhone: '013-9876543',
    planInterest: 'i-Great Yaqeen (61 Penyakit Kritikal)',
    appointmentType: 'followup_quotation',
    typeLabel: 'Susulan Sebut Harga (Follow-up)',
    date: getRelativeDateStr(2), // 2 days ahead
    time: '15:00',
    meetingMode: 'phone_call',
    locationOrLink: 'Panggilan Telefon / WhatsApp Call',
    status: 'scheduled',
    notes: 'Berminat pampasan tunai RM300k untuk perlindungan penyakit kanser & jantung.',
    reminderSent: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'apt-5',
    clientName: 'Cikgu Noraini Ismail',
    clientPhone: '018-7654321',
    planInterest: 'i-Great Chinta (Tabung Pendidikan Anak)',
    appointmentType: 'review',
    typeLabel: 'Semakan Polisi Tahunan',
    date: getRelativeDateStr(-2), // 2 days ago
    time: '10:30',
    meetingMode: 'online_zoom',
    locationOrLink: 'Zoom Meeting',
    status: 'completed',
    notes: 'Polisi sudah aktif 2 tahun. Klien tambah caruman untuk anak kedua.',
    reminderSent: true,
    createdAt: new Date().toISOString(),
  }
];
