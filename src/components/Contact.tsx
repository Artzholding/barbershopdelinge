import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight">ONZE VESTIGINGEN</h2>
          <div className="w-20 sm:w-24 h-1 bg-amber-700 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Bezoek een van onze vestigingen voor professionele kapper- en barbierdiensten. Walk-in welkom of maak een afspraak!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-8 sm:mb-12">
          <div className="bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 rounded-lg shadow-lg border border-gray-100">
            <div className="mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 tracking-tight">ELST</h3>
              <div className="w-16 h-1 bg-amber-700"></div>
            </div>

            <div className="space-y-5">
              <div className="flex items-start">
                <MapPin className="text-amber-700 mr-3 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-bold text-gray-900 text-sm sm:text-base">Barbershop De Linge</p>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Dorpstraat+57,6661+EG+Elst"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-700 hover:underline text-sm sm:text-base"
                  >
                    <p>Dorpstraat 57</p>
                    <p>6661 EG Elst</p>
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="text-amber-700 mr-3 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-bold text-gray-900 text-sm sm:text-base">Telefoon</p>
                  <a href="tel:0619939261" className="text-amber-700 hover:underline text-sm sm:text-base">06 19 93 92 61</a>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="text-amber-700 mr-3 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-bold text-gray-900 text-sm sm:text-base">E-mail</p>
                  <a href="mailto:info@elst.nl" className="text-amber-700 hover:underline text-sm sm:text-base">info@elst.nl</a>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="text-amber-700 mr-3 flex-shrink-0 mt-1" size={20} />
                <div className="w-full">
                  <p className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Openingstijden</p>
                  <div className="space-y-1 text-gray-700 text-sm">
                    <p className="flex justify-between gap-4">
                      <span>Maandag:</span>
                      <span className="font-semibold">Gesloten</span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span>Dinsdag - Zaterdag:</span>
                      <span className="font-semibold">10:00 - 19:00</span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span>Zondag:</span>
                      <span className="font-semibold">12:00 - 18:00</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => window.open('https://barbershopdelinge.setmore.com', '_blank')}
              className="mt-6 bg-amber-700 text-white px-8 py-3 text-sm font-bold uppercase hover:bg-amber-800 transition-colors shadow-md w-full rounded-sm"
            >
              AFSPRAAK MAKEN ELST
            </button>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Dorpstraat+57,6661+EG+Elst"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 cursor-pointer group"
            >
              <div className="bg-gray-200 h-48 rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow relative">
                <img
                  src="/files_1118539-1761219516977-image.png"
                  alt="Barbershop De Linge Elst Locatie"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity flex items-center justify-center">
                  <span className="text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Open in Google Maps
                  </span>
                </div>
              </div>
            </a>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-white p-6 sm:p-8 rounded-lg shadow-lg border border-amber-100">
            <div className="mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 tracking-tight">ARNHEM</h3>
              <div className="w-16 h-1 bg-amber-700"></div>
            </div>

            <div className="space-y-5">
              <div className="flex items-start">
                <MapPin className="text-amber-700 mr-3 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-bold text-gray-900 text-sm sm:text-base">Barbershop De Rijn</p>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Rijnstraat+10,Arnhem"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-700 hover:underline text-sm sm:text-base"
                  >
                    <p>Rijnstraat 10</p>
                    <p>Arnhem</p>
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="text-amber-700 mr-3 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-bold text-gray-900 text-sm sm:text-base">Telefoon</p>
                  <a href="tel:0619939261" className="text-amber-700 hover:underline text-sm sm:text-base">06 19 93 92 61</a>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="text-amber-700 mr-3 flex-shrink-0 mt-1" size={20} />
                <div>
                  <p className="font-bold text-gray-900 text-sm sm:text-base">E-mail</p>
                  <a href="mailto:info@barbershopderijn.nl" className="text-amber-700 hover:underline text-sm sm:text-base">info@barbershopderijn.nl</a>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="text-amber-700 mr-3 flex-shrink-0 mt-1" size={20} />
                <div className="w-full">
                  <p className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Openingstijden</p>
                  <div className="space-y-1 text-gray-700 text-sm">
                    <p className="flex justify-between gap-4">
                      <span>Maandag:</span>
                      <span className="font-semibold">Gesloten</span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span>Dinsdag - Zaterdag:</span>
                      <span className="font-semibold">10:00 - 19:00</span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span>Zondag:</span>
                      <span className="font-semibold">12:00 - 18:00</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => window.open('https://barbershopdelinge.setmore.com', '_blank')}
              className="mt-6 bg-amber-700 text-white px-8 py-3 text-sm font-bold uppercase hover:bg-amber-800 transition-colors shadow-md w-full rounded-sm"
            >
              AFSPRAAK MAKEN ARNHEM
            </button>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Rijnstraat+10,Arnhem"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 cursor-pointer group"
            >
              <div className="bg-gray-200 h-48 rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2450.5!2d5.898!3d51.983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDU4JzU4LjgiTiA1wrA1Myc1Mi44IkU!5e0!3m2!1snl!2snl!4v1234567890"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Barbershop De Rijn Arnhem Locatie"
                ></iframe>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    Open in Google Maps
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
