import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function PUT(request, context) {
  // const id = await context.params.id;
  const reqBody = await request.json();
  try {
    // DB接続
    await connectDB();

    // アイテム取得
    const singleItem = await ItemModel.findById(context.params.id);

    // 他の人が作成したアイテムは編集NG
    if (singleItem.email !== reqBody.email) {
      return NextResponse.json({ message: "他の人が作成したアイテムです" });
    }

    アイテム編集
    await ItemModel.updateOne({ _id: context.params.id }, reqBody);

    // アイテム編集成功時のレスポンス
    return NextResponse.json({ message: "アイテム編集成功" });
  } catch {
    // アイテム編集失敗時のレスポンス
    return NextResponse.json({ message: "アイテム編集失敗", });
  }
}