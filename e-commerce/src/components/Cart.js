'use client';
import { useState } from 'react';

export default function Cart({ products }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems((prev) => {
            const existingItem = prev.find((item) => item.id === product.id);
            if (existingItem) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prev, { ...product, quantity: 1 }];
            }
        });
    };

    return (
        <div>
            <h2>Produkte</h2>
            {products.map((product) => (
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>{product.price}€</p>
                    <button onClick={() => addToCart(product)}>In den Warenkorb</button>
                </div>
            ))}

            <h2 className='mt-10'>Warenkorb</h2>
            {cartItems.map((item) => (
                <div key={item.id}>
                    <h3>{item.name} (x{item.quantity})</h3>
                    <p>Gesamt: {item.price * item.quantity}€</p>
                </div>
            ))}
        </div>
    );
}
