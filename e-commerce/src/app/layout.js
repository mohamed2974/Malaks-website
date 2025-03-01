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
    title: "CaseToon",                           //* titel im browser
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
