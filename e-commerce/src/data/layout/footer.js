import Link from "next/link"
import { supportLinks } from "../weitereLinks/support"
import { links as rechtliches, direktLinks } from "../weitereLinks/rechtliches"

let links = [
    [
        "Hilfe & Support", 
        ...supportLinks.map((link, index) => (
            <Link key={index} href={link.link} passHref>{link.titel}</Link>
        ))
    ],  
    [
        "Rechtliches", 
        ...rechtliches.map((link, index) => (
            <Link key={index} href={link.link} passHref>{link.titel}</Link>
        )).slice(0, 3),
        <Link key={5} href='/rechtliches'>Weitere... </Link>
    ],
    [
        'Zahlung & Versand',
        ...direktLinks.map((link, index) => (
            <Link key={index} href={link.link} passHref>{link.titel}</Link>
        ))
    ],
]

export {links}