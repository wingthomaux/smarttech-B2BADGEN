import {NextRequest,NextResponse} from "next/server";
export function proxy(request:NextRequest){
  const headers=new Headers(request.headers);
  headers.set("x-smarttech-language",/^\/en(?:\/|$)/.test(request.nextUrl.pathname)?"en":"de");
  return NextResponse.next({request:{headers}});
}
export const config={matcher:["/((?!_vinext|_next|assets|favicon).*)"]};
