import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function POST(request) {
  // リクエストbody退避
  const reqBody = await request.json();

  try {
    // DB接続
    await connectDB();

    // ユーザ情報作成
    await UserModel.create(reqBody);

    // ユーザー登録成功時のレスポンス
    return NextResponse.json({message: "ユーザー登録成功"});
  } catch {
    // ユーザー登録失敗時のレスポンス
    return NextResponse.json({message: "ユーザー登録失敗" });
  }
}
