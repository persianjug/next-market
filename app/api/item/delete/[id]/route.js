import connectDB from "@/app/utils/database";
import { ItemModel } from "@/app/utils/schemaModels";
import { NextResponse } from "next/server";

export async function DELETE(request, context) {
  // リクエストbody退避
  const reqBody = await request.json();

  try {
    // DB接続
    await connectDB();

    // アイテム取得
    const singleItem = await ItemModel.findById(context.params.id);

    // 他の人が作成したアイテムは削除NG
    if (singleItem.email !== reqBody.email) {
      return NextResponse.json({ message: "他の人が作成したアイテムです" });
    }

    // アイテム削除
    await ItemModel.deleteOne({ _id: context.params.id });

    // アイテム削除成功時のレスポンス
    return NextResponse.json({ message: "アイテム削除成功" });
  } catch {
    // アイテム削除失敗時のレスポンス
    return NextResponse.json({ message: "アイテム削除失敗" });
  }
}