"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton({className}) {
    return <button className={`text-BgPrim py-0.5 xl:py-1 px-2 xl:px-3.5 border rounded-3xl bg-TextPrim ${className}`} onClick={() => signOut()}>Logout</button>;
}
