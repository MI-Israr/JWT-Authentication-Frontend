import API from "./axios";

export const signup = (formData) => API.post("/auth/signup", formData);

export const login = (formData) => API.post("/auth/login", formData);

export const logout = () => API.post("/auth/logout");

export const forgotPassword = (email) =>
  API.post("/auth/forgot-password", { email });

export const resetPassword = (token, password) =>
  API.post(`/auth/reset-password/${token}`, { password });
