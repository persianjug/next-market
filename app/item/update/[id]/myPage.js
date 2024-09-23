"use client"

import useAuth from "@/app/utils/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UpdateItem = context => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const loginUserEmail = useAuth();


  useEffect(() => {
    const getSingleItem = async id => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/readsingle/${id}`, { cache: "no-store" });
      const jsonData = await response.json();
      const singleItem = jsonData.singleItem;
      // console.log(`title: ${singleItem.title}`);
      setTitle(singleItem.title);
      setPrice(singleItem.price);
      setImage(singleItem.image);
      setDescription(singleItem.description);
      setEmail(singleItem.email);
      setLoading(true);
    }
    getSingleItem(context.params.id);
  }, [context]);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/update/${context.params.id}`, {
        method: "PUT",
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
      alert("アイテム編集失敗");
    }
  }

  if (!loading) {
    return <h1>ローディング中...</h1>
  }

  if (loginUserEmail !== email) {
    return <h1>権限がありません</h1>
  }

  return (
    <div>
      <h1 className="page-title">アイテム編集</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="アイテム名" required
          onChange={e => setTitle(e.target.value)} value={title} />
        <input type="text" name="price" placeholder="価格" required
          onChange={e => setPrice(e.target.value)} value={price} />
        <input type="text" name="image" placeholder="画像" required
          onChange={e => setImage(e.target.value)} value={image} />
        <textarea name="description" placeholder="商品説明" required
          onChange={e => setDescription(e.target.value)} value={description} ></textarea>
        <button>編集</button>
      </form>
    </div>
  );
};

export default UpdateItem;
