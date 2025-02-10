'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { Providers } from "@/utils/providers";
import { SessionProvider } from "next-auth/react"; // Importieren des SessionProviders
import Header from "./dashboard/Header";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({ children }) {
    return (
        <html lang="de">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Providers>
                    <SessionProvider>
                        <Header />
                        <main>
                        {children}
                        </main>
                    </SessionProvider>
                </Providers>
            </body>
        </html>
    );
}

