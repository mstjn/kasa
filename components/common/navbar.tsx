"use client";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [changeMenu, setChangeMenu] = useState(false);

  return (
    <header className="relative z-50">
      <nav
        className="
          mx-auto
          w-full max-w-4xl
          rounded-xl
          bg-white
          sm:shadow-[0_4px_4px_0_#B6B6B60D]
        "
      >
        <ul className="items-center justify-between px-6 h-16 text-sm md:text-lg hidden sm:flex">
          <li className="cursor-pointer">Accueil</li>
          <li className="cursor-pointer">À propos</li>

          <Image src="/Logo-grand.svg" height={40} width={140} alt="Logo" />

          <li className="text-(--main-red) font-semibold cursor-pointer">+ Ajouter un logement</li>

          <div className="flex items-center gap-3 cursor-pointer">
            <Image src="/Heart.svg" height={20} width={20} alt="Favoris" />
            <Image src="/Comment.svg" height={20} width={20} alt="Messagerie" />
          </div>
        </ul>

        <div className="sm:hidden h-20 w-full flex justify-between items-center px-5">
          <Image src="/Logo-petit.svg" height={50} width={50} alt="Logo mobile" />

          <button onClick={() => setChangeMenu(!changeMenu)} className="relative w-8 h-8" aria-label="Menu" aria-expanded={changeMenu}>
            <Image
              src="/hamburger.svg"
              alt=""
              fill
              className={`
                transition-all duration-300 ease-out
                ${changeMenu ? "opacity-0 scale-75" : "opacity-100 scale-100"}
              `}
            />
            <Image
              src="/close.svg"
              alt=""
              fill
              className={`
                transition-all duration-500 ease-out
                ${changeMenu ? "opacity-100 scale-100" : "opacity-0 scale-75"}
              `}
            />
          </button>
        </div>
        <div
          className={`
    sm:hidden
    overflow-hidden
    transition-all duration-300 ease-out
    ${changeMenu ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
  `}
        >
          <ul className="flex flex-col text-xl divide-y divide-gray-100 px-6 py-6 bg-white">
            <li className="py-4 cursor-pointer">Accueil</li>
            <li className="py-4 cursor-pointer">À propos</li>

            <li className="py-4 cursor-pointer ">Messagerie</li>

            <li className="py-4 cursor-pointer ">Favoris</li>

            <button
              className="
        mt-6
        w-[60%]
        rounded-lg
        bg-(--main-red)
        py-2
        text-white
        text-sm
      "
            >
              Ajouter un logement
            </button>
          </ul>
        </div>
      </nav>
    </header>
  );
}
