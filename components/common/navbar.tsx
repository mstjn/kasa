"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/**
 * Barre de navigation principale de l'application.
 *
 * - Navigation desktop et mobile
 * - Menu mobile avec ouverture/fermeture
 * - Liens vers les pages principales (accueil, favoris, messagerie)
 * - Attributs ARIA pour l’accessibilité
 *
 * @component
 */
export default function Navbar() {
  const [changeMenu, setChangeMenu] = useState(false);

  return (
    <header className="relative z-50">
      <nav
        aria-label="Navigation principale"
        className="
          mx-auto
          w-full max-w-4xl
          rounded-xl
          bg-white
          sm:shadow-[0_4px_4px_0_#B6B6B60D]
        "
      >
        <ul
          role="menubar"
          className="items-center justify-between px-6 h-16 text-sm md:text-lg hidden sm:flex"
        >
          <li role="none">
            <Link role="menuitem" href="/">Accueil</Link>
          </li>

          <li role="none">
            <Link role="menuitem" href="/about">À propos</Link>
          </li>

          <Image
            src="/Logo-grand.svg"
            height={40}
            width={140}
            alt="Logo du site"
          />

          <li role="menuitem" className="text-(--main-red) font-semibold cursor-pointer">
            + Ajouter un logement
          </li>

          <div className="flex items-center gap-3">
            <Link href="/favorites" aria-label="Voir les favoris">
              <Image src="/Heart.svg" height={20} width={20} alt="" />
            </Link>

            <Link href="/messages" aria-label="Accéder à la messagerie">
              <Image src="/Comment.svg" height={20} width={20} alt="" />
            </Link>
          </div>
        </ul>

        <div className="sm:hidden h-20 w-full flex justify-between items-center px-5">
          <Image
            src="/Logo-petit.svg"
            height={50}
            width={50}
            alt="Logo du site"
          />

          <button
            onClick={() => setChangeMenu(!changeMenu)}
            className="relative w-8 h-8"
            aria-label="Ouvrir le menu"
            aria-expanded={changeMenu}
            aria-controls="mobile-menu"
          >
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
          id="mobile-menu"
          className={`
            sm:hidden
            overflow-hidden
            transition-all duration-300 ease-out
            ${changeMenu ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <ul className="flex flex-col text-xl divide-y divide-gray-100 px-6 py-6 bg-white">
            <Link href="/" className="py-4">Accueil</Link>
            <Link href="/about" className="py-4">À propos</Link>
            <Link href="/messages" className="py-4">Messagerie</Link>
            <Link href="/favorites" className="py-4">Favoris</Link>

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
