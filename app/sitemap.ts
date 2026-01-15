// app/sitemap.ts
import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://kasa.vercel.app";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const properties = await fetch(`${API_URL}api/properties`, {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch(() => []);

  const propertyPages: MetadataRoute.Sitemap = properties.map(
    (property: { slug: string; updatedAt?: string; id: string }) => ({
      url: `${SITE_URL}/properties/${property.slug}--${property.id}`,
      lastModified: property.updatedAt
        ? new Date(property.updatedAt)
        : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  return [...staticPages, ...propertyPages];
}
