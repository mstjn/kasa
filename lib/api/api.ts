// retrieve a list of properties
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
// retrieve a single property
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

// add to favorites
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


// get favorites
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

// remove from favorites
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
