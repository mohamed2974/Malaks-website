import Link from "next/link";

let nav = [
    <Link href='/home' key='link1' className="w-full text-center">Startseite</Link>,
    <Link href='/shop' key='link2' className="w-full text-center">Shop</Link>,
    <Link href='/kontakt' key='link3' className="w-full text-center">Kontakt</Link>,
    <Link href='/' key='link4' className="w-full text-center">Link 4</Link>,
];

export {nav}