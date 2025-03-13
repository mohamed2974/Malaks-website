import sql from '@/lib/neon-DB';

export async function GET() {
  try {
    const result = await sql`SELECT * FROM produkte LIMIT 10`; // Abfrage
    
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=600, stale-while-revalidate', // Cache für 10 Minuten => 1800
      },
    });
  } catch (error) {
    console.error('Fehler bei der GET-Anfrage:', error);
    return new Response('Fehler beim Abrufen der Daten', { status: 500 });
  }
}

export async function POST(request) {
  const formData = await request.formData();
  const name = formData.get('name');
  const beschreibung = formData.get('beschreibung');
  const preis = parseFloat(formData.get('preis'));
  const kategorie = formData.get('kategorie');
  const lagerort = formData.get('lagerort') || null;
  const status = formData.get('status') || 'verfügbar';
  const hersteller = formData.get('hersteller') || null;
  const gewicht = formData.get('gewicht') ? parseFloat(formData.get('gewicht')) : null;
  const rabatt_prozent = formData.get('rabatt_prozent') ? parseFloat(formData.get('rabatt_prozent')) : 0;
  const mengeAirpodsPro = parseInt(formData.get('mengeAirpodsPro'), 10);
  const menge2Generation = parseInt(formData.get('menge2Generation'), 10);
  const menge3Generation = parseInt(formData.get('menge3Generation'), 10);

  const modelQuantities = {
    airpodsPro: mengeAirpodsPro || 0,
    generation2: menge2Generation || 0,
    generation3: menge3Generation || 0
  };
  

  const menge = Object.values(modelQuantities).reduce((acc, menge) => acc + menge, 0);

  // Mehrere Bild-URLs als JSON-Array empfangen
  let bildUrls = formData.get('bildUrls');
  bildUrls = bildUrls ? JSON.parse(bildUrls) : [];

  if (!bildUrls.length) {
    return new Response('Keine Bilder hochgeladen', { status: 400 });
  }
  
  // Validierung der numerischen Werte
  if (Object.values(modelQuantities).some(isNaN)) {
    return new Response('Ungültige Mengenangaben für eines der Modelle', { status: 400 });
  }  

  if ([preis, menge, gewicht, rabatt_prozent].some(isNaN)) {
  return new Response('Ungültige Eingabewerte für Preis, Menge, Gewicht oder Rabatt-Prozentwert', { status: 400 });
}

  try {
    await sql`
      INSERT INTO produkte 
        (name, beschreibung, preis, menge, kategorie, lagerort, status, hersteller, gewicht, rabatt_prozent, bild_urls, model_mengen) 
      VALUES 
        (${name}, ${beschreibung}, ${preis}, ${menge}, ${kategorie}, ${lagerort}, ${status}, ${hersteller}, ${gewicht}, ${rabatt_prozent}, ${JSON.stringify(bildUrls)}, ${JSON.stringify(modelQuantities)})
    `;

    return new Response('Produkt hinzugefügt', { status: 200 });
  } catch (error) {
    console.error('Fehler bei der POST-Anfrage:', error);
    return new Response('Fehler beim Hinzufügen des Produkts', { status: 500 });
  }
}
