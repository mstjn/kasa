/**
 * Récupère la liste de tous les logements.
 *
 * @returns {Promise<any>} Liste des logements
 * @throws {Error} Erreur lors de la récupération des données
 */
export async function getProperties() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}api/properties`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch properties (${res.status})`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("getProperties error:", error);
    throw error;
  }
}
/**
 * Récupère un logement à partir de son identifiant.
 *
 * @param {string | undefined} id - Identifiant du logement
 * @returns {Promise<any | null>} Logement ou null si non trouvé
 * @throws {Error} Erreur lors de la récupération des données
 */
export async function getPropertyById(id: string | undefined) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}api/properties/${id}`, {
      cache: "no-store",
    });

    if (res.status === 404) {
      return null;
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch property (${res.status})`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("getProperties error:", error);
    throw error;
  }
}

/**
 * Ajoute un logement aux favoris de l'utilisateur.
 *
 * @param {string} id - Identifiant du logement
 * @param {string | null} token - Token d'authentification utilisateur
 * @returns {Promise<any>} Réponse de l'API
 * @throws {Error} Erreur lors de l'ajout aux favoris
 */
export async function addToFavorite(id: string, token: string | null) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API}api/properties/${id}/favorite`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to add favorite (${res.status})`);
  }

  return res.json();
}


/**
 * Récupère les logements favoris d'un utilisateur.
 *
 * @param {string | null} idUser - Identifiant de l'utilisateur
 * @param {string | null} token - Token d'authentification utilisateur
 * @returns {Promise<any>} Liste des favoris
 * @throws {Error} Erreur lors de la récupération des favoris
 */
export async function getFavorites(idUser : string | null, token : string | null) {
   try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_API}api/users/${idUser}/favorites`,  {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    );
     if (!res.ok) {
      throw new Error(`Failed to fetch favorites (${res.status})`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("getFavorites error:", error);
    throw error;
  }
}


/**
 * Supprime un logement des favoris de l'utilisateur.
 *
 * @param {string} id - Identifiant du logement
 * @param {string | null} token - Token d'authentification utilisateur
 * @returns {Promise<any>} Réponse de l'API
 * @throws {Error} Erreur lors de la suppression des favoris
 */
export async function removeFromFavorite(id : string, token: string | null) {
 const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL_API}api/properties/${id}/favorite`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to remove favorite (${res.status})`);
  }

  return res.json();
}
