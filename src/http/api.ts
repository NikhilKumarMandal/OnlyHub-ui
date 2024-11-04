import { Credentials } from "../type";
import { api } from "./client";



export const login = (credentials: Credentials) => api.post(`/api/v1/users/login`, credentials)

export const self = () => api.get(`/api/v1/users/self`)

export const logout = () => api.post(`/api/v1/users/logout`)