import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}

const Dashboard: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [form, setForm] = useState({ id: 0, name: '', description: '', price: 0 });
    const navigate = useNavigate();

    const fetchProducts = async () => {
        const res = await axios.get('http://localhost:5001/products');
        setProducts(res.data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.id === 0) {
            await axios.post('http://localhost:5001/product', form);
        } else {
            await axios.put(`http://localhost:5001/product/${form.id}`, form);
        }
        setForm({ id: 0, name: '', description: '', price: 0 });
        fetchProducts();
    };

    const handleDelete = async (id: number) => {
        await axios.delete(`http://localhost:5001/product/${id}`);
        fetchProducts();
    };

    const handleEdit = (product: Product) => {
        setForm(product);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Panel de Productos</h1>
                <button
                    onClick={() => navigate("/products")}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Volver a Productos
                </button>
            </div>

            <form onSubmit={handleSubmit} className="mb-6 space-y-2">
                <input
                    type="text"
                    placeholder="Nombre"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="border p-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Descripción"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="border p-2 w-full"
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="border p-2 w-full"
                />
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    {form.id === 0 ? 'Agregar' : 'Actualizar'} Producto
                </button>
            </form>

            <table className="w-full table-auto border">
                <thead className="bg-gray-200">
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {products.map((p) => (
                    <tr key={p.id} className="text-center border-t">
                        <td>{p.id}</td>
                        <td>{p.name}</td>
                        <td>{p.description}</td>
                        <td>${p.price.toFixed(2)}</td>
                        <td>
                            <button onClick={() => handleEdit(p)} className="text-blue-500 mr-2">Editar</button>
                            <button onClick={() => handleDelete(p.id)} className="text-red-500">Eliminar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
