'use client';
import { useCartStore } from '@/lib/store/cartStore';
import StandardLinkButton from '@/utils/buttons/StandardLinkButton';
import CheckoutButton from '@/utils/CheckoutButton-component';
import finalpreis from '@/utils/functions/finalpreis';
import GradientTitel from '@/utils/GradientTitel';
import Image from 'next/image';
import Link from 'next/link';
import { BsEmojiAstonished } from "react-icons/bs";
import { HiOutlineShoppingCart } from 'react-icons/hi';

export default function CartPage() {
    const { cart, removeFromCart, clearCart } = useCartStore();

    return (
        <section className=''>
            <div className="flex items-center gap-2 my-6">
                <span className="text-5xl text-TextSec"><HiOutlineShoppingCart/></span>
                <GradientTitel text='Warenkorb' />
            </div>
            {cart.length !== 0 ? (
                <>
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index} className="p-4 mt-3 bg-BgSec rounded-lg flex flex-col md:justify-between md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
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
                                        <Link href={`/shop/${item.id}`} passHref>
                                            <p className="w-full underline hover:text-BrandBlue text-TextPrim font-semibold mb-2 md:mb-1">{item.name}</p>
                                        </Link>
                                        <p className="text-TextSec">{finalpreis(item)} € • {item.gekaufteMenge}x • {item.modell}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id, item.modell)}
                                    className="text-BrandRed mx-auto md:mx-0"
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
                            className="bg-BrandRed hover:bg-BrandRedLight text-BrandWhite px-4 py-2 rounded transition duration-200 w-full md:w-auto"
                        >
                            Warenkorb leeren
                        </button>
                    </div>
                </>
            ) : (
                <div className="h-[50vh] flex flex-col justify-center items-center ">
                    {cart.length === 0 && (
                        <div className="text-center space-y-4">
                            <span className="flex justify-center text-7xl text-TextPrim"><BsEmojiAstonished /></span>
                            <p className="text-lg font-medium text-TextSec">Dein Warenkorb ist leer.</p>
                            <StandardLinkButton link='/shop' text='Produkte ansehen' />
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}
