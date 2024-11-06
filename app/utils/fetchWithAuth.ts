export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  let res = await fetch(url, { ...options, credentials: "include" });

  if (res.status === 401) {
    const refreshRes = await fetch("/api/auth/refresh", {
      credentials: "include",
    });
    if (refreshRes.ok) {
      res = await fetch(url, { ...options, credentials: "include" });
    } else {
      throw new Error("Unauthorized. Please log in first");
    }
  }
  return res;
};
