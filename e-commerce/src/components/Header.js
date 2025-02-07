'use client';

import { FiShoppingBag } from "react-icons/fi";
import { BsBrightnessHighFill } from "react-icons/bs";
import { MdNightlight } from "react-icons/md";
import Link from "next/link";
import Uls from "@/utils/ULs-component";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const nav = [
    <Link href='/' key='link1'>Link 1</Link>,
    <Link href='/' key='link2'>Link 2</Link>,
    <Link href='/' key='link3'>Link 3</Link>,
    <Link href='/' key='link4'>Link 4</Link>,
];

export default function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Verhindert das Rendern, bevor die Komponente auf dem Client gemountet wurde
    if (!mounted) return null;

    // Nur wenn mounted, dann rendern
    return (
        <header className={`flex flex-row justify-between items-center px-16 py-3 text-lg`}>
            {/* Logo */}
            <div className="w-1/6">
                <h1>Logo</h1>
            </div>

            {/* nav bar */}
            <div className="w-4/6 text-center">
                <Uls array={nav} row={true} style='justify-center' listItemStyle='mx-6 py-2'/>
            </div>

            <div className="flex justify-end w-1/6 ">
                {/* theme switcher */}
                <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className={`mr-4 p-1.5 text-2xl rounded-full ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}>
                    {theme === "dark" ? (
                        <BsBrightnessHighFill className="text-yellow-500" />
                    ) : (
                        <MdNightlight className="text-white " />
                    )}
                </button> 

                {/* warenkorb */}
                <div className="flex items-center">
                    <FiShoppingBag className="text-3xl" /> 
                </div>
            </div>
        </header>
    );
}
