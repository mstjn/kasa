"use client";

import { getFavorites, getProperties } from "@/lib/api/api";
import Image from "next/image";
import PropertyCard from "@/components/properties/property-card";
import type { Property } from "@/types";
import { useAuth } from "@/lib/context/authContext";
import { useEffect, useState } from "react";
import Loading from "./loading";

/**
 * Page d'accueil de l'application.
 *
 * - Récupère la liste des logements
 * - Récupère les favoris de l'utilisateur connecté
 * - Affiche un état de chargement
 * - Permet d'ajouter ou retirer un logement des favoris
 *
 * @component
 */
export default function Home() {
  const { token, userId } = useAuth();

  const [properties, setProperties] = useState<Property[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Charge les logements et les favoris utilisateur au chargement de la page.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertiesData = await getProperties();

        if (token && userId) {
          const favoritesData = await getFavorites(userId, token);
          setFavoriteIds(favoritesData.map((fav: Property) => fav.id));
        }

        setProperties(propertiesData);
      } catch (error) {
        console.error("Erreur chargement home", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, userId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="flex flex-col items-center mt-10 gap-10 md:px-20 px-5 flex-1">
      <header className="flex flex-col items-center gap-2">
        <h1 className="font-bold text-3xl text-(--main-red) text-center">Chez vous, partout et ailleurs</h1>
        <p className="text-center">Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux, sélectionnés avec soin par nos hôtes.</p>
      </header>

      <section className="relative w-full max-w-7xl sm:aspect-16/6 aspect-16/20 overflow-hidden rounded-2xl">
        <Image src="/Home-picture.jpg" alt="Maison avec hébergement Kasa" fill priority fetchPriority="high" className="object-cover" />
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            {...property}
            isFavorite={favoriteIds.includes(property.id)}
            onToggleFavorite={(id, isFav) => {
              setFavoriteIds((prev) => (isFav ? prev.filter((favId) => favId !== id) : [...prev, id]));
            }}
          />
        ))}
      </section>
    </section>
  );
}
