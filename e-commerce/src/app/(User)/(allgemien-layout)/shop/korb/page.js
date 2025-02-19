'use client';
import { useCartStore } from '@/lib/store/cartStore';
import CheckoutButton from '@/utils/CheckoutButton-component';
import finalpreis from '@/utils/functions/finalpreis';
import Image from 'next/image';
import { BsEmojiAstonished } from "react-icons/bs";

export default function CartPage() {
    const { cart, removeFromCart, clearCart } = useCartStore();

    return (
        <section className=''>
            <div className="flex items-center gap-2 my-6">
                <span className="text-5xl">🛒</span>
                <h1 className="text-4xl font-bold">Warenkorb</h1>
            </div>
            {cart.length !== 0 ? (
                <>
                    <ul className="bg-white shadow-md rounded-lg p-4">
                        {cart.map((item, index) => (
                            <li key={index} className="py-4 flex flex-col md:justify-between md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                                <div className='flex flex-row items-center'>
                                    <div className="flex-shrink-0">
                                        <Image 
                                            src={item.bild_urls[0]} 
                                            alt={item.name} 
                                            width={100} 
                                            height={100} 
                                            className="rounded-md object-cover"
                                        />
                                    </div>
                                    <div className="px-10 text-start">
                                        <p className="w-full font-semibold mb-2 md:mb-1">{item.name}</p>
                                        <p className="w-full text-gray-600">{finalpreis(item)} € • {item.gekaufteMenge}x</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:text-red-700 transition duration-200 mx-auto md:mx-0"
                                >
                                    🗑️ Entfernen
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
                        <CheckoutButton className={`w-full mb-5 md:w-fit`}/>
                        <button
                            onClick={clearCart}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-200 w-full md:w-auto"
                        >
                            Warenkorb leeren
                        </button>
                    </div>
                </>
            ) : (
                <div className="h-[50vh] flex flex-col justify-center items-center text-gray-600">
                    {cart.length === 0 && (
                        <div className="text-center space-y-4">
                            <span className="flex justify-center text-7xl text-gray-500"><BsEmojiAstonished /></span>
                            <p className="text-lg font-medium">Dein Warenkorb ist leer.</p>
                            <button 
                                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition duration-200 shadow-md"
                                onClick={() => window.location.href = '/shop'} // Beispiel-Link zur Shop-Seite
                            >
                                Produkte ansehen
                            </button>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}
