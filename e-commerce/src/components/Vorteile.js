'use client';

import { LinearGradient } from 'react-text-gradients';
import { benefits } from '@/data/componente/vorteile';

export default function Vorteile() {
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
