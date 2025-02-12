import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Live Key in .env.local

export async function POST(req) {
    try {
        const { items } = await req.json();

        if (!items || items.length === 0) {
            return new Response(JSON.stringify({ error: "Warenkorb ist leer" }), { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            shipping_address_collection: {
                allowed_countries: ['DE'], // passe die Länder nach Bedarf an
            },
            line_items: items.map((item) => ({
                price_data: {
                    currency: 'eur',
                    product_data: { 
                        name: item.name,
                        // Falls du weitere Produktdetails hast:
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
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
