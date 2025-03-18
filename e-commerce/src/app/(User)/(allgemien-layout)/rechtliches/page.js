import { links } from "@/data/weitereLinks/rechtliches"
import Link from "next/link"

export default function Rechtliches() {
    return (
        <section>
            <div className="">
                <h1 className="text-lg font-bold underline">Rechtliches</h1>
                <ul className="space-y-2">
                    {links.map((link, index) => (
                        <li key={index}>
                            <Link className="hover:underline text-TextSec" passHref href={link.link}>{link.titel}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}