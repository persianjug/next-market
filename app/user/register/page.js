"use client";
import { useState } from "react";

const Resister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        })
      });
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch (error) {
      alert("ユーザー登録失敗");
    }
  }


  return (
    <div>
      <h1 className="page-title">ユーザー登録</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="名前" required
          onChange={e => setName(e.target.value)} />
        <input type="text" name="email" placeholder="メールアドレス" required
          onChange={e => setEmail(e.target.value)} />
        <input type="text" name="password" placeholder="パスワード" required
          onChange={e => setPassword(e.target.value)} />
        <button>登録</button>
      </form>
    </div>
  );
};

export default Resister;
