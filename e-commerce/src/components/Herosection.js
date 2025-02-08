'use client'

import React from 'react'
import { TypeAnimation } from 'react-type-animation';

import owner from "@/data/owner"
import Image from 'next/image';

export default function HeroSec() {
    return (
        <section className="px-GlobalXPad md:px-MdXPad lg:px-LgXPad py-[10vh] md:py-[13vh] lg:py-[5vh] relative overflow-clip md:flex items-center justify-between">
            <Svg />
            <div className="mx-auto md:mx-0 text-center md:text-start z-10 md:w-1/2">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-TextPrim">Schön, dass du hier bist!</h1>
                <p className="text-TextSec text-lg my-8 min-h-24 md:min-h-16"><Typing /></p>
                <div className='flex flex-col md:flex-row gap-y-4 md:gap-x-4 md:justify-start '>
                    <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-6 rounded shadow-lg">
                        Jetzt entdecken
                    </button>
                    <button className="text-blue-500 hover:text-blue-700 border border-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-100 hover:border-blue-100 transition-all duration-300">
                        Mehr über uns
                    </button>
                </div>
            </div>
            <div className='hidden md:inline-block w-2/5'>
                <Image alt='hero Img' src='/heroImg.png' layout="responsive"  width={50} height={50}/>
            </div>
        </section>
    );
};

//supcom ######################### TYPE ANIMATION ######################### //
const Typing = () => {
    return(
        <TypeAnimation
            sequence={[
                // Same substring at the start will only be typed once, initially
                `Hallo, ich bin ${owner.fullName.split(' ')[0]}!`,
                1500,
                'Ich teile meine Projekte, Erfolge und Visionen.',
                900,
                'Begleite mich auf meiner Reise durch die Welt der Technologie und Kreativität.',
                2000,
                'Erfahre mehr über meine Arbeit und meinen Weg als Entwickler.',
                1700,
                'Lass dich von meiner Reise und meinen Projekten inspirieren.',
                1700,
            ]}
            speed={50}
            deletionSpeed={90}
            repeat={Infinity}
        />
    )
}

//supcom ######################### SVG´S ######################### //
function Svg(){
    return(
        <>
        <div className='absolute w-3/4 lg:w-1/2 top-0 right-0 z-0'>
            <svg className='translate-x-[40%] md:translate-x-[45%] lg:translate-x-[50%] md:translate-y-[-35%] lg:translate-y-[-30%] opacity-10 lg:opacity-15' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#facc15" d="M42.1,-77.1C52.3,-67,56.8,-51.2,62.4,-37.4C68.1,-23.6,75,-11.8,76.9,1.1C78.7,13.9,75.5,27.8,67.7,37.9C59.8,48,47.3,54.2,35.3,59C23.3,63.7,11.6,67.1,-1,68.8C-13.6,70.5,-27.2,70.6,-36.9,64.5C-46.6,58.4,-52.5,46,-56.5,34.2C-60.5,22.4,-62.7,11.2,-67.4,-2.7C-72.1,-16.6,-79.2,-33.3,-75.2,-45C-71.2,-56.8,-56,-63.8,-41.6,-71.4C-27.2,-79,-13.6,-87.3,1.2,-89.3C16,-91.4,31.9,-87.1,42.1,-77.1Z" transform="translate(100 100)" />
            </svg>
        </div>
        <div className='absolute w-3/4 lg:w-1/2 bottom-0 left-0'>
            <svg className='translate-x-[-30%] md:translate-x-[-40%] lg:translate-x-[-50%] translate-y-[30%] opacity-10 lg:opacity-15' viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#14b8a6" d="M36.9,-71.1C42.7,-60.5,38.7,-40.3,43,-26.8C47.3,-13.4,59.9,-6.7,64,2.4C68.1,11.4,63.7,22.8,56.6,31.5C49.6,40.2,39.8,46,29.9,47.6C20,49.2,10,46.4,-2.5,50.7C-15,55,-29.9,66.4,-39.5,64.6C-49.1,62.9,-53.2,48,-52.9,35C-52.6,22.1,-47.9,11,-46.8,0.6C-45.8,-9.9,-48.5,-19.7,-49.7,-34.1C-50.8,-48.6,-50.4,-67.6,-41.9,-76.5C-33.3,-85.5,-16.7,-84.4,-0.6,-83.4C15.5,-82.4,31.1,-81.6,36.9,-71.1Z" transform="translate(100 100)" />
            </svg>
        </div>
        </>
    )
}