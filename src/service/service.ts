import axios, {isAxiosError} from "axios";

const API_URL = "http://localhost:5002";

interface LoginCredentials {
    email: string;
    password: string;
}

export const loginUser = async (credentials: LoginCredentials) => {
    try {
        const { data } = await axios.post(`${API_URL}/login`, credentials);
        localStorage.setItem("id", data.id);
        localStorage.setItem("token", data.email);
        localStorage.setItem("rol", data.rol);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "Error al iniciar sesión");
        } else {
            throw new Error("Error de red");
        }
    }
};

const API = "http://localhost:5003";

export async function status2FA(userId: string) {
    const res = await fetch(`${API}/2fa-status/${userId}`);
    if (!res.ok) throw new Error("Cannot get 2FA status");
    return res.json() as Promise<{ active: boolean }>;
}

export async function register2FA(userId: string) {
    const res = await fetch(`${API}/register-2fa/${userId}`, {
        method: "POST",
    });
    if (!res.ok) throw new Error("Failed to register 2FA");
    return res.json() as Promise<{ qr_code_base64: string }>;
}

export async function verify2FA(userId: string, code: string) {
    const res = await fetch(`${API}/verify-2fa`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, code }),
    });
    if (!res.ok) return false;
    const { verified } = await res.json();
    return verified as boolean;
}


export const isAuthenticated = () => !!localStorage.getItem("token");

export const logout = () => localStorage.removeItem("token");



