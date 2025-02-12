'use client'

import { BsBrightnessHighFill } from "react-icons/bs";
import { MdNightlight } from "react-icons/md";
import { useTheme } from "next-themes";
import LogoutButton from "./dashboard/Logout";


export default function Header(){
    const { theme, setTheme } = useTheme();

    return (
        <header className={`px-GlobalXPad md:px-MdXPad lg:px-LgXPad py-4 border-b border-TextPrim fixed z-50 bg-BgPrim flex justify-between flex-row w-full`}>
            <h1 className="font-bold text-xl xl:text-3xl ">Dashboard</h1>
            <div className="flex flex-row ">
                <ThemeSwitch className='mr-6' setTheme={setTheme} theme={theme} />
                <LogoutButton />
            </div>
            
        </header>
    )
}

function ThemeSwitch({setTheme, theme, className}){
    return(
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className={`mr-4 xl:p-2 p-1.5 xl:text-2xl text-xl rounded-full bg-TextPrim ${className}`}>
            {theme === "dark" ? (
                <BsBrightnessHighFill className="text-yellow-500" />
            ) : (
                <MdNightlight className="text-white " />
            )}
        </button> 
    )
}