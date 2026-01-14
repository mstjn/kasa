import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPropertyById } from "@/lib/api/api";
import MobileCarousel from "@/components/properties/mobile-carousel";
import Link from "next/link";
import Image from "next/image";
import { Property } from "@/types";

/**
 * Extrait l'identifiant d'un logement à partir de son slug.
 *
 * @param {string | undefined} slug - Slug de l'annonce (ex: "appartement-paris--123")
 * @returns {string | undefined} Identifiant du logement
 */
function extractIdFromSlug(slug: string | undefined) {
  return slug?.split("--").pop();
}

/**
 * Génère les métadonnées SEO dynamiques de la page logement.
 *
 * - Title et description
 * - Open Graph (réseaux sociaux)
 * - Twitter Card
 * - Canonical URL
 *
 * @param {{ params: { slug: string } }} props
 * @returns {Promise<Metadata>} Métadonnées de la page
 */
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await params;
  const id: string | undefined = extractIdFromSlug(p.slug);
  const property = await getPropertyById(id);

  if (!property) {
    return {
      title: "Annonce introuvable",
      description: "Cette annonce n'existe plus",
      robots: { index: false, follow: false },
    };
  }

  const mainImage = property.pictures?.[0];

  return {
    title: `${property.title} – Location à ${property.location}`,
    description: property.description.slice(0, 155),

    openGraph: {
      title: property.title,
      description: property.description.slice(0, 155),
      type: "article",
      images: mainImage
        ? [
            {
              url: mainImage,
              width: 1200,
              height: 630,
              alt: property.title,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title: property.title,
      description: property.description.slice(0, 155),
      images: mainImage ? [mainImage] : [],
    },

    alternates: {
      canonical: `/properties/${p.slug}`,
    },
  };
}
/**
 * Page de détail d'un logement.
 *
 * - Récupère les données du logement depuis l'API
 * - Gère le cas d'une annonce inexistante
 * - Intègre des données structurées (JSON-LD) pour le SEO
 * - Affiche les informations, images et hôte du logement
 *
 * @component
 */
export default async function Page({ params }: { params: { slug: string } }) {
  const p = await params;
  const id: string | undefined = extractIdFromSlug(p.slug);

  const property: Property = await getPropertyById(id);
  if (!property) {
    notFound();
  }
  if (!property.pictures || property.pictures.length === 0) {
    return null;
  }

  /**
   * Données structurées Schema.org (JSON-LD)
   * utilisées pour améliorer la compréhension de la page par les moteurs de recherche.
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: property.title,
    description: property.description,
    image: property.pictures,
    address: {
      "@type": "PostalAddress",
      addressLocality: property.location,
      addressCountry: "FR",
    },
    amenityFeature: property.equipments?.map((eq) => ({
      "@type": "LocationFeatureSpecification",
      name: eq,
      value: true,
    })),
    makesOffer: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "EUR",
    },
    host: {
      "@type": "Person",
      name: property.host.name,
      image: property.host.picture,
    },
    url: `https://kasa.com/properties/${p.slug}`,
  };

  return (
    <section className="flex-1 max-w-350 mx-auto flex flex-col lg:mt-20 mt-5 gap-6 mb-10 px-2">
       <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <header>
        <Link href="/" className="flex gap-2 bg-[#F5F5F5] h-9 w-48 items-center justify-center rounded-md">
          <Image src="/arrow.svg" width={15} height={15} alt="icone de retour" />
          <p className="text-[#565656] font-medium">Retour aux annonces</p>
        </Link>
      </header>

      <section className="flex gap-4 items-start">
        <div className="xl:grid xl:grid-cols-[370px_220px_220px] flex flex-col w-full xl:grid-rows-2 gap-2 lg:h-89 h-full">
          <div className="relative row-span-2 h-full hidden lg:block">
            <Image src={property.pictures[0]} alt="image principale" fill className="object-cover rounded-xl" priority />
          </div>
          <div className="col-span-2 row-span-2 h-full lg:grid grid-cols-2 grid-rows-2 gap-2 hidden">
            {property.pictures.slice(1, 5).map((img, index) => (
              <div key={index} className="relative w-full h-full">
                <Image src={img} alt={`Property ${index + 1}`} fill className="object-cover rounded-xl" />
              </div>
            ))}
          </div>
          <MobileCarousel images={property.pictures} />
        </div>

        <article className="bg-white border border-[#F5F5F5] p-6 rounded-xl lg:flex flex-col gap-6 w-full hidden">
          <h2 className="text-lg font-medium">Votre hôte</h2>

          <div className="flex gap-5 items-center">
            <Image src={property.host.picture} height={82} width={82} alt={`Portrait de ${property.host.name}`} className="rounded-lg" />
            <p>{property.host.name}</p>
            <button className="flex gap-2 bg-[#F5F5F5] rounded-lg p-2">
              <Image src="/fav.svg" width={19} height={23} alt="Icone favori" />
              <p className="text-lg">3</p>
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <button className="flex justify-center items-center bg-(--main-red) text-white rounded-lg h-9">Contacter l&apos;hôte</button>
            <Link href="/messages" className="flex justify-center items-center bg-(--main-red) text-white rounded-lg h-9">Envoyer un message</Link>
          </div>
        </article>
      </section>

      <section className="bg-white border border-[#F5F5F5] p-6 rounded-xl flex flex-col gap-6 max-w-206.5">
        <h1 className="text-xl font-medium">{property.title}</h1>

        <p className="text-[#565656] flex gap-2">
          <Image src="/location.svg" height={12} width={12} alt="location icone" />
          {property.location}
        </p>

        <p>{property.description}</p>

        <h2 className="font-medium">Équipements</h2>
        <div className="flex flex-wrap gap-2 max-w-100">
          {property.equipments?.map((tag, index) => (
            <span key={index} className="bg-[#F5F5F5] py-2 px-4 text-[#565656] rounded h-10">
              {tag}
            </span>
          ))}
        </div>

        <h2 className="font-medium">Catégories</h2>
        <div className="flex flex-wrap gap-2 max-w-100">
          {property.tags?.map((tag, index) => (
            <span key={index} className="bg-[#F5F5F5] px-4 py-2 text-[#565656] rounded text-center">
              {tag}
            </span>
          ))}
        </div>
      </section>
      <section>
        <article className="bg-white border border-[#F5F5F5] p-6 rounded-xl flex flex-col gap-6 w-full lg:hidden">
          <h2 className="text-lg font-medium">Votre hôte</h2>

          <div className="flex gap-5 items-center">
            <Image src={property.host.picture} height={82} width={82} alt={`Portrait de ${property.host?.name}`} className="rounded-lg" />
            <p>{property.host.name}</p>
            <button className="flex gap-2 bg-[#F5F5F5] rounded-lg p-2">
              <Image src="/fav.svg" width={19} height={23} alt="Icone favori" />
              <p className="text-lg">3</p>
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <button className="flex justify-center items-center bg-(--main-red) text-white rounded-lg h-9">Contacter l&apos;hôte</button>
            <Link href="/messages" className="flex justify-center items-center bg-(--main-red) text-white rounded-lg h-9">Envoyer un message</Link>
          </div>
        </article>
      </section>
    </section>
  );
}
