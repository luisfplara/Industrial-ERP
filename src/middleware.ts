
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = request.cookies.get("session");

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const responseAPI = await fetch(process.env.BASE_URL+ "/api/login", {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });
 console.log('responseAPIresponseAPI', responseAPI.body)
  if (responseAPI.status !== 200) {
    return NextResponse.redirect(new URL("/login", request.url));
  }else{
    return NextResponse.next();
  }


}

export const config = {
  matcher: ["/dashboard/:path*"],
};
