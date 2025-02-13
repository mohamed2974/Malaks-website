'use client';
import Card from "@/utils/Card-component";
import Link from "next/link";
import { useState, useEffect } from "react";
import { LinearGradient } from 'react-text-gradients'

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
        <section className="py-20">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold">
                    <LinearGradient gradient={["to right", "#374151,#c2410c ,#fb923c"]}>
                    Unsere Produkte
                    </LinearGradient>
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Entdecke unsere neuesten Angebote</p>
            </div>

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
                    {produkte.slice(0,8).reverse().map((produkt, index) => (
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
        </section>
    );
}
