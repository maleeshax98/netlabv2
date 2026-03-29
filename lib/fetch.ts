export async function fetchAPI(url: string, options?: RequestInit) {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    });

    let data: any = null;

    // 🔥 Try parsing JSON safely
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    // 🔥 Handle HTTP errors properly
    if (!res.ok) {
      const message =
        data?.message || `Request failed with status ${res.status}`;

      throw new Error(message);
    }

    return data;
  } catch (error: any) {
    console.error("Fetch Error:", error.message);

    // 🔥 Always return clean message
    throw new Error(
      error.message || "Something went wrong while fetching data",
    );
  }
}
