import Link from "next/link";

export default function Dashhome(){
    return (
        <div className="flex justify-center items-center flex-col">
            <h1>
            hier ist noch gar nix :)
            </h1>
            <Link href='/dashboard/produkte-seite' className="text-sky-500">gehe zu produkte seite</Link>
            
        </div>
    )
}