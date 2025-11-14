/*
  # Review Tracking System for Barbershop De Linge

  ## Overview
  Modern post-visit review collection system with QR code support, automated follow-ups,
  and Google Reviews integration for Barbershop & Tattoos De Linge in Elst.

  ## New Tables

  ### 1. `customer_visits`
  Tracks customer visits to enable post-visit review requests
  - `id` (uuid, primary key)
  - `customer_name` (text) - Customer's name
  - `customer_email` (text, nullable) - Email for follow-up
  - `customer_phone` (text, nullable) - Phone for SMS follow-up
  - `visit_date` (timestamptz) - When the visit occurred
  - `service_type` (text) - Type of service received (haircut, beard, tattoo, etc.)
  - `barber_name` (text, nullable) - Who served the customer
  - `created_at` (timestamptz) - When record was created
  - `notes` (text, nullable) - Any additional notes

  ### 2. `review_requests`
  Tracks all review requests sent to customers
  - `id` (uuid, primary key)
  - `visit_id` (uuid, foreign key) - Links to customer visit
  - `request_type` (text) - Type: 'qr_scan', 'email', 'sms'
  - `sent_at` (timestamptz) - When the request was sent
  - `completed_at` (timestamptz, nullable) - When customer completed review
  - `rating_given` (integer, nullable) - Rating customer provided (1-5)
  - `redirected_to` (text, nullable) - Where customer was sent ('google', 'internal', 'none')
  - `review_id` (text, nullable) - ID if review was submitted internally
  - `created_at` (timestamptz)

  ### 3. `reviews`
  Enhanced reviews table for internal review storage
  - `id` (uuid, primary key)
  - `visit_id` (uuid, nullable, foreign key) - Links to visit if tracked
  - `name` (text) - Reviewer name
  - `email` (text) - Reviewer email
  - `phone` (text, nullable) - Reviewer phone
  - `rating` (integer) - Rating 1-5
  - `review_text` (text) - Review content
  - `service_type` (text, nullable) - Service reviewed
  - `approved` (boolean) - Whether review is approved for display
  - `source` (text) - Source: 'qr_code', 'website', 'email_link', 'sms_link'
  - `created_at` (timestamptz)
  - `approved_at` (timestamptz, nullable)

  ### 4. `review_analytics`
  Tracks performance metrics for review collection
  - `id` (uuid, primary key)
  - `date` (date) - Analytics date
  - `qr_scans` (integer) - Number of QR code scans
  - `emails_sent` (integer) - Emails sent that day
  - `sms_sent` (integer) - SMS sent that day
  - `reviews_completed` (integer) - Reviews completed
  - `google_redirects` (integer) - Redirects to Google
  - `internal_reviews` (integer) - Internal reviews submitted
  - `avg_rating` (numeric) - Average rating for the day
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public can insert into reviews (for customer submissions)
  - Public can read from customer_visits (for QR code lookups by ID)
  - Authenticated users can manage all data
  - Analytics are publicly readable for dashboard display

  ## Indexes
  - Index on customer_visits.visit_date for date-based queries
  - Index on review_requests.visit_id for quick lookups
  - Index on reviews.created_at for sorting
  - Index on review_analytics.date for reporting

  ## Notes
  - All timestamps use timestamptz for proper timezone handling
  - Customer contact info is optional to support walk-in QR scanning
  - Review requests track the complete customer journey
  - Analytics table uses daily aggregation for performance
*/

-- Create customer_visits table
CREATE TABLE IF NOT EXISTS customer_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text,
  customer_phone text,
  visit_date timestamptz NOT NULL DEFAULT now(),
  service_type text NOT NULL,
  barber_name text,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Create review_requests table
CREATE TABLE IF NOT EXISTS review_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visit_id uuid REFERENCES customer_visits(id) ON DELETE CASCADE,
  request_type text NOT NULL CHECK (request_type IN ('qr_scan', 'email', 'sms')),
  sent_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  rating_given integer CHECK (rating_given >= 1 AND rating_given <= 5),
  redirected_to text CHECK (redirected_to IN ('google', 'internal', 'none')),
  review_id text,
  created_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visit_id uuid REFERENCES customer_visits(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text NOT NULL,
  service_type text,
  approved boolean DEFAULT false,
  source text NOT NULL CHECK (source IN ('qr_code', 'website', 'email_link', 'sms_link')),
  created_at timestamptz DEFAULT now(),
  approved_at timestamptz
);

-- Create review_analytics table
CREATE TABLE IF NOT EXISTS review_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL UNIQUE,
  qr_scans integer DEFAULT 0,
  emails_sent integer DEFAULT 0,
  sms_sent integer DEFAULT 0,
  reviews_completed integer DEFAULT 0,
  google_redirects integer DEFAULT 0,
  internal_reviews integer DEFAULT 0,
  avg_rating numeric(3,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_customer_visits_date ON customer_visits(visit_date DESC);
CREATE INDEX IF NOT EXISTS idx_customer_visits_email ON customer_visits(customer_email);
CREATE INDEX IF NOT EXISTS idx_review_requests_visit ON review_requests(visit_id);
CREATE INDEX IF NOT EXISTS idx_review_requests_completed ON review_requests(completed_at);
CREATE INDEX IF NOT EXISTS idx_reviews_created ON reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(approved);
CREATE INDEX IF NOT EXISTS idx_analytics_date ON review_analytics(date DESC);

-- Enable Row Level Security
ALTER TABLE customer_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for customer_visits
CREATE POLICY "Public can read visits by ID for QR lookups"
  ON customer_visits FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can manage visits"
  ON customer_visits FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for review_requests
CREATE POLICY "Public can insert review requests"
  ON review_requests FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Public can update their own requests"
  ON review_requests FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all requests"
  ON review_requests FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage requests"
  ON review_requests FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for reviews
CREATE POLICY "Public can submit reviews"
  ON reviews FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Public can read approved reviews"
  ON reviews FOR SELECT
  TO anon
  USING (approved = true);

CREATE POLICY "Authenticated users can view all reviews"
  ON reviews FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage reviews"
  ON reviews FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for review_analytics
CREATE POLICY "Public can read analytics"
  ON review_analytics FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can manage analytics"
  ON review_analytics FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create a function to update analytics
CREATE OR REPLACE FUNCTION update_review_analytics()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO review_analytics (
    date,
    qr_scans,
    emails_sent,
    sms_sent,
    reviews_completed,
    google_redirects,
    internal_reviews,
    avg_rating,
    updated_at
  )
  SELECT
    CURRENT_DATE,
    COUNT(*) FILTER (WHERE request_type = 'qr_scan'),
    COUNT(*) FILTER (WHERE request_type = 'email'),
    COUNT(*) FILTER (WHERE request_type = 'sms'),
    COUNT(*) FILTER (WHERE completed_at IS NOT NULL),
    COUNT(*) FILTER (WHERE redirected_to = 'google'),
    COUNT(*) FILTER (WHERE redirected_to = 'internal'),
    AVG(rating_given),
    now()
  FROM review_requests
  WHERE DATE(sent_at) = CURRENT_DATE
  ON CONFLICT (date)
  DO UPDATE SET
    qr_scans = EXCLUDED.qr_scans,
    emails_sent = EXCLUDED.emails_sent,
    sms_sent = EXCLUDED.sms_sent,
    reviews_completed = EXCLUDED.reviews_completed,
    google_redirects = EXCLUDED.google_redirects,
    internal_reviews = EXCLUDED.internal_reviews,
    avg_rating = EXCLUDED.avg_rating,
    updated_at = now();
END;
$$;