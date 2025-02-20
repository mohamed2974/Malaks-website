import React from "react";
import Marquee from "react-fast-marquee";
import { content } from "@/data/componente/announcementbar";

export default function AnnouncementBar(){
    return (
        <Marquee speed={80} className="bg-gradient-to-r from-purple-900 via-indigo-500 to-purple-900 text-white text-sm md:text-base font-semibold py-2 md:py-2.5 overflow-hidden">
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
