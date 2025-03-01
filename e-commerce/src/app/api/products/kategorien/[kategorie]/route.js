import sql from '@/lib/neon-DB';  // Importiere die Neon-Verbindung

export async function GET(request, context) {
    const { kategorie } = await context.params;  // ✅ Richtig destrukturieren

    try {
        // Alle Produkte mit der angegebenen Kategorie abrufen
        const result = await sql`
        SELECT * FROM produkte WHERE kategorie = ${kategorie};
        `;

        if (result.length === 0) {
            return new Response('Keine Produkte gefunden', { status: 404 });
        }

        return new Response(JSON.stringify(result), {  // Alle Produkte zurückgeben
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 's-maxage=600, stale-while-revalidate',
            },
        });
    } catch (error) {
        console.error('Fehler beim Abrufen der Produkte:', error);
        return new Response('Fehler beim Abrufen der Produkte', { status: 500 });
    }
}
