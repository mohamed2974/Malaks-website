'use client'

import { useState, useEffect, useRef  } from 'react';
import { LuPackageOpen } from "react-icons/lu";
import Select from "react-select";
import {kategorieOptionen} from '@/data/kategorieOptionen'

export default function Page() {


  //* produkt Bild ##########
  const inputFileRef = useRef(null);
  const inputFileRefTitelbild = useRef(null); // Ref für Titelbild
  const [blobUrls, setBlobUrls] = useState([]); // Speichert mehrere Bild-URLs

  const [bildUrl, setBildUrl] = useState(''); //? nur wichtig wenn man bild zeigen will ansonsten überflüssig

  //* produkt daten ##########
  const [name, setName] = useState('');
  const [beschreibung, setBeschreibung] = useState('');
  const [preis, setPreis] = useState('');
  const [kategorie, setKategorie] = useState('');
  const [lagerort, setLagerort] = useState('');
  const [status, setStatus] = useState('');
  const [hersteller, setHersteller] = useState('');
  const [gewicht, setGewicht] = useState('');
  const [rabatt_prozent, setRabatt_prozent] = useState('');
  const [mengeAirpodsPro, setMengeAirpodsPro] = useState('');
  const [menge2Generation, setMenge2Generation] = useState('');
  const [menge3Generation, setMenge3Generation] = useState('');


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
    let uploadedUrls = [];

     //Titelbild zuerst hochladen
    if (inputFileRefTitelbild.current && inputFileRefTitelbild.current.files.length > 0) {
      const file = inputFileRefTitelbild.current.files[0]; // Nur das erste Bild als Titelbild nehmen
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: 'POST',
        body: file,
      });
      const newBlob = await response.json();
      uploadedUrls.push(newBlob.url); // Titelbild an Position 0
    }

    // **Weitere Bilder hochladen**
    if (!inputFileRef.current || !inputFileRef.current.files.length) {
      console.error('Keine Datei ausgewählt!');
      return;
    }
    const files = Array.from(inputFileRef.current.files); // Sicherstellen, dass es ein Array ist
    if (!files) return;
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
    formData.append('kategorie', kategorie);
    formData.append('lagerort', lagerort);
    formData.append('status', status);
    formData.append('hersteller', hersteller);
    formData.append('gewicht', gewicht);
    formData.append('rabatt_prozent', rabatt_prozent);
    formData.append('bildUrls', JSON.stringify(uploadedUrls)); // Speichert als JSON-String
    formData.append('mengeAirpodsPro', mengeAirpodsPro);
    formData.append('menge2Generation', menge2Generation);
    formData.append('menge3Generation', menge3Generation);


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
    <div className='pb-40 px-GlobalXPad md:px-MdXPad lg:px-LgXPad'>
      <div>
        <h2 className='text-3xl pb-8 underline underline-offset-8'>Produkte Hochladen</h2>
        <form onSubmit={handleSubmit} >
          <h3 className='text-2xl pb-4'>Informationen</h3>
          <div className='grid grid-cols-3 gap-4'>
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
            <div className='flex flex-col col-span-2'>
              <label htmlFor='kategorie' className='mb-2'>Kategorie</label>
              <Select
                isMulti
                options={kategorieOptionen}
                className="basic-multi-select p-1.5 rounded-md bg-BgSec text-BrandDark " 
                id='kategorie'
                classNamePrefix="select"
                value={kategorieOptionen.filter(option => kategorie.includes(option.value))}
                onChange={(selectedOptions) => setKategorie(selectedOptions.map(option => option.value))}
              />
            </div>
          </div>
          <h3 className='text-2xl pb-4 mt-10'>Details</h3>
          <div className='grid grid-cols-3 gap-4'>
            <div className='flex flex-col'>
              <label htmlFor='status' className='mb-2'>Status</label>
              <select id='status' value={status} name="options" onChange={handleChange(setStatus)} className="p-3 rounded-md bg-BgSec" required >
                <option value="Verfügbar">Verfügbar</option>
                <option value="Nicht Verfügbar">Nicht Verfügbar</option>
                <option value="Neu">Neu</option>
                <option value="Exklusiv">Exklusiv</option>
              </select>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='lagerort' className='mb-2'>Lagerort</label>
              <input className="p-3 rounded-md bg-BgSec" id='lagerort' type="text" value={lagerort} onChange={handleChange(setLagerort)} required/>
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
          </div>
          <h3 className='text-2xl pb-4 mt-10'>Mengen</h3>
          <div className='grid grid-cols-3 gap-4'>
            <div className='flex flex-col'>
              <label htmlFor='menge-airpods-pro' className='mb-2'>AirPods Pro Menge</label>
              <input
                className="p-3 rounded-md bg-BgSec"
                id='menge-airpods-pro'
                type="number"
                value={mengeAirpodsPro}
                onChange={handleChange(setMengeAirpodsPro)}
                required
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='menge-2-generation' className='mb-2'>2. Generation Menge</label>
              <input
                className="p-3 rounded-md bg-BgSec"
                id='menge-2-generation'
                type="number"
                value={menge2Generation}
                onChange={handleChange(setMenge2Generation)}
                required
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='menge-3-generation' className='mb-2'>3. Generation Menge</label>
              <input
                className="p-3 rounded-md bg-BgSec"
                id='menge-3-generation'
                type="number"
                value={menge3Generation}
                onChange={handleChange(setMenge3Generation)}
                required
              />
            </div>
          </div>
          {/* bilder */}
          <h3 className='text-2xl pb-4 mt-10'>Bilder</h3>
          <div className='grid grid-cols-2 gap-4'>
            <div className='flex flex-col'>
              <label htmlFor='bilder' className='mb-2'>Titelbild </label>
              <input className="p-3 rounded-md w-full" id='titelbild' type="file" ref={inputFileRefTitelbild}  required accept="image/*" onChange={handleChange(setBildUrl)} />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='bilder' className='mb-2'>Weitere Bilder</label>
              <input className="p-3 rounded-md w-full" id='bilder' type="file" ref={inputFileRef} required multiple accept="image/*" onChange={handleChange(setBildUrl)} />
            </div>
          </div>
          {/* produkt hochladen */}
          <div className='flex col-span-4 justify-center items-center mt-14'>
            <button className=' bg-BrandBlue transition-all hover:bg-BrandBlueLight active:bg-BrandBlueDark text-BrandWhite font-bold py-2 px-2 rounded-md' type="submit">Produkt hinzufügen</button>
          </div>
        </form>         
      </div>

      <div className='py-20 overflow-auto'>
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
    <table className='bg-BgPrim text-TextPrim w-full border-collapse table-fixed '>
      <thead className='bg-BgSec'>
        <tr>
          <th className='w-[5vw]'>ID</th>
          <th className='w-[20vw]'>Produkt Name</th>
          <th className='w-[10vw]'>Beschreibung</th>
          <th className='w-[10vw]'>Preis (€)</th>
          <th className='w-[10vw]'>Menge</th>
          <th className='w-[10vw]'>Kategorie</th>
          <th className='w-[5vw]'>Lagerort</th>
          <th className='w-[10vw]'>Status</th>
          <th className='w-[10vw]'>Hersteller</th>
          <th className='w-[10vw]'>Gewicht (kg)</th>
          <th className='w-[10vw]'>Rabatt (%)</th>
          <th className='w-[10vw]'>Bilder</th>
        </tr>
      </thead>
      <tbody className='bg-BgPrim text-TextPrim divide-y-[1px] divide-black'>
        {produkte.map((produkt, index) => (
          <tr key={index}>
            <td>{produkt.id}</td>
            <td className='truncate'>{produkt.name}</td>
            <td>{produkt.beschreibung.substring(0, 100)}...</td>
            <td>{produkt.preis}</td>
            <td>{produkt.model_mengen}</td>
            <td className='space-y-1'>{produkt.kategorie.split(',').map((text, index)=> <span className='bg-BgSec inline-block px-3 rounded-full' key={index}>{text + ' '} </span>)}</td>
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
        )).reverse()}
      </tbody>
    </table>
  )
}