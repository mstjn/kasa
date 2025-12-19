import { getProperties } from "@/lib/api/properties/api";
import Image from "next/image";
import PropertyCard from "@/components/properties/property-card";
import type { Property } from "@/types";

export default async function Home() {
  const properties: Property[] = await getProperties();
  return (
    <main className="flex flex-col items-center mt-10 gap-10 px-20 flex-1">
      <header className="flex flex-col items-center gap-2">
        <h1 className="font-bold text-3xl text-(--main-red)">Chez vous, partout et ailleurs</h1>
        <p>Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux, sélectionnés avec soin par nos hôtes.</p>
      </header>

      <section className="relative w-full max-w-7xl aspect-16/6 overflow-hidden rounded-xl">
        <Image src="/Home-picture.jpg" fill className="object-cover" alt="Maison avec hébergement Kasa" priority />
      </section>

      <section
        className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      gap-8
      w-full
      max-w-7xl
    "
      >
        {properties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </section>
      <section className="bg-white rounded-lg flex flex-col gap-10 items-center w-full max-w-7xl py-10 mb-10">
        <h2 className="font-semibold text-2xl">Comment ça marche ?</h2>
        <p className="text-center">
          Que vous partiez pour un week-end improvisé, des vacances en famille ou un voyage professionnel, <br /> Kasa vous aide à trouver un lieu qui
          vous ressemble.
        </p>

        <div className="grid grid-cols-3 gap-5 text-white">
          <article className="bg-[#842C16] py-10 px-5 rounded-lg flex flex-col gap-5 max-w-2xs">
            <h4 className="text-lg font-medium">Recherchez</h4>
            <p className="mb-10 text-sm">Entrez votre destination, vos dates et laissez Kasa faire le reste</p>
          </article>
          <article className="bg-[#842C16] py-10 px-5 rounded-lg flex flex-col gap-5 max-w-2xs">
            <h4 className="text-lg font-medium">Réservez</h4>
            <p className="mb-10 text-sm">Profitez d’une plateforme sécurisée et de profils d’hôtes vérifiés.</p>
          </article>
          <article className="bg-[#842C16] py-10 px-5 rounded-lg flex flex-col gap-5 max-w-2xs">
            <h4 className="text-lg font-medium">Vivez l&apos;expérience</h4>
            <p className="mb-10 text-sm">Installez-vous, profitez de votre séjour, et sentez-vous chez vous, partout.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
