"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react"; // Importieren des SessionProviders


export function Providers({ children }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); // Setzt `mounted` auf true, wenn die Komponente auf dem Client geladen ist
    }, []);

    if (!mounted) {
        return null; // Verhindert das Rendern der `ThemeProvider`-Komponente auf dem Server
    }

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SessionProvider>
                {children}
            </SessionProvider>
        </ThemeProvider>
    );
}
