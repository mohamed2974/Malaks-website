'use client';

import GradientTitel from "@/utils/GradientTitel";
import { benefits } from '@/data/componente/vorteile';

export default function Vorteile() {
    return (
        <section className="mx-auto xl:w-5/6">
            <div className="text-center mb-10">
                <GradientTitel text="Unsere Vorteile" />
                <p className="text-TextSec mt-2">das sind unsere Vorteile</p>
            </div>            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                {benefits.map((benefit, index) => (
                    <div key={index} className="p-6 bg-BgSec rounded-2xl shadow-lg flex flex-col items-center transition hover:scale-[1.04]">
                        <div className={`p-4 rounded-full mb-4 ${benefit.bgColor}`}>
                            {benefit.icon}
                        </div>
                        <h3 className="text-xl text-TextPrim font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-TextSec">{benefit.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
