"use client"
import { useAuth } from "@/lib/context/authContext";
import Image from "next/image";
/**
 * Page "À propos" de l'application.
 *
 * Présente la mission et les valeurs de la plateforme Kasa.
 * Permet également à l'utilisateur authentifié de se déconnecter.
 *
 * @component
 */
export default function Page() {
  const { logout } = useAuth()
  return (
    <section className="flex-1 items-center flex flex-col mt-10 mb-10 gap-10 px-5 xl:px-0">
      <header className="flex flex-col items-center gap-5 ">
        <h1 className="text-(--main-red) text-4xl font-bold">À propos</h1>
        <p className="text-center">Chez Kasa, nous croyons que chaque voyage mérite un lieu unique où se sentir bien.</p>
        <p className="text-center">
          Depuis notre création, nous mettons en relation des voyageurs en quête d’authenticité avec des hôtes <br /> passionnés qui aiment partager
          leur région et leurs bonnes adresses.
        </p>
      </header>

      <section className="relative w-full max-w-7xl sm:aspect-16/6 aspect-16/20 overflow-hidden rounded-2xl">
        <Image src="/about-main.png" fill className="object-cover" alt="Maison dans la fôret" priority />
      </section>

      <section className="max-w-7xl flex flex-row-reverse gap-5 items-center">
        <div className="relative w-123.5 h-114.5 shrink-0 hidden lg:block">
          <Image src="/about-second.png" alt="Chalet dans la nature" fill priority className="object-cover rounded-xl" />
        </div>

        <div className="flex flex-col gap-5 lg:items-start items-center">
          <h2 className="font-bold text-(--main-red) text-lg">Notre mission est simple</h2>
          <ul className="flex flex-col gap-2">
            <li>1. Offrir une plateforme fiable et simple d’utilisation</li>
            <li>2. Proposer des hébergements variés et de qualité</li>
            <li>3. Favoriser des échanges humains et chaleureux entre hôtes et voyageurs</li>
          </ul>
          <div className="relative w-full h-114.5 shrink-0 lg:hidden">
            <Image src="/about-second.png" alt="Chalet dans la nature" fill priority className="object-cover rounded-xl" />
          </div>

          <p className="text-(--main-red) text-lg font-medium text-center lg:text-start">
            Que vous cherchiez un appartement cosy en centre-ville, une maison en bord de mer ou un chalet à la montagne, Kasa vous accompagne pour
            que chaque séjour devienne un souvenir inoubliable.
          </p>
        </div>
      </section>
      <button className="text-white bg-(--main-red) rounded-xl w-60 h-10 mt-10" onClick={logout}>Se déconnecter</button>
    </section>
  );
}
