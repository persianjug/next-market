import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // DB接続
    await connectDB();

    // アイテム取得
    const allItems = await ItemModel.find();

    // アイテム取得成功時のレスポンス
    return NextResponse.json({
      message: "アイテム読み取り成功（オール）",
      allItems: allItems,
    });
  } catch {
    // アイテム取得失敗時のレスポンス
    return NextResponse.json({ message: "アイテム読み取り失敗（オール）" });
  }
}

export const revalidate = 0;