'use client';

import { CgShoppingBag } from "react-icons/cg";
import { BsBrightnessHighFill } from "react-icons/bs";
import { MdNightlight } from "react-icons/md";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { HiOutlineShoppingCart } from "react-icons/hi"; 
import { nav } from "@/data/layout/header";
import Uls from "@/utils/ULs-component";
import MobileNav from '@/utils/MobileNav-component'
import { LinearGradient } from "react-text-gradients";



export default function Header({className}) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const buttons = [
        <div className="flex justify-center flex-col items-center" key={1}>
            <ThemeSwitch id='switch' key={1} setTheme={setTheme} theme={theme}/>
            <label htmlFor="switch" className="text-sm">Theme wechseln</label>
        </div>,
        <div className="flex justify-center flex-col items-center" key={2}>
            <Link href='/shop/korb'>
                <HiOutlineShoppingCart id="korb" className="text-4xl " />  
            </Link>
            <label htmlFor="korb" className="text-sm">Mein Warenkorb</label>
        </div>
    ]

    useEffect(() => {
        // Verhindert, dass der Hook auf dem Server ausgeführt wird (SSR-Probleme)
        setMounted(true);
    }, []); 

    // Verhindert das Rendern, bevor die Komponente auf dem Client gemountet wurde
    if (!mounted) return null;

    // Nur wenn mounted, dann rendern
    return (
        <header className={`flex flex-row justify-between items-center w-full z-50 transition-all duration-300 ease-in-out text-xl ${className}`}>
            {/* Logo */}
            <div className="w-2/6">
                <Logo />
            </div>

            {/* nav bar */}
            <div className="w-fit text-center text-lg hidden md:inline-block">
                <Uls array={nav} row={true} style='justify-center' listItemStyle='mx-6 py-2'/>
            </div>

            {/*######### pc #########*/}
            <div className="hidden md:flex justify-end w-2/6 ">
                {/* theme switcher */}
                <ThemeSwitch setTheme={setTheme} theme={theme}/>
                {/* warenkorb */}
                <Link href='/shop/korb' className="flex items-center">
                    <CgShoppingBag className="text-3xl" /> 
                </Link>
            </div>

            {/*######### Mobile #########*/}
            <div className="flex md:hidden justify-end w-1/6 ">
                <MobileNav array={nav} boxes={buttons} />
            </div>
        </header>
    );
}


//supcom ################### theme switcher ################### //
function ThemeSwitch({setTheme, theme, id}){
    return(
        <button id={id} onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className={`mr-4 p-1.5 text-2xl w-fit rounded-full ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}>
            {theme === "dark" ? (
                <BsBrightnessHighFill className="text-yellow-500" />
            ) : (
                <MdNightlight className="text-white " />
            )}
        </button> 
    )
}

//supcom ################### Logo ################### //
function Logo(){
    return (
        <h1 className="text-xl lg:text-2xl font-extrabold bg-BrandWhite py-[1px] px-2 rounded-3xl w-fit ">
            <LinearGradient gradient={["to right", "#5A7DEB,#1f2937"]}>
                CaseToon
            </LinearGradient>
        </h1>
    )
}