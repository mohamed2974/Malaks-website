'use client'

import { useState, useEffect, useRef  } from 'react';

export default function Page() {
    //* produkt Bild ##########
  const inputFileRef = useRef(null);
  const [blob, setBlob] = useState(null)

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
  
  //* Daten abrufen ####################################################
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

  async function handleSubmit(event) {
    event.preventDefault();

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
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Produktname"
          value={name}
          onChange={handleChange(setName)} // onChange Handler hinzugefügt
          required
        />
        <input
          type="text"
          placeholder="Beschreibung"
          value={beschreibung}
          onChange={handleChange(setBeschreibung)} // onChange Handler hinzugefügt
        />
        <input
          type="number"
          step="0.01"
          placeholder="Preis"
          value={preis}
          onChange={handleChange(setPreis)} // onChange Handler hinzugefügt
          required
        />
        <input
          type="number"
          placeholder="Menge"
          value={menge}
          onChange={handleChange(setMenge)} // onChange Handler hinzugefügt
          required
        />
        <input
          type="text"
          placeholder="Kategorie"
          value={kategorie}
          onChange={handleChange(setKategorie)} // onChange Handler hinzugefügt
          required
        />
        <input
          type="text"
          placeholder="Lagerort"
          value={lagerort}
          onChange={handleChange(setLagerort)} // onChange Handler hinzugefügt
        />
        <input
          type="text"
          placeholder="Status (z.B. verfügbar, ausverkauft)"
          value={status}
          onChange={handleChange(setStatus)} // onChange Handler hinzugefügt
        />
        <input
          type="text"
          placeholder="Hersteller"
          value={hersteller}
          onChange={handleChange(setHersteller)} // onChange Handler hinzugefügt
        />
        <input
          type="number"
          step="0.01"
          placeholder="Gewicht (kg)"
          value={gewicht}
          onChange={handleChange(setGewicht)} // onChange Handler hinzugefügt
        />
        <input
          type="number"
          step="0.01"
          placeholder="Rabatt (%)"
          value={rabatt_prozent}
          onChange={handleChange(setRabatt_prozent)} // onChange Handler hinzugefügt
        />
        <button type="submit">Produkt hinzufügen</button>
      </form>

      <h2>Produkte:</h2>
      <ul>
        {produkte.map((produkt, index) => (
          <li key={index}>{JSON.stringify(produkt)}</li>
        ))}
      </ul>
    </>
  );
}
