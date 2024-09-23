import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function POST(request) {
  // リクエストbody退避
  const reqBody = await request.json();

  try {
    // DB接続
    await connectDB();

    // アイテム追加
    await ItemModel.create(reqBody);

    // アイテム作成成功時のレスポンス
    return NextResponse.json({ message: "アイテム作成成功" });
  } catch {
    // アイテム作成失敗時のレスポンス
    return NextResponse.json({ message: "アイテム作成失敗" });
  }
}
