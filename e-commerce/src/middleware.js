// middleware.js
import { NextResponse } from 'next/server';
// import * as jwtDecode from 'jwt-decode';

export function middleware(request) {
    // Überprüfe, ob ein Auth-Cookie vorhanden ist (anpassen an dein Setup)
    const token = request.cookies.get('next-auth.session-token') || request.cookies.get('__Secure-next-auth.session-token');

    // Falls kein Token gefunden wurde, leite weiter
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Optional: Rolle aus dem Token überprüfen (z.B. mit jwt-decode)
    // const { role } = jwtDecode(token.value);
    // if (role !== 'admin') {
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }

    return NextResponse.next();
}

// Wende die Middleware nur auf die Dashboard-Routen an:
export const config = {
    matcher: '/dashboard/:path*',
};
