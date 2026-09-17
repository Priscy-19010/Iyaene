import { api } from "./api";

export const messageService = {
  submit: (data) => api.post("/messages", data),

  getAll: ({ status, search } = {}) => {
    const params = new URLSearchParams();
    if (status) params.append("status", status);
    if (search) params.append("search", search);
    const query = params.toString() ? `?${params.toString()}` : "";
    return api.get(`/messages${query}`);
  },

  updateStatus: (id, status) => api.patch(`/messages/${id}`, { status }),
};