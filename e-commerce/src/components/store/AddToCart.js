'use client';
import { useState } from 'react';
import { useCartStore } from '@/lib/store/cartStore';

const AddToCart = ({ product, gekaufteMenge }) => {
    const addToCart = useCartStore((state) => state.addToCart);
    const [isLoading, setIsLoading] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        setIsLoading(true);
        
        // Produkt zum Warenkorb hinzufügen
        addToCart({ ...product, gekaufteMenge: gekaufteMenge || 1 });

        // Kurzzeitig "Hinzugefügt!" anzeigen
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 1500); // Nach 1,5 Sek. zurücksetzen
        
        setIsLoading(false);
    };

    return (
        <button 
            onClick={handleAddToCart}
            disabled={isLoading}
            className={`
                px-4 py-2 rounded font-semibold text-white transition-all duration-300
                ${isAdded ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'}
                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
        >
            {isLoading ? '⏳...' : isAdded ? '✅ Hinzugefügt!' : '🛒 In den Warenkorb'}
        </button>
    );
};

export default AddToCart;
