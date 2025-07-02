import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/app/actions/auth";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error("Email and password are required");
                    }

                    const result = await loginUser({
                        email: credentials.email,
                        password: credentials.password,
                    });

                    if (!result.success) {
                        throw new Error(result.message || "Login failed");
                    }

                    if (!result.data?.user?._id || !result.data?.accessToken) {
                        throw new Error("Invalid user data received");
                    }

                    return {
                        id: result.data.user._id,
                        name: result.data.user.name,
                        email: result.data.user.email,
                        userType: result.data.user.userType,
                        accessToken: result.data.accessToken,
                    };
                } catch (error: any) {
                    console.error("Authorization error:", error);
                    throw new Error(error.message || "Authentication failed");
                }
            }
        })
    ],
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/logout",
        error: "/auth/error",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.userType = user.userType;
                token.accessToken = user.accessToken;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                ...session.user,
                id: token.id as string,
                userType: token.userType as string,
                accessToken: token.accessToken as string,
            };
            return session;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, // 24 hours
    },
    secret: process.env.NEXTAUTH_SECRET,
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    },
});

export { handler as GET, handler as POST };