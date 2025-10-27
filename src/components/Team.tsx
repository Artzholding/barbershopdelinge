import { Award, Scissors, Star } from 'lucide-react';

export default function Team() {
  const team = [
    {
      name: 'Ozemarow',
      role: 'Master Barber & Eigenaar',
      experience: '18+ jaar ervaring',
      specialties: ['Klassiek knippen', 'Baardverzorging', 'Traditional shaving'],
      image: '/Schermafbeelding 2025-10-21 121055 copy.png',
    },
    {
      name: 'Josefien',
      role: 'Barber & Stylist',
      experience: '8 jaar ervaring',
      specialties: ['Creatieve cuts', 'Beard design', 'Hair tattoos'],
      image: '/Schermafbeelding 2025-10-21 120558 copy.png',
    },
    {
      name: 'Arjan Zemar',
      role: 'Barbier',
      experience: 'Jong en getalenteerd',
      specialties: ['Klassiek knippen', 'Baardverzorging', 'Traditional shaving'],
      image: '/image copy copy copy copy copy copy copy copy copy.png',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            ONS TEAM
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Ontmoet onze meesterkappers en specialisten die klaarstaan om jou de beste service te bieden
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {team.map((member, index) => (
            <div
              key={index}
              className="group bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={member.image}
                  alt={`${member.name} - ${member.role} bij Barbershop De Linge Elst met ${member.experience}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-1 text-gray-900">{member.name}</h3>
                <p className="text-amber-600 text-base font-semibold mb-4">{member.role}</p>

                <div className="flex items-center text-gray-600 mb-4">
                  <Award size={18} className="text-amber-600 mr-2" />
                  <span className="text-sm font-semibold">{member.experience}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start">
                    <Scissors size={16} className="text-amber-600 mr-2 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-gray-700 mb-1">Specialiteiten:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {member.specialties.map((specialty, idx) => (
                          <li key={idx} className="flex items-center">
                            <Star size={12} className="text-amber-500 mr-1 fill-amber-500" />
                            {specialty}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => window.open('https://barbershopdelinge.setmore.com', '_blank')}
                  className="mt-6 w-full bg-amber-600 text-white py-3 text-sm font-bold uppercase hover:bg-amber-700 transition-colors rounded-sm"
                >
                  BOEK MET {member.name.split(' ')[0].toUpperCase()}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-8 sm:p-12 text-white">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">Onze Filosofie</h3>
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Bij Barbershop & Tattoos De Linge geloven we in vakmanschap, precisie en persoonlijke aandacht.
            Elk teamlid is getraind in de nieuwste technieken en klassieke methoden om jou de
            beste ervaring te bieden. We nemen de tijd voor elke klant en zorgen ervoor dat je
            met een glimlach de deur uitloopt.
          </p>
        </div>
      </div>
    </section>
  );
}
