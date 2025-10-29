import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'BARBIER & KAPPER ELST',
      subtitle: 'Ontdek Barbershop De Linge - dé plek voor herenkapsels en scheerbeurten in Elst',
      description: 'Onze ervaren barbiers leveren stijlvolle en persoonlijke service voor een zelfverzekerde look',
      tagline: 'Sinds 2007',
      image: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=1920',
    },
    {
      title: 'PERFECTE COUPE & SCHEERBEURT',
      subtitle: 'Maak vandaag nog een afspraak bij Barbershop De Linge in Elst',
      description: 'Ervaar vakmanschap, stijl en persoonlijke aandacht bij elke behandeling',
      tagline: 'Premium Service',
      image: 'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=1920',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[600px] sm:h-[700px] lg:h-[800px] bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            currentSlide === index ? 'opacity-40' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url('${slide.image}')`,
          }}
        ></div>
      ))}

      <div className="relative h-full flex items-center justify-center text-center px-4 sm:px-6">
        <div className="max-w-5xl w-full">
          <div className="mb-4 sm:mb-6">
            <div className="inline-block border-2 border-amber-500 px-4 py-2 sm:px-6 sm:py-3">
              <p className="text-amber-400 text-xs sm:text-sm md:text-base font-bold tracking-widest uppercase">
                {slides[currentSlide].tagline}
              </p>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 tracking-tight leading-tight">
            {slides[currentSlide].title}
          </h1>
          <div className="w-24 sm:w-32 h-1 bg-amber-500 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-100 mb-3 sm:mb-4 tracking-wide font-light">
            {slides[currentSlide].subtitle}
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto font-light">
            {slides[currentSlide].description}
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

      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all"
        aria-label="Next slide"
      >
        <ChevronRight size={20} className="sm:w-6 sm:h-6" />
      </button>

      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              currentSlide === index ? 'bg-amber-500 w-8 sm:w-10' : 'bg-white/60 w-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
