'use client';

import React from 'react';
import ReactCompareImage from 'react-compare-image';

export default function Beforafterimg() {
    const FIRST_IMAGE = 'https://smeleshkin.github.io/react-before-after-slider-component//assets/image2.jpg';
    const SECOND_IMAGE = 'https://smeleshkin.github.io/react-before-after-slider-component//assets/image1.jpg';

    return (
        <section className='mx-auto w-5/6 '>
            <div className='rounded-3xl overflow-hidden'>
                <ReactCompareImage leftImage={FIRST_IMAGE} rightImage={SECOND_IMAGE} />
            </div>
        </section>
    );
}
