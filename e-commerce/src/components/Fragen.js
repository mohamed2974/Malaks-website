'use client';

import React from 'react';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { LinearGradient } from 'react-text-gradients';

export default function FAQ() {
    const faqs = [
        {
            question: 'Sind die AirPods Cases stoßfest?',
            answer: 'Ja! Unsere Cases bestehen aus hochwertigem Material, das deine AirPods zuverlässig vor Stürzen und Kratzern schützt.',
        },
        {
            question: 'Kann ich mein AirPods Case kabellos laden?',
            answer: 'Ja, alle unsere Cases sind mit kabellosem Laden kompatibel, sodass du deine AirPods weiterhin bequem aufladen kannst.',
        },
        {
            question: 'Wie lange dauert der Versand?',
            answer: 'Unsere Lieferzeit beträgt in der Regel 2-5 Werktage, abhängig von deinem Standort.',
        },
        {
            question: 'Gibt es eine Geld-zurück-Garantie?',
            answer: 'Ja, wir bieten eine 30-tägige Geld-zurück-Garantie, falls du mit deinem Kauf nicht zufrieden bist.',
        },
    ];

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="mx-auto xl:w-5/6 ">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold">
                    <LinearGradient gradient={["to right", "#374151, #c2410c ,#fb923c"]}>
                    Meist gestellte Fragen
                    </LinearGradient>
                </h1>
            </div>            
            <div className="max-w-2xl mx-auto">
                {faqs.map((faq, index) => (
                    <div key={index} className="mb-4">
                        <button
                            className="w-full text-left flex justify-between items-center py-4 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition duration-300"
                            onClick={() => toggleFAQ(index)}
                        >
                            <span className="text-lg font-medium">{faq.question}</span>
                            <FaChevronDown
                                className={`text-gray-600 transition-transform duration-300 ${
                                    openIndex === index ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-300  ${
                                openIndex === index ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
                            }`}
                        >
                            <div className="px-4 py-5 text-gray-600">{faq.answer}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
