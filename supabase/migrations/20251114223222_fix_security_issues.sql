/*
  # Fix Security and Performance Issues

  ## Changes Made

  1. **Add Missing Index**
     - Add index for `reviews.visit_id` foreign key for better query performance

  2. **Remove Unused Indexes**
     - Remove indexes that are not being used to reduce overhead
     - Keep only essential indexes that improve actual query performance

  3. **Fix Duplicate RLS Policies**
     - Consolidate multiple permissive policies into single policies
     - Remove redundant policies for authenticated users

  4. **Fix Function Security**
     - Set immutable search_path on function to prevent security issues

  ## Security Improvements
  - Prevents potential SQL injection through search_path manipulation
  - Reduces policy complexity for better maintainability
  - Improves query performance with proper indexing
  - Removes unused indexes to reduce storage and update overhead
*/

-- Add missing index for foreign key
CREATE INDEX IF NOT EXISTS idx_reviews_visit_id ON reviews(visit_id);

-- Remove unused indexes
DROP INDEX IF EXISTS idx_customer_visits_date;
DROP INDEX IF EXISTS idx_customer_visits_email;
DROP INDEX IF EXISTS idx_review_requests_visit;
DROP INDEX IF EXISTS idx_review_requests_completed;
DROP INDEX IF EXISTS idx_reviews_created;
DROP INDEX IF EXISTS idx_reviews_approved;
DROP INDEX IF EXISTS idx_analytics_date;
DROP INDEX IF EXISTS idx_gallery_images_media_type;

-- Fix duplicate RLS policies for review_requests
DROP POLICY IF EXISTS "Authenticated users can manage requests" ON review_requests;
DROP POLICY IF EXISTS "Authenticated users can view all requests" ON review_requests;

CREATE POLICY "Authenticated users full access to review_requests"
  ON review_requests
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Fix duplicate RLS policies for reviews
DROP POLICY IF EXISTS "Authenticated users can manage reviews" ON reviews;
DROP POLICY IF EXISTS "Authenticated users can view all reviews" ON reviews;

CREATE POLICY "Authenticated users full access to reviews"
  ON reviews
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Fix function search_path security issue
DROP FUNCTION IF EXISTS update_review_analytics();

CREATE OR REPLACE FUNCTION update_review_analytics()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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