import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

//wichtig für SEO 
export const metadata = {
    title: "CaseToon",                           //* titel im browser
    description: "Generated by create next app",        //* beschreibung im browser
};

export default function RootLayout({ children }) {
    return (
        <main >
            <SpeedInsights />
            <Analytics />
            {children}
        </main>
    );
}
