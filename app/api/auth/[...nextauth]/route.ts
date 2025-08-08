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
                token: { label: "Token", type: "text" },
            },
            authorize: async (credentials) => {
                try {
                    // ✅ Token-only login (e.g., after OTP verification)
                    if (credentials?.token) {
                        // You’ll need to decode the token or make an API call to get the user
                        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login-with-token`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                token: credentials.token,
                            }),
                        });

                        const data = await res.json();

                        if (!res.ok || !data.success || !data.data) {
                            throw new Error("Invalid token");
                        }

                        const user = data.data;

                        return {
                            id: user.userId,
                            name: user.name,
                            email: user.email,
                            userType: user.userType,
                            accessToken: user.accessToken,
                        };
                    }

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

                    if (!result.data?.user) {
                        throw new Error(`VERIFY_EMAIL:${result.data?.accessToken}`);
                    }

                    return {
                        id: result.data.user._id,
                        name: result.data.user.name,
                        email: result.data.user.email,
                        userType: result.data.user.userType,
                        accessToken: result.data.accessToken,
                    };

                } catch (error) {
                    console.error("Authorize error:", error);
                    if (error instanceof Error) {
                        throw new Error(error.message);
                    }
                    throw new Error("An error occurred during login");
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