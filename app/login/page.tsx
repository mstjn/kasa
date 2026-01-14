"use client";

import { useAuth } from "@/lib/context/authContext";
import { User } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface LoginResponse {
  token: string;
  user: User
}

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const handleLogin = async (e : FormEvent) => {
    e.preventDefault()
   const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!res.ok) {
      setError(true)
    }else {
       const data: LoginResponse = await res.json();
    
    login(data.token, data.user.id.toString());
    router.replace("/");

    }
  };

  return (
    <section className="flex flex-1 items-center justify-center px-5 py-10 lg:px-0 lg:py-10">
      <div className="p-2 lg:py-6 xl:py-15 lg:px-20 xl:px-35 lg:w-2/4 rounded-2xl border border-[#F5F5F5] bg-white items-center flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold text-3xl text-(--main-red) text-center">Heureux de vous revoir</h1>
          <p className="text-center">Connectez-vous pour retrouver vos réservations, vos annonces et tout ce qui rend vos séjours uniques.</p>
        </div>
        <form action="" className="flex flex-col gap-5 w-full items-center" onSubmit={handleLogin}>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="mail" className="font-medium">
              Adresse email
            </label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className={`px-2 outline-none h-10 border rounded ${error ? "border-red-400" : "border-[#F5F5F5]"}`} />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="password" className="font-medium">
              Mot de passe
            </label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className={`px-2 outline-none h-10 border rounded ${error ? "border-red-400" : "border-[#F5F5F5]"}`} />
          </div>
         {error &&  <p className="text-red-400">Les identifiants sont incorrects</p>}

        <button className="text-white bg-(--main-red) rounded-xl w-60 h-10 mt-10">Se connecter</button>
        </form>
        <p className="text-(--main-red) text-xs md:text-sm">Mot de passe oublié</p>
        <p className="text-(--main-red) text-xs md:text-sm">Pas encore de compte ? <Link href="/register">Inscrivez-vous</Link></p>
      </div>
    </section>
  );
}
