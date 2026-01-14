
import Image from "next/image";

/**
 * Pied de page de l'application.
 *
 * - Affiche le logo du site
 * - Affiche les informations de copyright
 *
 * @component
 */
export default function Footer() {
  return (
    <footer className=" bg-white flex justify-between h-18 items-center p-10 border border-[#F5F5F5]">
      <Image src="/Logo-petit.svg" height={40} width={40} alt="Logo petit" />
      <p className="text-xs text-[#565656]">© 2025 Kasa. All rights reserved</p>
    </footer>
  );
}
