import { getPropertyById } from "@/lib/api/properties/api";
import { log } from "console";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { idProperty: string } }) {
  const p = await params;
  const property = await getPropertyById(p.idProperty);
  if (!property) {
    notFound();
  }
  log(property);
  return <main className="flex-1"></main>;
}
