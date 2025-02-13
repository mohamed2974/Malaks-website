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
  const menge = parseInt(formData.get('menge'), 10);
  const kategorie = formData.get('kategorie');
  const lagerort = formData.get('lagerort') || null;
  const status = formData.get('status') || 'verfügbar';
  const hersteller = formData.get('hersteller') || null;
  const gewicht = formData.get('gewicht') ? parseFloat(formData.get('gewicht')) : null;
  const rabatt_prozent = formData.get('rabatt_prozent') ? parseFloat(formData.get('rabatt_prozent')) : 0;

  // Mehrere Bild-URLs als JSON-Array empfangen
  let bildUrls = formData.get('bildUrls');
  bildUrls = bildUrls ? JSON.parse(bildUrls) : [];

  console.log('Formulardaten:', { name, beschreibung, preis, menge, kategorie, lagerort, status, hersteller, gewicht, rabatt_prozent, bildUrls });

  if (!bildUrls.length) {
    return new Response('Keine Bilder hochgeladen', { status: 400 });
  }
  
  // Validierung der numerischen Werte
  if (isNaN(preis)) {
    return new Response('Ungültiger Preis', { status: 400 });
  }

  if (isNaN(menge)) {
    return new Response('Ungültige Menge', { status: 400 });
  }

  if (isNaN(gewicht)) {
    return new Response('Ungültiges Gewicht', { status: 400 });
  }

  if (isNaN(rabatt_prozent)) {
    return new Response('Ungültiger Rabatt-Prozentwert', { status: 400 });
  }

  try {
    const sql = neon(process.env.DATABASE_URL); // Verbindung zur Neon-Datenbank mit Umgebungsvariable
    await sql`
      INSERT INTO produkte 
        (name, beschreibung, preis, menge, kategorie, lagerort, status, hersteller, gewicht, rabatt_prozent, bild_urls) 
      VALUES 
        (${name}, ${beschreibung}, ${preis}, ${menge}, ${kategorie}, ${lagerort}, ${status}, ${hersteller}, ${gewicht}, ${rabatt_prozent}, ${JSON.stringify(bildUrls)})
    `;

    return new Response('Produkt hinzugefügt', { status: 200 });
  } catch (error) {
    console.error('Fehler bei der POST-Anfrage:', error);
    return new Response('Fehler beim Hinzufügen des Produkts', { status: 500 });
  }
}
