"use client"

import useAuth from "@/app/utils/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateItem = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();
  const loginUserEmail = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/create`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          title: title,
          price: price,
          image: image,
          description: description,
          email: loginUserEmail
        })
      });
      const jsonData = await response.json();
      alert(jsonData.message);
      router.push("/");
      router.prefetch();
    } catch (error) {
      alert("アイテム作成失敗");
    }
  }

  if (loginUserEmail) {
    return (
      <div className="page-title">
        <h1>アイテム作成</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" placeholder="アイテム名" required
            onChange={e => setTitle(e.target.value)} />
          <input type="text" name="price" placeholder="価格" required
            onChange={e => setPrice(e.target.value)} />
          <input type="text" name="image" placeholder="画像" required
            onChange={e => setImage(e.target.value)} />
          <textarea name="description" placeholder="商品説明" required
            onChange={e => setDescription(e.target.value)}></textarea>
          <button>作成</button>
        </form>
      </div>
    );

  }
};

export default CreateItem;
