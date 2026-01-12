"use client";

import Image from "next/image";
import Link from "next/link";
import { addToFavorite, removeFromFavorite } from "@/lib/api/api";
import { useAuth } from "@/lib/context/authContext";

interface Props {
  id: string;
  cover: string;
  title: string;
  location: string;
  price_per_night: number;
  slug: string;
  isFavorite: boolean;
  onToggleFavorite: (id: string, isFavorite: boolean) => void;
}

export default function PropertyCard({
  id,
  cover,
  title,
  location,
  price_per_night,
  slug,
  isFavorite,
  onToggleFavorite,
}: Props) {
  const { token } = useAuth();

  const handleToggle = async () => {
    if (!token) return;

    // 🔥 UI instant (optimistic)
    onToggleFavorite(id, isFavorite);

    try {
      if (!isFavorite) {
        await addToFavorite(id, token);
      } else {
        await removeFromFavorite(id, token);
      }
    } catch (error) {
      // rollback en cas d’erreur
      onToggleFavorite(id, !isFavorite);
      console.error(error);
    }
  };

  return (
    <figure className="relative bg-white flex flex-col gap-3 rounded-lg overflow-hidden">
      <button
        type="button"
        aria-label="Favori"
        onClick={handleToggle}
        className={`
          absolute top-3 right-3
          rounded-lg p-2 z-10 transition
          ${isFavorite ? "bg-(--main-red)" : "bg-white/90"}
          hover:scale-105
        `}
      >
        <Image
          src="/Heart-grey.svg"
          alt=""
          width={20}
          height={20}
        />
      </button>

      <Link href={`/properties/${slug}--${id}`}>
        <div>
          <div className="relative w-full aspect-4/4">
            <Image src={cover} fill className="object-cover" alt={title} />
          </div>

          <figcaption className="px-3 pb-5 space-y-1">
            <h2 className="font-semibold text-lg">{title}</h2>
            <p className="text-sm text-gray-500">{location}</p>
            <p className="text-sm text-gray-500 mt-12">
              <span className="font-medium text-black">
                {price_per_night}€
              </span>{" "}
              par nuit
            </p>
          </figcaption>
        </div>
      </Link>
    </figure>
  );
}
