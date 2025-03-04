'use client';

import Card from "@/utils/Card-component";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";

export default function Produktekarten({sliceparam = '', behave = 'normal', filter = [], setReslength }) {
    //* Produkte abrufen ####################################################
    const [produkte, setProdukte] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/products')
            .then((res) => res.json())
            .then((data) => {
                setProdukte(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Fehler beim Abrufen der Daten:', error);
                setLoading(false);
            });
    }, []);

    const filtrierteProdukte = useMemo(() => {
        if (produkte.length === 0) return [];
    
        return [...produkte] // Kopie des Arrays erstellen, um `reverse()` sicher zu nutzen
            .slice(...sliceparam)
            .reverse()
            .filter(produkt =>
                filter.length === 0 || filter.some(f => produkt.kategorie.includes(f))
            );
    }, [produkte, sliceparam, filter]);
    
    useEffect(() => {
        if (setReslength) setReslength(filtrierteProdukte.length);
    }, [filtrierteProdukte, setReslength]);
    

    const [sliderRef] = useKeenSlider({
        loop: true,
        mode: "free",
        slides: { perView: 2 }, // Standard: 2 Slides pro View (für kleine Bildschirme)
    
        breakpoints: {
            "(min-width: 640px)": { // Ab 640px (Tablet)
                slides: { perView: 3 },
            },
            "(min-width: 1024px)": { // Ab 1024px (Desktop)
                slides: { perView: 4 },
            },
        },
    });    

    let displayStyle
    switch (behave) {
        case 'normal':
            displayStyle = 'grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-6'
            break;
        case 'scrollbar':
            displayStyle = 'keen-slider h-fit'
            break
        default:
            break;
    }

    return (
        <>
        {/* Falls Produkte noch laden */}
        {loading ? (
            <div className="flex justify-center col-span-4">
                <p className="text-center text-gray-400">Produkte werden geladen...</p>
            </div>
            ) : produkte.length === 0 ? (
            <div className="flex justify-center col-span-4">
                <p className="text-center text-TextSec">Keine Produkte verfügbar</p>
            </div>
            ) : (
            <div className="relative">
                {/* Scrollbar-Icon nur wenn "scrollbar"-Modus aktiv ist */}
                {behave === "scrollbar" && (
                        <div className="flex justify-between">
                            <FaArrowLeft className="text-gray-600 bg-gray-200 p-2 text-3xl md:text-4xl rounded-full" />
                            <FaArrowRight className="text-gray-600 bg-gray-200 p-2 text-3xl md:text-4xl rounded-full" />
                        </div>
                    )}
                <div ref={sliderRef} className={displayStyle}>
                    {filtrierteProdukte
                        .map((produkt, index) => (
                            <div key={index} className={behave === 'scrollbar' ? 'keen-slider__slide pb-8 pt-4 px-1 md:px-2 lg:px-4 h-fit' : ''}>
                                <Link href={`/shop/${produkt.id}`} passHref>
                                    <Card produkt={produkt} />
                                </Link>
                            </div>
                        ))}
                    {filtrierteProdukte.length === 0 && (
                        <div className="flex justify-center col-span-4">
                            <p className="text-center text-gray-400 h-[40vh]">Keine Produkte gefunden</p>
                        </div>
                    )}
                </div>
            </div>
        )}  
        </>
    )
}