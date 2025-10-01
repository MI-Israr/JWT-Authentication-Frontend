import API from "./axios";

export const signup = (formData) => API.post("/auth/signup", formData);

export const login = (formData) => API.post("/auth/login", formData);


export const logout = () => API.post("/auth/logout");
