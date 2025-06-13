import axios from "axios";

const API_URL = "http://localhost:5001";


export const getProducts = async () => {
    const { data } = await axios.get(`${API_URL}/products`);
    return data;
};

