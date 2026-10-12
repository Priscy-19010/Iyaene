import { api, tokenStore } from "./api";

export const authService = {
  login: async (email, password) => {
    const result = await api.post("/auth/login", { email, password });
    tokenStore.set(result.token); // keeps the token so later admin requests can send it
    return result;
  },

  logout: () => tokenStore.clear(),
};