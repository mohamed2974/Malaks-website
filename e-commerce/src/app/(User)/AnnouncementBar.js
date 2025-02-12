import React from "react";
import Marquee from "react-fast-marquee";

export default function AnnouncementBar(){
    return (
        <Marquee speed={70} className="bg-gradient-to-r from-purple-900 via-indigo-500 to-purple-900 text-white text-sm md:text-base font-semibold py-5 overflow-hidden">
            <div className="whitespace-nowrap flex ">
                <div className="mx-10">🔥 20% Rabatt auf alles! Nur bis Sonntag!</div>
                <div className="mx-10">•</div>
                <div className="mx-10">🚀 Kostenloser Versand ab 50€!</div>
                <div className="mx-10">•</div>
                <div className="mx-10">🎉 Neue Kollektion jetzt verfügbar!</div>
                <div className="mx-10">•</div>
            </div>
        </Marquee>
    );
};

