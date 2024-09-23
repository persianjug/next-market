import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";

export async function POST(request) {
  // リクエストbody退避
  const reqBody = await request.json();

  try {
    // DB接続
    await connectDB();

    // ユーザー検索(emailで検索)
    const saveUserData = await UserModel.findOne({ email: reqBody.email });

    // ユーザーデータが存在しない場合
    if (!saveUserData) {
      return NextResponse.json({ message: "ログイン失敗：ユーザー登録をしてください" });
    }

    // パスワードが一致しない場合
    if (reqBody.password !== saveUserData.password) {
      return NextResponse.json({ message: "ログイン失敗：パスワードが間違っています" });
    }

    // ユーザーデータが存在する場合
    // シークレットキー
    const secretKey = new TextEncoder().encode("next-market-app-book");

    // ペイロード(トークンに含ませるデータ)
    const payload = {
      email: reqBody.email
    }

    // トークン発行(有効期限は1日)
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1d")
      .sign(secretKey);

    // ログイン成功時のレスポンス
    return NextResponse.json({ message: "ログイン成功", token: token });
  } catch {
    // ログイン失敗時のレスポンス
    return NextResponse.json({ message: "ログイン失敗" });
  }
}
