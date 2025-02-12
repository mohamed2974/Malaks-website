'use client'

import Card from "@/utils/Card-component";
import { useState, useEffect } from "react";


export default function AlleProdukte(){
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

    return(
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading ? (
                    <div className="flex justify-center col-span-4">
                        <p className="text-center text-gray-400">Produkte werden geladen...</p>
                    </div>
                ) : produkte.length === 0 ? (
                    <div className="flex justify-center col-span-4">
                        <p className="text-center text-gray-400">Keine Produkte verfügbar</p>
                    </div>
                ) : (
                    produkte.slice(0,8).map((produkt, index) => (
                        <Card 
                            key={index}
                            name={produkt.name}
                            preis={produkt.preis}
                            rabatt_prozent={produkt.rabatt_prozent}
                            menge={produkt.menge}
                            bildUrls={produkt.bild_urls}
                            className="bg-white shadow-md dark:shadow-white/15"
                        />
                    )).reverse()
                )}
        </div>
    )
}