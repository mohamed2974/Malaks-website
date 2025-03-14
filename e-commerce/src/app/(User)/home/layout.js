import "@/app/globals.css";
import AnnouncementBar from "@/components/layout/user/AnnouncementBar";
import Footer from "@/components/layout/user/Footer"
import { Providers } from "@/utils/providers";

export default function RootLayout({ children }) {
    return (
        <Providers>
            <AnnouncementBar />
            <main>
                {children}
            </main>
            <Footer />
        </Providers>
    );
}
