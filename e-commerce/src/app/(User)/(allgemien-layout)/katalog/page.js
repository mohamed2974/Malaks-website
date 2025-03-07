import GradientTitel from '@/utils/GradientTitel';
import React from 'react';
import Image from 'next/image';
import { bilder } from '@/data/componente/katalog';
import Link from 'next/link';

export default function katalog(){
    return (
        <section>
            <div className="text-center mb-10">
                <GradientTitel text='Katalog' />
                <p className="text-TextSec mt-2">Paar Bilder von unseren Produkten</p>
            </div>
            <div className="grid grid-rows-3 grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 py-4">
                {bilder.map((bild, index) => (
                    <div key={index} className={`${bild.className} relative aspect-square bg-gray-200 rounded-lg overflow-hidden `}>
                        <Image
                            src={bild.img}
                            alt={bild.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw" 
                            className={`hover:scale-105 transition-transform duration-300 object-cover`}
                        />
                    </div>
                ))}
                <video autoPlay loop muted playsInline className='aspect-square row-start-2 row-end-4 col-start-2 col-end-4 rounded-3xl'>
                    <source src="/katalog/katalogvideo.MP4" type="video/mp4"/>
                </video>
            </div>
            <div className='flex justify-center'>
                <Link href='/shop' className="inline-block mt-4 bg-BrandBlue hover:bg-BrandBlueLight text-BrandWhite px-6 py-2 rounded-md transition duration-200 shadow-md">
                    Produkte ansehen
                </Link>
            </div>
        </section>
    )
}