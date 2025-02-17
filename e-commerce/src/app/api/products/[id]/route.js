// app/api/products/[id]/route.js
import sql from '@/lib/neon-DB';  // Importiere die Neon-Verbindung

export async function GET(request, context) {
    const { params } = context; // ✅ context verwenden
    const { id } = await params;

    try {
        // Führe eine SQL-Abfrage aus, um das Produkt anhand der ID zu finden
        const result = await sql`
        SELECT * FROM produkte WHERE id = ${id} LIMIT 1;
        `;

    if (result.length === 0) {
        return new Response('Produkt nicht gefunden', { status: 404 });
    }

    return new Response(JSON.stringify(result[0]), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 's-maxage=600, stale-while-revalidate', // Cache für 10 Minuten => 1800
        },
    });
    } catch (error) {
        console.error('Fehler beim Abrufen des Produkts:', error);
        return new Response('Fehler beim Abrufen des Produkts', { status: 500 });
    }
}
