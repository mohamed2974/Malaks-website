'use client'

import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { categories } from "@/data/kategorieOptionen"; // Hier sind die originalen Daten

export default function Filter({ selectedFilters, setSelectedFilters, reslength }) {
    const kategorien = categories.kategorie.map(k => k.value);
    const modelle = categories.modell.map(m => m.value);
    const [checkedItems, setCheckedItems] = useState({});
    const [open, setOpen] = useState(false)

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;

        // State aktualisieren
        setCheckedItems(prevState => ({
            ...prevState,
            [name]: checked
        }));
        
        // Filter-Array aktualisieren
        setSelectedFilters(prev =>
            checked ? [...prev, name] : prev.filter(item => item !== name)
        );
    };

    const toggleDropdown = () => {
        setOpen(!open);
    };

    const allefilterslöschen = () =>{
        setCheckedItems({})
        setSelectedFilters([])
    }

    return (
        <div className="relative ">
            {/* Filter Button */}
            <button 
                onClick={toggleDropdown} 
                className="flex items-center gap-2 mb-5 bg-BgSec px-4 py-2 rounded-lg shadow-sm hover:bg-BrandBlueLight transition"
            >
                <FaFilter className="text-TextSec" />
                <span className="text-sm font-medium">{selectedFilters.length > 0 ? `(${selectedFilters.length}) Filter` : "Alle"}</span>
                
                {/* reslength */}
                <span 
                className="ml-2 text-xs font-semibold text-BrandBlueDark bg-blue-100 px-2 py-1 rounded-full shadow-sm transition-all "
                >
                {reslength}
                </span>            
            </button>
            
            {/* Filter Dropdown */}
            {open && (
                <div className="absolute left-0 bg-BgSec shadow-lg rounded-lg p-4 w-fit z-10 ">
                    <div className="flex justify-between items-center border-b border-TextPrim pb-2 mb-2">
                        <h3 className="text-sm text-TextPrim font-semibold">Filter wählen</h3>
                        <button onClick={toggleDropdown} className="text-TextSec hover:text-BrandRed">
                            <IoClose className="text-xl" />
                        </button>
                    </div>

                    {/* Filter Optionen */}
                    <div className="grid  grid-cols-2 gap-x-6 text-nowrap">
                        <div className="w-fit space-y-3">
                            <h4 className="text-xs font-semibold text-TextSec mb-1">Kategorien</h4>
                            {kategorien.map((kategorie, index) => (
                                <label key={index} className="flex items-center gap-2 cursor-pointer text-TextSec text-sm">
                                    <input
                                        type="checkbox"
                                        name={kategorie}
                                        checked={checkedItems[kategorie] || false}
                                        onChange={handleCheckboxChange}
                                        className="hidden"
                                    />
                                    <span 
                                        className={`w-4 h-4 border-2 rounded-md flex items-center justify-center transition ${checkedItems[kategorie] ? 'bg-BrandBlueLight border-BrandBlueLight' : 'border-gray-300'}`}
                                    >
                                        {checkedItems[kategorie] && <div className="w-2 h-2 bg-white rounded-sm"></div>}
                                    </span>
                                    {kategorie}
                                </label>
                            ))}
                        </div> 
                        <div className="w-fit space-y-3">
                            <h4 className="text-xs font-semibold text-TextSec mb-1">Modelle</h4>
                            {modelle.map((modell, index) => (
                                <label key={index} className="flex items-center gap-2 cursor-pointer text-TextSec text-sm">
                                    <input
                                        type="checkbox"
                                        name={modell}
                                        checked={checkedItems[modell] || false}
                                        onChange={handleCheckboxChange}
                                        className="hidden"
                                    />
                                    <span 
                                        className={`w-4 h-4 border-2 rounded-md flex items-center justify-center transition ${checkedItems[modell] ? 'bg-BrandBlueLight border-BrandBlueLight' : 'border-gray-300'}`}
                                    >
                                        {checkedItems[modell] && <div className="w-2 h-2 bg-white rounded-sm"></div>}
                                    </span>
                                    {modell}
                                </label>
                            ))}
                        </div>
                        <button className="border-t col-span-2 border-TextPrim mt-2 pt-2.5 text-sm text-center w-full hover:text-BrandRed" onClick={allefilterslöschen}>
                            Alles entfernen
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
