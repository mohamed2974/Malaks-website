// app/shop/[id]/page.js
'use client'

import AddToCart from '@/components/store/AddToCart';
import finalpreis from '@/utils/functions/finalpreis';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Image from 'next/image';
import { useParams } from 'next/navigation'; // Verwende useParams statt useRouter
import { useEffect, useState, useRef, useReducer  } from 'react';
import { FaPlus, FaMinus, FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export default function ProduktDetail() {
  const { id } = useParams(); // Hole die dynamische ID aus den Routenparametern
  const [produkt, setProdukt] = useState(null);
  const [gekaufteMenge, setGekaufteMenge] = useState(1)
  const [schaubild, setSchaubild] = useState()
  const schaubildRef = useRef(null);

  const previewNum = 5

  // produkt mit id xy holen
  useEffect(() => {
    if (!id) return;
  
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProdukt(data);
        if (data.bild_urls?.length > 0) {
          setSchaubild(data.bild_urls[0]); // Erstes Bild setzen
        }
      })
      .catch((error) => console.error('Fehler beim Abrufen des Produkts:', error));
  }, [id]);

  // keen slider 
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "free",
    slides: { perView: previewNum, spacing: 10 }, // Auto-Slide-Anpassung
  });
  
  if (!produkt) {
    return <div className="flex items-center justify-center h-screen">Produkt wird geladen...</div>;
  }

  // variabeln bestimmen
  let { name, beschreibung, preis, rabatt_prozent, status, bild_urls } = produkt 
  preis = parseFloat(preis)
  rabatt_prozent = parseFloat(rabatt_prozent || 0)
  const endpreis = finalpreis(produkt);
  
  // die menge an gekauften produkten bestimmen 
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

  // schaubild und bilder des produkts
  const handleImageClick = (index) => {
    if (!bild_urls || index < 0 || index >= bild_urls.length) return;
    if (schaubildRef.current === bild_urls[index]) return;
    schaubildRef.current = bild_urls[index];
    setSchaubild(bild_urls[index]);
  };
  
  return (
    <section className="py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Bildbereich */}
        <div>
          <div className='flex justify-center'>
            <div className="relative h-[50vh] lg:h-[70vh] w-full lg:w-fit flex justify-center items-center overflow-hidden rounded-lg shadow-lg">
              <Image
                alt="Produktbild"
                src={schaubild}
                height={500}
                width={500}
                className="object-contain"
              />
            </div>
          </div>
          <div>
            {bild_urls.length >= previewNum ? 
            (<>
            <div className="flex justify-between mt-5">
                <FaArrowLeft className="text-gray-600 bg-gray-200 p-2 text-2xl rounded-full" />
                <FaArrowRight className="text-gray-600 bg-gray-200 p-2 text-2xl rounded-full" />
            </div>
            <div className="keen-slider h-[10vh] overflow-hidden mt-2" ref={sliderRef}>
              {bild_urls.map((bild, index) => (
                <button 
                  key={index} 
                  onClick={() => handleImageClick(index)} 
                  className={`border-2 keen-slider__slide flex items-center rounded-lg ${
                    schaubild === bild ? "border-BrandBlue scale-105" : "border-transparent"
                  }`}
                >
                  <Image 
                    alt="Vorschaubild"
                    src={bild}
                    fill
                    className="object-cover object-center"
                  />
                </button>
              ))}
            </div></>) : (
              <div className="h-[10vh] mt-5 flex flex-row space-x-2" ref={sliderRef}>
              {bild_urls.map((bild, index) => (
                <button 
                  key={index} 
                  onClick={() => handleImageClick(index)} 
                  className={`border-2 relative flex items-center h-full rounded-lg overflow-hidden ${
                    schaubild === bild ? "border-BrandBlue scale-105" : "border-transparent"
                  }`}
                >
                  <Image 
                    alt="Vorschaubild"
                    src={bild}
                    width={75}
                    height={50}
                    className="object-cover object-center"
                  />
                </button>
              ))}
            </div>
            )
            }
          </div>
        </div>
        {/* Detailbereich */}
        <div className="flex flex-col justify-center">
          {/* name & beschreibung */}
          <div>
            <h1 className="text-4xl text-BrandBlue font-bold mb-4">{name}</h1>
            <p className="text-TextSec mb-6">{beschreibung}</p>
          </div>
          {/* preis */}
          <div className="mb-6 flex items-center space-x-4">
            {rabatt_prozent > 0 ? (
              <>
              <span className="text-2xl font-semibold text-SaleRed">{endpreis}€</span>
              <span className="text-sm ml-3 line-through text-TextSec">{preis}€</span>
              <span className="text-[12px] bg-red-100 text-SaleRed font-bold px-2 py-1 rounded">
                - {rabatt_prozent.toFixed(0)}%
              </span>
              </>
            ) : (
              <span className="text-lg font-semibold text-TextSec">{endpreis}€</span>
            )}
          </div>
          {/* menge wählen */}
          <div className='flex flex-row mb-10'>
            <button className='p-1 bg-BgSec rounded-full' onClick={handleadd}><FaPlus /></button>
            <p className='mx-4'>{gekaufteMenge}</p>
            <button className='p-1 bg-BgSec rounded-full' onClick={handlesub}><FaMinus /></button>
          </div>
          {parseFloat(produkt.menge) === 0 && (
          <div className="bg-red-100 border-l-4 border-ErrorRed p-4 rounded-lg mb-5">
            <p className="text-ErrorRed font-semibold">
              <span className="mr-2">🚨</span> Nicht auf Lager
            </p>
            <p className="text-ErrorRedLight text-sm">
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
