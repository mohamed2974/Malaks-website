'use client'
import GradientTitel from "@/utils/GradientTitel";
import { useParams, useRouter } from "next/navigation";  // useRouter wird hier benötigt
import { useEffect, useState } from "react";
import { kategorieFilterArry, categories } from "@/data/kategorieOptionen";
import Produktekarten from "@/utils/Produktekarten";

export default function Kategorie() {
    const { kategorie } = useParams();
    const [produkte, setProdukte] = useState();
    const router = useRouter();  // useRouter hook hinzufügen, um die Navigation zu steuern

    // produkt mit id xy holen
    useEffect(() => {
        if (!kategorie) return;
        if (!kategorieFilterArry.includes(kategorie)) {
            // Weiterleitung zur Not-Found-Seite
            router.push('/not-found');  // Hier zur Not-Found-Seite umleiten
            return;
        }
        fetch(`/api/products/kategorien/${kategorie}`)
            .then((res) => {
                if (!res.ok) {
                    return null;
                }
                return res.json();
            })
            .then((data) => {
                if (!data) {
                    setProdukte(null);
                    return;
                }
                setProdukte(data);
            })
            .catch((error) => {
                console.error('Fehler beim Abrufen des Produkts:', error);
                setProdukte(null);
            });
    }, [kategorie, router]);

    const aktuelleKategorie = categories.find(cat => cat.name === kategorie);

    return (
        <section>
            {kategorieFilterArry.includes(kategorie) && 
                <>
                <div className="text-center mb-10">
                    <GradientTitel text={aktuelleKategorie.value} />
                    <p className="text-TextSec mt-2">{aktuelleKategorie.beschreibung}</p>
                </div>
                <div>
                    {produkte ? (
                        <div>
                            <Produktekarten filter={[kategorie]} />
                        </div>
                    ) : (
                        <div className="flex justify-center col-span-4">
                            <p className="text-center text-gray-400">Keine Produkte gefunden</p>
                        </div>
                    )}
                </div>
                </>             
            }
        </section>
    );
}
