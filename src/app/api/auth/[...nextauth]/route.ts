import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                await dbConnect();

                const user = await User.findOne({ email: credentials?.email }).select("+password");

                if (!user) throw new Error("Email no registrado");

                const passwordMatch = await bcrypt.compare(credentials!.password, user.password);

                if (!passwordMatch) throw new Error("Contraseña incorrecta");

                return user;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const u = user as unknown as { role?: string; id?: string; _id?: { toString(): string } };
                token.role = u.role;
                token.id = u.id ?? (u._id ? u._id.toString() : undefined);
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                const su = session.user as unknown as { role?: string; id?: string };
                su.role = token.role as string | undefined;
                su.id = token.id as string | undefined;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
