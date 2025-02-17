// app/shop/[id]/page.js
'use client'

import AddToCart from '@/components/store/AddToCart';
import finalpreis from '@/utils/functions/finalpreis';
import Image from 'next/image';
import { useParams } from 'next/navigation'; // Verwende useParams statt useRouter
import { useEffect, useState } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa6";

export default function ProduktDetail() {
  const { id } = useParams(); // Hole die dynamische ID aus den Routenparametern
  const [produkt, setProdukt] = useState(null);
  const [gekaufteMenge, setGekaufteMenge] = useState(1)
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
  
  const handleadd = () => {
    setGekaufteMenge(gekaufteMenge + 1)
  }
  const handlesub = () => {
    if (1 >= gekaufteMenge){
      setGekaufteMenge(1)
      return
    }
    setGekaufteMenge(gekaufteMenge - 1)
  }
  
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
          {/* name & beschreibung */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{name}</h1>
            <p className="text-gray-500 mb-6">{beschreibung}</p>
          </div>
          {/* preis */}
          <div className="mb-6 flex items-center space-x-4">
            {rabatt_prozent > 0 ? (
              <>
              <span className="text-2xl font-semibold text-AppleRed">{endpreis}€</span>
              <span className="text-sm ml-3 line-through text-gray-500">{preis}€</span>
              <span className="hidden md:inline text-[12px] bg-red-100 text-AppleRed px-2 py-1 rounded">
                -{rabatt_prozent.toFixed(0)}%
              </span>
              </>
            ) : (
              <span className="text-lg font-semibold text-TextSec">{endpreis}€</span>
            )}
          </div>
          {/* menge wählen */}
          <div className='flex flex-row mb-10'>
            <button className='p-1 bg-slate-300 rounded-full' onClick={handleadd}><FaPlus /></button>
            <p className='mx-4'>{gekaufteMenge}</p>
            <button className='p-1 bg-slate-300 rounded-full' onClick={handlesub}><FaMinus /></button>
          </div>
          {parseFloat(produkt.menge) === 0 && (
          <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-lg mb-5">
            <p className="text-red-800 font-semibold">
              <span className="mr-2">🚨</span> Nicht auf Lager
            </p>
            <p className="text-red-700 text-sm">
              Dieses Produkt ist derzeit nicht verfügbar. Deine Bestellung wird angenommen, aber der Versand verzögert sich. Wir benachrichtigen dich, sobald es wieder auf Lager ist.
            </p>
          </div>
          )}
          <AddToCart product={produkt} gekaufteMenge={gekaufteMenge} />
        </div>
      </div>
    </section>
  );
}
