import { useEffect, useState } from 'react';
import { getActiveGalleryImages, type GalleryImage } from '../lib/galleryStorage';

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImages();
  }, []);

  async function loadImages() {
    setLoading(true);
    const galleryImages = await getActiveGalleryImages();
    setImages(galleryImages);
    setLoading(false);
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            ONZE WERKZAAMHEDEN
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mb-6"></div>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            Een selectie van ons vakmanschap en expertise
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative group overflow-hidden rounded-lg aspect-square"
              >
                <img
                  src={image.url}
                  alt={`${image.title} - Barbershop De Linge Elst kapsels en styling voorbeelden`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
