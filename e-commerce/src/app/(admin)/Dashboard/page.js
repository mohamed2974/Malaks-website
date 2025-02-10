'use client'

import { useState, useEffect, useRef  } from 'react';
import { LuPackageOpen } from "react-icons/lu";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
  //* produkt Bild ##########
  const inputFileRef = useRef(null);
  const [blobUrls, setBlobUrls] = useState([]); // Speichert mehrere Bild-URLs
  const [bildUrl, setBildUrl] = useState(''); // Speichert die Bild-URL nach Upload

  //* produkt daten ##########
  const [name, setName] = useState('');
  const [beschreibung, setBeschreibung] = useState('');
  const [preis, setPreis] = useState('');
  const [menge, setMenge] = useState('');
  const [kategorie, setKategorie] = useState('');
  const [lagerort, setLagerort] = useState('');
  const [status, setStatus] = useState('');
  const [hersteller, setHersteller] = useState('');
  const [gewicht, setGewicht] = useState('');
  const [rabatt_prozent, setRabatt_prozent] = useState('');

  //* Produkte abrufen ####################################################
  const [produkte, setProdukte] = useState([]);
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProdukte(data))
      .catch((error) => {
        console.error('Fehler beim Abrufen der Daten:', error);
      });
  }, []);
  
  //* Handler für die Eingabefelder ####################################################
  const handleChange = (setter) => (event) => setter(event.target.value);

  // * Datei-Upload-Handler ####################################################
  async function handleFileUpload() {
    if (!inputFileRef.current || !inputFileRef.current.files.length) {
      console.error('Keine Datei ausgewählt!');
      return;
    }
    const files = Array.from(inputFileRef.current.files); // Sicherstellen, dass es ein Array ist
    if (!files) return;

    const uploadedUrls = [];

    for (let file of files) {
        const response = await fetch(`/api/upload?filename=${file.name}`, {
            method: 'POST',
            body: file,
        });

        const newBlob = await response.json();
        uploadedUrls.push(newBlob.url);
    } 
    setBlobUrls(uploadedUrls); // Speichert alle Bild-URLs
    console.log("Hochgeladene Bilder:", uploadedUrls);
    return uploadedUrls;   
  } 

  //* Formular-Submit-Handler
  async function handleSubmit(event) {
    event.preventDefault();

    // wichtig damit bildUrl geladen wird 
    let uploadedUrls = blobUrls;
    if (inputFileRef.current.files.length > 0) {
        uploadedUrls = await handleFileUpload();
    }
    if (!uploadedUrls.length) {
      alert("Fehler: Keine Bilder hochgeladen.");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('beschreibung', beschreibung);
    formData.append('preis', preis);
    formData.append('menge', menge);
    formData.append('kategorie', kategorie);
    formData.append('lagerort', lagerort);
    formData.append('status', status);
    formData.append('hersteller', hersteller);
    formData.append('gewicht', gewicht);
    formData.append('rabatt_prozent', rabatt_prozent);
    formData.append('bildUrls', JSON.stringify(uploadedUrls)); // Speichert als JSON-String

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Produkt erfolgreich hinzugefügt!');
      } else {
        alert('Fehler beim Hinzufügen des Produkts!');
      }
    } catch (error) {
      console.error('Fehler beim Senden des Formulars:', error);
    }
  }

  return (
    <div className='py-40 px-GlobalXPad md:px-MdXPad lg:px-LgXPad'>
      <div>
        <h2 className='text-3xl pb-8 underline underline-offset-8'>Produkte Hochladen</h2>
        <form onSubmit={handleSubmit} className='grid grid-cols-4 gap-4'>
          <div className='flex flex-col'>
            <label htmlFor='name' className='mb-2'>Produkt Name</label>
            <input className="p-3 rounded-md bg-BgSec" id='name' type="text" value={name} onChange={handleChange(setName)} required />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='beschreibung' className='mb-2'>Beschreibung</label>
            <input className="p-3 rounded-md bg-BgSec" id='beschreibung' type="text" value={beschreibung} onChange={handleChange(setBeschreibung)} />          
          </div>
          <div className='flex flex-col'>
            <label htmlFor='preis' className='mb-2'>Preis</label>
            <input className="p-3 rounded-md bg-BgSec" id='preis' type="number" step="0.01" value={preis} onChange={handleChange(setPreis)} required />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='menge' className='mb-2'>Menge</label>
            <input className="p-3 rounded-md bg-BgSec" id='menge' type="number" value={menge} onChange={handleChange(setMenge)} required />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='kategorie' className='mb-2'>Kategorie</label>
            <input className="p-3 rounded-md bg-BgSec" id='kategorie' type="text" value={kategorie} onChange={handleChange(setKategorie)} required/>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='lagerort' className='mb-2'>Lagerort</label>
            <input className="p-3 rounded-md bg-BgSec" id='lagerort' type="text" value={lagerort} onChange={handleChange(setLagerort)} required/>
          </div>
          <div className='flex flex-col'>
            <label htmlFor='status' className='mb-2'>Status</label>
            <input className="p-3 rounded-md bg-BgSec" id='status' type="text" value={status} onChange={handleChange(setStatus)} required />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='hersteller' className='mb-2'>Hersteller</label>
            <input className="p-3 rounded-md bg-BgSec" id='hersteller' type="text" value={hersteller} onChange={handleChange(setHersteller)} />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='gewicht' className='mb-2'>Gewicht (kg)</label>
            <input className="p-3 rounded-md bg-BgSec" id='gewicht' type="number" step="0.01" value={gewicht} onChange={handleChange(setGewicht)} />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='rabatt_prozent' className='mb-2'>Rabatt (%)</label>
            <input className="p-3 rounded-md bg-BgSec" id='rabatt_prozent' type="number" step="0.01" value={rabatt_prozent} onChange={handleChange(setRabatt_prozent)} />         
          </div>
          {/* submit button */}
          <div className='flex flex-col'>
            <label htmlFor='bilder' className='mb-2'>Bilder</label>
            <input className="p-3 rounded-md w-full" id='bilder' type="file" ref={inputFileRef} multiple required accept="image/*" onChange={handleChange(setBildUrl)} />
          </div>

          {/* produkt hochladen */}
          <div className='flex justify-center items-center'>
            <button className='bg-AppleBlue transition-all hover:bg-blue-700 active:bg-blue-900 text-BrandWhite font-bold py-2 px-2 rounded-md' type="submit">Produkt hinzufügen</button>
          </div>
        </form>         
      </div>

      <div className='py-20'>
        <h2 className='text-3xl pb-8 underline underline-offset-8'>Produkte</h2>
        <Tabelle produkte={produkte}/>
      </div>
    </div>
  );
}

