import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { type GalleryImage } from '../lib/galleryStorage';

interface CarouselProps {
  images: GalleryImage[];
  autoPlayInterval?: number;
}

export default function Carousel({ images, autoPlayInterval = 4000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const currentMedia = images[currentIndex];
    if (currentMedia?.media_type === 'video' && videoRefs.current[currentMedia.id]) {
      videoRefs.current[currentMedia.id]?.pause();
    }

    const nextIndex = (currentIndex + 1) % images.length;
    console.log('Going to next:', nextIndex, images[nextIndex]);
    setCurrentIndex(nextIndex);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [images, isTransitioning, currentIndex]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const currentMedia = images[currentIndex];
    if (currentMedia?.media_type === 'video' && videoRefs.current[currentMedia.id]) {
      videoRefs.current[currentMedia.id]?.pause();
    }

    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [images, isTransitioning, currentIndex]);

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const currentMedia = images[currentIndex];
    if (currentMedia?.media_type === 'video' && videoRefs.current[currentMedia.id]) {
      videoRefs.current[currentMedia.id]?.pause();
    }

    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  useEffect(() => {
    console.log('Carousel images:', images.length, 'Auto-playing:', isAutoPlaying);
    if (!isAutoPlaying || images.length === 0) return;

    const currentMedia = images[currentIndex];
    if (currentMedia?.media_type === 'video') {
      return;
    }

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, goToNext, images, currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === ' ') {
        e.preventDefault();
        toggleAutoPlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrevious]);

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-900 text-white">
        <p>Geen afbeeldingen beschikbaar</p>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-gray-900 overflow-hidden group">
      <div className="relative aspect-[16/9] md:aspect-[21/9] max-h-[600px]">
        <div className="relative w-full h-full">
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentIndex
                  ? 'opacity-100 scale-100 z-10'
                  : 'opacity-0 scale-105 z-0'
              }`}
            >
              {image.media_type === 'video' ? (
                <video
                  ref={(el) => (videoRefs.current[image.id] = el)}
                  src={image.url}
                  className="w-full h-full object-contain"
                  controls
                  playsInline
                  loop
                  onEnded={goToNext}
                  onError={(e) => console.error('Video load error:', image.url, e)}
                />
              ) : (
                <img
                  src={image.url}
                  alt={`${image.title} - Barbershop De Linge Elst`}
                  className="w-full h-full object-contain"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  onError={(e) => console.error('Image load error:', image.url, e)}
                  onLoad={() => console.log('Image loaded:', image.url)}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-white text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg">
              {images[currentIndex].title}
            </h3>
            <div className="flex items-center gap-3 text-white/80 text-sm">
              <span>{currentIndex + 1} / {images.length}</span>
            </div>
          </div>
        </div>

        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
          aria-label="Vorige afbeelding"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
          aria-label="Volgende afbeelding"
        >
          <ChevronRight size={24} />
        </button>

        <button
          onClick={toggleAutoPlay}
          className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
          aria-label={isAutoPlaying ? 'Pauzeer slideshow' : 'Start slideshow'}
        >
          {isAutoPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>

      <div className="bg-gray-900 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-amber-500'
                    : 'w-2 h-2 bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Ga naar afbeelding ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="hidden md:block bg-gray-900 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 relative rounded-lg overflow-hidden transition-all duration-300 ${
                  index === currentIndex
                    ? 'ring-2 ring-amber-500 scale-105'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                {image.media_type === 'video' ? (
                  <div className="w-24 h-16 bg-gray-800 flex items-center justify-center">
                    <Play size={24} className="text-white" />
                  </div>
                ) : (
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-24 h-16 object-cover"
                    loading="lazy"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
