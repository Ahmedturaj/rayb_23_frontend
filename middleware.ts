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

    // Only these routes are protected:
    const isProtectedRoute =
        pathname.startsWith("/admin-dashboard") ||
        pathname.startsWith("/business-dashboard") ||
        pathname.startsWith("/customer-dashboard");

    // 🔒 If accessing a protected route without a token → redirect to login
    if (!token && isProtectedRoute && !isStatic) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // ✅ Role-based access for protected routes
    if (pathname.startsWith("/admin-dashboard")) {
        if (!token || token.userType !== "admin") {
            return NextResponse.redirect(new URL("/403", request.url));
        }
    }

    if (pathname.startsWith("/business-dashboard")) {
        if (!token || token.userType !== "businessMan") {
            return NextResponse.redirect(new URL("/403", request.url));
        }
    }

    if (pathname.startsWith("/customer-dashboard")) {
        if (!token || token.userType !== "businessMan") {
            return NextResponse.redirect(new URL("/business-dashboard", request.url));
        }
    }

    console.log(token)

    // ✅ If logged in & visiting auth routes → redirect to dashboard
    if (
        token &&
        ["/auth/login", "/auth/register"].includes(pathname)
    ) {
        if (token.userType === "admin") {
            return NextResponse.redirect(new URL("/admin-dashboard", request.url));
        }
        if (token.userType === "businessMan") {
            return NextResponse.redirect(new URL("/business-dashboard", request.url));
        }
        if (token.userType === "user") {
            return NextResponse.redirect(new URL("/customer-dashboard", request.url));
        }
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
