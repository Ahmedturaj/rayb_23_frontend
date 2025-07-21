import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: process.env.NODE_ENV === "production",
    });

    const isStatic = pathname.startsWith("/_next") || pathname.includes(".");

    // Protected routes
    const isProtectedRoute =
        pathname.startsWith("/admin-dashboard") ||
        pathname.startsWith("/business-dashboard") ||
        pathname.startsWith("/customer-dashboard");

    // 🔒 Not authenticated → redirect to login
    if (!token && isProtectedRoute && !isStatic) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // ✅ If authenticated, check role and avoid infinite redirects
    if (token && isProtectedRoute) {
        const userType = token.userType as string;

        if (userType === "admin" && !pathname.startsWith("/admin-dashboard")) {
            return NextResponse.redirect(new URL("/admin-dashboard", request.url));
        }

        if (userType === "businessMan" && !pathname.startsWith("/business-dashboard")) {
            return NextResponse.redirect(new URL("/business-dashboard", request.url));
        }

        if (userType === "user" && !pathname.startsWith("/customer-dashboard")) {
            return NextResponse.redirect(new URL("/customer-dashboard", request.url));
        }
    }

    // ✅ If authenticated & visiting auth routes → redirect to role dashboard
    if (token && ["/auth/login", "/auth/register"].includes(pathname)) {
        const userType = token.userType as string;

        if (userType === "admin") {
            return NextResponse.redirect(new URL("/admin-dashboard", request.url));
        }
        if (userType === "businessMan") {
            return NextResponse.redirect(new URL("/business-dashboard", request.url));
        }
        if (userType === "user") {
            return NextResponse.redirect(new URL("/customer-dashboard", request.url));
        }
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
