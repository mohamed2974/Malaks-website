'use client';

import Image from 'next/image';
import GradientTitel from "@/utils/GradientTitel";
import { categories } from '@/data/kategorieOptionen';
import Link from 'next/link';

export default function CategoryGrid() {
    return (
        <section>
            <div className="text-center mb-10">
                <GradientTitel text='Entdecke unsere Kategorien' />
                <p className="text-TextSec mt-2">Finde dein perfektes AirPods Case in unseren vielfältigen Kategorien.</p>
            </div>
            <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4 gap-y-4">
                {categories.kategorie.map((category) => (
                    category.image && (
                        <div key={category.name} className={`relative flex items-center justify-center aspect-square rounded-xl text-white`}>
                            <span className="absolute z-10 top-4 left-4 font-extrabold text-4xl">{category.value}</span>
                            {category.image && (
                                <Link href={`/shop/kategorien/${category.name}`} passHref>
                                    <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw" 
                                    className="object-contain"
                                    />
                                </Link>
                            )}
                        </div>
                    )
                ))}
            </div>
        </section>
    );
}
