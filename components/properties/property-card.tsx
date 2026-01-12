"use client"
import Image from "next/image";
import type { Property } from "@/types";
import Link from "next/link";
import { addToFavorite } from "@/lib/api/api";
import { useAuth } from "@/lib/context/authContext";
export default function PropertyCard({ cover, title, location, price_per_night, slug, id }: Property) {
  const {token} = useAuth()
  async function add(id : string, token : string | null) {
    const data = await addToFavorite(id, token) 
  }
  

  return (
   <figure className="relative bg-white flex flex-col gap-3 rounded-lg overflow-hidden">
  <button
    type="button"
    className="
      absolute top-3 right-3
      bg-white/90
      rounded-lg
      p-2
      hover:scale-105
      transition
      z-10
      cursor-pointer
    "
    aria-label="Ajouter aux favoris"
    onClick={() => add(id, token)}
  >
    <Image src="/Heart-grey.svg" alt="" width={20} height={20} />
  </button>
  <Link href={`/properties/${slug}--${id}`} className="cursor-pointer">
    <div>
      <div className="relative w-full aspect-4/4">
        <Image src={cover} fill className="object-cover" alt={title} />
      </div>

      <figcaption className="px-3 pb-5 space-y-1">
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="text-sm text-gray-500">{location}</p>
        <p className="text-sm text-gray-500 mt-12">
          <span className="font-medium text-black">{price_per_night}€</span> par nuit
        </p>
      </figcaption>
    </div>
  </Link>
</figure>

  );
}
