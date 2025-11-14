/*
  # Add Media Type Support to Gallery

  1. Changes
    - Add `media_type` column to `gallery_images` table
      - Type: text with enum constraint ('image' or 'video')
      - Default: 'image' for backward compatibility
      - Not null
    - Add check constraint to ensure only valid media types
    - Update existing RLS policies (no changes needed, they work for both types)
    - Add index on `media_type` for efficient filtering

  2. Notes
    - Existing records default to 'image' type
    - Videos can be stored as URLs (YouTube/Vimeo embeds or direct video URLs)
    - The `url` field now supports both image URLs and video URLs
    - The `title` field serves the same purpose for both media types
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'gallery_images' AND column_name = 'media_type'
  ) THEN
    ALTER TABLE gallery_images ADD COLUMN media_type text NOT NULL DEFAULT 'image';
    
    ALTER TABLE gallery_images ADD CONSTRAINT gallery_images_media_type_check 
      CHECK (media_type IN ('image', 'video'));
    
    CREATE INDEX IF NOT EXISTS idx_gallery_images_media_type ON gallery_images(media_type);
  END IF;
END $$;