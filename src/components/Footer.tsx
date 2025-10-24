import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const handleNavClick = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/barbershop_de_linge_logo_circular_refined.png"
                alt="Barbershop & Tattoos De Linge Elst Logo"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Premium herenkapper, barbier en tattoo studio sinds 2014. Meesterlijk vakmanschap en exclusieve verzorging voor de moderne man.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-amber-600 p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/barbershopdelinge/#"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-amber-600 p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3 sm:mb-4 tracking-tight">DIENSTEN</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNavClick('herenkapper')}
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Herenkapper
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('barbier')}
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Barbier
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('gezicht')}
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Gezichtsbehandeling
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('tattoos')}
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Tattoo's
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3 sm:mb-4 tracking-tight">OPENINGSTIJDEN</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center">
                <Clock className="text-amber-500 mr-3 flex-shrink-0" size={18} />
                <div className="flex-1">
                  <p className="font-semibold text-white">Ma - Vr:</p>
                  <p>10:00 - 19:00</p>
                </div>
              </div>
              <div className="ml-9">
                <p className="font-semibold text-white">Zaterdag:</p>
                <p>10:00 - 18:00</p>
              </div>
              <div className="ml-9">
                <p className="font-semibold text-white">Zondag:</p>
                <p>Gesloten</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3 sm:mb-4 tracking-tight">CONTACT</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <MapPin className="text-amber-500 mr-3 flex-shrink-0 mt-1" size={18} />
                <div className="text-gray-400">
                  <p>Dorpstraat 57</p>
                  <p>6661 EG Elst</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="text-amber-500 mr-3 flex-shrink-0" size={18} />
                <a href="tel:0619939261" className="text-gray-400 hover:text-amber-500 transition-colors">
                  06 19 93 92 61
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="text-amber-500 mr-3 flex-shrink-0" size={18} />
                <a href="mailto:info@elst.nl" className="text-gray-400 hover:text-amber-500 transition-colors">
                  info@elst.nl
                </a>
              </div>
            </div>

            <button
              onClick={() => window.open('https://barbershopdelinge.setmore.com', '_blank')}
              className="mt-5 bg-amber-600 text-white px-6 py-3 text-sm font-bold uppercase hover:bg-amber-700 transition-all transform hover:scale-105 shadow-lg w-full"
            >
              MAAK EEN AFSPRAAK
            </button>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 sm:mt-10 pt-6 sm:pt-8 text-center text-gray-400 text-xs sm:text-sm">
          <p>&copy; {new Date().getFullYear()} Barbershop & Tattoos De Linge. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </footer>
  );
}
