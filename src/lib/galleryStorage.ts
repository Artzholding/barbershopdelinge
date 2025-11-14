import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type MediaType = 'image' | 'video';

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  media_type: MediaType;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const defaultImages: GalleryImage[] = [];

export async function getActiveGalleryImages(): Promise<GalleryImage[]> {
  try {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching gallery images:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return [];
  }
}

export async function getAllGalleryImages(): Promise<GalleryImage[]> {
  try {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching all gallery images:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching all gallery images:', error);
    return [];
  }
}

export async function addGalleryImage(imageData: {
  url: string;
  title: string;
  media_type?: MediaType;
  display_order?: number;
}): Promise<GalleryImage | null> {
  try {
    const order = imageData.display_order ?? (await getNextDisplayOrder());

    const { data, error } = await supabase
      .from('gallery_images')
      .insert([
        {
          url: imageData.url,
          title: imageData.title,
          media_type: imageData.media_type ?? 'image',
          display_order: order,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error adding gallery image:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error adding gallery image:', error);
    return null;
  }
}

export async function updateGalleryImage(
  id: string,
  updates: Partial<Omit<GalleryImage, 'id' | 'created_at'>>
): Promise<GalleryImage | null> {
  try {
    const { data, error } = await supabase
      .from('gallery_images')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating gallery image:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error updating gallery image:', error);
    return null;
  }
}

export async function deleteGalleryImage(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('gallery_images')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting gallery image:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    return false;
  }
}

export async function toggleImageActive(id: string, isActive: boolean): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('gallery_images')
      .update({ is_active: isActive, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      console.error('Error toggling image active status:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error toggling image active status:', error);
    return false;
  }
}

export async function reorderImages(imageIds: string[]): Promise<boolean> {
  try {
    const updates = imageIds.map((id, index) => ({
      id,
      display_order: index + 1,
      updated_at: new Date().toISOString(),
    }));

    for (const update of updates) {
      const { error } = await supabase
        .from('gallery_images')
        .update({ display_order: update.display_order, updated_at: update.updated_at })
        .eq('id', update.id);

      if (error) {
        console.error('Error reordering images:', error);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Error reordering images:', error);
    return false;
  }
}

async function getNextDisplayOrder(): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('display_order')
      .order('display_order', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return 1;
    }

    return data.display_order + 1;
  } catch (error) {
    console.error('Error getting next display order:', error);
    return 1;
  }
}
