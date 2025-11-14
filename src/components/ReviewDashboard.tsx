import { useState, useEffect } from 'react';
import { BarChart3, Users, Star, TrendingUp, Check, X, Eye, Calendar, QrCode, Mail, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface DashboardStats {
  totalVisits: number;
  pendingReviews: number;
  completedReviews: number;
  averageRating: number;
  googleRedirects: number;
  conversionRate: number;
}

interface Review {
  id: string;
  name: string;
  email: string;
  rating: number;
  review_text: string;
  service_type: string;
  source: string;
  created_at: string;
  approved: boolean;
}

interface Visit {
  id: string;
  customer_name: string;
  customer_email?: string;
  service_type: string;
  visit_date: string;
  barber_name?: string;
}

export default function ReviewDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'visits'>('overview');
  const [stats, setStats] = useState<DashboardStats>({
    totalVisits: 0,
    pendingReviews: 0,
    completedReviews: 0,
    averageRating: 0,
    googleRedirects: 0,
    conversionRate: 0,
  });
  const [reviews, setReviews] = useState<Review[]>([]);
  const [visits, setVisits] = useState<Visit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const { data: visitsData } = await supabase
        .from('customer_visits')
        .select('*')
        .order('visit_date', { ascending: false })
        .limit(50);

      const { data: reviewsData } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: requestsData } = await supabase
        .from('review_requests')
        .select('*');

      const totalVisits = visitsData?.length || 0;
      const completedReviews = reviewsData?.length || 0;
      const pendingReviews = reviewsData?.filter(r => !r.approved).length || 0;
      const googleRedirects = requestsData?.filter(r => r.redirected_to === 'google').length || 0;
      const avgRating = reviewsData && reviewsData.length > 0
        ? reviewsData.reduce((sum, r) => sum + r.rating, 0) / reviewsData.length
        : 0;
      const conversionRate = totalVisits > 0
        ? ((completedReviews + googleRedirects) / totalVisits) * 100
        : 0;

      setStats({
        totalVisits,
        pendingReviews,
        completedReviews,
        averageRating: avgRating,
        googleRedirects,
        conversionRate,
      });

      setReviews(reviewsData || []);
      setVisits(visitsData || []);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const approveReview = async (reviewId: string) => {
    try {
      await supabase
        .from('reviews')
        .update({ approved: true, approved_at: new Date().toISOString() })
        .eq('id', reviewId);
      loadDashboardData();
    } catch (error) {
      console.error('Error approving review:', error);
    }
  };

  const deleteReview = async (reviewId: string) => {
    if (!confirm('Weet je zeker dat je deze review wilt verwijderen?')) return;
    try {
      await supabase.from('reviews').delete().eq('id', reviewId);
      loadDashboardData();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'qr_code': return <QrCode size={16} />;
      case 'email_link': return <Mail size={16} />;
      case 'sms_link': return <MessageSquare size={16} />;
      default: return <Eye size={16} />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Review Dashboard</h1>
          <p className="text-gray-600">Beheer je reviews en bekijk statistieken</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Totaal Bezoeken</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalVisits}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Reviews Verzameld</p>
                <p className="text-3xl font-bold text-gray-900">{stats.completedReviews}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="text-green-600" size={24} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              + {stats.googleRedirects} naar Google
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Gem. Rating</p>
                <p className="text-3xl font-bold text-gray-900">{stats.averageRating.toFixed(1)}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="text-yellow-600 fill-yellow-600" size={24} />
              </div>
            </div>
            <div className="flex mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < Math.round(stats.averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Conversie Rate</p>
                <p className="text-3xl font-bold text-gray-900">{stats.conversionRate.toFixed(0)}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <TrendingUp className="text-purple-600" size={24} />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {stats.pendingReviews} in afwachting
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'overview'
                    ? 'border-amber-700 text-amber-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <BarChart3 size={20} className="inline mr-2" />
                Overzicht
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'reviews'
                    ? 'border-amber-700 text-amber-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Star size={20} className="inline mr-2" />
                Reviews ({stats.pendingReviews} nieuw)
              </button>
              <button
                onClick={() => setActiveTab('visits')}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === 'visits'
                    ? 'border-amber-700 text-amber-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Calendar size={20} className="inline mr-2" />
                Bezoeken
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Recente Activiteit</h3>
                  <div className="space-y-3">
                    {reviews.slice(0, 5).map((review) => (
                      <div key={review.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getSourceIcon(review.source)}
                          <div>
                            <p className="font-medium text-gray-900">{review.name}</p>
                            <p className="text-sm text-gray-600">{review.service_type}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            review.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {review.approved ? 'Goedgekeurd' : 'In afwachting'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{review.name}</h4>
                          <p className="text-sm text-gray-600">{review.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">{formatDate(review.created_at)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getSourceIcon(review.source)}
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          review.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {review.approved ? 'Goedgekeurd' : 'In afwachting'}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{review.review_text}</p>

                    <div className="flex gap-2">
                      {!review.approved && (
                        <button
                          onClick={() => approveReview(review.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-2"
                        >
                          <Check size={16} />
                          Goedkeuren
                        </button>
                      )}
                      <button
                        onClick={() => deleteReview(review.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium flex items-center gap-2"
                      >
                        <X size={16} />
                        Verwijderen
                      </button>
                    </div>
                  </div>
                ))}
                {reviews.length === 0 && (
                  <div className="text-center py-12">
                    <Star size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">Nog geen reviews ontvangen</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'visits' && (
              <div className="space-y-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Klant
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Service
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Behandeld door
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Datum
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {visits.map((visit) => (
                        <tr key={visit.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{visit.customer_name}</div>
                              {visit.customer_email && (
                                <div className="text-sm text-gray-500">{visit.customer_email}</div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {visit.service_type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {visit.barber_name || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(visit.visit_date)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {visits.length === 0 && (
                  <div className="text-center py-12">
                    <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">Nog geen bezoeken geregistreerd</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
