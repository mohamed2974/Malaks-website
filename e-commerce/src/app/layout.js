import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

//wichtig für SEO 
export const metadata = {
    title: "CaseToon",  //* Titel im Browser, SEO-freundlicher
    description: "CaseToon bietet eine große Auswahl an einzigartigen AirPods Cases mit kreativen und trendigen Designs. Schütze deine AirPods stilvoll und entdecke unsere exklusiven Kollektionen.",  //* Beschreibung für SEO
    keywords: "AirPods Cases, AirPods Hüllen, stylische AirPods Cases, einzigartige Designs, kreative Hüllen für AirPods, Airpods, Apple Hüllen, iphone cases, iphone hüllen, CaseToon, casetoon, case toon",  //* Keywords für SEO
    author: "CaseToon",  //* Autor der Seite
    og: {
        title: "CaseToon – Einzigartige AirPods Cases mit kreativen Designs",  //* Titel für Open Graph
        description: "Entdecke unsere exklusiven AirPods Cases mit trendigen und einzigartigen Designs. Perfekter Schutz für deine AirPods.",  //* Beschreibung für Open Graph
        image: "/katalog/7.JPG",  //* Beispielbild für Open Graph
        url: "https://www.casetoon.de",  //* URL deiner Website
    },
    twitter: {
        card: "summary_large_image",  //* Typ der Twitter Card (es kann auch "summary" sein)
        title: "CaseToon – Einzigartige AirPods Cases mit kreativen Designs",  //* Twitter-Titel
        description: "Schütze deine AirPods mit Stil – entdecke unsere kreativen und einzigartigen AirPods Cases.",  //* Twitter-Beschreibung
        image: "/katalog/7.JPG",  //* Twitter-Bild
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="de">
            <body className={`${geistSans.variable} ${geistMono.variable} transition-all antialiased`}>
                {children}
            </body>
        </html>
    );
}
