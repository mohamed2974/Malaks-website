'use client'
import GradientTitel from "@/utils/GradientTitel";
import { useParams, useRouter } from "next/navigation";  // useRouter wird hier benötigt
import { useEffect, useState } from "react";
import { kategorieFilterArray, categories } from "@/data/kategorieOptionen";
import Produktekarten from "@/utils/Produktekarten";

export default function Kategorie() {
    const { kategorie } = useParams();
    const router = useRouter();  // useRouter hook hinzufügen, um die Navigation zu steuern

    // produkt mit id xy holen
    useEffect(() => {
        if (!kategorie) return;
        if (!kategorieFilterArray.includes(kategorie)) {
            // Weiterleitung zur Not-Found-Seite
            router.push('/not-found');  // Hier zur Not-Found-Seite umleiten
            return;
        }
        
    }, [kategorie, router]);

    const aktuelleKategorie = categories.kategorie.find(cat => cat.name === kategorie);

    return (
        <section>
            {kategorieFilterArray.includes(kategorie) && 
                <>
                <div className="text-center mb-10">
                    <GradientTitel text={aktuelleKategorie.value} />
                    <p className="text-TextSec mt-2">{aktuelleKategorie.beschreibung}</p>
                </div>
                <div>
                    
                        <div>
                            <Produktekarten filter={[aktuelleKategorie.value]} />
                        </div>
                
                </div>
                </>             
            }
        </section>
    );
}
