'use client'
import { useState, useEffect } from 'react';

export default function Kontakt() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [titel, setTitel] = useState('');
    const [tel, setTel] = useState('');
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
                    star.style.color = 'red';
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

        const formData = { name, email, titel, tel, message };

        try {
            const res = await fetch('/api/kontakt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
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
        <section className="flex justify-center flex-col items-center min-h-[50vh] bg-gray-100">
            <h1 className="text-2xl w-full font-bold text-center mb-6">Kontaktformular</h1>
            <div className="bg-white p-8 rounded-lg shadow-md w-full">
                <form onSubmit={handleSubmit} className="flex flex-wrap">
                    <div className='w-full lg:w-1/2 space-y-4 lg:pr-6'>
                        <div>
                            <label htmlFor='name' className="block text-sm font-medium text-gray-700">Name:</label>
                            <input
                                id='name'
                                type="text"
                                value={name}
                                placeholder="Dein Vor- und Nachname"
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor='email' className="block text-sm font-medium text-gray-700">E-Mail-Adresse:</label>
                            <input
                                id='email'
                                type="email"
                                value={email}
                                placeholder="deinname@email.de"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor='titel' className="block text-sm font-medium text-gray-700">Wie kann ich dir helfen?:</label>
                            <input
                                id='titel'
                                type="text"
                                value={titel}
                                placeholder="Beschreibe dein Anliegen in wenigen Worten."
                                onChange={(e) => setTitel(e.target.value)}
                                required
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor='nummer' className="block text-sm font-medium text-gray-700">Handynummer:</label>
                            <input
                                id='nummer'
                                type="tel"
                                pattern="^\+?[0-9\s\-]{7,20}$"
                                placeholder="+49 170 1234567"
                                value={tel}
                                onChange={(e) => setTel(e.target.value)}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className='w-full lg:w-1/2 mt-5 lg:mt-0'>
                        <label htmlFor='message' className="block text-sm font-medium text-gray-700">Nachricht:</label>
                        <textarea
                            rows="11"
                            placeholder="Deine Nachricht..."
                            id='message'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            minLength={20}
                            className="max-h-screen mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-center w-full mt-6">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 disabled:bg-gray-400 transition"
                        >
                            {isSubmitting ? 'Sende...' : 'Absenden'}
                        </button>
                    </div>
                </form>

                {response && (
                    <p className={`mt-4 text-center text-sm ${response.includes('Fehler') ? 'text-red-500' : 'text-green-500'}`}>
                        {response}
                    </p>
                )}
            </div>
        </section>
    );
}
