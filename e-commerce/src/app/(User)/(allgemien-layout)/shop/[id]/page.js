// app/shop/[id]/page.js
'use client'

import { useParams } from 'next/navigation'; // Verwende useParams statt useRouter
import { useEffect, useState } from 'react';

export default function ProduktDetail() {
  const { id } = useParams(); // Hole die dynamische ID aus den Routenparametern
  const [produkt, setProdukt] = useState(null);

  useEffect(() => {
    if (!id) return; // Wenn keine ID verfügbar ist, nichts tun

    // Abrufen des Produkts basierend auf der ID
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProdukt(data))
      .catch((error) => console.error('Fehler beim Abrufen des Produkts:', error));
  }, [id]);

  if (!produkt) {
    return <div>Produkt wird geladen...</div>;
  }

  return (
    <div className="py-20">
      <h1 className="text-4xl font-bold">{produkt.name}</h1>
      <p>{produkt.beschreibung}</p>
      <p>Preis: {produkt.preis}€</p>
      {/* Weitere Produktdetails hier */}
    </div>
  );
}
