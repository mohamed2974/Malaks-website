import Link from "next/link";

let nav = [
    <Link href='/home' prefetch={false} key='link1' className="w-full text-center">Startseite</Link>,
    <Link href='/shop' key='link2' className="w-full text-center">Shop</Link>,
    <Link href='/kontakt' key='link3' className="w-full text-center">Kontakt</Link>,    
];

export {nav}