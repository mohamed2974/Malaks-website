'use client';

import React from 'react';
import ReactCompareImage from 'react-compare-image';
import GradientTitel from "@/utils/GradientTitel";
import { vergleichsbilder } from '@/data/componente/vergleichsbilder';

export default function Beforafterimg() {
    const {FIRST_IMAGE, SECOND_IMAGE} = vergleichsbilder
    
    return (
        <section className='mx-auto w-full xl:w-5/6'>
            <div className="text-center mb-10">
                <GradientTitel text='Dein AirPods Case im Vergleich' />
                <p className="text-TextSec mt-2">Sieh selbst, wie dein AirPods Case mit unserem einzigartigen Design aufgewertet wird!</p>
            </div>
            <div className='rounded-3xl overflow-hidden max-h-[80vh] flex items-center justify-center'>
                <ReactCompareImage leftImage={FIRST_IMAGE} rightImage={SECOND_IMAGE} leftImageLabel={<LabelImage>Vorher</LabelImage>} rightImageLabel={<LabelImage>Nachher</LabelImage>} />
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