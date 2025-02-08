import { neon } from '@neondatabase/serverless';

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL); // Verbindung zur Neon-Datenbank mit Umgebungsvariable
    const result = await sql`SELECT * FROM produkte LIMIT 10`; // Abfrage
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
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

  console.log('Formulardaten:', { name, beschreibung, preis, menge, kategorie, lagerort, status, hersteller, gewicht, rabatt_prozent });

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
        (name, beschreibung, preis, menge, kategorie, lagerort, status, hersteller, gewicht, rabatt_prozent) 
      VALUES 
        (${name}, ${beschreibung}, ${preis}, ${menge}, ${kategorie}, ${lagerort}, ${status}, ${hersteller}, ${gewicht}, ${rabatt_prozent})
    `;

    return new Response('Produkt hinzugefügt', { status: 200 });
  } catch (error) {
    console.error('Fehler bei der POST-Anfrage:', error);
    return new Response('Fehler beim Hinzufügen des Produkts', { status: 500 });
  }
}
