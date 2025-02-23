'use client'

import Produktekarten from "@/utils/Produktekarten"
import Filter from "@/utils/shop/Filter"
import React from "react";
import { useState } from "react";
import GradientTitel from "@/utils/GradientTitel";

export default function Shop() {
    const [selectedFilters, setSelectedFilters] = useState([]); // State für Filter
    const [reslength, setReslength] = useState(0)

    return (
        <section >
            <div className="flex flex-col items-center justify-center ">
                <GradientTitel text='Produkte' />
                <p className="text-TextSec mt-2">Hier findest du alle produkte</p>
            </div>
            <Filter selectedFilters={selectedFilters} reslength={reslength} setSelectedFilters={setSelectedFilters} />
            <Produktekarten filter={selectedFilters} setReslength={setReslength} />
            </section>
    )
}
