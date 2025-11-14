import { Facebook, Instagram } from 'lucide-react';

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
                src="/barbershop_de_linge_logo copy.jpg"
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
                <div className="mr-3 flex-shrink-0">
                  <svg className="w-[18px] h-[18px] text-amber-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                  </svg>
                </div>
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
                <div className="mr-3 flex-shrink-0 mt-1">
                  <svg className="w-[18px] h-[18px] text-red-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div className="text-gray-400">
                  <p>Dorpstraat 57</p>
                  <p>6661 EG Elst</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-3 flex-shrink-0">
                  <svg className="w-[18px] h-[18px] text-green-500" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <a href="https://wa.me/31619939261" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-500 transition-colors">
                  +31 6 19 93 92 61
                </a>
              </div>
              <div className="flex items-center">
                <div className="mr-3 flex-shrink-0">
                  <svg className="w-[18px] h-[18px] text-blue-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <a href="mailto:Info@barbershopdelinge.nl" className="text-gray-400 hover:text-amber-500 transition-colors">
                  Info@barbershopdelinge.nl
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
