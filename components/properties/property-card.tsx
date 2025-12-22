import Image from "next/image";
import type { Property } from "@/types";

export default function PropertyCard({ cover, title, location, price_per_night }: Property) {
  return (
    <figure className="bg-white flex flex-col gap-3 rounded-lg overflow-hidden cursor-pointer">
      <div className="relative w-full aspect-4/4">
        <Image src={cover} fill className="object-cover" alt={title} />
        <button
          type="button"
          className="
        absolute top-3 right-3
        bg-white/90
        rounded-lg
        p-2
        hover:scale-105
        transition
        cursor-pointer
      "
          aria-label="Ajouter aux favoris"
        >
          <Image src="/Heart-grey.svg" alt="" width={20} height={20} />
        </button>
      </div>
      <figcaption className="px-3 pb-5 space-y-1">
        <h2 className="font-semibold text-lg">{title}</h2>
        <p className="text-sm text-gray-500">{location}</p>
        <p className="text-sm text-gray-500 mt-12">
          <span className="font-medium text-black">{price_per_night}€</span> par nuit
        </p>
      </figcaption>
    </figure>
  );
}
