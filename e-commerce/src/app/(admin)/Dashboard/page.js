// 'use client'

// import { useState } from 'react';

// export default function AdminDashboard() {
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [price, setPrice] = useState('');
//     const [image, setImage] = useState(null);
//     const [quantities, setQuantities] = useState('');  // Hinzugefügt

//     // Funktion für das Hochladen des Bildes
//     async function handleUpload(image) {
//         const formData = new FormData();
//         formData.append('file', image);
    
//         // Füge den BLOB_READ_WRITE_TOKEN im Header hinzu
//         const res = await fetch('/api/blob/upload', {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BLOB_READ_WRITE_TOKEN}`,
//             },
//             body: formData,
//         });
    
//         if (!res.ok) {
//             alert('Fehler beim Hochladen der Datei');
//             return null;
//         }
    
//         const data = await res.json();
//         return data.url;
//     }
    

//     // Funktion für das Speichern des Produkts
//     async function saveProduct({ name, description, price, quantities, imageUrl }) {
//         const res = await fetch('/api/products', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ name, description, price, quantities, imageUrl }),
//         });

//         if (!res.ok) {
//             alert('Fehler beim Speichern des Produkts');
//         } else {
//             alert('Produkt gespeichert!');
//         }
//     }

//     // `handleSubmit` ruft die anderen Funktionen auf
//     async function handleSubmit(e) {
//         e.preventDefault();

//         // Schritt 1: Datei hochladen und URL erhalten
//         const imageUrl = await handleUpload(image);
//         // if (!imageUrl) return;  // Falls der Upload fehlschlägt, stoppen

//         // Schritt 2: Produkt speichern
//         saveProduct({ name, description, price, quantities, imageUrl });
//     }

//     return (
//         <div>
//             <h1>Produkt hinzufügen</h1>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
//                 <input type="text" placeholder="Beschreibung" onChange={(e) => setDescription(e.target.value)} />
//                 <input type="number" placeholder="Preis" onChange={(e) => setPrice(e.target.value)} />
//                 <input type="number" placeholder="Menge" onChange={(e) => setQuantities(e.target.value)} />  {/* Menge Eingabefeld */}
//                 <input type="file" onChange={(e) => setImage(e.target.files[0])} />
//                 <button type="submit">Speichern</button>
//             </form>
//         </div>
//     );
// }
