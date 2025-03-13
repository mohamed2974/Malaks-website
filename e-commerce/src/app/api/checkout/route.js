import finalpreis from '@/utils/functions/finalpreis';
import { stripe } from '@/lib/stripe';
import { versandpreis } from '@/data/shop/festepreise';

export async function POST(req) {
    try {
        const { items } = await req.json();

        // Überprüfen, ob der Warenkorb leer ist
        if (!items || items.length === 0) {
            return new Response(JSON.stringify({ error: "Warenkorb ist leer" }), { status: 400 });
        }

        // logik für den endpreis bei mehrere gekaufte produkte
        const totalQuantity = items.reduce((sum, item) => sum + (item.gekaufteMenge || 1), 0); 
        let MengenRabatt = 1
        if (totalQuantity === 2){
            MengenRabatt = 0.9
        } else if (totalQuantity === 3){
            MengenRabatt = 0.85
        } else if (totalQuantity >= 5){
            MengenRabatt = 0.6
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

            const produktPreis = {
                preis: item.preis * MengenRabatt, // Preis nach Rabatt
                rabatt_prozent: item.rabatt_prozent,
            }

            return {
                ...item,
                price: finalpreis(produktPreis),  // Stellen sicher, dass der Preis ein gültiger Wert ist
                quantity: quantity,  // Stellen sicher, dass die Menge korrekt ist
            };
        });

        // Erstellen der Stripe-Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            shipping_address_collection: {
                allowed_countries: ['DE'], // Passe die Länder nach Bedarf an
            },
            line_items: [    
                ...sanitizedItems.map((item) => {
                    const originalPrice = parseFloat(item.preis);
                    const discountedPrice = item.price; // Preis nach allen Rabatten
                    const priceDifference = originalPrice - discountedPrice; // Gesamtersparnis
                
                    return {
                        price_data: {
                            currency: 'eur',
                            product_data: { 
                                name: item.name,
                                description: `${item.modell ? item.modell : "Kein Modell angegeben"} |
                                🔹 Originalpreis: ${originalPrice.toFixed(2)}€ | 
                                🔻 Rabatt gespart: -${priceDifference.toFixed(2)}€ |
                                ✅ Endpreis: ${parseFloat(discountedPrice).toFixed(2)}€`,
                            },
                            unit_amount: Math.max(1, Math.round(discountedPrice * 100)), // Preis in Cent
                        },
                        quantity: item.quantity,
                    };
                }),
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: "Versandkosten",
                            description: "Standardversand innerhalb Deutschlands",
                        },
                        unit_amount: versandpreis * 100, // 2,99 € in Cent
                    },
                    quantity: 1,
                },
            ],
            
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL}/shop/korb`,
        });

        return new Response(JSON.stringify({ sessionUrl: session.url }), { status: 200 });
    } catch (error) {
        console.error("Fehler beim Checkout: ", error.message);  // Fehlerprotokollierung
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
