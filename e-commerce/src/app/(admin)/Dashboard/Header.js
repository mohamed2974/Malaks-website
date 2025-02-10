'use client'

import { BsBrightnessHighFill } from "react-icons/bs";
import { MdNightlight } from "react-icons/md";
import { useTheme } from "next-themes";


export default function Header(){
    const { theme, setTheme } = useTheme();

    return (
        <header className="px-GlobalXPad md:px-MdXPad lg:px-LgXPad py-5 border-b border-TextPrim fixed z-50 w-full bg-BgPrim flex justify-between flex-row">
            <h1 className="font-bold text-2xl">Dashboard</h1>
            <ThemeSwitch setTheme={setTheme} theme={theme} />
        </header>
    )
}

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