export interface SEOConfig {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
}

export const seoConfig: Record<string, SEOConfig> = {
  home: {
    title: 'Barbershop De Linge Elst | Beste Kapper, Barbier & Tattoo Studio Elst',
    description: 'Beste kapper en barbershop in Elst sinds 2007. Specialist in herenkapsels, professionele baardverzorging, fade knippen en tattoos. Premium barbier service in de regio Nijmegen.',
    keywords: 'beste kapper elst, barbershop elst, professionele barbier elst, herenkapper elst, fade knippen elst, baardverzorging elst, tattoo elst, tattoo studio elst, kapsalon elst, kapper regio nijmegen, barbier nijmegen regio, kappers arnhem regio',
    ogTitle: 'Barbershop De Linge Elst | Premium Kapper & Barbier sinds 2007',
    ogDescription: 'De beste kapper en barbershop in Elst. Specialist in herenkapsels, baardverzorging, fade knippen en tattoos.'
  },
  herenkapper: {
    title: 'Herenkapper Elst | Moderne Herenkapsels & Styling - Barbershop De Linge',
    description: 'Professionele herenkapper in Elst. Moderne herenkapsels, fade knippen, tondeuse knippen en styling. Ervaren kappers voor het perfecte kapsel. Boek online of walk-in welkom.',
    keywords: 'herenkapper elst, moderne herenkapsels elst, kapper mannen elst, heren kapsalon elst, kapsel styling elst, fade knippen elst, tondeuse knippen elst, beste herenkapper regio nijmegen',
    ogTitle: 'Herenkapper Elst | Moderne Herenkapsels & Fade Knippen',
    ogDescription: 'Professionele herenkapper in Elst. Moderne herenkapsels, fade knippen en styling door ervaren kappers.'
  },
  barbier: {
    title: 'Barbier Elst | Baardverzorging & Traditioneel Scheren - Barbershop De Linge',
    description: 'Traditionele barbier service in Elst. Professionele baardverzorging, klassiek scheren met scheermes, baard trimmen en verzorging. Authentieke barbier ervaring in de regio Nijmegen.',
    keywords: 'barbier elst, baardverzorging elst, baard trimmen elst, traditioneel scheren elst, scheermes scheren elst, barbershop diensten elst, professionele barbier regio nijmegen, baard specialist elst',
    ogTitle: 'Barbier Elst | Professionele Baardverzorging & Traditioneel Scheren',
    ogDescription: 'Traditionele barbier service in Elst. Baardverzorging, klassiek scheren en baard trimmen door ervaren barbiers.'
  },
  waxen: {
    title: 'Waxen voor Mannen Elst | Professionele Ontharingsbehandeling - Barbershop De Linge',
    description: 'Professionele wax behandelingen voor mannen in Elst. Lichaamswaxen, rug waxen, borst waxen en meer. Hygiënisch en professioneel uitgevoerd door ervaren specialisten.',
    keywords: 'waxen mannen elst, lichaam waxen elst, rug waxen elst, ontharingsbehandeling mannen elst, body waxing elst, professioneel waxen regio nijmegen',
    ogTitle: 'Waxen voor Mannen Elst | Professionele Ontharingsbehandeling',
    ogDescription: 'Professionele wax behandelingen voor mannen. Lichaamswaxen uitgevoerd door ervaren specialisten.'
  },
  gezicht: {
    title: 'Gezichtsbehandeling Mannen Elst | Huidverzorging & Facial - Barbershop De Linge',
    description: 'Gezichtsbehandeling speciaal voor mannen in Elst. Professionele huidverzorging, deep cleansing facial, anti-aging behandelingen. Geef je huid de verzorging die het verdient.',
    keywords: 'gezichtsbehandeling mannen elst, facial mannen elst, huidverzorging mannen elst, gezichtsverzorging elst, deep cleansing elst, anti-aging mannen elst, skincare mannen regio nijmegen',
    ogTitle: 'Gezichtsbehandeling Mannen Elst | Professionele Huidverzorging',
    ogDescription: 'Gezichtsbehandeling speciaal voor mannen. Professionele huidverzorging en facial treatments.'
  },
  massage: {
    title: 'Massage voor Mannen Elst | Ontspanningsmassage & Hoofdmassage - Barbershop De Linge',
    description: 'Ontspannende massage behandelingen voor mannen in Elst. Hoofdmassage, nekmassage, schoudermassage. Combineer je kappersbezoek met ultieme ontspanning.',
    keywords: 'massage mannen elst, hoofdmassage elst, nekmassage elst, ontspanningsmassage elst, schoudermassage elst, wellness mannen elst, massage bij kapper elst',
    ogTitle: 'Massage voor Mannen Elst | Ontspanning & Wellness',
    ogDescription: 'Ontspannende massage behandelingen voor mannen. Hoofdmassage, nekmassage en meer bij je kappersbezoek.'
  },
  scheerwinkel: {
    title: 'Scheerwinkel Elst | Scheermessen, Baardolie & Verzorgingsproducten',
    description: 'Complete scheerwinkel en barbershop producten in Elst. Scheermessen, baardolie, pomade, styling producten en verzorgingsartikelen. Premium merken voor thuis baardverzorging.',
    keywords: 'scheerwinkel elst, scheermessen elst, baardolie elst, pomade elst, barbershop producten elst, baard verzorgingsproducten elst, heren verzorging elst',
    ogTitle: 'Scheerwinkel Elst | Scheermessen & Baardverzorging Producten',
    ogDescription: 'Complete scheerwinkel met scheermessen, baardolie, pomade en verzorgingsproducten. Premium merken.'
  },
  team: {
    title: 'Ons Team | Ervaren Kappers & Barbiers - Barbershop De Linge Elst',
    description: 'Maak kennis met ons team van ervaren kappers en barbiers in Elst. Professionele specialisten met jarenlange ervaring in herenkapsels en baardverzorging.',
    keywords: 'kapper team elst, barbiers elst, professionele kappers elst, ervaren barbiers regio nijmegen',
    ogTitle: 'Ons Team | Ervaren Kappers & Barbiers in Elst',
    ogDescription: 'Maak kennis met ons team van ervaren kappers en barbiers.'
  },
  'over-ons': {
    title: 'Over Ons | Barbershop De Linge Elst sinds 2007',
    description: 'Ontdek het verhaal van Barbershop De Linge Elst. Sinds 2007 dé specialist in herenkapsels, baardverzorging en tattoos. Premium barbershop in het hart van Elst.',
    keywords: 'barbershop de linge elst, kapper elst sinds 2007, geschiedenis barbershop elst, over barbershop de linge',
    ogTitle: 'Over Barbershop De Linge Elst | Sinds 2007',
    ogDescription: 'Sinds 2007 dé specialist in herenkapsels, baardverzorging en tattoos in Elst.'
  },
  contact: {
    title: 'Contact & Afspraak Maken | Barbershop De Linge Elst',
    description: 'Maak een afspraak bij Barbershop De Linge Elst. Bel, mail of kom langs. Adres, openingstijden en contactgegevens. Walk-in welkom of boek online voor zekerheid.',
    keywords: 'contact kapper elst, afspraak maken barbershop elst, kapper afspraak elst, openingstijden barbershop elst, adres kapper elst, telefoonnummer barbier elst',
    ogTitle: 'Contact & Afspraak Maken | Barbershop De Linge Elst',
    ogDescription: 'Maak een afspraak bij Barbershop De Linge Elst. Walk-in welkom of boek online.'
  }
};

export function updateMetaTags(page: string): void {
  const config = seoConfig[page] || seoConfig.home;

  document.title = config.title;

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', config.description);
  }

  const metaKeywords = document.querySelector('meta[name="keywords"]');
  if (metaKeywords) {
    metaKeywords.setAttribute('content', config.keywords);
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', config.ogTitle || config.title);
  }

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute('content', config.ogDescription || config.description);
  }

  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) {
    twitterTitle.setAttribute('content', config.ogTitle || config.title);
  }

  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (twitterDescription) {
    twitterDescription.setAttribute('content', config.ogDescription || config.description);
  }
}
