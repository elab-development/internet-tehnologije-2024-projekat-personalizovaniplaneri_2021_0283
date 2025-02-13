import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`http://127.0.0.1:8000/api/categories`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setCategories(response.data.categories);
        })
        .catch(error => {
            setError('Neuspešno učitavanje kategorija');
        });
    }, []);

    return (
        <div>
            <h2>Lista kategorija</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {categories.length > 0 ? (
                    categories.map(category => (
                        <li key={category.id}>{category.naziv}</li>
                    ))
                ) : (
                    <p>Nema dostupnih kategorija</p>
                )}
            </ul>
        </div>
    );
}

export default CategoryList;
