'use client'
import GradientTitel from '@/utils/GradientTitel';
import { content } from '@/data/support/sendung';
import { useState } from 'react';
import Link from 'next/link';

export default function Paketverfolgung(){
    const [trackingNumber, setTrackingNumber] = useState("");

    const handleChange = (e) => {
        const value = e.target.value.replace(/\D/g, ""); // Entfernt alle Nicht-Zahlen
        setTrackingNumber(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault()// Verhindert das Neuladen der Seite
        if (!trackingNumber) return; // Falls das Feld leer ist, nichts tun
        const trackingUrl = `https://www.dhl.com/de-de/home/sendungsverfolgung.html?tracking-id=${trackingNumber}`;
        window.open(trackingUrl, "_blank"); // Öffnet den Link in einem neuen Tab
    }

    return (
        <section className='h-screen'>
            <div className="text-center mb-10">
                <div className='flex justify-center items-center space-x-3'>
                    <span className='text-3xl lg:text-4xl'>📦</span>
                    <GradientTitel text='Paketverfolgung' />
                </div>
                <p className="text-TextSec mt-2">
                    {content.unterschrift}
                </p>
            </div>
            <div className='flex flex-col justify-center items-center text-center space-y-2 mt-16'>
                <form onSubmit={handleSubmit} className='w-full border-2 border-BrandBlue rounded-full flex items-center'>
                    <input required className='bg-BgPrim py-4 px-3 rounded-full outline-none text-center text-xl w-10/12' placeholder="Sendungsverfolgungsnummer" type="text" value={trackingNumber} onChange={handleChange} minLength={10} maxLength={40}/>            
                    <button type='submit' className='text-BrandWhite min-w-fit w-2/12 px-2 bg-BrandBlue rounded-r-full py-4 my-1 mr-1'>Verfolgen</button>
                </form>
                <p className='text-xs text-TextSec italic'>
                    {content.anmerkung.split("[problem-melden]").map((part, index) =>
                        index === 0 ? (
                            <span key={index}>
                            <span >{part}</span>
                            <Link className="text-BrandBlue underline" href="/support/problem-melden">
                                Problem melden
                            </Link>
                            </span>
                        ) : (
                            <span key={index}>{part}</span>
                        )
                    )}
                </p>
            </div>
        </section>
    )
}