//supcom ################ tabelle ################ //
function Tabelle({produkte = []}){
  if (produkte.length == 0) {
    return (
      <div className="py-20 flex flex-col justify-center items-center text-center border border-TextSec border-dashed rounded-2xl">
        <LuPackageOpen className="w-16 h-16 text-AppleBlue mb-4"/>
        <h3 className="text-AppleBlue text-2xl font-semibold">Noch keine Produkte</h3>
        <p className="text-TextSec mt-2">Füge jetzt Produkte hinzu, um sie hier anzuzeigen.</p>
      </div>
    )
  }
  return (
    <div className='overflow-x-scroll'>
      <table className='bg-BgPrim text-TextPrim w-[150%] border-collapse table-fixed'>
        <thead >
          <tr>
            <th className='w-1/6'>Produkt Name</th>
            <th>Beschreibung</th>
            <th>Preis</th>
            <th>Menge</th>
            <th>Kategorie</th>
            <th>Lagerort</th>
            <th>Status</th>
            <th>Hersteller</th>
            <th>Gewicht (kg)</th>
            <th>Rabatt (%)</th>
            <th  className='w-1/6'>Bilder</th>
          </tr>
        </thead>
        <tbody className='bg-BgPrim text-TextPrim'>
          {produkte.map((produkt, index) => (
            <tr key={index}>
              <td>{produkt.name}</td>
              <td>{produkt.beschreibung}</td>
              <td>{produkt.preis}</td>
              <td>{produkt.menge}</td>
              <td>{produkt.kategorie}</td>
              <td>{produkt.lagerort}</td>
              <td>{produkt.status}</td>
              <td>{produkt.hersteller}</td>
              <td>{produkt.gewicht}</td>
              <td>{produkt.rabatt_prozent}</td>
              <td>{produkt.bild_urls.map((url, index) => (
                <div className=' overflow-hidden' key={index}>
                  <a href={url} className="block w-full truncate">{url}</a>
                </div>
              ))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}