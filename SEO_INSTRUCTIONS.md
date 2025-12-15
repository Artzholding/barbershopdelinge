# SEO Verbeteringen - Barbershop De Linge

## Wat is er gedaan?

Je website was niet zichtbaar in Google omdat het een Single Page Application (SPA) was met hash-based routing. Google kon alleen de homepage crawlen en niet de andere pagina's.

### Oplossingen geïmplementeerd:

1. **Statische HTML pagina's gegenereerd** voor elke route:
   - herenkapper.html
   - barbier.html
   - waxen.html
   - gezichtsbehandeling.html
   - massages.html
   - scheerwinkel.html
   - team.html
   - over-ons.html
   - contact.html

2. **SEO meta tags** toegevoegd aan elke pagina:
   - Title tags geoptimaliseerd
   - Meta descriptions
   - Keywords
   - Open Graph tags (Facebook)
   - Twitter cards
   - Canonical URLs

3. **Sitemap.xml** geüpdatet met de nieuwe URLs

4. **Server configuratie** bestanden toegevoegd:
   - .htaccess voor Apache servers
   - vercel.json voor Vercel hosting
   - netlify.toml voor Netlify hosting

## Volgende stappen om in Google te komen:

### 1. Deploy de website

Upload de volledige `dist/` folder naar je hosting provider. Zorg dat alle nieuwe HTML bestanden zijn geüpload.

### 2. Test de URLs

Controleer of deze URLs werken:
- https://barbershopdelinge.nl/herenkapper.html
- https://barbershopdelinge.nl/barbier.html
- https://barbershopdelinge.nl/waxen.html
- etc.

Ze moeten automatisch doorverwijzen naar de juiste pagina met hash routing.

### 3. Google Search Console

1. Ga naar [Google Search Console](https://search.google.com/search-console)
2. Selecteer je property: barbershopdelinge.nl
3. Klik op "Sitemaps" in het linkermenu
4. Voeg je sitemap toe: `https://barbershopdelinge.nl/sitemap.xml`
5. Klik op "Indienen"

### 4. Vraag URL-indexatie aan

Voor elke pagina:
1. Ga naar "URL-inspectie" in Search Console
2. Voer de URL in (bijv. `https://barbershopdelinge.nl/herenkapper.html`)
3. Klik op "Indexatie aanvragen"

Doe dit voor alle belangrijke pagina's:
- /herenkapper.html
- /barbier.html
- /waxen.html
- /gezichtsbehandeling.html
- /massages.html
- /scheerwinkel.html
- /team.html
- /over-ons.html
- /contact.html

### 5. Wacht op indexatie

Google heeft meestal 1-7 dagen nodig om je site opnieuw te indexeren. Je kunt de voortgang volgen in Google Search Console onder "Dekking".

## Extra tips:

1. **Backlinks**: Vraag andere websites om naar je site te linken
2. **Google My Business**: Zorg dat je profiel up-to-date is
3. **Social Media**: Deel je website op Facebook, Instagram, etc.
4. **Content**: Update regelmatig je content om Google te laten zien dat de site actief is

## Verwachte resultaten:

Na 1-2 weken zou je moeten zien:
- ✅ Website verschijnt in Google zoekresultaten
- ✅ Alle pagina's zijn geïndexeerd
- ✅ Betere rankings voor lokale zoektermen zoals "kapper elst", "barbershop elst", etc.

## Monitoring:

Check elke week je positie in Google voor deze zoektermen:
- "kapper elst"
- "barbershop elst"
- "barbier elst"
- "herenkapper elst"
- "fade knippen elst"
- "baardverzorging elst"
- "tattoo elst"

## Problemen?

Als de site na 2 weken nog niet verschijnt:
1. Check of de sitemap correct is ingediend in Search Console
2. Controleer of er geen crawl-fouten zijn in Search Console
3. Zorg dat robots.txt Google niet blokkeert
4. Check of alle HTML bestanden correct zijn geüpload

## Technische details:

- Build commando: `npm run build`
- Prerendering script: `prerender.js`
- SEO configuratie: `src/lib/seoConfig.ts`
- Structured data: `src/lib/structuredData.ts`
