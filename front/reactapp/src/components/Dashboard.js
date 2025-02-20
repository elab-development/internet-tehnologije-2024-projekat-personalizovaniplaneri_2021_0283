import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [deletedUser, setDeletedUser] = useState(null);
    const [showUpdateMessage, setShowUpdateMessage] = useState(false); // Stanje za modal
    const [updatedUser, setUpdatedUser] = useState({
        ime: '',
        prezime: '',
        email: '',
        role: '',
        sifra: '',
    });
    const [error, setError] = useState(null);
    const [showDeleteMessage, setShowDeleteMessage] = useState(false); // Stanje za modal

    // Fetch korisnike
    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/api/admin/user', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json'
            }
        })
        .then(response => {
            setUsers(response.data);
        })
        .catch(() => {
            console.error('Greška prilikom učitavanja korisnika:', error); 
            setError('Failed to fetch users');
            window.location.href = '/login';
        });
    }, [error]);

    // Brisanje korisnika
    const handleDelete = (userId) => {
        const token = localStorage.getItem('token');

        axios.delete(`http://127.0.0.1:8000/api/destroy-user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json'
            }
        })
        .then(() => {
            const deletedUserData = users.find(user => user.id === userId);
            setDeletedUser(deletedUserData);  // Sačuvaj podatke obrisanog korisnika
            setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));  // Ukloni korisnika iz liste

            // Prikazivanje poruke
            setShowDeleteMessage(true);
            setTimeout(() => setShowDeleteMessage(false), 3000); // Nestaje nakon 3 sekunde
        })
        .catch(err => {
            console.error(err);
            alert('Greška prilikom brisanja korisnika.');
        });
    };

    // Postavi korisnika za izmenu
    const handleEdit = (user) => {
        setSelectedUser(user);
        setUpdatedUser({
            ime: user.ime,
            prezime: user.prezime,
            email: user.email,
            role: user.role,
            sifra: user.sifra,
            type_id: user.type_id
        });
    };

    // Ažuriranje korisnika
    const handleUpdate = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const dataToUpdate = {
            ime: updatedUser.ime,
            prezime: updatedUser.prezime,
            email: updatedUser.email,
            role: updatedUser.role,
            sifra: updatedUser.sifra,
            type_id: updatedUser.type_id
        };

        axios.put(`http://127.0.0.1:8000/api/update-user/${selectedUser.id}`, dataToUpdate, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json'
            }
        })
        .then(() => {
            //alert('Korisnik je uspešno ažuriran!');
            setUsers(users.map(user => user.id === selectedUser.id ? { ...user, ...updatedUser } : user));  // Osveži korisnike
            setSelectedUser(null);

            setShowUpdateMessage(true);
            setTimeout(() => setShowUpdateMessage(false), 3000);
        })
        .catch(err => {
            console.error(err);
            setError('Failed to update user');
        });
    };

    return (
        <div className="dashboard-container">
            <h2>Admin Dashboard - Registrovani Korisnici</h2>
            {error && <p className="error">{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Email</th>
                        <th>Uloga</th>
                        <th>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.ime}</td>
                            <td>{user.prezime}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className="edit" onClick={() => handleEdit(user)}>Izmeni</button>
                                <button className="delete" onClick={() => handleDelete(user.id)}>Obriši</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showDeleteMessage && (
                <div className="delete-message-modal">
                    <p>Korisnik <strong>{deletedUser?.ime} {deletedUser?.prezime}</strong> je uspešno obrisan.</p>
                </div>
            )}
            {showUpdateMessage && (
                <div className="update-message-modal">
                    <p>Korisnik <strong>{updatedUser.ime} {updatedUser.prezime}</strong> je uspešno ažuriran.</p>
                </div>)}

            {selectedUser && (
                <div className="edit-user-form">
                    <h3>Izmeni korisnika</h3>
                    <form onSubmit={handleUpdate}>
                        <label>
                            Ime:
                            <input 
                                type="text" 
                                value={updatedUser.ime} 
                                onChange={(e) => setUpdatedUser({ ...updatedUser, ime: e.target.value })}
                            />
                        </label>
                        <label>
                            Prezime:
                            <input 
                                type="text" 
                                value={updatedUser.prezime} 
                                onChange={(e) => setUpdatedUser({ ...updatedUser, prezime: e.target.value })}
                            />
                        </label>
                        <label>
                            Email:
                            <input 
                                type="email" 
                                value={updatedUser.email} 
                                onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
                            />
                        </label>
                        <label>
                            Uloga:
                            <select 
                                value={updatedUser.role} 
                                onChange={(e) => setUpdatedUser({ ...updatedUser, role: e.target.value })}
                            >
                                <option value="user">Korisnik</option>
                                <option value="admin">Administrator</option>
                                <option value="guest">Gost</option>
                            </select>
                        </label>
                        <button type="submit">Ažuriraj</button>
                        <button type="button" onClick={() => setSelectedUser(null)}>Odustani</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Dashboard;






 
    