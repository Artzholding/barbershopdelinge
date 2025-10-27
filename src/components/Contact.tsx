
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
                <div className="mr-3 flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
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
                <div className="mr-3 flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm sm:text-base">WhatsApp</p>
                  <a href="https://wa.me/31619939261" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline text-sm sm:text-base">06 19 93 92 61</a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-3 flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm sm:text-base">E-mail</p>
                  <a href="mailto:Info@barbershopdelinge.nl" className="text-amber-700 hover:underline text-sm sm:text-base">Info@barbershopdelinge.nl</a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-3 flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-amber-700" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                </div>
                <div className="w-full">
                  <p className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Openingstijden</p>
                  <div className="space-y-1 text-gray-700 text-sm">
                    <p className="flex justify-between gap-4">
                      <span>Maandag:</span>
                      <span className="font-semibold">12:00 - 17:00</span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span>Dinsdag, Woensdag:</span>
                      <span className="font-semibold">09:30 - 18:00</span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span>Donderdag:</span>
                      <span className="font-semibold">09:30 - 17:30</span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span>Vrijdag, Zaterdag:</span>
                      <span className="font-semibold">09:30 - 18:00</span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span>Zondag:</span>
                      <span className="font-semibold">Gesloten</span>
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
                <div className="mr-3 flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
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
                <div className="mr-3 flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm sm:text-base">WhatsApp</p>
                  <a href="https://wa.me/31619939261" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline text-sm sm:text-base">06 19 93 92 61</a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-3 flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm sm:text-base">E-mail</p>
                  <a href="mailto:info@barbershopderijn.nl" className="text-amber-700 hover:underline text-sm sm:text-base">info@barbershopderijn.nl</a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-3 flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-amber-700" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                </div>
                <div className="w-full">
                  <p className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Openingstijden</p>
                  <div className="space-y-1 text-gray-700 text-sm">
                    <p className="flex justify-between gap-4">
                      <span>Zondag:</span>
                      <span className="font-semibold">12:00 - 17:00</span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span>Maandag:</span>
                      <span className="font-semibold">08:00 - 17:00</span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span>Dinsdag, Woensdag:</span>
                      <span className="font-semibold">09:30 - 18:00</span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span>Donderdag:</span>
                      <span className="font-semibold">09:30 - 20:00</span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span>Vrijdag, Zaterdag:</span>
                      <span className="font-semibold">09:30 - 18:00</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => window.open('https://barbershopderijn.setmore.com/', '_blank')}
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
                <img
                  src="/Schermafbeelding 2025-10-27 124532 copy copy.png"
                  alt="Barbershop De Rijn Arnhem Locatie"
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
        </div>
      </div>
    </section>
  );
}
