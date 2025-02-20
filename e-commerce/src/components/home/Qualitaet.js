'use client';

import Image from 'next/image';
import React from 'react';
import { LinearGradient } from 'react-text-gradients';
import { content } from '@/data/componente/Qualitaet-sec';

export default function Qualitaet() {
    return (
        <section className="mx-auto xl:w-5/6 ">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold">
                    <LinearGradient gradient={["to right", "#374151, #c2410c ,#fb923c"]}>
                    Unsere Qualität
                    </LinearGradient>
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Das ist unsere Qualität</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                {/* Bildbereich (Platzhalter) */}
                <div className="relative w-full h-80 bg-gray-200 rounded-2xl flex items-center justify-center overflow-hidden">
                    {content.bild ? 
                    <Image className='w-full object-cover' src={content.bild} alt='bild' height={100} width={100}/> : 
                    <span className="text-gray-500 text-lg">Hier kommt dein Produktbild</span>}
                </div>

                {/* Textbereich */}
                <div>
                    <h3 className="text-2xl font-semibold mb-4">{content.textbereich.titel}</h3>
                    <p className="text-gray-600 mb-4">
                        {content.textbereich.firstp}
                    </p>
                    <p className="text-gray-600">
                    {content.textbereich.secp}
                    </p>
                </div>
            </div>
        </section>
    );
}
