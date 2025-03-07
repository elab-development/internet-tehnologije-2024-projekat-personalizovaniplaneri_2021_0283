import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
 
function AdminRoute({ children }) {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);
 
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://127.0.0.1:8000/api/admin/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            })
            .then(() => {
                setAuth(true);  // Admin je autentifikovan
                setLoading(false);
            })
            .catch(() => {
                setAuth(false);  // Admin nije autentifikovan
                setLoading(false);
            });
        } else {
            setAuth(false);
            setLoading(false);
        }
    }, []);
 
    if (loading) {
        return <p>Loading...</p>;  // Prikazuje poruku dok se proverava token
    }
 
    return auth ? children : <Navigate to="/login" />;  
}
 
export default AdminRoute;
