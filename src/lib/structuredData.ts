export interface StructuredDataConfig {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

export function getLocalBusinessSchema(): StructuredDataConfig {
  return {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    name: 'Barbershop De Linge',
    alternateName: 'De Linge Barbershop Elst',
    description: 'Premium kapper en barbershop in Elst sinds 2007. Specialist in herenkapsels, baardverzorging, fade knippen en tattoos.',
    image: 'https://barbershopdelinge.nl/barbershop_de_linge_logo copy.jpg',
    '@id': 'https://barbershopdelinge.nl',
    url: 'https://barbershopdelinge.nl',
    telephone: '+31-26-123-4567',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Dorpsstraat 123',
      addressLocality: 'Elst',
      addressRegion: 'Gelderland',
      postalCode: '6661 AB',
      addressCountry: 'NL'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.9177,
      longitude: 5.8431
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday'],
        opens: '09:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday'],
        opens: '09:00',
        closes: '17:00'
      }
    ],
    sameAs: [
      'https://www.facebook.com/barbershopdelinge',
      'https://www.instagram.com/barbershopdelinge'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    },
    areaServed: {
      '@type': 'City',
      name: 'Elst',
      containedIn: {
        '@type': 'State',
        name: 'Gelderland'
      }
    },
    knowsAbout: [
      'Herenkapsels',
      'Fade knippen',
      'Baardverzorging',
      'Traditioneel scheren',
      'Tattoos',
      'Gezichtsbehandeling mannen',
      'Waxen voor mannen',
      'Massage'
    ]
  };
}

export function getServicesSchema(): StructuredDataConfig[] {
  const baseUrl = 'https://barbershopdelinge.nl';

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Herenkapper',
      provider: {
        '@type': 'HairSalon',
        name: 'Barbershop De Linge'
      },
      areaServed: {
        '@type': 'City',
        name: 'Elst'
      },
      description: 'Professionele herenkapper in Elst. Moderne herenkapsels, fade knippen en styling.',
      url: `${baseUrl}/herenkapper`,
      offers: {
        '@type': 'Offer',
        priceRange: '€20-€35'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Barbier',
      provider: {
        '@type': 'HairSalon',
        name: 'Barbershop De Linge'
      },
      areaServed: {
        '@type': 'City',
        name: 'Elst'
      },
      description: 'Traditionele barbier service in Elst. Baardverzorging, klassiek scheren met scheermes.',
      url: `${baseUrl}/barbier`,
      offers: {
        '@type': 'Offer',
        priceRange: '€15-€30'
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Tattoo Studio',
      provider: {
        '@type': 'HairSalon',
        name: 'Barbershop De Linge'
      },
      areaServed: {
        '@type': 'City',
        name: 'Elst'
      },
      description: 'Professionele tattoo studio in Elst. Custom tattoos en tattoo designs.',
      offers: {
        '@type': 'Offer',
        priceRange: '€€€'
      }
    }
  ];
}

export function getBreadcrumbSchema(page: string): StructuredDataConfig {
  const baseUrl = 'https://barbershopdelinge.nl';

  const breadcrumbs: Record<string, { position: number; name: string; url: string }[]> = {
    home: [
      { position: 1, name: 'Home', url: baseUrl }
    ],
    herenkapper: [
      { position: 1, name: 'Home', url: baseUrl },
      { position: 2, name: 'Herenkapper Elst', url: `${baseUrl}/herenkapper` }
    ],
    barbier: [
      { position: 1, name: 'Home', url: baseUrl },
      { position: 2, name: 'Barbier Elst', url: `${baseUrl}/barbier` }
    ],
    contact: [
      { position: 1, name: 'Home', url: baseUrl },
      { position: 2, name: 'Contact', url: `${baseUrl}/contact` }
    ]
  };

  const items = breadcrumbs[page] || breadcrumbs.home;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(item => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      item: item.url
    }))
  };
}

export function injectStructuredData(schemas: StructuredDataConfig[]): void {
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
  existingScripts.forEach(script => script.remove());

  schemas.forEach(schema => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}
