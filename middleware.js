import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

/**
 * トークンチェック
 * @param {*} request リクエスト
 * @returns レスポンス
 */
export async function middleware(request) {
  // トークン取得
  const token = await request.headers.get("Authorization")?.split(" ")[1];
  // const token = "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImR1bW15QGdtYWlsLmNvbSIsImV4cCI6MTcyNzA0NDE0M30.A_c0Fnv9RHv_BxsQVg51E6_Wi6apeyOQLz5Rzzgj0No";
  console.log(`token: ${token}`);

  // トークンがない場合
  if (!token) {
    return NextResponse.json({ message: "トークンがありません" });
  }

  try {
    // シークレットキー
    const secretKey = new TextEncoder().encode("next-market-app-book");

    // トークン検証
    const decodedJwt = await jwtVerify(token, secretKey);

    return NextResponse.next();

  // トークンの検証が正しくない場合
  } catch {
    return NextResponse.json({ message: "トークンが正しくないので、ログインしてください" });
  }
};

/**
 * middlewareを起動させるパスを指定
 */
export const config = {
  matcher: ["/api/item/create", "/api/item/update/:path*", "/api/item/delete/:path*"],
};
