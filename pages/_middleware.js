import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";


export async function middleware(req){
    const token = await getToken({req,secret:process.env.JWT_SECRET});
    const {pathname} = req.nextUrl;
    if(token || pathname.includes("/api/auth")){
        return NextResponse.next();
    }
    if(!token && pathname!=="/login"){
        return NextResponse.redirect("https://spotify101.vercel.app//login");
    }
}