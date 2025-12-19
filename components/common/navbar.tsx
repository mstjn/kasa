import Image from "next/image";

export default function Navbar() {
  return (
    <header>
      <nav
        className="
      mx-auto
      w-full max-w-4xl
      rounded-xl
      bg-white
      shadow-[0_4px_4px_0_#B6B6B60D]
    "
      >
        <ul className="flex items-center justify-between px-2 md:px-25 h-16 text-xs md:text-lg">
          <li>Accueil</li>
          <li>À propos</li>
          <Image src="/Logo-grand.svg" height={40} width={140} alt="Logo" />
          <li className="text-(--main-red)">+ Ajouter un logement</li>
          <div className="flex items-center gap-2">
            <Image src="/Heart.svg" height={20} width={20} alt="Heart" />
            <Image src="/Bar.svg" height={1} width={1} alt="Bar" />
            <Image src="/Comment.svg" height={20} width={20} alt="Comment" />
          </div>
        </ul>
      </nav>
    </header>
  );
}
