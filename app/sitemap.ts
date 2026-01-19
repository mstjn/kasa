import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const API_URL =
  process.env.NEXT_PUBLIC_URL_API || "http://localhost:3001/";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1, 
    },
  ];

  const properties = await fetch(`${API_URL}api/properties`, {
    cache: "no-store",
  })
    .then((res) => res.json())
    .catch(() => []);

  const propertyPages: MetadataRoute.Sitemap = properties.map(
    (p: { slug: string; id: string }) => ({
      url: `${SITE_URL}/properties/${p.slug}--${p.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  return [...staticPages, ...propertyPages];
}
