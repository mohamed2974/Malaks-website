"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false
    });

    if (result.error) {
      setError("Falsche Anmeldedaten!");
    } else {
      window.location.href = "/dashboard/produkte-seite"; // Weiterleitung nach erfolgreichem Login
    }
  };

  return (
    <div className="h-[50vh] flex justify-center items-center">
      <div className="rounded-xl border border-TextSec flex flex-col text-center py-5 px-10 bg-BgSec">
        <h1 className="mb-8 text-xl">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col justify-center text-start">
          <label className="mb-2" htmlFor="username">Benutzername</label>
          <input id="username" className="bg-BgPrim outline-none border border-TextSec w-full p-2.5 rounded-md mb-4" name="username" required />
          <label className="mb-2" htmlFor="password">Passwort</label>
          <input id="password" className="bg-BgPrim outline-none border border-TextSec w-full p-2.5 rounded-md mb-4" name="password" type="password" required />
          <button className="w-full rounded-md bg-AppleBlue hover:bg-blue-700 active:bg-blue-900 py-2 text-BrandWhite " type="submit">Login</button>
        </form>
        {error && <p className="text-AppleRed mt-5 py-1.5 rounded-md dark:bg-BrandWhite">{error}</p>}
      </div>
    </div>
  );
}
