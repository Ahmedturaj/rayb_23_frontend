import type { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            userType: string;
            accessToken: string;
        } & DefaultSession["user"];
    }

    interface User {
        id: string;
        name: string;
        email: string;
        userType: string;
        accessToken: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        userType: string;
        accessToken: string;
    }
}