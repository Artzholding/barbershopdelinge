export interface GoogleReview {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

export interface GooglePlaceDetails {
  name: string;
  rating: number;
  user_ratings_total: number;
  reviews: GoogleReview[];
}

export async function fetchGoogleReviews(): Promise<GooglePlaceDetails | null> {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const url = `${supabaseUrl}/functions/v1/google-reviews`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      console.warn('Google Reviews API:', data.error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return null;
  }
}

export function formatGoogleReviewForDisplay(review: GoogleReview) {
  return {
    id: `google-${review.time}`,
    name: review.author_name,
    avatar: review.author_name.charAt(0).toUpperCase(),
    rating: review.rating,
    text: review.text,
    date: review.relative_time_description,
    verified: true,
    source: 'google' as const,
    profilePhoto: review.profile_photo_url,
  };
}
