import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl;

    if (pathname.startsWith("/search") && !searchParams.has("keyword")) {
        return NextResponse.redirect(`${request.nextUrl.origin}/`);
    }

    if (pathname === "/kitab" || pathname === "/tema") {
        return NextResponse.redirect(`${request.nextUrl.origin}/`);
    }

    if (pathname.startsWith("/kitab") && pathname.split("/").length === 3) {
        const kitabId = pathname.split("/")[2];

        return NextResponse.redirect(`${request.nextUrl.origin}/kitab/${kitabId}/1`);
    }

    if (pathname.startsWith("/tema") && pathname.split("/").length === 3) {
        const temaId = pathname.split("/")[2];

        return NextResponse.redirect(`${request.nextUrl.origin}/tema/${temaId}/1`);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/search", "/kitab/:kitabId*", "/kitab", "/tema", "/tema/:temaId*"],
};
