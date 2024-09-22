import { NextResponse } from "next/server";

// json形式でレスポンスを返す
// localhost:3000/api/hello
export async function GET() {
return NextResponse.json({message: "こんにちは、さようなら"})
}