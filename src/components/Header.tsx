import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'HERENKAPPER', id: 'herenkapper' },
    { name: 'BARBIER', id: 'barbier' },
    { name: 'GEZICHTSBEHANDELING', id: 'gezicht' },
    { name: 'ONS TEAM', id: 'team' },
    { name: 'OVER ONS', id: 'over-ons' },
    { name: 'CONTACT', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentPage(id);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-black shadow-lg sticky top-0 z-50 w-full border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div
            className="flex items-center cursor-pointer transition-transform hover:scale-105 duration-200"
            onClick={() => handleNavClick('home')}
          >
            <img
              src="/barbershop_de_linge_logo_circular_refined.png"
              alt="Barbershop De Linge - Haircuts en Tattoos"
              className="h-14 w-auto object-contain"
            />
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium tracking-wide transition-all duration-200 py-2 relative group ${
                  currentPage === item.id ? 'text-amber-500' : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 transform origin-left transition-transform duration-200 ${
                  currentPage === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => window.open('https://barbershopdelinge.setmore.com', '_blank')}
              className="hidden lg:block bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-2.5 rounded-md text-sm font-bold hover:from-amber-700 hover:to-amber-800 transition-all duration-200 whitespace-nowrap shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              AFSPRAAK MAKEN
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white p-2 hover:bg-gray-800/50 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left py-3 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                    currentPage === item.id
                      ? 'text-amber-500 bg-gray-800/50'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/30'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
            <button
              onClick={() => window.open('https://barbershopdelinge.setmore.com', '_blank')}
              className="mt-4 w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-md text-sm font-bold hover:from-amber-700 hover:to-amber-800 transition-all duration-200 shadow-md"
            >
              AFSPRAAK MAKEN
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
