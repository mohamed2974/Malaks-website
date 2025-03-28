'use client'

import Header from '@/components/layout/user/Header';
import { TypeAnimation } from 'react-type-animation';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HeroSec() {
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const heroSection = document.getElementById('stickyheader');
            if (!heroSection) return;
    
            const heroTop = heroSection.getBoundingClientRect().top;
            setIsSticky(heroTop <= 0);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    

    return (
        <div className="px-GlobalXPad md:px-MdXPad lg:px-LgXPad pb-[5vh] flex flex-col h-fit bg-gradient-to-tl from-BrandBlue via-BrandBlueLight to-BrandBlueDark">
            <Header className='xl:mb-5 py-5 text-BrandDark'/>
            <Header className={`${isSticky ? 'fixed left-0 top-0 px-GlobalXPad md:px-MdXPad lg:px-LgXPad bg-BgSec py-2' : 'fixed left-0 -top-[100px]'}`} />
            <div className="hidden md:flex flex-col items-center justify-around text-center space-y-6 mt-5 md:h-[40vh] lg:h-fit xl:h-[70vh]">
                {/* Typing-Effekt */}
                <div className="text-4xl font-extrabold text-gray-900 drop-shadow-lg">
                    <Typing />
                </div>

                {/* Bild mit Schatten und sanften Rundungen */}
                <div className="relative aspect-auto">
                    <Image
                        alt="Bild"
                        src="/img/herosec.jpg"
                        priority
                        width={600}
                        height={300}
                        className="object-contain rounded-3xl shadow-2xl"
                    />
                </div>
            </div>
            <div className='relative aspect-auto md:hidden overflow-hidden rounded-2xl'>
                <Image alt='Bild' src='/img/herosecmobile.jpg' width={999} height={100} sizes="(max-width: 768px) 100vw, 50vw"  className='object-cover' />
            </div>
            <span id='stickyheader'></span>
        </div>
    );
};

//supcom ######################### TYPE ANIMATION ######################### //
const Typing = () => {
    return(
        <TypeAnimation
            sequence={[
                // Same substring at the start will only be typed once, initially
                'Schütze deine AirPods mit Stil! ✨',
                1500,
                'Ein Case, das so einzigartig ist wie du! 🎨',
                1200,
                'Perfekter Schutz & cooles Design in einem. 🔥',
                1300,
                'Mach dein Case zum Statement! 💥',
                1400,
                'Wähle aus unzähligen Designs – für jeden Style! 🎧',
                1700,
                'Verleihe deinen AirPods den Look, den sie verdienen! 💎',
                1600,
                'Zeig deine Persönlichkeit mit einem einzigartigen Case! 🚀',
                1500,
            ]}
            speed={50}
            deletionSpeed={90}
            repeat={Infinity}
        />
    )
}