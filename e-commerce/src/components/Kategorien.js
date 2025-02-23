'use client';

import Image from 'next/image';
import GradientTitel from "@/utils/GradientTitel";
import { categories } from '@/data/kategorieOptionen';

export default function CategoryGrid() {
    return (
        <section>
            <div className="text-center mb-10">
                <GradientTitel text='Entdecke unsere Kategorien' />
                <p className="text-TextSec mt-2">Finde dein perfektes AirPods Case in unseren vielfältigen Kategorien.</p>
            </div>
            <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4 gap-y-4">
                {categories.map((category) => (
                    <div
                    key={category.name}
                    className={`relative flex items-center justify-center rounded-xl p-6 ${category.bgColor} text-white`}
                    >
                    <span className="absolute top-4 left-4 font-bold text-lg">{category.name}</span>
                    {category.image && (
                        <Image
                        src={category.image}
                        alt={category.name}
                        width={100}
                        height={100}
                        className="object-contain"
                        />
                    )}
                    </div>
                ))}
            </div>
        </section>
    );
}
