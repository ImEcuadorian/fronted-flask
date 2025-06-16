import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    rol?: string;
}

const DashboardClients: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [form, setForm] = useState<User>({ id: 0, username: '', email: '', rol: 'user', password: '' });
    const navigate = useNavigate();
    const rol = localStorage.getItem('rol');

    useEffect(() => {
        if (rol !== 'admin') {
            navigate('/');
        } else {
            fetchUsers();
        }
    }, []);

    const fetchUsers = async () => {
        const res = await axios.get('http://localhost:5000/users');
        setUsers(res.data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.id === 0) {
            await axios.post('http://localhost:5000/users', form);
        } else {
            await axios.put(`http://localhost:5000/users/${form.id}`, form);
        }
        setForm({ id: 0, username: '', email: '', rol: 'user', password : '' });
        fetchUsers();
    };

    const handleDelete = async (id: number) => {
        await axios.delete(`http://localhost:5000/users/${id}`);
        fetchUsers();
    };

    const handleEdit = (user: User) => {
        setForm(user);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
                <button
                    onClick={() => navigate('/products')}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Volver a Productos
                </button>
            </div>

            <form onSubmit={handleSubmit} className="mb-6 space-y-2">
                <input
                    type="text"
                    placeholder="Username"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    className="border p-2 w-full"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="border p-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Clave"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="border p-2 w-full"
                />
                <select
                    value={form.rol}
                    onChange={(e) => setForm({ ...form, rol: e.target.value })}
                    className="border p-2 w-full"
                >
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                </select>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    {form.id === 0 ? 'Crear' : 'Actualizar'} Usuario
                </button>
            </form>

            <table className="w-full table-auto border">
                <thead className="bg-gray-200">
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id} className="text-center border-t">
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.rol || 'user'}</td>
                        <td>
                            <button onClick={() => handleEdit(user)} className="text-blue-500 mr-2">Editar</button>
                            <button onClick={() => handleDelete(user.id)} className="text-red-500">Eliminar</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardClients;
