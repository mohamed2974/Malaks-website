'use client'

import Link from "next/link";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { LuPackage } from "react-icons/lu";
import { useState } from "react";

export default function Aside(){
    const [ open , setOpen] = useState(false)

    function handelOpen(){
        setOpen(!open)
    }

    return (
        <aside className={`bg-BgPrim border-r-[1px] border-TextPrim fixed top-[70px] w-2/6 z-40 transition-all duration-500 -left-1/3 ${open && 'left-0'}`}>
            <IoArrowForwardCircleOutline className={`absolute text-4xl -right-12 top-1/2 transition-all duration-500 ${open && 'rotate-180'}`} onClick={handelOpen}/>
            <div className="flex flex-col px-5 py-10 text-xl divide-y">
                <Link className="w-full py-5 px-5 flex flex-row items-center" href='/dashboard/produkte-seite' onClick={handelOpen}>
                    <LuPackage className="text-4xl mr-5" />
                    <span>Produkte</span>
                </Link>
                <Link className="w-full py-5 px-5 flex flex-row items-center" href='/dashboard/produkte-seite' onClick={handelOpen}>
                    <LuPackage className="text-4xl mr-5" />
                    <span>Produkte</span>
                </Link>
                <Link className="w-full py-5 px-5 flex flex-row items-center" href='/dashboard/produkte-seite' onClick={handelOpen}>
                    <LuPackage className="text-4xl mr-5" />
                    <span>Produkte</span>
                </Link>
            </div>
        </aside>
    )
}