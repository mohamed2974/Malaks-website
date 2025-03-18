'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { links } from '@/data/weitereLinks/rechtliches';
import GradientTitel from '@/utils/GradientTitel';

export default function RechtlichesDetail() {
    const {link} = useParams();
    const aktuellerLink = links.find((l) => l.name === link);

    const [htmlContent, setHtmlContent] = useState(null);

    useEffect(() => {
        if (!aktuellerLink) {
            setHtmlContent('Inhalt nicht gefunden');
            return;
        }
        async function fetchAndLoadHtml() {
            const res = await fetch(`/content/${aktuellerLink.content}`);
            if(!res.ok) {
                setHtmlContent('Inhalt nicht gefunden');
                return
            }
            const text = await res.text();
            setHtmlContent(text);
        }

        fetchAndLoadHtml();
    }, [aktuellerLink.content, aktuellerLink]);

    // Effekt zum Scrollen und Markieren des Ziel-Elements
    useEffect(() => {
        if (window.location.hash) {
            const targetElement = document.getElementById(window.location.hash.substring(1)); // Entfernt das '#' von der URL
            if (targetElement) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20; // 20px Abstand zum oberen Rand

                // Markiere das Ziel-Element
                targetElement.style.transition = 'background-color 0.3s ease'; // Sanfte Übergänge
                targetElement.style.backgroundColor = 'var(--brand-blue-light)'; // Beispiel für gelbe Markierung

                // Scrollen zur Position
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth',
                });

                // Entferne die Markierung nach 2 Sekunden
                setTimeout(() => {
                    targetElement.style.backgroundColor = ''; // Entfernt die Markierung
                }, 2000); // Nach 2 Sekunden
            }
        }
    }, [htmlContent]); // Wird nach dem Laden des Inhalts ausgeführt  

    return (
        <section >
            <div className='text-wrap max-w-full lg:max-w-2xl mx-auto'>
                <GradientTitel text={aktuellerLink.titel} className='mb-10 ' />
                {htmlContent ? (
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                ) : (
                    <p>Lädt...</p>
                )}
            </div>
        </section>
    );
}
