import { api } from "./api";

export const projectService = {
  getPublished: () => api.get("/projects"),

  getAll: () => api.get("/projects/all"),

  getOne: (id) => api.get(`/projects/${id}`),

  uploadImage: (file) => {
    const formData = new FormData();
    formData.append("image", file);
    return api.post("/projects/upload", formData);
  },

  create: (data) => api.post("/projects", data),

  update: (id, data) => api.patch(`/projects/${id}`, data),

  remove: (id) => api.delete(`/projects/${id}`),
};