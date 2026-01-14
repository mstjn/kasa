"use client";

import { useAuth } from "@/lib/context/authContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const publicRoutes = ["/login", "/register"];

/**
 * Garde d'authentification de l'application.
 *
 * - Protège les routes privées si l'utilisateur n'est pas authentifié
 * - Redirige vers la page de connexion si nécessaire
 * - Empêche l'accès aux pages publiques (login/register) si l'utilisateur est déjà connecté
 *
 * @component
 * @param {{ children: React.ReactNode }} props - Contenu de l'application à protéger
 */
export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { token, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!token && !publicRoutes.includes(pathname)) {
      router.replace("/login");
    }

    if (token && publicRoutes.includes(pathname)) {
      router.replace("/");
    }
  }, [token, loading, pathname, router]);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
      </div>
    );
  }

  return <>{children}</>;
}
