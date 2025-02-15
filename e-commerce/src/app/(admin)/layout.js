
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { Providers } from "@/utils/providers";
import Header from "@/components/layout/admin/AdminHeader";
import Aside from "../../components/layout/admin/Aside";
import { TbFaceIdError } from "react-icons/tb";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Dashboard - Adminbereich",
    robots: {
        index: false,  // Verhindert, dass die Seite indexiert wird
        follow: false  // Verhindert, dass den Links auf der Seite gefolgt wird
    }
};

export default function RootLayout({ children }) {
    return (
        <html lang="de">
            <body className={`${geistSans.variable} ${geistMono.variable} transition-all antialiased`}>
                <Providers>
                    <Header />
                    <div className=" hidden xl:block">
                        <main className="pt-40 relative">
                            <Aside />
                        {children}
                        </main>
                    </div>
                    <div className="flex xl:hidden h-screen items-center justify-center flex-col px-10 text-center">
                        <TbFaceIdError className="text-AppleRed text-7xl" />
                        <h1 className="text-xl my-6">Bitte nutze das Dashboard ausschließlich auf einem PC oder einem größeren Bildschirm!</h1>
                        <p className="text-TextSec text-sm">Aufgrund der Darstellung auf kleinen Bildschirmen können Fehler in der Datenbank auftreten, da die Benutzeroberfläche für mobile Geräte nicht optimiert ist. Um eine reibungslose Nutzung und Datenintegrität zu gewährleisten, empfehlen wir, das Dashboard auf einem Desktop oder Laptop zu verwenden.</p>
                    </div>
                </Providers>
            </body>
        </html>
    );
}

