export interface ConsultantInfo {
  name: string;
  agencyName: string;
  phone: string;
  email: string;
  code: string;
  location: string;
}

export type PortalMode = 'customer' | 'agent-suite';

export type AgentTab = 
  | 'product-study'
  | 'target-market'
  | 'social-content'
  | 'objection-handler'
  | 'campaign-creative'
  | 'calendar'
  | 'coach-chat';

export interface QuotationState {
  age: number;
  gender: 'male' | 'female';
  smoker: 'non-smoker' | 'smoker';
  occupationClass: 1 | 2 | 3 | 4;
  planType: 'hibah' | 'medical' | 'savings' | 'ci';
  sumCovered: number; // e.g., 250000
  medicalRoomRate: number; // e.g., 200 or 300
}

export interface ClientAppointment {
  id: string;
  clientName: string;
  clientPhone: string;
  planInterest: string;
  appointmentType: 'consultation' | 'followup_quotation' | 'policy_delivery' | 'review' | 'claim';
  typeLabel: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  meetingMode: 'face_to_face' | 'online_zoom' | 'phone_call';
  locationOrLink: string;
  status: 'scheduled' | 'completed' | 'followup_needed' | 'rescheduled';
  notes: string;
  reminderSent: boolean;
  createdAt: string;
}

/**
 * Sanitizes phone number to valid international WhatsApp format without spaces/dashes (e.g. 60166638526)
 */
export function formatWhatsAppNumber(phone: string): string {
  const digits = (phone || '').replace(/\D/g, '');
  if (digits.startsWith('0')) {
    return '60' + digits.slice(1);
  }
  if (!digits.startsWith('60') && digits.length > 0) {
    return '60' + digits;
  }
  return digits || '60166638526';
}

/**
 * Formats phone number for clean readable display (e.g. 016-6638526)
 */
export function formatDisplayPhone(phone: string): string {
  const clean = (phone || '').trim();
  if (clean.includes('-')) return clean;
  if (clean.startsWith('601')) {
    return '0' + clean.slice(2, 4) + '-' + clean.slice(4);
  }
  if (clean.startsWith('01') && clean.length >= 10) {
    return clean.slice(0, 3) + '-' + clean.slice(3);
  }
  return clean;
}
