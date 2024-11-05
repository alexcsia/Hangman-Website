export const fetchWithAuth = async (url: string): Promise<Response> => {
  console.log("reached unauthorized");
  let res = await fetch(url, { method: "GET", credentials: "include" });
  console.log("reached unauthorized");
  if (res.status === 401) {
    console.log("reached unauthorized");
    const refreshRes = await fetch("/api/auth/refresh", {
      credentials: "include",
    });
    if (refreshRes.ok) {
      res = await fetch(url, { method: "GET", credentials: "include" });
    } else {
      throw new Error("Unauthorized. Please log in first");
    }
  }
  return res;
};
