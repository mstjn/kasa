"use client";

import PropertyCard from "@/components/properties/property-card";
import { getFavorites } from "@/lib/api/api";
import { useAuth } from "@/lib/context/authContext";
import { Property } from "@/types";
import { useEffect, useState } from "react";

export default function Page() {
  const { token, loading, userId } = useAuth();
  const [favorites, setFavorites] = useState<Property[]>([]);

  useEffect(() => {
    if (loading || !token || !userId) return;

    const fetchFavorites = async () => {
      try {
        const data = await getFavorites(userId, token);
        setFavorites(data);
      } catch {
        console.log("Impossible de charger les favoris");
      }
    };

    fetchFavorites();
  }, [token, loading, userId]);


  return (
    <section className="flex-1 xl:px-25 px-5">
      <header className="flex flex-col items-center gap-6 my-10">
        <h1 className="text-(--main-red) text-4xl font-bold">
          Vos favoris
        </h1>
        <p className="text-center">
          Retrouvez ici tous les logements que vous avez aimés. <br />
          Un simple clic et votre prochain séjour est en route.
        </p>
      </header>

      <section className="grid justify-center grid-cols-[355px_355px_355px] gap-10">
        {favorites.map((fav) => (
          <PropertyCard
            key={fav.id}
            {...fav}
            isFavorite={true}
            onToggleFavorite={(id) => {
              setFavorites((prev) =>
                prev.filter((property) => property.id !== id)
              );
            }}
          />
        ))}
      </section>
    </section>
  );
}
