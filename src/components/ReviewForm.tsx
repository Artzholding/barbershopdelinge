import { Star, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface ReviewFormProps {
  onSubmit: (review: {
    name: string;
    email: string;
    rating: number;
    text: string;
  }) => void;
  onClose: () => void;
}

export default function ReviewForm({ onSubmit, onClose }: ReviewFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || rating === 0 || !text) {
      setError('Vul alle velden in');
      return;
    }

    if (text.length < 10) {
      setError('Je review moet minimaal 10 karakters bevatten');
      return;
    }

    setIsSubmitting(true);

    try {
      onSubmit({ name, email, rating, text });

      setName('');
      setEmail('');
      setRating(0);
      setText('');
      setSuccess(true);

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError('Er is iets misgegaan. Probeer het opnieuw.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Laat een review achter</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            Deel je ervaring met Barbershop & Tattoos De Linge
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
              <CheckCircle size={20} />
              <span>Bedankt voor je review! We zullen deze binnenkort goedkeuren.</span>
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Jouw naam *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="jouw@email.nl"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Je e-mailadres wordt niet gedeeld
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Beoordeling *
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={32}
                    className={`${
                      star <= (hoverRating || rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Jouw review *
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
              placeholder="Vertel ons over je ervaring bij Barbershop & Tattoos De Linge..."
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Minimaal 10 karakters
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-amber-800 text-white px-6 py-3 font-semibold hover:bg-amber-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Send size={20} />
              {isSubmitting ? 'Verzenden...' : 'Verzend review'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              Annuleren
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Je review wordt eerst gecontroleerd voordat deze zichtbaar wordt op de website
          </p>
        </form>
      </div>
    </div>
  );
}
