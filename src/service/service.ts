import axios, {isAxiosError} from "axios";

const API_URL = "http://localhost:5002";

interface LoginCredentials {
    email: string;
    password: string;
}

export const loginUser = async (credentials: LoginCredentials) => {
    try {
        const { data } = await axios.post(`${API_URL}/login`, credentials);
        localStorage.setItem("token", data.email);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al iniciar sesión");
        } else {
            throw new Error("Error de red");
        }
    }
};

export const isAuthenticated = () => !!localStorage.getItem("token");

export const logout = () => localStorage.removeItem("token");



