import "@/app/globals.css";
import AnnouncementBar from "@/components/layout/user/AnnouncementBar";
import Footer from "@/components/layout/user/Footer";
import { Providers } from "@/utils/providers";
import Header from "@/components/layout/user/Header";

export default function RootLayout({ children }) {
    return (
        <Providers>
            <AnnouncementBar />
            <Header className='px-GlobalXPad md:px-MdXPad lg:px-LgXPad bg-BgSec sticky top-0 py-2'/>
            <main>
                {children}
            </main>
            <Footer />
        </Providers>
    );
}
