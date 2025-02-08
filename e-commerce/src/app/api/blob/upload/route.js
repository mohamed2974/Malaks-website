// // /app/api/blob/upload/route.js

// import formidable from 'formidable';
// import { put } from '@vercel/blob';

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// export async function POST(request) { 
//     return new Promise((resolve) => {
//         const form = new formidable.IncomingForm();
//         form.parse(request, async (err, fields, files) => {
//             if (err) {
//                 return resolve(new Response(JSON.stringify({ message: 'Fehler beim Verarbeiten der Datei.' }), { status: 500 }));
//             }

//         // Stelle sicher, dass du die Datei richtig extrahierst:
//         const file = Array.isArray(files.file) ? files.file[0] : files.file;
//         if (!file) {
//             return resolve(new Response(JSON.stringify({ message: 'Keine Datei hochgeladen.' }), { status: 400 }));
//         }

//         try {
//             const blob = await put(file.originalFilename, file.filepath, { access: 'public' });
//             return resolve(new Response(JSON.stringify({ url: blob.url }), { status: 200 }));
//         } catch (error) {
//             return resolve(new Response(JSON.stringify({ message: 'Fehler beim Speichern der Datei.' }), { status: 500 }));
//         }
//         });
//     });
// }
