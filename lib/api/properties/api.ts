// retrieve a list of properties
export async function getProperties() {
  try {
    const res = await fetch(`${process.env.URL_API}api/properties`, {
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
    const res = await fetch(`${process.env.URL_API}api/properties/${id}`, {
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
