import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { Providers } from "@/utils/providers";
import Header from "./Header";

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
    title: "Dashboard",                                    //* titel im browser
};

export default function RootLayout({ children }) {
    return (
        <html lang="de">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Providers>
                    <Header />
                    <main className="py-20">
                    {children}
                    </main>
                </Providers>
            </body>
        </html>
    );
}

