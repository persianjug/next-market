import mongoose from "mongoose";

const Schema = mongoose.Schema;

// アイテムテーブル定義
const ItemSchema = new Schema({
  title: String,
  image: String,
  price: String,
  description: String,
  email: String,
});

// ユーザー情報テーブル
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const ItemModel = mongoose.models.Item || mongoose.model("Item", ItemSchema);
export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
