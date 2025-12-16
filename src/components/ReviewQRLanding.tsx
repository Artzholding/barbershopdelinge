import { useState, useEffect } from 'react';
import { Star, CheckCircle, AlertCircle, Send, ArrowRight, ThumbsUp } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ReviewQRLanding() {
  const [step, setStep] = useState<'rating' | 'details' | 'success'>('rating');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [visitId, setVisitId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const vid = params.get('v');
    if (vid) {
      setVisitId(vid);
    }
  }, []);

  const handleRatingSelect = async (selectedRating: number) => {
    setRating(selectedRating);

    if (!supabase) {
      setStep('details');
      return;
    }

    const requestId = crypto.randomUUID();
    await supabase.from('review_requests').insert({
      id: requestId,
      visit_id: visitId,
      request_type: 'qr_scan',
      rating_given: selectedRating,
    });

    if (selectedRating >= 4) {
      await supabase.from('review_requests').update({
        redirected_to: 'google',
        completed_at: new Date().toISOString(),
      }).eq('id', requestId);

      window.location.href = 'https://www.google.com/maps/place/Barbershop+de+Linge/@51.9185389,5.8462198,17z/data=!4m8!3m7!1s0x47c7a73c5df05c25:0xb7b7969b015bc96f!8m2!3d51.9185389!4d5.8462198!9m1!1b1!16s%2Fg%2F11ympqtcgm?entry=ttu';
    } else {
      await supabase.from('review_requests').update({
        redirected_to: 'internal',
      }).eq('id', requestId);

      setStep('details');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !reviewText) {
      setError('Vul alle velden in');
      return;
    }

    if (reviewText.length < 10) {
      setError('Je review moet minimaal 10 karakters bevatten');
      return;
    }

    if (!supabase) {
      setError('Database niet beschikbaar');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: reviewData, error: reviewError } = await supabase
        .from('reviews')
        .insert({
          visit_id: visitId,
          name,
          email,
          rating,
          review_text: reviewText,
          source: 'qr_code',
          approved: false,
        })
        .select()
        .single();

      if (reviewError) throw reviewError;

      const { error: updateError } = await supabase
        .from('review_requests')
        .update({
          completed_at: new Date().toISOString(),
          review_id: reviewData.id,
        })
        .eq('visit_id', visitId)
        .eq('request_type', 'qr_scan')
        .is('completed_at', null);

      if (updateError) throw updateError;

      setStep('success');
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Er is iets misgegaan. Probeer het opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 'rating') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-amber-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <ThumbsUp size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Bedankt voor je bezoek!
            </h1>
            <p className="text-gray-600">
              Hoe tevreden ben je over onze service?
            </p>
          </div>

          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((stars) => (
              <button
                key={stars}
                onClick={() => handleRatingSelect(stars)}
                onMouseEnter={() => setHoverRating(stars)}
                onMouseLeave={() => setHoverRating(0)}
                className="w-full bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-amber-500 hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={24}
                        className={`transition-colors ${
                          i < stars
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        } ${hoverRating === stars ? 'scale-110' : ''}`}
                      />
                    ))}
                  </div>
                  <ArrowRight
                    size={20}
                    className="text-gray-400 group-hover:text-amber-700 group-hover:translate-x-1 transition-all"
                  />
                </div>
                <p className="text-left text-sm text-gray-600 mt-2">
                  {stars === 5 && 'Uitstekend - Precies wat ik zocht!'}
                  {stars === 4 && 'Goed - Ik ben tevreden'}
                  {stars === 3 && 'Oké - Het was prima'}
                  {stars === 2 && 'Matig - Kan beter'}
                  {stars === 1 && 'Slecht - Niet tevreden'}
                </p>
              </button>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Je feedback helpt ons om beter te worden
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'details') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Vertel ons meer
            </h2>
            <div className="flex justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={`${
                    i < rating
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600 text-sm">
              We waarderen je eerlijke feedback en gebruiken dit om onze service te verbeteren
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2 mb-4">
              <AlertCircle size={20} />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Jouw naam *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Bijv. Jan de Vries"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                E-mailadres *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="jouw@email.nl"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Alleen voor interne doeleinden
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Jouw feedback *
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                placeholder="Wat kunnen we verbeteren?"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Minimaal 10 karakters
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-700 text-white px-6 py-4 rounded-lg font-semibold hover:bg-amber-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
            >
              <Send size={20} />
              {isSubmitting ? 'Verzenden...' : 'Verzend feedback'}
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            Je feedback wordt vertrouwelijk behandeld
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={40} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Bedankt!
        </h2>
        <p className="text-gray-600 mb-6">
          We waarderen je feedback enorm. Dit helpt ons om onze service te blijven verbeteren.
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-amber-800 font-medium">
            Bij je volgende bezoek krijg je 10% korting als dank voor je feedback!
          </p>
          <p className="text-xs text-amber-700 mt-2">
            Noem deze QR-code bij het afrekenen
          </p>
        </div>
        <button
          onClick={() => window.location.href = '/'}
          className="text-amber-700 hover:text-amber-800 font-semibold"
        >
          Terug naar website
        </button>
      </div>
    </div>
  );
}
