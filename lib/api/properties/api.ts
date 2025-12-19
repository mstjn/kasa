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
