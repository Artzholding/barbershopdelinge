import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface CustomerVisit {
  id: string;
  customer_name: string;
  customer_email?: string;
  customer_phone?: string;
  visit_date: string;
  service_type: string;
  barber_name?: string;
  notes?: string;
  created_at: string;
}

export interface ReviewRequest {
  id: string;
  visit_id: string;
  request_type: 'qr_scan' | 'email' | 'sms';
  sent_at: string;
  completed_at?: string;
  rating_given?: number;
  redirected_to?: 'google' | 'internal' | 'none';
  review_id?: string;
  created_at: string;
}

export interface ReviewSubmission {
  id?: string;
  visit_id?: string;
  name: string;
  email: string;
  phone?: string;
  rating: number;
  review_text: string;
  service_type?: string;
  approved?: boolean;
  source: 'qr_code' | 'website' | 'email_link' | 'sms_link';
  created_at?: string;
}

export interface ReviewAnalytics {
  id: string;
  date: string;
  qr_scans: number;
  emails_sent: number;
  sms_sent: number;
  reviews_completed: number;
  google_redirects: number;
  internal_reviews: number;
  avg_rating: number;
  created_at: string;
  updated_at: string;
}
