import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
  console.log("middlewareee");
  const session = request.cookies.get("session");

  //Return to /login if don't have a session
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //Call the authentication endpoint
  fetch("http://localhost:3000/api/login", {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  }).then((responseAPI: any) => {
    //Return to /login if token is not authorized
    if (responseAPI.status !== 200) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  });



  return NextResponse.next();
}

//Add your protected routes
//matcher: ["/:path*"],faturamento
export const config = {
  matcher: ["/dashboard/:path*"],
};
