import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Pricing from './components/Pricing';
import About from './components/About';
import Team from './components/Team';
import Gallery from './components/Gallery';
import GalleryAdmin from './components/GalleryAdmin';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { updateMetaTags } from './lib/seoConfig';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    updateMetaTags(currentPage);
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="relative">
        {currentPage === 'home' && (
          <>
            <Hero />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Services />
            </div>
            <div className="bg-gray-50 py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Pricing />
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <About />
            </div>
            <div className="bg-gray-50 py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Team />
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <Gallery />
            </div>
            <div className="bg-gray-50 py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reviews />
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <Contact />
            </div>
          </>
        )}

        {currentPage === 'herenkapper' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Services filter="herenkapper" />
          </div>
        )}
        {currentPage === 'barbier' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Services filter="barbier" />
          </div>
        )}
        {currentPage === 'waxen' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Services filter="waxen" />
          </div>
        )}
        {currentPage === 'gezicht' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Services filter="gezicht" />
          </div>
        )}
        {currentPage === 'massages' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Services filter="massage" />
          </div>
        )}
        {currentPage === 'scheerwinkel' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Services filter="producten" />
          </div>
        )}
        {currentPage === 'team' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Team />
          </div>
        )}
        {currentPage === 'over-ons' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <About fullPage />
          </div>
        )}
        {currentPage === 'contact' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <Contact />
          </div>
        )}
        {currentPage === 'gallery-admin' && (
          <div className="py-16">
            <GalleryAdmin />
          </div>
        )}
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;
