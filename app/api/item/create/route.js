import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function POST(request) {
  // リクエストbody退避
  const reqBody = await request.json();
  console.log(reqBody);

  try {
    // MongoDB接続
    await connectDB();
    // データ追加
    // await ItemModel.create();
    await ItemModel.create(reqBody);
    // レスポンスを返却
    return NextResponse.json(
      { message: "アイテム作成成功" }
    );
  } catch {
    // レスポンスを返却
    return NextResponse.json(
      { message: "アイテム作成失敗" }
    );
  }
}
