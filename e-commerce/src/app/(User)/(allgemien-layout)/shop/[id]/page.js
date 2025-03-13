// app/shop/[id]/page.js
'use client'

import AddToCart from '@/components/store/AddToCart';
import finalpreis from '@/utils/functions/finalpreis';
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Image from 'next/image';
import { useParams } from 'next/navigation'; // Verwende useParams statt useRouter
import { useEffect, useState, useRef, } from 'react';
import { FaPlus, FaMinus, FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import ModellMassen from '@/components/store/ModellMassen';
import { categories } from '@/data/kategorieOptionen';
import RabattTabelle from '@/utils/shop/RabattTabelle';
import { versandpreis } from '@/data/shop/festepreise';

export default function ProduktDetail() {
  const { id } = useParams(); // Hole die dynamische ID aus den Routenparametern
  const [produkt, setProdukt] = useState();
  const [gekaufteMenge, setGekaufteMenge] = useState(1)
  const [schaubild, setSchaubild] = useState()
  const schaubildRef = useRef(null);
  const [ausgewähltesModell, setAusgewähltesModell] = useState(null);

  const previewNum = 5

  // produkt mit id xy holen
  useEffect(() => {
    if (!id) return;
  
    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          return null; // Hier nicht werfen, sondern null zurückgeben
        }
        return res.json();
      })
      .then((data) => {
        if (!data) {
          setProdukt(null);
          return;
        }
        setProdukt(data);
        if (data.bild_urls?.length > 0) {
          setSchaubild(data.bild_urls[0]);
        }
      })
      .catch((error) => {
        console.error('Fehler beim Abrufen des Produkts:', error);
        setProdukt(null);
      });
  }, [id]);  

  // keen slider 
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "free",
    slides: { perView: previewNum, spacing: 10 }, // Auto-Slide-Anpassung
  });
  

  if (!produkt && produkt !== null) {
    return <div className="flex items-center justify-center h-[80vh]">Produkt wird geladen...</div>;
  }
  
  if (produkt === null ) {
    return <div className="flex items-center justify-center font-bold text-ErrorRed h-[80vh]">Produkt nicht gefunden</div>;
  }  
  // variabeln bestimmen
  let { name, beschreibung, preis, rabatt_prozent, bild_urls, menge, kategorie } = produkt 
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
    <>
    <section className="py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Bildbereich */}
        <div>
          <div className='flex justify-center'>
            <div className="aspect-square relative w-full h-fit overflow-hidden rounded-lg shadow-lg">
              <Image
                alt="Produktbild"
                src={schaubild}
                fill
                sizes="(max-width: 768px) 100vw, 50vw" 
                className="object-cover md:hover:scale-105 transition-transform"
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
            <div className="keen-slider overflow-hidden mt-2" ref={sliderRef}>
              {bild_urls.map((bild, index) => (
                <button 
                  key={index} 
                  onClick={() => handleImageClick(index)} 
                  className={`border-2  keen-slider__slide relative aspect-square rounded-lg ${
                    schaubild === bild ? "border-BrandBlue" : "border-transparent"
                  }`}
                >
                  <Image 
                    alt="Vorschaubild"
                    src={bild}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw" 
                    className="object-cover object-center"
                  />
                </button>
              ))}
            </div></>) : (
              <div className="mt-5 flex flex-row space-x-2" ref={sliderRef}>
              {bild_urls.map((bild, index) => (
                <button 
                  key={index} 
                  onClick={() => handleImageClick(index)} 
                  className={`border-2 relative aspect-square w-1/5 rounded-lg overflow-hidden ${
                    schaubild === bild ? "border-BrandBlue" : "border-transparent"
                  }`}
                >
                  <Image 
                    alt="Vorschaubild"
                    src={bild}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw" 
                    className="object-cover object-center"
                  />
                </button>
              ))}
            </div>)}
          </div>
        </div>
        <div className="flex flex-col xl:pt-10">
          {/* name */}
          <div className='mb-1'>
            <h1 className="text-4xl text-BrandBlue font-bold">{name}</h1>
          </div>
          {/* kategorie */}
          <div className='flex space-x-1 md:space-x-3 mb-4'>
            {kategorie.split(',').map((kategorie, index) => (
              categories.modell.some(item => item.label === kategorie) ? '' :
                <p className="text-TextSec bg-BgSec rounded-full px-3 py-0.5 text-sm font-light" key={index}>{kategorie}</p>
            ))}
          </div>
          {/* preis */}
          <div className="my-4 flex items-center space-x-4 group relative">
            {rabatt_prozent > 0 ? (
              <>
                <span className="text-2xl font-semibold text-SaleRed relative cursor-pointer">
                  {endpreis}€
                  <sup className="text-xs font-normal text-TextSec ml-1">+{versandpreis}€ Versand</sup>

                  {/* Tooltip */}
                  <span className="absolute left-0 top-[-30px] w-max bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    Versandkosten werden nur einmal pro Bestellung berechnet.
                  </span>
                </span>

                <span className="text-sm ml-3 line-through text-TextSec">{preis}€</span>
                <span className="text-[12px] bg-red-100 text-SaleRed font-bold px-2 py-1 rounded">
                  - {rabatt_prozent.toFixed(0)}%
                </span>
              </>
            ) : (
              <span className="text-lg font-semibold text-TextSec relative cursor-pointer">
                {endpreis}€
                <sup className="text-xs font-normal text-TextSec ml-1">+{versandpreis}€ Versand</sup>

                {/* Tooltip */}
                <span className="absolute left-0 top-[-30px] w-max bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Versandkosten werden nur einmal pro Bestellung berechnet.
                </span>
              </span>
            )}
          </div>
          {/* beschreibung */}
          <div className='my-4'>
            <h3 className="text-lg font-semibold text-TextSec">Beschreibung:</h3>
            <p className="text-TextSec">{beschreibung}</p>
          </div>
          {/* menge wählen */}
          <div className='my-4'>
          <h3 className="text-lg font-semibold text-TextSec">Menge wählen:</h3>
          <div className='flex flex-row  mt-2'>
              <button className='p-1 bg-BgSec rounded-full' onClick={handleadd}><FaPlus /></button>
              <p className='mx-4'>{gekaufteMenge}</p>
              <button className='p-1 bg-BgSec rounded-full' onClick={handlesub}><FaMinus /></button>
              <p className='ml-4 text-TextSec text-sm font-light'>Im Lager: {menge}</p>
          </div>
          </div>
          {/* modell wählen */}
          <div className="my-4">
            <h3 className="text-lg font-semibold text-TextSec">Modell wählen:</h3>
            <div className="flex space-x-3 mt-2">
              {produkt.model_mengen &&
                Object.entries(JSON.parse(produkt.model_mengen)).map(([modellName, lagerMenge]) => (
                  <button key={modellName} className={`px-2 py-0.5 xl:px-4 xl:py-1 rounded-lg border-2 ${lagerMenge === 0 && 'bg-BgSec italic'}  ${ausgewähltesModell === modellName ? "bg-BrandBlue text-BrandWhite border-BrandBlue": 'border-BgSec ' }`} disabled={lagerMenge === 0} onClick={() => setAusgewähltesModell(modellName)}>
                    {categories.modell.find(item => item.value === modellName).label}
                    {lagerMenge === 0 && <span className="text-BrandRed font-light text-sm w-full inline-block">Nicht auf Lager</span>}
                  </button>
                ))}
            </div>
          </div>
          {/* fehler meldung bei menge = 0 */}
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
          {/* in den warenkorb */}
          <AddToCart product={produkt} gekaufteMenge={gekaufteMenge} modell={ausgewähltesModell} />
          {/* rabatttabelle */}
          <RabattTabelle />
        </div>
      </div>
    </section>
    <ModellMassen />
    </>
  );
}
