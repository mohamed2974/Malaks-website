'use client';

import React from 'react';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import GradientTitel from "@/utils/GradientTitel";
import { faqs } from '@/data/componente/fragen';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="mx-auto xl:w-5/6 ">
            <GradientTitel text='Meist gestellte Fragen' className='mb-10 text-center' />           
            <div className="max-w-2xl mx-auto">
                {faqs.map((faq, index) => (
                    <div key={index} className="mb-4">
                        <button
                            className="w-full text-left flex justify-between items-center py-4 px-4 bg-BgSec dark:hover:bg-gray-900 hover:bg-gray-300 rounded-lg transition duration-300"
                            onClick={() => toggleFAQ(index)}
                        >
                            <span className="text-lg text-TextPrim font-medium">{faq.question}</span>
                            <FaChevronDown
                                className={`text-gray-600 transition-transform duration-300 ${
                                    openIndex === index ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-300  ${
                                openIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                            }`}
                        >
                            <div className="px-4 py-5 text-TextSec">{faq.answer}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
