'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/store/cartStore'; // Warenkorb-Zustand importieren

export default function CheckoutButton({className}) { 
    const [loading, setLoading] = useState(false);
    const cartItems = useCartStore((state) => state.cart); // 🛒 Warenkorb aus Zustand holen

    // Überprüfen und sicherstellen, dass nur relevante Werte übergeben werden
    const sanitizeCartItems = (items) => {
        return items.map(item => {
            // Nur die relevanten Felder extrahieren
            const { id, name, preis, rabatt_prozent, gekaufteMenge } = item;

            const sanitizedItem = {
                id: parseFloat(id),  // Produkt-ID (wichtig)
                name,  // Produktname (wichtig)
                preis: parseFloat(preis) || 0,  // Preis als Zahl
                rabatt_prozent: parseFloat(rabatt_prozent) || 0, // Rabatt als Zahl
                gekaufteMenge: parseInt(gekaufteMenge) || 1, // Menge sicherstellen

            };
            
            console.log("Sanitized Item:", sanitizedItem);  // Debugging

            return sanitizedItem;
        });
    };

    const handleCheckout = async () => {
        if (!cartItems || cartItems.length === 0) {
            alert("❌ Dein Warenkorb ist leer!");
            return;
        }

        setLoading(true);

        try {
            // Sanitize die Warenkorb-Artikel, um sicherzustellen, dass nur relevante Werte gesendet werden
            const sanitizedItems = sanitizeCartItems(cartItems);

            console.log("Sanitized Cart Items before sending to server:", sanitizedItems); // Debugging

            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: sanitizedItems }),
            });

            const data = await response.json();
            if (data.sessionUrl) {
                window.location.href = data.sessionUrl; // ✅ Stripe-Session öffnen
            } else {
                console.error("Fehler beim Checkout:", data.error);
            }
        } catch (error) {
            console.error("❌ Netzwerkfehler:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button 
            onClick={handleCheckout} 
            disabled={loading}
            className={`bg-blue-500 text-white p-2 rounded ${className}`}
        >
            {loading ? 'Lädt...' : '💳 Bezahlen mit Stripe'}
        </button>
    );
}
