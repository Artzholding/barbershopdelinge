import { Scissors, Sparkles, Pen } from 'lucide-react';

interface ServicesProps {
  filter?: string;
}

export default function Services({ filter }: ServicesProps) {
  const services = [
    {
      id: 'herenkapper',
      title: 'KAPPER EN BARBIER',
      description: 'Op zoek naar een kapper en barbier in één? Bij Barbershop & Tattoos De Linge knippen we je haar en stylen we je baard helemaal zoals jij dat wilt. De opties zijn eindeloos, denk bijvoorbeeld eens aan onze Premium Gents Cut of de Barbers Haircut & Clean Shave.',
      icon: Scissors,
      image: '/kapper elst a copy copy.png',
    },
    {
      id: 'gezicht',
      title: 'GEZICHTSBEHANDELING',
      description: 'Onze gezichtsbehandelingen zijn speciaal ontwikkeld voor de mannenhuid. We bieden verschillende behandelingen aan die je huid reinigen, verzorgen en verfrissen. Een professionele gezichtsbehandeling voor optimale resultaten.',
      icon: Sparkles,
      image: '/gezichtbehandeling elst copy copy copy.png',
    },
    {
      id: 'tattoos',
      title: 'TATTOOS',
      description: 'Professionele tattoo-kunst van ervaren artiesten. Van kleine, betekenisvolle designs tot grootschalige custom werk. Wij brengen jouw ideeën tot leven met precisie en creativiteit in een veilige en hygiënische omgeving.',
      icon: Pen,
      image: '/tattoos/files_1118539-1761226077099-tattoo elst.png',
    },
  ];

  const filteredServices = filter
    ? services.filter(s => s.id === filter || (filter === 'barbier' && s.id === 'herenkapper'))
    : services;

  return (
    <section id="services-section" className="py-16">
      {!filter && (
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">ONZE DIENSTEN</h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Premium kapper- en barbierdiensten voor de moderne man</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="group bg-white rounded-lg shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.id === 'herenkapper' ? 'Moderne herenkapsels en fade knippen bij barbershop Elst' : service.id === 'gezicht' ? 'Professionele gezichtsbehandeling voor mannen in Elst' : 'Tattoo kunst en custom designs bij tattoo studio Elst'}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col items-center justify-end text-center p-6">
                  <Icon size={48} className="mb-2 text-amber-500 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <p className="text-gray-700 leading-relaxed mb-6 flex-grow">{service.description}</p>
                <button
                  onClick={() => window.open('https://barbershopdelinge.setmore.com', '_blank')}
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-3 rounded-md text-sm font-bold hover:from-amber-700 hover:to-amber-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  BOEK EEN AFSPRAAK
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
