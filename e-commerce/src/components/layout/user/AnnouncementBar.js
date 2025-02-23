import React from "react";
import Marquee from "react-fast-marquee";
import { content } from "@/data/componente/announcementbar";

export default function AnnouncementBar(){
    return (
        <Marquee speed={80} className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 text-white text-sm md:text-base font-semibold py-2 md:py-2.5 overflow-hidden">
            <div className="whitespace-nowrap flex ">
                {content.map((text, index) => (
                    <span key={index} className="whitespace-nowrap flex">
                    <div className="mx-10">{text}</div>
                    <div className="mx-10">•</div>
                    </span>
                ))} 
            </div>
        </Marquee>
    );
};


/**
 * bg-gradient-to-r from-purple-900 via-fuchsia-700 to-purple-900
 * from-yellow-600 via-orange-500 to-yellow-600
 * bg-gradient-to-r from-red-900 via-rose-700 to-red-900
 */