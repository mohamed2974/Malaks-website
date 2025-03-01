import Link from "next/link";
import StandardLinkButton from "@/utils/buttons/StandardLinkButton";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-ErrorRed">404 - Seite nicht gefunden</h1>
            <p className="text-TextSec mt-2">Die gesuchte Seite existiert nicht.</p>
            <StandardLinkButton link='/' text='Zurück zur Startseite' />
        </div>
    );
}
