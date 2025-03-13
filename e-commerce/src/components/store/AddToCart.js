'use client';
import { useState } from 'react';
import { useCartStore } from '@/lib/store/cartStore';
import { categories } from '@/data/kategorieOptionen';
const AddToCart = ({ product, gekaufteMenge, modell}) => {
    const addToCart = useCartStore((state) => state.addToCart);
    const [isLoading, setIsLoading] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        setIsLoading(true);
        if (!modell) {
            alert("Bitte ein Modell wählen!");
            setIsLoading(false);
            return;
        }
        const ausgewähltesModell = categories.modell.find(item => item.value === modell).label    
        // Produkt zum Warenkorb hinzufügen
        addToCart({ ...product, gekaufteMenge: gekaufteMenge || 1, modell: ausgewähltesModell });

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
                ${isAdded ? 'bg-AccentGreen' : 'bg-BrandBlue hover:bg-BrandBlueLight active:bg-BrandBlueDark'}
                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
        >
            {isLoading ? '⏳...' : isAdded ? 'Hinzugefügt!' : '🛒 In den Warenkorb'}
        </button>
    );
};

export default AddToCart;
