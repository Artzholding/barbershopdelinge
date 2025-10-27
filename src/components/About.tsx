import { Check } from 'lucide-react';

interface AboutProps {
  fullPage?: boolean;
}

export default function About({ fullPage }: AboutProps) {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight leading-tight">OVER<br />BARBERSHOP & TATTOOS<br />DE LINGE</h2>
            <div className="w-20 sm:w-24 h-1 bg-amber-700 mb-5 sm:mb-6"></div>

            <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
              Barbershop & Tattoos De Linge is opgericht in 2014. We zijn een kapperszaak, scheersalon, tattoo studio
              en verzorgingscentrum in één. In onze servicegerichte kapperszaak vind je eersteklas kappers- en
              verzorgingsbehandelingen, professionele tattoo-kunst, kwaliteitsproducten voor je haar, lichaam, scheren
              en gezicht.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
              Ons team bestaat uit meesterkappers en experts op het gebied van herenverzorging en doen er alles aan om
              jou de beste service te bieden.
            </p>

            <div className="space-y-3 mb-6 sm:mb-8">
              {[
                'Herenkapper en Barbier',
                'Gezichtsbehandeling',
                "Tattoo's",
              ].map((item) => (
                <div key={item} className="flex items-start">
                  <Check className="text-amber-700 mr-3 flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-gray-700 text-sm sm:text-base">{item}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="bg-amber-700 text-white px-6 py-3 text-sm font-bold uppercase hover:bg-amber-800 transition-colors shadow-md rounded-sm">
                LEES MEER
              </button>
              <button
                onClick={() => window.open('https://barbershopdelinge.setmore.com', '_blank')}
                className="bg-gray-800 text-white px-6 py-3 text-sm font-bold uppercase hover:bg-gray-900 transition-colors shadow-md rounded-sm"
              >
                AFSPRAAK MAKEN
              </button>
            </div>
          </div>

          <div className="relative order-1 md:order-2 mb-12 md:mb-0">
            <div className="relative overflow-hidden rounded-lg shadow-2xl h-64 sm:h-96 md:h-[500px]">
              <img
                src="/Schermafbeelding 2025-10-21 111826.png"
                alt="Professioneel kapper team bij Barbershop De Linge Elst - ervaren barbiers en stylisten"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {fullPage && (
          <div className="mt-12 sm:mt-16 grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-gray-50 p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow text-center rounded-lg">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl sm:text-3xl font-bold text-amber-700">1</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 tracking-tight">EXPERTISE</h3>
              <p className="text-sm sm:text-base text-gray-600">Meesterkappers met jarenlange ervaring</p>
            </div>
            <div className="bg-gray-50 p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow text-center rounded-lg">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl sm:text-3xl font-bold text-amber-700">2</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 tracking-tight">KWALITEIT</h3>
              <p className="text-sm sm:text-base text-gray-600">Premium producten en diensten</p>
            </div>
            <div className="bg-gray-50 p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow text-center rounded-lg sm:col-span-2 md:col-span-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl sm:text-3xl font-bold text-amber-700">3</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 tracking-tight">SERVICE</h3>
              <p className="text-sm sm:text-base text-gray-600">Persoonlijke aandacht voor elke klant</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
