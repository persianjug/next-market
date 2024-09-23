import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  try {
    // DB接続
    await connectDB();

    // アイテム取得
    const singleItem = await ItemModel.findById(context.params.id);

    // アイテム取得成功時のレスポンス
    return NextResponse.json({
      message: "アイテム読み取り成功（シングル）",
      singleItem: singleItem,
    });
  } catch {
    // アイテム取得失敗時のレスポンス
    return NextResponse.json({ message: "アイテム読み取り失敗（シングル）" });
  }
}