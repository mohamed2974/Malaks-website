'use client';
import Card from "@/utils/Card-component";
import { useState, useEffect } from "react";

export default function Produkte() {
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
        <section className="py-10">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Unsere Produkte</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Entdecke unsere neuesten Angebote</p>
            </div>

            {/* Falls Produkte noch laden */}
            {loading ? (
                <p className="text-center text-gray-400">Produkte werden geladen...</p>
            ) : produkte.length === 0 ? (
                <p className="text-center text-gray-400">Keine Produkte verfügbar</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {produkte.slice(0,8).map((produkt, index) => (
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
                    )).reverse()}
                </div>
            )}
        </section>
    );
}
