'use client'

import Card from "@/utils/Card-component";
import { useState, useEffect } from "react";

export default function Shop() {
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
        <section className="py-36">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading ? (
                    <p className="text-center text-gray-400">Produkte werden geladen...</p>
                ) : produkte.length === 0 ? (
                    <p className="text-center text-gray-400">Keine Produkte verfügbar</p>
                ) : (
                    produkte.slice(0,8).map((produkt, index) => (
                        <Card 
                            key={index}
                            name={produkt.name}
                            beschreibung={produkt.beschreibung}
                            preis={produkt.preis}
                            rabatt_prozent={produkt.rabatt_prozent}
                            menge={produkt.menge}
                            bildUrls={produkt.bild_urls}
                            status={produkt.status} 
                            className="bg-white shadow-md dark:shadow-white/15"
                        />
                    )).reverse()
                )}
            </div>
        </section>
    )
}