import { useState } from 'react';
import { UserPlus, Check, QrCode, Mail, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface VisitFormData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  service_type: string;
  barber_name: string;
  notes: string;
}

export default function VisitTracker() {
  const [formData, setFormData] = useState<VisitFormData>({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    service_type: 'herenkapper',
    barber_name: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [qrLink, setQrLink] = useState('');
  const [visitId, setVisitId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);

    try {
      const { data: visit, error } = await supabase
        .from('customer_visits')
        .insert({
          customer_name: formData.customer_name,
          customer_email: formData.customer_email || null,
          customer_phone: formData.customer_phone || null,
          service_type: formData.service_type,
          barber_name: formData.barber_name || null,
          notes: formData.notes || null,
          visit_date: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      setVisitId(visit.id);
      const baseUrl = window.location.origin;
      const reviewUrl = `${baseUrl}/#/review?v=${visit.id}`;
      setQrLink(reviewUrl);
      setSuccess(true);

      setFormData({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        service_type: 'herenkapper',
        barber_name: '',
        notes: '',
      });

      setTimeout(() => {
        setSuccess(false);
        setQrLink('');
      }, 30000);
    } catch (error) {
      console.error('Error tracking visit:', error);
      alert('Er is iets misgegaan. Probeer het opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendEmailReminder = async () => {
    if (!formData.customer_email || !visitId) return;

    try {
      await supabase.from('review_requests').insert({
        visit_id: visitId,
        request_type: 'email',
      });

      alert('Email herinnering is ingepland!');
    } catch (error) {
      console.error('Error scheduling email:', error);
      alert('Kon email niet inplannen');
    }
  };

  const sendSMSReminder = async () => {
    if (!formData.customer_phone || !visitId) return;

    try {
      await supabase.from('review_requests').insert({
        visit_id: visitId,
        request_type: 'sms',
      });

      alert('SMS herinnering is ingepland!');
    } catch (error) {
      console.error('Error scheduling SMS:', error);
      alert('Kon SMS niet inplannen');
    }
  };

  const generateQRCode = () => {
    if (!qrLink) return;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrLink)}`;
    window.open(qrUrl, '_blank');
  };

  if (success) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Klantbezoek geregistreerd!
          </h3>
          <p className="text-gray-600">
            Kies hoe je de review wilt verzamelen
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={generateQRCode}
            className="w-full bg-amber-700 text-white p-4 rounded-lg hover:bg-amber-800 transition-colors flex items-center justify-center gap-3 font-semibold"
          >
            <QrCode size={24} />
            Genereer QR Code voor klant
          </button>

          {formData.customer_email && (
            <button
              onClick={sendEmailReminder}
              className="w-full bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-3 font-semibold"
            >
              <Mail size={24} />
              Stuur email herinnering (later vandaag)
            </button>
          )}

          {formData.customer_phone && (
            <button
              onClick={sendSMSReminder}
              className="w-full bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-3 font-semibold"
            >
              <MessageSquare size={24} />
              Stuur SMS herinnering (later vandaag)
            </button>
          )}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 font-medium mb-2">Review Link:</p>
          <input
            type="text"
            value={qrLink}
            readOnly
            className="w-full p-2 border border-gray-300 rounded text-xs"
            onClick={(e) => e.currentTarget.select()}
          />
          <p className="text-xs text-gray-500 mt-2">
            Klik om te kopiëren - Deze link kan ook handmatig worden gedeeld
          </p>
        </div>

        <button
          onClick={() => {
            setSuccess(false);
            setQrLink('');
          }}
          className="w-full mt-4 text-gray-600 hover:text-gray-900 font-medium"
        >
          Nieuwe klant registreren
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-amber-700 rounded-full flex items-center justify-center">
          <UserPlus size={24} className="text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Registreer Klantbezoek</h3>
          <p className="text-gray-600">Verzamel reviews na afloop</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Naam klant *
          </label>
          <input
            type="text"
            value={formData.customer_name}
            onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="Bijv. Jan de Vries"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              E-mailadres
            </label>
            <input
              type="email"
              value={formData.customer_email}
              onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="klant@email.nl"
            />
            <p className="text-xs text-gray-500 mt-1">Voor email herinnering</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Telefoonnummer
            </label>
            <input
              type="tel"
              value={formData.customer_phone}
              onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="+31 6 12345678"
            />
            <p className="text-xs text-gray-500 mt-1">Voor SMS herinnering</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Type service *
            </label>
            <select
              value={formData.service_type}
              onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              required
            >
              <option value="herenkapper">Herenkapper</option>
              <option value="barbier">Barbier</option>
              <option value="baard">Baard verzorging</option>
              <option value="waxen">Waxen</option>
              <option value="gezicht">Gezichtsbehandeling</option>
              <option value="massage">Massage</option>
              <option value="tattoo">Tattoo</option>
              <option value="overig">Overig</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Behandeld door
            </label>
            <input
              type="text"
              value={formData.barber_name}
              onChange={(e) => setFormData({ ...formData, barber_name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Naam medewerker"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Notities (optioneel)
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
            placeholder="Extra informatie over dit bezoek..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Registreren...' : 'Registreer Bezoek'}
        </button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Tip:</strong> Email of telefoon is optioneel, maar aanbevolen voor automatische follow-ups!
        </p>
      </div>
    </div>
  );
}
