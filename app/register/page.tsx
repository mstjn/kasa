"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: FormEvent) => {
  e.preventDefault();
  setError(null);

  if (!acceptedTerms) {
    setError("Vous devez accepter les conditions d’utilisation");
    return;
  }

  try {
    const name = `${lastName} ${firstName}`;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );

    if (res.status === 409) {
      setError("Un compte existe déjà avec cette adresse mail");
      return;
    }

    if (!res.ok) {
      setError("Erreur lors de l’inscription");
      return;
    }

    router.replace("/login");
  } catch {
    setError("Impossible de créer le compte");
  }
};


  return (
    <section className="flex flex-1 items-center justify-center px-5 py-6 lg:px-0 lg:py-6">
      <div className="p-2 lg:py-6 xl:py-8 lg:px-15 xl:px-35 lg:w-2/4 rounded-2xl border border-[#F5F5F5] bg-white items-center flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <h1 className="font-bold text-3xl text-(--main-red) text-center">Rejoignez la communauté kasa</h1>
          <p className="text-center">
            Créez votre compte et commencez à voyager autrement : réservez des logements uniques, découvrez de nouvelles destinations et partagez vos
            propres lieux avec d’autres voyageurs.
          </p>
        </div>

        <form className="flex flex-col gap-3 w-full items-center" onSubmit={handleRegister}>
          <div className="flex flex-col gap-1 w-full">
            <label className="font-medium">Prénom</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              required
              className="px-2 outline-none h-10 border border-[#F5F5F5] rounded"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="font-medium">Nom</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              required
              className="px-2 outline-none h-10 border border-[#F5F5F5] rounded"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="font-medium">Adresse email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="px-2 outline-none h-10 border border-[#F5F5F5] rounded"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="font-medium">Mot de passe</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="px-2 outline-none h-10 border border-[#F5F5F5] rounded"
            />
          </div>

          <div className="flex items-center gap-2 w-full">
            <input type="checkbox" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} className="accent-(--main-red)" />
            <label className="text-sm text-[#565656]">J’accepte les conditions générales d’utilisation</label>
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button type="submit" className="text-white bg-(--main-red) rounded-xl w-60 h-10 mt-5">
            S’inscrire
          </button>
        </form>

        <p onClick={() => router.push("/login")} className="text-(--main-red) text-xs md:text-sm cursor-pointer">
          Déjà membre ? Se connecter
        </p>
      </div>
    </section>
  );
}
