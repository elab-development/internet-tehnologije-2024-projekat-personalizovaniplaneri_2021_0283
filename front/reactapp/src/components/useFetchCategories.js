// useFetchCategories.js
import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetchCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://127.0.0.1:8000/api/categories', {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            setCategories(response.data.categories);
            setLoading(false);
        })
        .catch(error => {
            setError('Neuspešno učitavanje kategorija');
            setLoading(false);
        });
    }, []);

    return { categories, loading, error };
}

export default useFetchCategories;
