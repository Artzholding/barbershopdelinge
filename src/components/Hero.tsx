export default function Hero() {

  return (
    <div className="relative h-[600px] sm:h-[700px] lg:h-[800px] bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
        }}
      ></div>

      <div className="relative h-full flex items-center justify-center text-center px-4 sm:px-6">
        <div className="max-w-5xl w-full">
          <div className="mb-4 sm:mb-6">
            <div className="inline-block border-2 border-amber-500 px-4 py-2 sm:px-6 sm:py-3">
              <p className="text-amber-400 text-xs sm:text-sm md:text-base font-bold tracking-widest uppercase">
                Sinds 2014
              </p>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 tracking-tight leading-tight">
            BARBERSHOP DE LINGE
          </h1>
          <div className="w-24 sm:w-32 h-1 bg-amber-500 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-100 mb-6 sm:mb-8 tracking-wide font-light">
            DÉ PLEK VOOR HERENKAPSELS EN SCHEERBEURTEN IN ELST
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed">
            Ontdek Barbershop De Linge dé plek voor herenkapsels en scheerbeurten in Elst. Onze ervaren barbiers leveren stijlvolle en persoonlijke service voor een zelfverzekerde look. Maak vandaag nog een afspraak en ervaar de perfecte coupe en scheerbeurt bij Barbershop De Linge in Elst.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => window.open('https://barbershopdelinge.setmore.com', '_blank')}
              className="bg-amber-600 text-white px-8 sm:px-10 py-4 text-base sm:text-lg font-bold uppercase hover:bg-amber-700 transition-all transform hover:scale-105 hover:shadow-2xl shadow-xl"
            >
              MAAK EEN AFSPRAAK
            </button>
            <button
              onClick={() => {
                document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-transparent border-2 border-white text-white px-8 sm:px-10 py-4 text-base sm:text-lg font-bold uppercase hover:bg-white hover:text-gray-900 transition-all transform hover:scale-105"
            >
              ONZE DIENSTEN
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
