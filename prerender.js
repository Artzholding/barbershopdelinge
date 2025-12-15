import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seoConfig = {
  'herenkapper': {
    title: 'Herenkapper Elst | Moderne Herenkapsels & Styling - Barbershop De Linge',
    description: 'Professionele herenkapper in Elst. Moderne herenkapsels, fade knippen, tondeuse knippen en styling. Ervaren kappers voor het perfecte kapsel. Boek online of walk-in welkom.',
    keywords: 'herenkapper elst, moderne herenkapsels elst, kapper mannen elst, heren kapsalon elst, kapsel styling elst, fade knippen elst, tondeuse knippen elst, beste herenkapper regio nijmegen',
    hash: '#herenkapper'
  },
  'barbier': {
    title: 'Barbier Elst | Baardverzorging & Traditioneel Scheren - Barbershop De Linge',
    description: 'Traditionele barbier service in Elst. Professionele baardverzorging, klassiek scheren met scheermes, baard trimmen en verzorging. Authentieke barbier ervaring in de regio Nijmegen.',
    keywords: 'barbier elst, baardverzorging elst, baard trimmen elst, traditioneel scheren elst, scheermes scheren elst, barbershop diensten elst, professionele barbier regio nijmegen, baard specialist elst',
    hash: '#barbier'
  },
  'waxen': {
    title: 'Waxen voor Mannen Elst | Professionele Ontharingsbehandeling - Barbershop De Linge',
    description: 'Professionele wax behandelingen voor mannen in Elst. Lichaamswaxen, rug waxen, borst waxen en meer. Hygiënisch en professioneel uitgevoerd door ervaren specialisten.',
    keywords: 'waxen mannen elst, lichaam waxen elst, rug waxen elst, ontharingsbehandeling mannen elst, body waxing elst, professioneel waxen regio nijmegen',
    hash: '#waxen'
  },
  'gezichtsbehandeling': {
    title: 'Gezichtsbehandeling Mannen Elst | Huidverzorging & Facial - Barbershop De Linge',
    description: 'Gezichtsbehandeling speciaal voor mannen in Elst. Professionele huidverzorging, deep cleansing facial, anti-aging behandelingen. Geef je huid de verzorging die het verdient.',
    keywords: 'gezichtsbehandeling mannen elst, facial mannen elst, huidverzorging mannen elst, gezichtsverzorging elst, deep cleansing elst, anti-aging mannen elst, skincare mannen regio nijmegen',
    hash: '#gezicht'
  },
  'massages': {
    title: 'Massage voor Mannen Elst | Ontspanningsmassage & Hoofdmassage - Barbershop De Linge',
    description: 'Ontspannende massage behandelingen voor mannen in Elst. Hoofdmassage, nekmassage, schoudermassage. Combineer je kappersbezoek met ultieme ontspanning.',
    keywords: 'massage mannen elst, hoofdmassage elst, nekmassage elst, ontspanningsmassage elst, schoudermassage elst, wellness mannen elst, massage bij kapper elst',
    hash: '#massages'
  },
  'scheerwinkel': {
    title: 'Scheerwinkel Elst | Scheermessen, Baardolie & Verzorgingsproducten',
    description: 'Complete scheerwinkel en barbershop producten in Elst. Scheermessen, baardolie, pomade, styling producten en verzorgingsartikelen. Premium merken voor thuis baardverzorging.',
    keywords: 'scheerwinkel elst, scheermessen elst, baardolie elst, pomade elst, barbershop producten elst, baard verzorgingsproducten elst, heren verzorging elst',
    hash: '#scheerwinkel'
  },
  'team': {
    title: 'Ons Team | Ervaren Kappers & Barbiers - Barbershop De Linge Elst',
    description: 'Maak kennis met ons team van ervaren kappers en barbiers in Elst. Professionele specialisten met jarenlange ervaring in herenkapsels en baardverzorging.',
    keywords: 'kapper team elst, barbiers elst, professionele kappers elst, ervaren barbiers regio nijmegen',
    hash: '#team'
  },
  'over-ons': {
    title: 'Over Ons | Barbershop De Linge Elst sinds 2007',
    description: 'Ontdek het verhaal van Barbershop De Linge Elst. Sinds 2007 dé specialist in herenkapsels, baardverzorging en tattoos. Premium barbershop in het hart van Elst.',
    keywords: 'barbershop de linge elst, kapper elst sinds 2007, geschiedenis barbershop elst, over barbershop de linge',
    hash: '#over-ons'
  },
  'contact': {
    title: 'Contact & Afspraak Maken | Barbershop De Linge Elst',
    description: 'Maak een afspraak bij Barbershop De Linge Elst. Bel, mail of kom langs. Adres, openingstijden en contactgegevens. Walk-in welkom of boek online voor zekerheid.',
    keywords: 'contact kapper elst, afspraak maken barbershop elst, kapper afspraak elst, openingstijden barbershop elst, adres kapper elst, telefoonnummer barbier elst',
    hash: '#contact'
  }
};

function generateHTML(page, config) {
  return `<!doctype html>
<html lang="nl">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${config.title}</title>
    <meta name="description" content="${config.description}" />
    <meta name="keywords" content="${config.keywords}" />
    <meta name="author" content="Barbershop De Linge" />
    <meta name="geo.region" content="NL-GE" />
    <meta name="geo.placename" content="Elst" />
    <meta name="geo.position" content="51.9177;5.8431" />
    <meta name="ICBM" content="51.9177, 5.8431" />
    <meta property="og:title" content="${config.title}" />
    <meta property="og:description" content="${config.description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://barbershopdelinge.nl/${page}.html" />
    <meta property="og:image" content="https://barbershopdelinge.nl/barbershop_de_linge_logo copy.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="nl_NL" />
    <meta property="og:site_name" content="Barbershop De Linge Elst" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${config.title}" />
    <meta name="twitter:description" content="${config.description}" />
    <meta name="twitter:image" content="https://barbershopdelinge.nl/barbershop_de_linge_logo copy.jpg" />
    <link rel="canonical" href="https://barbershopdelinge.nl/${page}.html" />
    <meta http-equiv="refresh" content="0; url=/${config.hash}" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-E2JJB2HQZY"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-E2JJB2HQZY');
      window.location.href = '/${config.hash}';
    </script>
  </head>
  <body>
    <noscript>
      <meta http-equiv="refresh" content="0; url=/${config.hash}" />
    </noscript>
    <div id="root">
      <div style="max-width: 1200px; margin: 0 auto; padding: 40px 20px; font-family: Arial, sans-serif;">
        <h1>${config.title}</h1>
        <p>${config.description}</p>
        <p>Een moment geduld, we laden de pagina...</p>
        <p><a href="/${config.hash}">Klik hier als je niet automatisch wordt doorgestuurd</a></p>
      </div>
    </div>
  </body>
</html>`;
}

function prerender() {
  const distPath = path.join(__dirname, 'dist');

  console.log('🚀 Starting prerendering for SEO...');

  for (const [page, config] of Object.entries(seoConfig)) {
    try {
      const html = generateHTML(page, config);
      const outputFile = path.join(distPath, `${page}.html`);

      fs.writeFileSync(outputFile, html);

      console.log(`✅ Generated: ${page}.html`);
    } catch (error) {
      console.error(`❌ Error generating ${page}.html:`, error.message);
    }
  }

  console.log('✅ Prerendering complete!');
}

prerender();
