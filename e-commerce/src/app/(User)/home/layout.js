import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import { Providers } from "@/utils/providers";

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
  title: "Airpods",                           //* titel im browser
  description: "Generated by create next app",        //* beschreibung im browser
};

export default function RootLayout({ children }) {
    return (
        <html lang="de">
            <body className={`${geistSans.variable} ${geistMono.variable} transition-all antialiased`}>
                <Providers>
                    <AnnouncementBar />
                    <main>
                        {children}
                    </main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
