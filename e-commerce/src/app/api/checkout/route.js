import finalpreis from '@/utils/functions/finalpreis';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Live Key in .env.local

export async function POST(req) {
    try {
        const { items } = await req.json();

        // Überprüfen, ob der Warenkorb leer ist
        if (!items || items.length === 0) {
            return new Response(JSON.stringify({ error: "Warenkorb ist leer" }), { status: 400 });
        }

        // Überprüfen, ob alle Preise und Mengen korrekt sind
        const sanitizedItems = items.map(item => {
            const price = parseFloat(item.preis);
            const quantity = parseFloat(item.gekaufteMenge) || 1;

            if (isNaN(price) || price <= 0) {
                throw new Error(`Ungültiger Preis für Produkt: ${item.name}`);
            }

            if (isNaN(quantity) || quantity <= 0) {
                throw new Error(`Ungültige Menge für Produkt: ${item.name}`);
            }

            return {
                ...item,
                price: finalpreis(item),  // Stellen sicher, dass der Preis ein gültiger Wert ist
                quantity: quantity,  // Stellen sicher, dass die Menge korrekt ist
            };
        });

        // Erstellen der Stripe-Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            shipping_address_collection: {
                allowed_countries: ['DE'], // Passe die Länder nach Bedarf an
            },
            line_items: sanitizedItems.map((item) => ({
                price_data: {
                    currency: 'eur',
                    product_data: { 
                        name: item.name,
                    },
                    unit_amount: item.price * 100, // Preis in Cent
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/`,
        });

        return new Response(JSON.stringify({ sessionUrl: session.url }), { status: 200 });
    } catch (error) {
        console.error("Fehler beim Checkout: ", error.message);  // Fehlerprotokollierung
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
