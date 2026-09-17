import { api } from "./api";

export const quoteService = {
  submit: (data) => api.post("/quote", data),

  getAll: ({ status, search } = {}) => {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (search) params.append("search", search);
    const query = params.toString() ? `?${params.toString()}` : "";
    return api.get(`/quote${query}`);
  },

  updateStatus: (id, status) => api.patch(`/quote/${id}`, { status }),
};