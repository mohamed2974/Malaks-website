'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import GradientTitel from '@/utils/GradientTitel';
import Select from "react-select";
import { problemOption } from '@/data/support/problem';
import Link from 'next/link';

export default function Kontakt() {
    const [email, setEmail] = useState('');
    const [titel, setTitel] = useState('');
    const [tel, setTel] = useState('');
    const [img, setImg] = useState(null);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [response, setResponse] = useState('');

    useEffect(() => {
        // Alle Inputs mit required finden und den Stern hinzufügen
        const requiredInputs = document.querySelectorAll('input[required], textarea[required]');
        
        requiredInputs.forEach(input => {
            const label = document.querySelector(`label[for="${input.id}"]`);
            if (label) {
                if (!label.querySelector('.required-star')) {
                    const star = document.createElement('span');
                    star.style.color = 'var(--brand-red)';
                    star.textContent = ' *';
                    star.classList.add('required-star');  // Eine Klasse hinzufügen, um es später zu identifizieren
                    label.appendChild(star);
                }
            }
        });
    }, [ ]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    
        const formData = new FormData();
        formData.append("email", email);
        formData.append("titel", titel);
        formData.append("tel", tel);
        formData.append("message", message);
        
        // Wenn ein Bild hochgeladen wurde, füge es zum FormData hinzu
        if (img) {
            formData.append("img", img);  // Hier wird das Bild als Datei hinzugefügt
        }
    
        try {
            const res = await fetch('/api/kontakt/problemmelden', {
                method: 'POST',
                body: formData,  // Sende die FormData mit dem Bild
            });
    
            const data = await res.json();
            setResponse(data.message || 'Nachricht erfolgreich gesendet!');
        } catch (error) {
            setResponse('Fehler beim Senden der Nachricht.');
        } finally {
            setIsSubmitting(false);
        }
    };    

    return (
        <section className="flex justify-center flex-col items-center min-h-[50vh]">
            <div className="text-center mb-10">
                <GradientTitel text='Problem melden' />
                <p className="text-TextSec mt-2">Wir möchten sicherstellen, dass du die bestmögliche Erfahrung mit unseren Produkten und Dienstleistungen hast. Wenn du ein Problem hast, fülle bitte das Formular aus und teile uns alle relevanten Details mit. Wir werden uns schnellstmöglich um dein Anliegen kümmern!</p>
            </div>
            <div className="bg-BgSec p-4 md:p-8 rounded-lg shadow-md w-full">
                <form onSubmit={handleSubmit} className="flex flex-wrap">
                    <div className='w-full lg:w-1/2 space-y-4 lg:pr-6'>
                        <div>
                            <label htmlFor='email' className="block text-sm font-medium text-TextPrim">E-Mail-Adresse:</label>
                            <input
                                id='email'
                                type="email"
                                value={email}
                                placeholder="deinname@email.de"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 p-2 w-full bg-BgPrim rounded-md focus:outline-none focus:ring-2 focus:ring-BrandBlueLight"
                            />
                        </div>
                        <div>
                            <label htmlFor='titel' className="block text-sm font-medium text-TextPrim">Wie können wir dir helfen?:</label>
                            <Select
                                options={problemOption}
                                className="basic-single mt-1 w-full bg-BgPrim rounded-md focus:outline-none focus:ring-2 focus:ring-BrandBlueLight text-BrandDark" 
                                id='titel'
                                classNamePrefix="select"
                                required
                                value={problemOption.find(option => option.value === titel) || null}
                                onChange={(selectedOptions) => setTitel(selectedOptions.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor='nummer' className="block text-sm font-medium text-TextPrim">Handynummer:</label>
                            <input
                                id='nummer'
                                type="tel"
                                pattern="^\+?[0-9\s\-]{7,20}$"
                                placeholder="+49 170 1234567"
                                value={tel}
                                onChange={(e) => setTel(e.target.value)}
                                className="mt-1 p-2 w-full bg-BgPrim rounded-md focus:outline-none focus:ring-2 focus:ring-BrandBlueLight"
                            />
                        </div>
                        <div>
                            <label htmlFor='img' className="block text-sm font-medium text-TextPrim">Füge Bilder hinzu:</label>
                            <input
                                id='img'
                                type="file"
                                onChange={(e) => setImg(e.target.files[0])}  // Setze die ausgewählte Datei
                                className="mt-1 p-2 w-full bg-BgPrim rounded-md focus:outline-none focus:ring-2 focus:ring-BrandBlueLight"
                            />
                        </div>
                        <div className="flex">
                            <input
                                id='datenschutz-checkbox'
                                type="checkbox"
                                className="h-4 w-4 text-BrandBlue focus:ring-0"
                                required // Optional: Kann entfernt werden, falls die Checkbox nicht zwingend ist
                            />
                            <label htmlFor="datenschutz-checkbox" className="ml-2 text-xs text-TextPrim">
                                Mit dem Absenden dieses Formulars erklärst du dich damit einverstanden, dass wir deine angegebenen Daten zur Bearbeitung deiner Anfrage verwenden. Weitere Informationen findest du in unserer <Link href="/rechtliches/datenschutzerklaerung" className="text-BrandBlue hover:underline">Datenschutzerklärung</Link>.
                            </label>
                        </div>
                    </div>
                    <div className='w-full lg:w-1/2 mt-5 lg:mt-0'>
                        <label htmlFor='message' className="block text-sm font-medium text-TextPrim">Nachricht:</label>
                        <textarea
                            rows="11"
                            placeholder="Deine Nachricht..."
                            id='message'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            minLength={20}
                            className="max-h-screen mt-1 p-2 w-full bg-BgPrim rounded-md focus:outline-none focus:ring-2 focus:ring-BrandBlueLight"
                        />
                    </div>

                    <div className="flex justify-center w-full mt-6">
                        <button
                            type="submit"
                            disabled={isSubmitting || response.includes('gesendet')}
                            className="bg-BrandBlue text-white px-3 py-1 rounded-md hover:bg-BrandBlueLight disabled:bg-gray-400 transition"
                        >
                            {isSubmitting ? 'Sende...' : 'Absenden'}
                        </button>
                    </div>
                </form>

                {response && (
                    <p className={`mt-4 text-center text-sm ${response.includes('Fehler') ? 'text-ErrorRed' : 'text-AccentGreen'}`}>
                        {response}
                    </p>
                )}
            </div>
        </section>
    );
}
