'use client';

import { useState } from 'react';

export default function CheckoutButton({ cartItems }) { 
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        if (!cartItems || cartItems.length === 0) {
            alert("Dein Warenkorb ist leer!");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: cartItems }),
            });

            const data = await response.json();
            if (data.sessionUrl) {
                window.location.href = data.sessionUrl; // Jetzt richtige Stripe-URL nutzen
            } else {
                console.error("Fehler beim Checkout:", data.error);
            }
        } catch (error) {
            console.error("Netzwerkfehler:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button 
            onClick={handleCheckout} 
            disabled={loading}
            className="bg-blue-500 text-white p-2 rounded"
        >
            {loading ? 'Lädt...' : 'Bezahlen mit Stripe'}
        </button>
    );
}
