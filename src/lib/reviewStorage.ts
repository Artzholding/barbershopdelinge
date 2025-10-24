export interface Review {
  id: string;
  name: string;
  email: string;
  rating: number;
  text: string;
  avatar: string;
  verified: boolean;
  approved: boolean;
  date: string;
  expandText?: string;
}

const STORAGE_KEY = 'barbershop_elst_reviews';

export const defaultReviews: Review[] = [
  {
    id: '1',
    name: 'Soufian el Ghalbzouri',
    email: 'customer@example.com',
    date: '2025-01-02',
    rating: 5,
    text: 'Heel transparant in het werk dat ze uitvoeren',
    avatar: 'S',
    verified: true,
    approved: true,
  },
  {
    id: '2',
    name: 'Ali Hero',
    email: 'customer@example.com',
    date: '2024-12-28',
    rating: 5,
    text: 'im from India i ned working im men s hair stylish I have 4 years of experience',
    avatar: 'A',
    verified: true,
    approved: true,
  },
  {
    id: '3',
    name: 'J Santos',
    email: 'customer@example.com',
    date: '2024-11-23',
    rating: 5,
    text: 'A hidden gem of a barbershop complete with awesome owners, great barbers and high quality men\'s products of all kinds. Have been...',
    avatar: 'J',
    verified: true,
    approved: true,
    expandText: 'Lees verder',
  },
  {
    id: '4',
    name: 'Stefan Brunnlechner',
    email: 'customer@example.com',
    date: '2024-08-28',
    rating: 5,
    text: 'Excellent beard service for a great price! Super clean razor shaving with a nice skin care routine.',
    avatar: 'SB',
    verified: true,
    approved: true,
  },
  {
    id: '5',
    name: 'Gilbert Areola',
    email: 'customer@example.com',
    date: '2025-01-24',
    rating: 4,
    text: 'Pas mal de coiffeur au pays mais je veux vous dire que ce lieu est THE PLACE TO BE ! Service professionel et un personnel tres...',
    avatar: 'G',
    verified: true,
    approved: true,
  },
];

export function getAllReviews(): Review[] {
  if (typeof window === 'undefined') return defaultReviews;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultReviews));
      return defaultReviews;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading reviews:', error);
    return defaultReviews;
  }
}

export function getApprovedReviews(): Review[] {
  const allReviews = getAllReviews();
  return allReviews.filter(review => review.approved);
}

export function addReview(reviewData: {
  name: string;
  email: string;
  rating: number;
  text: string;
}): Review {
  const reviews = getAllReviews();

  const newReview: Review = {
    id: Date.now().toString(),
    name: reviewData.name,
    email: reviewData.email,
    rating: reviewData.rating,
    text: reviewData.text,
    avatar: reviewData.name.charAt(0).toUpperCase(),
    verified: false,
    approved: false,
    date: new Date().toISOString().split('T')[0],
  };

  const updatedReviews = [newReview, ...reviews];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReviews));

  return newReview;
}

export function approveReview(reviewId: string): void {
  const reviews = getAllReviews();
  const updatedReviews = reviews.map(review =>
    review.id === reviewId ? { ...review, approved: true } : review
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReviews));
}

export function deleteReview(reviewId: string): void {
  const reviews = getAllReviews();
  const updatedReviews = reviews.filter(review => review.id !== reviewId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReviews));
}

export function getReviewStats() {
  const reviews = getApprovedReviews();
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
    : 0;

  return {
    totalReviews,
    averageRating: averageRating.toFixed(1),
  };
}
