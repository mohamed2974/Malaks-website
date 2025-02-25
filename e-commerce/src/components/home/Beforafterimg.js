'use client';

import React from 'react';
import ReactCompareImage from 'react-compare-image';
import GradientTitel from "@/utils/GradientTitel";
import { vergleichsbilder } from '@/data/componente/vergleichsbilder';

export default function Beforafterimg() {
    const {FIRST_IMAGE, SECOND_IMAGE} = vergleichsbilder
    
    return (
        <section className='mx-auto w-full grid grid-cols-1 md:grid-cols-3 md:w-11/12'>
            <div className='col-span-3 mb-10'>
                <GradientTitel className='text-center mb-2' text='Dein AirPods Case im Vergleich' />
                <p className="text-TextSec text-center md:hidden">Sieh selbst, wie dein AirPods Case mit unserem einzigartigen Design aufgewertet wird!</p>
            </div>
            <div className="col-span-2 hidden md:flex justify-center flex-col md:pr-20">
                <p className="text-TextSec">Sieh selbst, wie dein AirPods Case mit unserem einzigartigen Design aufgewertet wird!</p>
                <p className="hidden md:block text-TextSec mt-2">Ein gewöhnliches AirPods Case sieht oft schlicht und unscheinbar aus – aber mit unserem hochwertigen Design wird es zu einem echten Hingucker. Unsere Cases bieten nicht nur einen individuellen Look, sondern schützen deine AirPods auch zuverlässig vor Kratzern, Stößen und Abnutzungsspuren.</p>
                <p className="hidden md:block  text-TextSec mt-2">Ob minimalistisch, auffällig oder personalisiert – mit unseren Designs kannst du deinen Stil unterstreichen und deine AirPods einzigartig machen. Vergleiche selbst und entdecke den Unterschied!</p>
            </div>
            <div className='rounded-3xl md:max-h-[60vh] relative overflow-hidden shadow-xl flex items-center justify-center'>
                <ReactCompareImage
                    leftImage={FIRST_IMAGE}
                    rightImage={SECOND_IMAGE}
                    leftImageLabel={<LabelImage>Vorher</LabelImage>}
                    rightImageLabel={<LabelImage>Nachher</LabelImage>}
                    leftImageCss={{
                        objectFit: 'cover',
                    }}
                    rightImageCss={{
                        objectFit: 'cover',
                    }}
                />  
            </div>
        </section>
    );
}

//supcom ############ befor ############ //
function LabelImage({children}){
    return (
        <span className='font-bold uppercase'>
            {children}
        </span>
    )
}