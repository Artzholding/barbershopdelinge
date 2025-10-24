/*
  # Create Gallery Images Table

  1. New Tables
    - `gallery_images`
      - `id` (uuid, primary key) - Unique identifier for each image
      - `url` (text, not null) - URL or path to the image
      - `title` (text, not null) - Descriptive title for the image
      - `display_order` (integer, not null, default 0) - Order in which images should be displayed
      - `is_active` (boolean, not null, default true) - Whether the image is currently visible in the gallery
      - `created_at` (timestamptz, default now()) - Timestamp when the image was added
      - `updated_at` (timestamptz, default now()) - Timestamp when the image was last updated

  2. Security
    - Enable RLS on `gallery_images` table
    - Add policy for public to read active gallery images
    - Add policy for authenticated users to manage gallery images (for admin functionality)

  3. Indexes
    - Add index on `display_order` for efficient sorting
    - Add index on `is_active` for filtering active images

  4. Notes
    - Images are ordered by `display_order` ascending (lower numbers appear first)
    - Inactive images are hidden from public view but not deleted
    - Future admin interface will allow reordering via drag-and-drop
*/

CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  title text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active gallery images"
  ON gallery_images
  FOR SELECT
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert gallery images"
  ON gallery_images
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update gallery images"
  ON gallery_images
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete gallery images"
  ON gallery_images
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_gallery_images_display_order ON gallery_images(display_order);
CREATE INDEX IF NOT EXISTS idx_gallery_images_is_active ON gallery_images(is_active);

INSERT INTO gallery_images (url, title, display_order, is_active) VALUES
  ('/baardverzorging-kapper-elst.png', 'Baardverzorging Kapper Elst', 1, true),
  ('/Schermafbeelding 2025-10-21 121023.png', 'Fade Knippen en Baardverzorging', 2, true),
  ('/Schermafbeelding 2025-10-14 112538.png', 'Premium Herenkapsels', 3, true),
  ('/Schermafbeelding 2025-10-14 112433.png', 'Moderne Fade en Baard Styling', 4, true),
  ('/files_1118539-1761227629877-Schermafbeelding 2025-10-21 121047.png', 'Professionele Baardverzorging', 5, true),
  ('/files_1118539-1761228775870-kapper elst a.png', 'Professionele Herenkapper Service', 6, true),
  ('/files_1118539-1761228775919-Schermafbeelding 2025-10-21 121012.png', 'Moderne Fade Haircut', 7, true)
ON CONFLICT DO NOTHING;