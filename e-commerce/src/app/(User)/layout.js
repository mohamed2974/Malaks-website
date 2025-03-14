import "../globals.css";
import 'react-tooltip/dist/react-tooltip.css'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

export default function RootLayout({ children }) {
    return (
        <main >
            <SpeedInsights />
            <Analytics />
            {children}
        </main>
    );
}
