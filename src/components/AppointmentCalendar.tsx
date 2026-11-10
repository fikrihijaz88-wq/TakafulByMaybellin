import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  MapPin, 
  Video, 
  PhoneCall, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  MessageSquare, 
  Download, 
  Check, 
  Sparkles,
  Shield,
  FileText
} from 'lucide-react';
import { ClientAppointment, ConsultantInfo, formatWhatsAppNumber, formatDisplayPhone } from '../types';
import { INITIAL_APPOINTMENTS } from '../data/initialAppointments';
import { GETB_PRODUCTS } from '../data/getbProducts';

interface Props {
  consultant: ConsultantInfo;
}

export const AppointmentCalendar: React.FC<Props> = ({ consultant }) => {
  const [appointments, setAppointments] = useState<ClientAppointment[]>(() => {
    const saved = localStorage.getItem('takaful_appointments_records');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_APPOINTMENTS;
      }
    }
    return INITIAL_APPOINTMENTS;
  });

  // Current view date in calendar
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDateFilter, setSelectedDateFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<ClientAppointment | null>(null);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [selectedForReminder, setSelectedForReminder] = useState<ClientAppointment | null>(null);
  const [reminderTemplateType, setReminderTemplateType] = useState<'24h' | '2h' | 'followup_quote' | 'followup_docs'>('24h');
  const [customReminderNote, setCustomReminderNote] = useState('');

  // Form state
  const [formData, setFormData] = useState<Partial<ClientAppointment>>({
    clientName: '',
    clientPhone: '',
    planInterest: 'i-Great Nova (Pelan Hibah Takaful)',
    appointmentType: 'consultation',
    typeLabel: 'Konsultasi Pelan Takaful',
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    meetingMode: 'face_to_face',
    locationOrLink: 'Pejabat GPlus Management / Kafeteria',
    status: 'scheduled',
    notes: '',
  });

  // Persist appointments to localStorage
  useEffect(() => {
    localStorage.setItem('takaful_appointments_records', JSON.stringify(appointments));
  }, [appointments]);

  // Calendar calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun',
    'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'
  ];

  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleTodayMonth = () => {
    setCurrentDate(new Date());
    const todayStr = new Date().toISOString().split('T')[0];
    setSelectedDateFilter(todayStr);
  };

  // Open add modal
  const handleOpenAddModal = (dateStr?: string) => {
    setEditingAppointment(null);
    setFormData({
      clientName: '',
      clientPhone: '',
      planInterest: 'i-Great Nova (Pelan Hibah Takaful)',
      appointmentType: 'consultation',
      typeLabel: 'Konsultasi Pelan Takaful',
      date: dateStr || new Date().toISOString().split('T')[0],
      time: '14:00',
      meetingMode: 'face_to_face',
      locationOrLink: 'Pejabat GPlus Management / Kafeteria',
      status: 'scheduled',
      notes: '',
    });
    setIsFormModalOpen(true);
  };

  // Open edit modal
  const handleOpenEditModal = (apt: ClientAppointment) => {
    setEditingAppointment(apt);
    setFormData(apt);
    setIsFormModalOpen(true);
  };

  // Delete appointment
  const handleDeleteAppointment = (id: string) => {
    if (confirm('Adakah anda pasti ingin memadam rekod temujanji ini?')) {
      setAppointments(appointments.filter((a) => a.id !== id));
    }
  };

  // Save appointment
  const handleSaveAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.clientPhone || !formData.date) return;

    const typeLabels: Record<string, string> = {
      consultation: 'Konsultasi Pelan Takaful',
      followup_quotation: 'Susulan Sebut Harga (Follow-up)',
      policy_delivery: 'Penyerahan Sijil Polisi',
      review: 'Semakan Polisi Tahunan',
      claim: 'Bantuan Tuntutan & Hospital',
    };

    const newApt: ClientAppointment = {
      id: editingAppointment ? editingAppointment.id : `apt-${Date.now()}`,
      clientName: formData.clientName || 'Klien Baru',
      clientPhone: formData.clientPhone || '',
      planInterest: formData.planInterest || 'i-Great Nova',
      appointmentType: (formData.appointmentType as any) || 'consultation',
      typeLabel: typeLabels[formData.appointmentType || 'consultation'] || 'Konsultasi',
      date: formData.date || new Date().toISOString().split('T')[0],
      time: formData.time || '14:00',
      meetingMode: (formData.meetingMode as any) || 'face_to_face',
      locationOrLink: formData.locationOrLink || 'Lokasi Temujanji',
      status: (formData.status as any) || 'scheduled',
      notes: formData.notes || '',
      reminderSent: editingAppointment ? editingAppointment.reminderSent : false,
      createdAt: editingAppointment ? editingAppointment.createdAt : new Date().toISOString(),
    };

    if (editingAppointment) {
      setAppointments(appointments.map((a) => (a.id === newApt.id ? newApt : a)));
    } else {
      setAppointments([newApt, ...appointments]);
    }

    setIsFormModalOpen(false);
  };

  // Quick WhatsApp reminder generator
  const handleOpenReminderModal = (apt: ClientAppointment) => {
    setSelectedForReminder(apt);
    setReminderTemplateType('24h');
    setCustomReminderNote('');
    setIsReminderModalOpen(true);
  };

  const generateReminderText = (apt: ClientAppointment, type: string): string => {
    const formattedDate = new Date(apt.date).toLocaleDateString('ms-MY', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    if (type === '24h') {
      return `Assalamualaikum / Salam sejahtera ${apt.clientName},

Peringatan mesra daripada saya, ${consultant.name} (Perunding Takaful GETB - GPlus Management).

Temujanji sesi ${apt.typeLabel} bagi ${apt.planInterest} kita telah dijadualkan pada:
📅 Tarikh: ${formattedDate}
⏰ Masa: ${apt.time}
📍 Lokasi / Mod: ${apt.locationOrLink}

${customReminderNote ? `Nota tambahan: ${customReminderNote}\n\n` : ''}Sekiranya Tuan/Puan memerlukan sebarang pelarasan masa, sila maklumkan kepada saya. Terima kasih dan jumpa nanti! 😊`;
    }

    if (type === '2h') {
      return `Salam sejahtera ${apt.clientName},

Peringatan ringkas temujanji kita hari ini pada jam ${apt.time} di ${apt.locationOrLink}. 

Saya dalam perjalanan / bersedia untuk sesi ${apt.typeLabel}. Jumpa sebentar lagi! 

Yang ikhlas,
${consultant.name}
GPlus Management (${consultant.phone})`;
    }

    if (type === 'followup_quote') {
      return `Assalamualaikum & Selamat Sejahtera ${apt.clientName},

Saya ${consultant.name} dari Great Eastern Takaful (GPlus Management).

Susulan ringkas mengenai cadangan sebut harga pelan ${apt.planInterest} yang kita bincangkan tempoh hari. Ada mana-mana bahagian faedah perlindungan atau bajet bulanan yang Tuan/Puan ingin saya perincikan semula?

Saya sedia membantu bila-bila masa. Terima kasih! 🙏`;
    }

    // followup_docs
    return `Salam ${apt.clientName},

Semoga Tuan/Puan sihat sejahtera. 

Saya ingin susulan mengenai dokumen permohonan pelan ${apt.planInterest}. Boleh kongsikan dokumen / salinan yang diperlukan agar saya boleh bantu proses pendaftaran segera secara digital?

Terima kasih atas kepercayaan kepada kami di GPlus Management. 
- ${consultant.name}`;
  };

  const handleSendReminderWhatsApp = () => {
    if (!selectedForReminder) return;
    const msg = generateReminderText(selectedForReminder, reminderTemplateType);
    const targetPhone = formatWhatsAppNumber(selectedForReminder.clientPhone);
    
    // Mark as reminder sent
    setAppointments(appointments.map(a => 
      a.id === selectedForReminder.id ? { ...a, reminderSent: true } : a
    ));

    window.open(`https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`, '_blank');
    setIsReminderModalOpen(false);
  };

  // Filtered Appointments
  const todayStr = new Date().toISOString().split('T')[0];

  const filteredAppointments = appointments.filter((apt) => {
    // Search filter
    const matchesSearch = 
      apt.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.clientPhone.includes(searchQuery) ||
      apt.planInterest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.notes.toLowerCase().includes(searchQuery.toLowerCase());

    // Date filter (from calendar day click)
    const matchesDate = selectedDateFilter ? apt.date === selectedDateFilter : true;

    // Status filter
    let matchesStatus = true;
    if (statusFilter === 'today') {
      matchesStatus = apt.date === todayStr;
    } else if (statusFilter === 'upcoming') {
      matchesStatus = apt.date >= todayStr && apt.status === 'scheduled';
    } else if (statusFilter === 'followup_needed') {
      matchesStatus = apt.status === 'followup_needed' || (!apt.reminderSent && apt.date === todayStr);
    } else if (statusFilter === 'completed') {
      matchesStatus = apt.status === 'completed';
    }

    return matchesSearch && matchesDate && matchesStatus;
  });

  // Export to CSV / Text
  const handleExportCSV = () => {
    const headers = 'Nama Klien,No Telefon,Pelan GETB,Jenis Temujanji,Tarikh,Masa,Mod,Lokasi,Status,Nota\n';
    const rows = appointments.map(a => 
      `"${a.clientName}","${a.clientPhone}","${a.planInterest}","${a.typeLabel}","${a.date}","${a.time}","${a.meetingMode}","${a.locationOrLink}","${a.status}","${a.notes.replace(/"/g, '""')}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `temujanji_getb_maybellin_${todayStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Stats
  const totalCount = appointments.length;
  const todayCount = appointments.filter(a => a.date === todayStr).length;
  const scheduledCount = appointments.filter(a => a.status === 'scheduled' && a.date >= todayStr).length;
  const completedCount = appointments.filter(a => a.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Top Banner & Stats */}
      <div className="bg-gradient-to-r from-rose-700 via-red-600 to-rose-900 rounded-3xl p-6 sm:p-7 text-white shadow-lg border border-rose-600/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-rose-100 text-xs font-bold uppercase tracking-wider mb-2">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Sistem Kalendar Temujanji &amp; Peringatan WhatsApp</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Kalendar Temujanji Klien Maybellin Yow
            </h2>
            <p className="text-xs sm:text-sm text-rose-100 mt-1 max-w-xl">
              Rangka jadual temu duga, rekod konsultasi Takaful, dan hantar peringatan follow-up automatik ke WhatsApp klien dalam 1 klik.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleOpenAddModal()}
              className="px-4 py-2.5 rounded-xl bg-white text-rose-700 font-bold text-xs shadow-md hover:bg-rose-50 transition-all flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Temujanji Baru</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2.5 rounded-xl bg-rose-800/80 hover:bg-rose-800 border border-rose-400/40 text-white text-xs font-semibold transition-all flex items-center space-x-1.5"
              title="Muat Turun Rekod Temujanji (CSV)"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Eksport CSV</span>
            </button>
          </div>
        </div>

        {/* Quick KPI stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-rose-500/40">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-xs">
            <div className="text-[10px] text-rose-200 uppercase font-bold tracking-wider">Temujanji Hari Ini</div>
            <div className="text-2xl font-heading font-extrabold text-white mt-0.5">{todayCount}</div>
          </div>
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-xs">
            <div className="text-[10px] text-rose-200 uppercase font-bold tracking-wider">Akan Datang</div>
            <div className="text-2xl font-heading font-extrabold text-white mt-0.5">{scheduledCount}</div>
          </div>
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-xs">
            <div className="text-[10px] text-rose-200 uppercase font-bold tracking-wider">Selesai Ditutup</div>
            <div className="text-2xl font-heading font-extrabold text-white mt-0.5">{completedCount}</div>
          </div>
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-xs">
            <div className="text-[10px] text-rose-200 uppercase font-bold tracking-wider">Jumlah Rekod</div>
            <div className="text-2xl font-heading font-extrabold text-white mt-0.5">{totalCount}</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Calendar on Left, List on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Interactive Calendar Widget */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-heading font-extrabold text-base text-slate-900">
                {monthNames[month]} {year}
              </h3>
              <p className="text-[11px] text-slate-400">Klik tarikh untuk tapis temujanji</p>
            </div>

            <div className="flex items-center space-x-1.5">
              <button
                onClick={handlePrevMonth}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                title="Bulan Sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleTodayMonth}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors"
              >
                Hari Ini
              </button>
              <button
                onClick={handleNextMonth}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                title="Bulan Seterusnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Calendar Grid Header (Days of week) */}
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 uppercase tracking-wider py-1">
            <span>Aha</span>
            <span>Isn</span>
            <span>Sel</span>
            <span>Rab</span>
            <span>Kha</span>
            <span>Jum</span>
            <span>Sab</span>
          </div>

          {/* Calendar Day Cells */}
          <div className="grid grid-cols-7 gap-1">
            {/* Blank leading days */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`blank-${i}`} className="h-10 rounded-xl bg-transparent" />
            ))}

            {/* Days of current month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
              const isToday = dateStr === todayStr;
              const isSelected = selectedDateFilter === dateStr;
              
              // Appointments on this day
              const dayApts = appointments.filter(a => a.date === dateStr);
              const hasApts = dayApts.length > 0;

              return (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDateFilter(isSelected ? null : dateStr)}
                  className={`h-10 rounded-xl flex flex-col items-center justify-center relative transition-all text-xs font-medium ${
                    isSelected
                      ? 'bg-rose-600 text-white font-bold shadow-md shadow-rose-200'
                      : isToday
                      ? 'bg-rose-50 text-rose-700 font-bold border border-rose-300'
                      : hasApts
                      ? 'bg-slate-50 hover:bg-rose-50 text-slate-800'
                      : 'hover:bg-slate-50 text-slate-600'
                  }`}
                >
                  <span>{dayNum}</span>
                  {hasApts && (
                    <span className="flex space-x-0.5 mt-0.5">
                      {dayApts.slice(0, 3).map((_, dotIdx) => (
                        <span
                          key={dotIdx}
                          className={`w-1 h-1 rounded-full ${
                            isSelected ? 'bg-white' : 'bg-rose-500'
                          }`}
                        />
                      ))}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected Date Notice */}
          {selectedDateFilter && (
            <div className="p-3 bg-rose-50 rounded-2xl border border-rose-100 flex items-center justify-between text-xs">
              <span className="text-rose-800 font-semibold">
                Tapisan Tarikh: <strong>{selectedDateFilter}</strong>
              </span>
              <button
                onClick={() => setSelectedDateFilter(null)}
                className="text-rose-600 hover:underline font-bold text-[11px]"
              >
                Papar Semua
              </button>
            </div>
          )}

          {/* Quick Action: Add on selected date */}
          <button
            onClick={() => handleOpenAddModal(selectedDateFilter || todayStr)}
            className="w-full py-2.5 px-3 rounded-2xl border border-dashed border-rose-300 hover:border-rose-500 hover:bg-rose-50/50 text-rose-700 text-xs font-bold transition-all flex items-center justify-center space-x-2"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Temujanji Pada {selectedDateFilter || 'Hari Ini'}</span>
          </button>
        </div>

        {/* Right Side: Appointment List & Reminder Controls */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'Semua' },
                { id: 'today', label: 'Hari Ini' },
                { id: 'upcoming', label: 'Akan Datang' },
                { id: 'followup_needed', label: 'Perlu Follow-up' },
                { id: 'completed', label: 'Selesai' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setStatusFilter(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    statusFilter === f.id
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Cari nama atau no tel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-48 pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
            </div>
          </div>

          {/* List of Appointments */}
          <div className="space-y-3.5 max-h-[580px] overflow-y-auto pr-1">
            {filteredAppointments.length === 0 ? (
              <div className="p-10 text-center text-slate-400">
                <CalendarIcon className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                <p className="text-xs font-medium">Tiada temujanji dijumpai mengikut tapisan ini.</p>
                <button
                  onClick={() => handleOpenAddModal(selectedDateFilter || todayStr)}
                  className="mt-3 px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-xs hover:bg-rose-700"
                >
                  + Tambah Temujanji Klien
                </button>
              </div>
            ) : (
              filteredAppointments.map((apt) => {
                const isToday = apt.date === todayStr;
                const isPast = apt.date < todayStr;

                return (
                  <div
                    key={apt.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isToday
                        ? 'border-rose-400 bg-rose-50/20 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {apt.typeLabel}
                        </span>
                        {isToday && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-rose-600 text-white animate-pulse">
                            HARI INI
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                            apt.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : apt.status === 'followup_needed'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {apt.status === 'completed' ? 'Selesai' : apt.status === 'followup_needed' ? 'Perlu Follow-up' : 'Dijadualkan'}
                        </span>
                      </div>

                      {/* Reminder status badge */}
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full flex items-center space-x-1 ${
                          apt.reminderSent
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {apt.reminderSent ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span>Peringatan Dihantar</span>
                          </>
                        ) : (
                          <span>Belum Diperingatkan</span>
                        )}
                      </span>
                    </div>

                    {/* Client Name & Product */}
                    <div className="mb-2">
                      <h4 className="font-heading font-bold text-base text-slate-900">{apt.clientName}</h4>
                      <p className="text-xs text-rose-700 font-semibold">{apt.planInterest}</p>
                    </div>

                    {/* DateTime & Location details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 mb-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <div className="flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span><strong>{apt.date}</strong> pada <strong>{apt.time}</strong></span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        {apt.meetingMode === 'face_to_face' ? (
                          <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        ) : apt.meetingMode === 'online_zoom' ? (
                          <Video className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        ) : (
                          <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        )}
                        <span className="truncate">{apt.locationOrLink}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 sm:col-span-2">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Tel: <strong>{formatDisplayPhone(apt.clientPhone)}</strong></span>
                      </div>
                    </div>

                    {/* Notes */}
                    {apt.notes && (
                      <p className="text-[11px] text-slate-500 italic mb-3 bg-white p-2 rounded-lg border border-slate-100">
                        "{apt.notes}"
                      </p>
                    )}

                    {/* Action Buttons: WhatsApp Reminder, Edit, Delete */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => handleOpenReminderModal(apt)}
                        className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-xs transition-all flex items-center space-x-1.5"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Hantar Reminder WhatsApp</span>
                      </button>

                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleOpenEditModal(apt)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                          title="Kemaskini Temujanji"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAppointment(apt.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Padam Temujanji"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* MODAL: Tambah / Kemaskini Temujanji */}
      {isFormModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-rose-700 to-red-600 px-6 py-4 text-white flex items-center justify-between">
              <h3 className="font-heading font-bold text-lg">
                {editingAppointment ? 'Kemaskini Temujanji Klien' : 'Tambah Temujanji Klien Baru'}
              </h3>
              <button
                onClick={() => setIsFormModalOpen(false)}
                className="p-1 rounded-lg text-rose-100 hover:text-white hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAppointment} className="p-6 space-y-4 text-slate-700 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Penuh Klien / Prospek:</label>
                <input
                  type="text"
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="cth: Encik Kamaruddin & Isteri"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">No WhatsApp / Telefon:</label>
                  <input
                    type="text"
                    required
                    value={formData.clientPhone}
                    onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                    placeholder="cth: 012-3456789"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jenis Temujanji:</label>
                  <select
                    value={formData.appointmentType}
                    onChange={(e) => setFormData({ ...formData, appointmentType: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-xs bg-white"
                  >
                    <option value="consultation">Konsultasi Pelan Takaful Baru</option>
                    <option value="followup_quotation">Susulan Sebut Harga (Follow-up)</option>
                    <option value="policy_delivery">Penyerahan Sijil Polisi</option>
                    <option value="review">Semakan Polisi Tahunan</option>
                    <option value="claim">Bantuan Tuntutan & Hospital</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Pelan GETB Yang Diminati:</label>
                <select
                  value={formData.planInterest}
                  onChange={(e) => setFormData({ ...formData, planInterest: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-xs bg-white"
                >
                  {GETB_PRODUCTS.map((p) => (
                    <option key={p.id} value={`${p.name}`}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tarikh Temujanji:</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Masa:</label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mod Temujanji:</label>
                  <select
                    value={formData.meetingMode}
                    onChange={(e) => setFormData({ ...formData, meetingMode: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-xs bg-white"
                  >
                    <option value="face_to_face">Bersemuka (Face-to-face)</option>
                    <option value="online_zoom">Atas Talian (Zoom / Google Meet)</option>
                    <option value="phone_call">Panggilan Telefon / WhatsApp</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status:</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-xs bg-white"
                  >
                    <option value="scheduled">Dijadualkan (Akan Datang)</option>
                    <option value="completed">Selesai (Completed)</option>
                    <option value="followup_needed">Perlu Follow-up</option>
                    <option value="rescheduled">Ditangguhkan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Lokasi / Pautan Meeting:</label>
                <input
                  type="text"
                  value={formData.locationOrLink}
                  onChange={(e) => setFormData({ ...formData, locationOrLink: e.target.value })}
                  placeholder="cth: Pejabat GPlus Management / Kafeteria / meet.google.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Catatan Penting:</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="cth: Bajet sekitar RM200/bulan, pentingkan Hibah nafkah anak..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsFormModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-md shadow-rose-200"
                >
                  {editingAppointment ? 'Simpan Perubahan' : 'Daftar Temujanji'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Peringatan / Follow-Up WhatsApp */}
      {isReminderModalOpen && selectedForReminder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-emerald-700 to-teal-600 px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Send className="w-5 h-5" />
                <h3 className="font-heading font-bold text-lg">Peringatan WhatsApp Klien</h3>
              </div>
              <button
                onClick={() => setIsReminderModalOpen(false)}
                className="p-1 rounded-lg text-emerald-100 hover:text-white hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div>
                <span className="text-slate-400 block text-[11px]">Klien Dipilih:</span>
                <span className="font-bold text-base text-slate-900">{selectedForReminder.clientName}</span>
                <span className="text-slate-500 block">WhatsApp: {formatDisplayPhone(selectedForReminder.clientPhone)}</span>
              </div>

              {/* Template selector */}
              <div>
                <label className="block font-bold text-slate-700 mb-2">Pilih Templat Mesej WhatsApp:</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: '24h', label: 'Peringatan 24 Jam (Esok)' },
                    { id: '2h', label: 'Peringatan 2 Jam Sebelum' },
                    { id: 'followup_quote', label: 'Susulan Sebut Harga' },
                    { id: 'followup_docs', label: 'Susulan Dokumen / Borang' },
                  ].map((tpl) => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => setReminderTemplateType(tpl.id as any)}
                      className={`p-2.5 rounded-xl border text-left font-semibold transition-all ${
                        reminderTemplateType === tpl.id
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/20'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {tpl.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom note option */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nota Tambahan Pada Mesej (Pilihan):</label>
                <input
                  type="text"
                  value={customReminderNote}
                  onChange={(e) => setCustomReminderNote(e.target.value)}
                  placeholder="cth: Sila bawa bersama salinan IC pasangan..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Preview of text */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Pratonton Mesej WhatsApp:</label>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 font-sans text-xs text-slate-800 leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {generateReminderText(selectedForReminder, reminderTemplateType)}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsReminderModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-medium"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSendReminderWhatsApp}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-200 flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Buka &amp; Hantar di WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
