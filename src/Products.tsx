import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {isAuthenticated, logout} from "./service/service.ts";
import {getProducts} from "./service/productService.ts";

export const Products = () => {
    const [products, setProducts] = useState<any[]>([]);
    const navigate = useNavigate();
    const rol = localStorage.getItem("rol");

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate("/");
        } else {
            fetchProducts()
        }
    }, []);

    const fetchProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Productos</h2>
                <div className="flex space-x-4">
                    {rol === "admin" && (
                        <>
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                            Ir al Dashboard
                        </button>
                        <button onClick={() => navigate("/dashboard/clients")}
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                            Ir a Clientes
                        </button>
                        </>
                    )}
                    <button
                        onClick={() => {
                            logout();
                            navigate("/");
                        }}
                        className="text-red-500"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>

            <ul className="mt-6 space-y-2">
                {products.map(p => (
                    <li key={p.id} className="border p-2 rounded">
                        <strong>{p.name}</strong> - {p.description} - ${p.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};
