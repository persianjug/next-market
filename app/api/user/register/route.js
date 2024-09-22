import connectDB from "@/app/utils/database";
import { UserModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function POST(request) {
  // リクエストbody退避
  const reqBody = await request.json();

  try {
    // MongoDB接続
    await connectDB();
    // データ追加
    await UserModel.create(reqBody);
    // レスポンスを返却
    return NextResponse.json({message: "ユーザー登録成功"});
  // DB接続失敗
  } catch {
    // レスポンスを返却
    return NextResponse.json({message: "ユーザー登録失敗" });
  }
}
