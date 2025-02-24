'use client';

import Image from 'next/image';
import React from 'react';
import GradientTitel from "@/utils/GradientTitel";
import { content } from '@/data/componente/Qualitaet-sec';

export default function Qualitaet() {
    return (
        <section className="mx-auto xl:w-5/6 ">
            <div className="text-center mb-10">
                <GradientTitel text='Qualität für höchsten Anspruch' />
                <p className="text-TextSec mt-2">Wir setzen auf Qualität, die du sehen und fühlen kannst.</p>
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
                    <h3 className="text-2xl text-TextPrim font-semibold mb-4">{content.textbereich.titel}</h3>
                    <p className="text-TextSec mb-4">
                        {content.textbereich.firstp}
                    </p>
                    <p className="text-TextSec">
                    {content.textbereich.secp}
                    </p>
                </div>
            </div>
        </section>
    );
}
