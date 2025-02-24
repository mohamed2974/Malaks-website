'use client'

import AddToCart from '@/components/store/AddToCart';
import finalpreis from '@/utils/functions/finalpreis';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaPlus, FaMinus, FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export default function ProduktDetail() {
  const { id } = useParams();
  const [produkt, setProdukt] = useState(null);
  const [gekaufteMenge, setGekaufteMenge] = useState(1);
  const [schaubild, setSchaubild] = useState(null);
  const [slider, setSlider] = useState(null); // Speichert die Slider-Instanz

  // Produktdaten laden
  useEffect(() => {
    if (!id) return;
  
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProdukt(data);
        if (data.bild_urls?.length > 0) {
          setSchaubild(data.bild_urls[0]);
        }
      })
      .catch((error) => console.error('Fehler beim Abrufen des Produkts:', error));
  }, [id]);

  // Slider erst initialisieren, wenn Produktbilder da sind
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      mode: "free",
      slides: {
        perView: 5, // Standard für Mobile
        spacing: 10
      },
      breakpoints: {
        "(min-width: 640px)": { perView: 3 },
        "(min-width: 1024px)": { perView: 5 }
      },
    },
    [setSlider] // Speichert die Instanz in den State
  );

  if (!produkt) {
    return <div className="flex items-center justify-center h-screen">Produkt wird geladen...</div>;
  }

  let { name, beschreibung, preis, rabatt_prozent, bild_urls } = produkt;
  preis = parseFloat(preis);
  rabatt_prozent = parseFloat(rabatt_prozent || 0);
  const endpreis = finalpreis(produkt);
  const showSlider = bild_urls.length >= 2; // Zeigt Slider nur bei mindestens 2 Bildern

  const handleadd = () => setGekaufteMenge((prev) => prev + 1);
  const handlesub = () => setGekaufteMenge((prev) => Math.max(1, prev));

  const handleImageClick = (index) => {
    if (!bild_urls || index < 0 || index >= bild_urls.length) return;
    setSchaubild(bild_urls[index]);
  };

  return (
    <section className="container mx-auto py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* Bildbereich */}
        <div>
          <div className="flex justify-center">
            <div className="relative h-[50vh] lg:h-[30vw] w-full flex justify-center items-center overflow-hidden rounded-xl shadow-xl">
              <Image loading="lazy" alt="Produktbild" src={schaubild} fill className="object-cover" />
            </div>
          </div>
          <div className="mt-5">
            
            {/* Navigationspfeile mit echter Funktion */}
            {showSlider && slider && (
              <div className="flex justify-between mb-2">
                <button onClick={() => slider.prev()} className="text-gray-600 bg-gray-200 p-2 text-2xl rounded-full">
                  <FaArrowLeft />
                </button>
                <button onClick={() => slider.next()} className="text-gray-600 bg-gray-200 p-2 text-2xl rounded-full">
                  <FaArrowRight />
                </button>
              </div>
            )}

            {/* Bild-Slider */}
            {showSlider ? (
              <div className="keen-slider h-[12vh] md:h-[10vh] overflow-hidden mt-2" ref={sliderRef}>
                {bild_urls.map((bild, index) => (
                  <button 
                    key={index} 
                    onClick={() => handleImageClick(index)} 
                    className={`relative border-2 keen-slider__slide flex items-center rounded-lg ${
                      schaubild === bild ? "border-blue-500 scale-110 shadow-md" : "border-transparent"
                    }`}
                  >
                    <Image alt="Vorschaubild" src={bild} fill className="object-cover object-center rounded-md" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex gap-2 mt-2">
                {bild_urls.map((bild, index) => (
                  <button 
                    key={index} 
                    onClick={() => handleImageClick(index)} 
                    className={`border-2 flex items-center rounded-lg transition-all ${
                      schaubild === bild ? "border-blue-500 scale-110 shadow-md" : "border-transparent"
                    }`}
                  >
                    <Image alt="Vorschaubild" src={bild} width={80} height={80} className="object-cover object-center rounded-md" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Detailbereich */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl text-BrandBlue font-bold mb-4">{name}</h1>
          <p className="text-TextSec mb-6">{beschreibung}</p>
          
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

          <div className="flex flex-row mb-10">
            <button className="p-1 bg-BgSec rounded-full" onClick={handleadd}>
              <FaPlus />
            </button>
            <p className="mx-4">{gekaufteMenge}</p>
            <button className="p-1 bg-BgSec rounded-full" onClick={handlesub}>
              <FaMinus />
            </button>
          </div>

          {parseFloat(produkt.menge) === 0 && (
            <div className="bg-red-100 border-l-4 border-ErrorRed p-4 rounded-lg mb-5">
              <p className="text-ErrorRed font-semibold">🚨 Nicht auf Lager</p>
              <p className="text-ErrorRedLight text-sm">
                Dieses Produkt ist derzeit nicht verfügbar. Wir benachrichtigen dich, sobald es wieder auf Lager ist.
              </p>
            </div>
          )}

          <AddToCart product={produkt} gekaufteMenge={gekaufteMenge} />
        </div>
      </div>
    </section>
  );
}
