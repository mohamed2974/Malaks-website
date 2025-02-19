'use client'

import Produktekarten from "@/utils/Produktekarten"
import Filter from "@/utils/shop/Filter"
import { useState } from "react";

export default function Shop() {
    const [selectedFilters, setSelectedFilters] = useState([]); // State für Filter

    return (
        <section >
            <div className="flex flex-col items-center justify-center py-16">
                <h1 className="text-gray-800 dark:text-gray-100 text-4xl font-bold">Produkte</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Hier findest du alle produkte</p>
            </div>
            <Filter selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
            <Produktekarten filter={selectedFilters} />
            </section>
    )
}
