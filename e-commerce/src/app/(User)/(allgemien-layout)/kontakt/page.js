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
        <div className="flex justify-center items-center min-h-screen bg-gray-100 py-6">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
                <h1 className="text-2xl font-bold text-center mb-6">Kontaktformular</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <div>
                        <label htmlFor='message' className="block text-sm font-medium text-gray-700">Nachricht:</label>
                        <textarea
                            rows="10"
                            placeholder="Deine Nachricht..."
                            id='message'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            minLength={20}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400 transition"
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
        </div>
    );
}
