import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

// 処理完了を通知
export async function middleware(request) {
  console.log("ミドルウェア");

  // トークン取得
  // const token = await request.headers.get("Authorization")?.split(" ")[1];
  const token = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImR1bW15QGdtYWlsLmNvbSIsImV4cCI6MTcyNzA0NDE0M30.A_c0Fnv9RHv_BxsQVg51E6_Wi6apeyOQLz5Rzzgj0No";
  // console.log(`token: ${token}`);

  // トークンが無ければワーニングを出す
  if (!token) {
    return NextResponse.json({ message: "トークンがありません" });
  }

  try {
    // シークレットキー
    const secretKey = new TextEncoder().encode("next-market-app-book");
    // console.log(`secretKey: ${secretKey}`);

    // トークンを検証
    const decodedJwt = await jwtVerify(token, secretKey);
    // console.log(`decodedJwt: ${decodedJwt}`);

    // 正常終了通知
    return NextResponse.next();
  } catch {
    // 異常終了通知
    return NextResponse.json({ message: "トークンが正しくないので、ログインしてください" });
  }
};

// middlewareを起動させるパスを指定
export const nextConfig = {
  matcher: ["/api/item/create", "/api/item/update/:path*", "/api/item/delete/:path*"],
};
