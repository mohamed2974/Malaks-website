'use client';

import { FiShoppingBag } from "react-icons/fi";
import { BsBrightnessHighFill } from "react-icons/bs";
import { MdNightlight } from "react-icons/md";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

import Uls from "@/utils/ULs-component";
import MobileNav from '@/utils/MobileNav-component'

const nav = [
    <Link href='/' key='link1'>Link 1</Link>,
    <Link href='/' key='link2'>Link 2</Link>,
    <Link href='/' key='link3'>Link 3</Link>,
    <Link href='/' key='link4'>Link 4</Link>,
];


export default function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const buttons = [
        <ThemeSwitch key={1} setTheme={setTheme} theme={theme}/>,
        <FiShoppingBag key={2} className="text-3xl" /> 
    ]

    useEffect(() => {
        setMounted(true);
    }, []);

    // Verhindert das Rendern, bevor die Komponente auf dem Client gemountet wurde
    if (!mounted) return null;

    // Nur wenn mounted, dann rendern
    return (
        <header className={`flex flex-row justify-between items-center px-5 lg:px-16 py-3 text-lg`}>
            {/* Logo */}
            <div className="w-1/6">
                <h1>Logo</h1>
            </div>

            {/* nav bar */}
            <div className="w-4/6 text-center hidden md:inline-block">
                <Uls array={nav} row={true} style='justify-center' listItemStyle='mx-6 py-2'/>
            </div>

            {/*######### pc #########*/}
            <div className="hidden md:flex justify-end w-1/6 ">
                {/* theme switcher */}
                <ThemeSwitch setTheme={setTheme} theme={theme}/>
                {/* warenkorb */}
                <div className="flex items-center">
                    <FiShoppingBag className="text-3xl" /> 
                </div>
            </div>

            {/*######### Mobile #########*/}
            <div className="flex md:hidden justify-end w-1/6 ">
                <MobileNav array={nav} boxes={buttons} />
            </div>
        </header>
    );
}


//supcom ################### theme switcher ################### //
function ThemeSwitch({setTheme, theme}){
    return(
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className={`mr-4 p-1.5 text-2xl rounded-full ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}>
            {theme === "dark" ? (
                <BsBrightnessHighFill className="text-yellow-500" />
            ) : (
                <MdNightlight className="text-white " />
            )}
        </button> 
    )
}