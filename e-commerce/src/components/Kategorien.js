'use client';

import Image from 'next/image';
import { LinearGradient } from 'react-text-gradients';

const categories = [
  { name: 'Gaming', bgColor: 'bg-blue-500', image: '/path-to-gaming.jpg' },
  { name: 'Manga', bgColor: 'bg-orange-500', image: '/path-to-manga.jpg' },
  { name: 'Heros', bgColor: 'bg-red-500', image: '/path-to-heros.jpg' },
  { name: 'Obst/Gemüse', bgColor: 'bg-green-500', image: '/path-to-fruits.jpg' },
  { name: 'Snack', bgColor: 'bg-yellow-500', image: '/path-to-snack.jpg' },
  { name: 'Animation', bgColor: 'bg-pink-500', image: '/path-to-animation.jpg' },
];

export default function CategoryGrid() {
  return (
    <section>
        <div className="text-center mb-10">
            <h1 className="text-4xl font-bold">
                <LinearGradient gradient={["to right", "#374151,#c2410c ,#fb923c"]}>
                Entdecke unsere Kategorien
                </LinearGradient>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Finde dein perfektes AirPods Case in unseren vielfältigen Kategorien.</p>
        </div>
        <div  className="grid grid-cols-3 gap-4">
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
