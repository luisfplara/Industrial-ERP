
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = request.cookies.get("session");

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const responseAPI = await fetch("http://localhost:3000/api/login", {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });

  if (responseAPI.status !== 200) {
    return NextResponse.redirect(new URL("/login", request.url));
  }else{
    return NextResponse.next();
  }


}

export const config = {
  matcher: ["/dashboard/:path*"],
};
