'use client';

import React from 'react';
import ReactCompareImage from 'react-compare-image';
import { LinearGradient } from 'react-text-gradients';
import { vergleichsbilder } from '@/data/componente/vergleichsbilder';

export default function Beforafterimg() {
    const {FIRST_IMAGE, SECOND_IMAGE} = vergleichsbilder
    
    return (
        <section className='mx-auto w-full xl:w-5/6'>
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold">
                    <LinearGradient gradient={["to right", "#374151, #c2410c ,#fb923c"]}>
                    Dein AirPods Case im Vergleich
                    </LinearGradient>
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Sieh selbst, wie dein AirPods Case mit unserem einzigartigen Design aufgewertet wird!</p>
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