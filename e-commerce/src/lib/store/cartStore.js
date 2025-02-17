import { create } from 'zustand';

const MAX_CART_SIZE = 50; 

const getLocalStorageCart = () => {
    if (typeof window !== 'undefined') {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
};

export const useCartStore = create((set) => ({
    cart: getLocalStorageCart(),

    addToCart: (product) => set((state) => {
        if (state.cart.length >= MAX_CART_SIZE) {
            alert("❌ Dein Warenkorb ist voll! Entferne zuerst ein Produkt.");
            return state;
        }

        const existingItemIndex = state.cart.findIndex((item) => item.id === product.id);

        let updatedCart;
        if (existingItemIndex !== -1) {
            // Falls das Produkt bereits im Warenkorb ist, aktualisiere die Menge
            updatedCart = [...state.cart];
            updatedCart[existingItemIndex].gekaufteMenge += product.gekaufteMenge || 1;
        } else {
            // Falls das Produkt noch nicht im Warenkorb ist, füge es hinzu
            updatedCart = [...state.cart, { ...product, gekaufteMenge: product.gekaufteMenge || 1 }];
        }

        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return { cart: updatedCart };
    }),

    removeFromCart: (id) => set((state) => {
        const updatedCart = state.cart.filter((item) => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return { cart: updatedCart };
    }),

    clearCart: () => set(() => {
        localStorage.removeItem('cart');
        return { cart: [] };
    }),
}));
