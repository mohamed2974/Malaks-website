// app/shop/[id]/page.js
'use client'

import finalpreis from '@/utils/functions/finalpreis';
import Image from 'next/image';
import { useParams } from 'next/navigation'; // Verwende useParams statt useRouter
import { useEffect, useState } from 'react';

export default function ProduktDetail() {
  const { id } = useParams(); // Hole die dynamische ID aus den Routenparametern
  const [produkt, setProdukt] = useState(null);
  const [schaubild, setSchaubild] = useState()

  useEffect(() => {
    if (!id) return; // Wenn keine ID verfügbar ist, nichts tun

    // Abrufen des Produkts basierend auf der ID
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProdukt(data))
      .catch((error) => console.error('Fehler beim Abrufen des Produkts:', error));
  }, [id]);

  if (!produkt) {
    return <div className="flex items-center justify-center h-screen">Produkt wird geladen...</div>;
  }

  let { name, beschreibung, preis, rabatt_prozent, status, bild_urls } = produkt 

  preis = parseFloat(preis)
  rabatt_prozent = parseFloat(rabatt_prozent || 0)
  const endpreis = finalpreis(produkt);
  
  return (
    <section className="container mx-auto py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Bildbereich */}
        <div className="flex justify-center items-center">
          <Image
            alt="Produktbild"
            src={bild_urls[0]}
            width={300}
            height={300}
            className="rounded-lg shadow-lg transition transform hover:scale-105"
          />
        </div>
        {/* Detailbereich */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4">{name}</h1>
          <p className="text-gray-700 mb-6">{beschreibung}</p>
          <div className="mb-6 flex items-center space-x-4">
            <span className="text-2xl font-semibold text-AppleRed">{endpreis}€</span>
            {rabatt_prozent > 0 && (
              <>
              <span className="text-sm ml-3 line-through text-gray-500">{preis}€</span>
              <span className="hidden md:inline text-[12px] bg-red-100 text-AppleRed px-2 py-1 rounded">
                -{rabatt_prozent.toFixed(0)}%
              </span>
              </>
            )}
          </div>
          <button className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition">
            In den Warenkorb
          </button>
        </div>
      </div>
    </section>
  );
}
