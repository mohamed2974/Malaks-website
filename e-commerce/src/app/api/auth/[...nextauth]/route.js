import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";


const adminPassword = process.env.NEXTAUTH_ADMIN_PASSWORD;
const hashedPassword = await bcrypt.hash(adminPassword, 10); // 10 ist der "salt rounds"

export const authOptions = {
    debug: true, // Debugging aktivieren
    providers: [
        CredentialsProvider({
            name: "Admin Login",
            credentials: {
                username: { label: "username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // HARDCODED ADMIN (Für echte Apps nutze eine DB)
                const adminUser = {
                    id: "1",
                    username: process.env.ADMIN_USERNAME,
                    password: hashedPassword, // In einer echten App: Passwörter hashen!
                    role: "admin",
                };

                if (
                credentials.username === adminUser.username &&
                await bcrypt.compare(credentials.password, adminUser.password) // Passwortvergleich mit bcrypt
            ) {
                return adminUser; // Erfolg → User zurückgeben
                }

                return null; // Fehler → Auth fehlgeschlagen
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            session.user.role = token.role; // Rolle im Session-Objekt speichern
            return session;
        },
        async jwt({ token, user }) {
            if (user) token.role = user.role;
            return token;
        },
    },
    pages: {
        signIn: "/login", // Eigene Login-Seite
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
