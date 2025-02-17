import React, { useState, useEffect } from 'react';
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
            <h2>Kategorije</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="category-list">
                {categories.length > 0 ? (
                    categories.map(category => (
                        <div key={category.id} className="category-card">
                            <img
                                src={`/images/${category.naziv.toLowerCase()}.jpg`}
                                alt={category.naziv}
                            />
                            <h3>{category.naziv}</h3> {/* Naziv se prikazuje ispod slike */}
                        </div>
                    ))
                ) : (
                    <p>Nema dostupnih kategorija</p>
                )}
            </div>
        </div>
    );
}

export default CategoryList;

