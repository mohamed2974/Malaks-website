'use client';

import Card from "@/utils/Card-component";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Produktekarten({sliceparam = ''}) {
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

    return (
        <>
        {/* Falls Produkte noch laden */}
        {loading ? (
            <div className="flex justify-center col-span-4">
                <p className="text-center text-gray-400">Produkte werden geladen...</p>
            </div>
            ) : produkte.length === 0 ? (
            <div className="flex justify-center col-span-4">
                <p className="text-center text-gray-400">Keine Produkte verfügbar</p>
            </div>
            ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {produkte.slice(...sliceparam).reverse().map((produkt, index) => (
                    <Link href={`/shop/${produkt.id}`} passHref key={index}>
                        <Card 
                            name={produkt.name}
                            preis={produkt.preis}
                            rabatt_prozent={produkt.rabatt_prozent}
                            bildUrls={produkt.bild_urls}
                            status={produkt.status} 
                            className=""
                        />
                    </Link>
                ))}
            </div>
        )}  
        </>
    )
}