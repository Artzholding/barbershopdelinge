import { Star, ChevronLeft, ChevronRight, MessageSquarePlus } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import ReviewForm from './ReviewForm';
import { getApprovedReviews, addReview, getReviewStats } from '../lib/reviewStorage';
import { fetchGoogleReviews, formatGoogleReviewForDisplay } from '../lib/googleReviews';
import type { Review } from '../lib/reviewStorage';

export default function Reviews() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState({ totalReviews: 0, averageRating: '0', googleRating: 0 });
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    // Load local reviews
    const approvedReviews = getApprovedReviews();

    // Try to load Google reviews
    setIsLoadingGoogle(true);
    let allReviews = [...approvedReviews];
    let googleData = null;

    try {
      googleData = await fetchGoogleReviews();

      if (googleData?.reviews) {
        const formattedGoogleReviews = googleData.reviews.map(formatGoogleReviewForDisplay);
        allReviews = [...formattedGoogleReviews, ...approvedReviews];
      }
    } catch (error) {
      console.error('Failed to load Google reviews:', error);
    }

    setIsLoadingGoogle(false);
    setReviews(allReviews);

    // Calculate stats
    const localStats = getReviewStats();
    setStats({
      totalReviews: googleData?.user_ratings_total || localStats.totalReviews,
      averageRating: googleData?.rating ? googleData.rating.toFixed(1) : localStats.averageRating,
      googleRating: googleData?.rating || 0,
    });
  };

  const handleSubmitReview = (reviewData: {
    name: string;
    email: string;
    rating: number;
    text: string;
  }) => {
    addReview(reviewData);
    loadReviews();
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">ONZE REVIEWS</h2>
          <div className="w-20 sm:w-24 h-1 bg-amber-700 mx-auto mb-4"></div>
          <p className="text-base sm:text-lg text-gray-600">Wat onze klanten over ons zeggen</p>
        </div>
        <div className="flex flex-col md:flex-row items-start gap-6 sm:gap-8 mb-8">
          <div className="flex-shrink-0 w-full md:w-auto bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">UITSTEKEND</h3>
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-yellow-400 fill-yellow-400" size={24} />
              ))}
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Gebaseerd op {stats.totalReviews} recensies
            </p>
            <img
              src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
              alt="Google"
              className="h-8 sm:h-10 mb-4"
            />
            <button
              onClick={() => setShowForm(true)}
              className="w-full bg-amber-700 text-white px-4 py-3 text-sm font-bold uppercase hover:bg-amber-800 transition-colors flex items-center justify-center gap-2 shadow-md rounded-sm"
            >
              <MessageSquarePlus size={18} />
              Review schrijven
            </button>
          </div>

          <div className="flex-1 relative w-full overflow-hidden">
            <button
              onClick={() => scroll('left')}
              className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl text-gray-800 p-2 rounded-full transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>

            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="flex-shrink-0 w-72 sm:w-80 bg-white border border-gray-200 rounded-lg p-5 sm:p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {review.profilePhoto ? (
                        <img
                          src={review.profilePhoto}
                          alt={review.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                          {review.avatar}
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{review.name}</h4>
                        <p className="text-xs text-gray-500">{review.date}</p>
                      </div>
                    </div>
                    {review.source === 'google' && (
                      <img
                        src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                        alt="Google"
                        className="h-4"
                      />
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="text-yellow-400 fill-yellow-400" size={16} />
                      ))}
                    </div>
                    {review.verified && (
                      <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    )}
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed">
                    {review.text}
                  </p>
                  {review.expandText && (
                    <button className="text-sm text-blue-600 hover:underline mt-2">
                      {review.expandText}
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => scroll('right')}
              className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg hover:shadow-xl text-gray-800 p-2 rounded-full transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <ReviewForm
          onSubmit={handleSubmitReview}
          onClose={() => setShowForm(false)}
        />
      )}
    </section>
  );
}
