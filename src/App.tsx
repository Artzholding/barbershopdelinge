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
import ReviewQRLanding from './components/ReviewQRLanding';
import VisitTracker from './components/VisitTracker';
import ReviewDashboard from './components/ReviewDashboard';
import QRCodeGenerator from './components/QRCodeGenerator';
import { updateMetaTags } from './lib/seoConfig';
import { injectStructuredData, getLocalBusinessSchema, getServicesSchema, getBreadcrumbSchema } from './lib/structuredData';

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.slice(1);
    return hash || 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'home';
      setCurrentPage(hash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    updateMetaTags(currentPage);

    const schemas = [
      getLocalBusinessSchema(),
      ...getServicesSchema(),
      getBreadcrumbSchema(currentPage)
    ];
    injectStructuredData(schemas);

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
        {currentPage === '/review' && <ReviewQRLanding />}
        {currentPage === 'visit-tracker' && (
          <div className="py-16">
            <VisitTracker />
          </div>
        )}
        {currentPage === 'review-dashboard' && <ReviewDashboard />}
        {currentPage === 'qr-generator' && (
          <div className="py-16">
            <QRCodeGenerator />
          </div>
        )}
      </main>

      {!['review', '/review', 'review-dashboard'].includes(currentPage) && (
        <Footer setCurrentPage={setCurrentPage} />
      )}
    </div>
  );
}

export default App;
