"use client";

import PropertyCard from "@/components/properties/property-card";
import { getFavorites } from "@/lib/api/api";
import { useAuth } from "@/lib/context/authContext";
import { Property } from "@/types";
import { useEffect, useState } from "react";

export default function Page() {
  const { token, loading, userId } = useAuth();
  const [favorites, setFavorites] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);


 useEffect(() => {
  if (loading || !token || !userId) return;

  const fetchFavorites = async () => {
    try {
      const data = await getFavorites(userId, token);
      setFavorites(data);
    } catch {
      console.log("Impossible de charger les favoris");
    } finally {
      setIsLoading(false);
    }
  };

  fetchFavorites();
}, [token, loading, userId]);


  if (isLoading) {
  return (
    <section className="flex-1 xl:px-25 px-5">
      <header className="flex flex-col items-center gap-6 my-10">
        <div className="h-10 w-60 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-96 bg-gray-200 rounded animate-pulse" />
      </header>

      <section
        className="
          grid
          px-2
          sm:px-10
          lg:px-30
          xl:px-40
          gap-10
          justify-center
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-105 rounded-lg bg-gray-200 animate-pulse"
          />
        ))}
      </section>
    </section>
  );
}



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

     <section
  className="
    grid
    px-2
    sm:px-10
    lg:px-30
    xl:px-40
    mb-10
    gap-10
    justify-center
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
  "
>

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
