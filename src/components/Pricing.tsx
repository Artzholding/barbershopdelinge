import { Check } from 'lucide-react';

export default function Pricing() {
  const services = [
    {
      category: 'KNIPPEN',
      items: [
        { name: 'Knippen volwassenen', price: '€27,50', description: 'Wassen, knippen en modelleren' },
        { name: 'Knippen & lange baard', price: '€40,00', description: 'Knippen en baard modelleren / scheren' },
        { name: 'Knippen & korte baard', price: '€35,00', description: 'Wassen, knippen en korte baard modelleren' },
        { name: 'Taperfade only', price: '€20,00', description: 'Alleen de zijkanten en de achterkant' },
        { name: 'Studenten', price: '€25,00', description: 'Wassen, knippen, föhnen / modelleren (op vertoon van je studentenkaart)' },
        { name: 'Special Treatment', price: '€50,00', description: 'Knippen, scheren/baard modelleren, neus -en oorhaar waxen, gezichtsbehandeling' },
        { name: 'Knippen kinderen t/m 14 jr', price: '€22,50', description: 'Wassen, knippen en modelleren' },
      ],
    },
    {
      category: 'SCHEREN',
      items: [
        { name: 'Baard scheren', price: '€20,00', description: 'Italian hot towel shave' },
        { name: 'Contouren', price: '€15,00', description: 'Contouren scheren' },
        { name: 'Opscheren rondom', price: '€20,00', description: 'Baard rondom scheren' },
        { name: 'Baard & snor modelleren', price: '€20,00', description: 'Modelleren en styling' },
      ],
    },
    {
      category: 'BAARD TRIMMEN',
      items: [
        { name: 'Baard modelleren (knip)', price: '€17,50', description: 'Modelleren, contouren en baardolie' },
      ],
    },
    {
      category: 'SNOR TRIMMEN',
      items: [
        { name: 'Snor modelleren (knip)', price: '€15,00', description: 'Modelleren en snorolie' },
      ],
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="text-center mb-14">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          WAT WIJ VOOR JOU KUNNEN DOEN
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Ontdek onze professionele diensten
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {services.map((category) => (
          <div
            key={category.category}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
          >
            <div className="flex items-center gap-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6">
              <div className="w-2 h-12 bg-amber-500 rounded-full"></div>
              <h3 className="text-2xl font-bold tracking-wide">{category.category}</h3>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {category.items.map((item, index) => (
                  <div
                    key={index}
                    className="group relative bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200 hover:border-amber-400 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-gray-900 text-base leading-snug pr-3 group-hover:text-amber-600 transition-colors">
                        {item.name}
                      </h4>
                      <span className="text-amber-600 font-bold text-lg whitespace-nowrap bg-amber-50 px-3 py-1 rounded-lg">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 flex items-start leading-relaxed">
                      <Check size={16} className="text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
