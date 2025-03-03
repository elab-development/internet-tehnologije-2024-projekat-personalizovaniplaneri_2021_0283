import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [color, setColor] = useState('#000000');
    const [font, setFont] = useState('Arial');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [plannerName, setPlannerName] = useState('');
    const [text, setText] = useState('');
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`http://127.0.0.1:8000/api/categories`, {
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
    const getUserFromToken = async () => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            console.log('Nema tokena!');
            return null;
        }

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/user', {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data; // Returns the user object which contains type_id
        } catch (error) {
            console.error('Greška pri dobijanju korisnika:', error);
            return null;
        }
    };

    const handleProceedToOrder = async () => {
        const userData = await getUserFromToken();
        if (userData) {
            if (userData.type_id === 3) {
                alert('Morate se prijaviti da biste nastavili narudžbinu');
                window.location.href = '/login'; // Preusmeravanje na login
            } else {
                window.location.href = '/order'; // Ako je korisnik validan, nastavi narudžbinu
            }
        } else {
            alert('Morate se prijaviti da biste nastavili narudžbinu');
            window.location.href = '/login'; // Preusmeravanje na login
        }
    };
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const savePlanner = () => {
        if (!selectedCategory) {
            alert("Izaberite kategoriju!");
            return;
        }

        const newPlanner = {
            naziv: plannerName || "Moj planer",
            boja: color,
            font: font,
            tekst: text,
            category_id: selectedCategory.id,
            slika: previewImage, // Čuvamo URL za prikaz u korpi
            cena: 1500 // Primer cene, prilagodite po potrebi
        };

        const updatedCart = [...cart, newPlanner];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        alert('Planer uspešno dodat u korpu!');
    };

    const removeFromCart = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <section className="page-section">
            <div className="container d-flex flex-column align-items-center">
                <h2 className="text-uppercase text-secondary mb-3">Kategorije</h2>
                <div className="divider-custom">
                    <div className="divider-custom-line"></div>
                    <div className="divider-custom-icon"><i className="fas fa-user"></i></div>
                    <div className="divider-custom-line"></div>
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div className="category-list">
                    {categories.length > 0 ? (
                        categories.map(category => (
                            <div
                                key={category.id}
                                className="category-card"
                                onClick={() => handleCategorySelect(category)}
                                style={{
                                    border: selectedCategory?.id === category.id ? '2px solid blue' : '1px solid #ccc',
                                    cursor: 'pointer',
                                    padding: '0px',
                                    margin: '0px',
                                }}
                            >
                                <img
                                    src={`/images/${category.naziv.toLowerCase()}.jpg`}
                                    alt={category.naziv}
                                    style={{ width: '250px', height: '500px' }}
                                />
                                <h3>{category.naziv}</h3>
                            </div>
                        ))
                    ) : (
                        !loading && <p>Nema dostupnih kategorija</p>
                    )}
                </div>

                {selectedCategory && (
                    <div className="form-container" style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <div className="form-section" style={{ flex: 1 }}>
                            <div className="divider-custom">
                                <div className="divider-custom-line"></div>
                                <div className="divider-custom-icon"><i className="fas fa-user"></i></div>
                                <div className="divider-custom-line"></div>
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={plannerName}
                                    onChange={(e) => setPlannerName(e.target.value)}
                                    placeholder="Unesite naziv planera"
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    className="form-control"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Ostavite napomenu..."
                                />
                            </div>
                            <div className="form-group">
                                <p>Izaberite boju: </p>
                                <input
                                    type="color"
                                    className="form-control plus picker"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Izaberite font: </label>
                                <select
                                    value={font}
                                    className="form-control plus"
                                    onChange={(e) => setFont(e.target.value)}
                                >
                                    <option value="Arial">Arial</option>
                                    <option value="Times New Roman">Times New Roman</option>
                                    <option value="Courier New">Courier New</option>
                                    <option value="Verdana">Verdana</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Dodajte sliku: </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </div>
                        </div>

                        <div className="preview-section" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div
                                id="pdf-content"
                                style={{
                                    backgroundColor: color,
                                    width: '300px',
                                    height: '400px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    textAlign: 'center',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                }}
                            >
                                <h2
                                    style={{
                                        color: '#ffffff',
                                        fontFamily: font,
                                        fontSize: '24px',
                                        marginBottom: '20px',
                                    }}
                                >
                                    {selectedCategory.naziv}
                                </h2>
                                {previewImage && (
                                    <img
                                        src={previewImage}
                                        alt="Uploaded"
                                        style={{
                                            width: '150px',
                                            height: '150px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            border: '4px solid #ffffff',
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        <button className="btn btn-primary btn-lg mt-3" onClick={savePlanner}>
                            Dodaj u korpu
                        </button>
                    </div>
                )}

                <div style={{
                    position: 'fixed',
                    top: 0,
                    right: showCart ? '0' : '-300px',
                    width: '300px',
                    height: '100vh',
                    background: '#f8f9fa',
                    boxShadow: '-2px 0 5px rgba(0,0,0,0.2)',
                    padding: '20px',
                    transition: 'right 0.3s ease-in-out',
                    overflowY: 'auto'
                }}>
                    <h4>🛒 Korpa</h4>
                    {cart.length === 0 ? <p>Korpa je prazna</p> : (
                        cart.map((item, index) => (
                            <div key={index} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                                <strong>{item.naziv}</strong>
                                <div style={{
                                    background: item.boja,
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%'
                                }}></div>
                                {item.slika && <img src={item.slika} alt="Planer" style={{ width: '50px', height: '50px', borderRadius: '5px' }} />}
                                <button onClick={() => removeFromCart(index)} className="btn btn-danger mt-2">Obriši</button>
                            </div>
                        ))
                    )}
                    <div style={{ 
                        position: 'absolute', 
                        bottom: '20px', 
                        left: '50%', 
                        transform: 'translateX(-50%)', 
                        display: 'flex', 
                        gap: '10px' 
                    }}>
                        <button onClick={() => setShowCart(false)} className="btn btn-secondary">Zatvori</button>
                        <button onClick={handleProceedToOrder} className="btn btn-success">Nastavi narudžbinu</button>
                    </div>
                </div>

                <button
                    className="btn btn-dark"
                    style={{ position: 'fixed', top: '50px', right: '20px', zIndex: 1000 }}
                    onClick={() => setShowCart(!showCart)}
                >
                    🛒 Korpa ({cart.length})
                </button>
            </div>
        </section>
    );
}

export default CategoryList;