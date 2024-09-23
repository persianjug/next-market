"use client";
import { useState } from "react";

/**
 * 画像アップロード
 * @param {*} props 引き渡し領域
 */
const ImgInput = props => {
  const [imageFile, setImageFile] = useState("");

  // クリック時のイベントハンドラー
  const handleClick = async () => {
    try {
      // アップロード画像ファイル
      const data = new FormData();
      data.append("file", imageFile);

      // cloudinary.comのid
      data.append("upload_preset", "gxoaubd2");
      data.append("cloud_name", "dturjrl3v");

      // 画像アップロード
      const response = await fetch("https://api.cloudinary.com/v1_1/dturjrl3v/image/upload", { method: "POST", body: data });
      const jsonData = await response.json();
      await props.setImage(jsonData.url);

      alert(`画像アップロード成功 upload url: ${jsonData.url}`);
    } catch (error) {
      alert("画像アップロード失敗");
    }

  }

  return (
    <div className="img-input">
      <input type="file" onChange={e => setImageFile(e.target.files[0])} accept="image/png, image/jpg" />
      <button onClick={handleClick} disabled={!imageFile}>画像Upload</button>
    </div>
  );
}

export default ImgInput;
