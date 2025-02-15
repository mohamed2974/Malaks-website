'use client';

import { FaShieldAlt, FaPalette, FaFeather } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { LinearGradient } from 'react-text-gradients';

export default function Vorteile() {
    const benefits = [
        {
            icon: <FaShieldAlt className="text-white text-3xl" />,
            title: 'Maximaler Schutz',
            description: 'Unsere Cases schützen deine AirPods vor Kratzern, Stürzen und Staub – für eine längere Lebensdauer.',
            bgColor: 'bg-blue-500',
        },
        {
            icon: <FaPalette className="text-white text-3xl" />,
            title: 'Stylisches Design',
            description: 'Wähle aus vielen Farben und Mustern, um dein AirPods Case einzigartig zu machen.',
            bgColor: 'bg-pink-500',
        },
        {
            icon: <FaFeather className="text-white text-3xl" />,
            title: 'Ultraleicht & Passgenau',
            description: 'Unsere Cases sind extrem leicht und passen perfekt, ohne das Ladeerlebnis zu beeinträchtigen.',
            bgColor: 'bg-green-500',
        },
        {
            icon: <MdLocalShipping className="text-white text-3xl" />,
            title: 'Schneller Versand',
            description: 'Wir liefern schnell & zuverlässig, damit dein neues Case so schnell wie möglich bei dir ist.',
            bgColor: 'bg-yellow-500',
        },
    ];

    return (
        <section className="mx-auto xl:w-5/6">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold">
                    <LinearGradient gradient={["to right", "#374151,#c2410c ,#fb923c"]}>
                    Unsere Vorteile
                    </LinearGradient>
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">das sind unsere Vorteile</p>
            </div>            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                {benefits.map((benefit, index) => (
                    <div key={index} className="p-6 bg-gray-900 text-white rounded-2xl shadow-lg flex flex-col items-center">
                        <div className={`p-4 rounded-full mb-4 ${benefit.bgColor}`}>
                            {benefit.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-gray-300">{benefit.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
