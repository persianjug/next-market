import { jwtVerify } from "jose";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      // トークン取得
      const token = localStorage.getItem("token");

      // トークンが無い場合は、ログイン画面へ
      if (!token) router.push("/user/login");

      try {
        const secretKey = new TextEncoder().encode("next-market-app-book");
        const decodedJwt = await jwtVerify(token, secretKey);
        setLoginUserEmail(decodedJwt.payload.email);
      } catch (error) {
        router.push("/user/login");
      }
    }
    checkToken();
  }, [router]);

  return loginUserEmail;

}

export default useAuth;
