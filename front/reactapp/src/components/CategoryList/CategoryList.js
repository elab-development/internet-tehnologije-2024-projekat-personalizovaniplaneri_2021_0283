import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver'; // For downloading the PDF
import html2canvas from 'html2canvas'; // For capturing the content as an image
import jsPDF from 'jspdf'; // For generating the PDF

function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [color, setColor] = useState('#000000'); // Default color: black
    const [font, setFont] = useState('Arial'); // Default font: Arial
    const [image, setImage] = useState(null); // For uploaded image
    const [previewImage, setPreviewImage] = useState(null); // For image preview
    const [plannerName, setPlannerName] = useState('');
    const [text, setText] = useState('');
    const [cart, setCart] = useState([]); // Korpa state
    const [showCart, setShowCart] = useState(false); // Da li je korpa vidljiva

    // Fetch categories
    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`http://127.0.0.1:8000/api/categories`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
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

    // Handle category selection
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewImage(URL.createObjectURL(file)); // Preview the uploaded image
        }
    };

    // Add planner to cart
    const savePlanner = async () => {
        if (!selectedCategory) {
            alert("Izaberite kategoriju!");
            return;
        }
    
        const newPlanner = {
            naziv: plannerName || "Moj planer",
            boja: color,
            font: font,
            tekst: text,
            slika: previewImage, // Prikaz slike ako je dodata
            category_id: selectedCategory.id, // ID kategorije
        };
    
        // Kreiranje FormData objekta za slanje slike zajedno sa drugim podacima
        const formData = new FormData();
        formData.append('naziv', newPlanner.naziv);
        formData.append('boja', newPlanner.boja);
        formData.append('font', newPlanner.font);
        formData.append('tekst', newPlanner.tekst);
        formData.append('category_id', newPlanner.category_id);
        if (previewImage) {
            formData.append('slika', previewImage);
        }
    
        // Dodavanje planera u korpu (lokalno stanje)
        const token = localStorage.getItem('token');
        try {
            // Slanje podataka na backend za čuvanje u bazi
            const response = await axios.post('http://127.0.0.1:8000/api/customizations', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            const plannerWithId = {
                ...newPlanner, 
                id: response.data.planner.id, 
                customizationId: response.data.customization_id // Dodajemo customization_id
            };
            setCart([...cart, plannerWithId]);
    
            console.log('Planer sačuvan:', response.data);
            alert('Planer uspešno dodat u korpu!');
        } catch (error) {
            console.error('Greška:', error.response?.data || error.message);
            alert('Došlo je do greške pri čuvanju planera.');
        }
    };
    
    const removeFromCart = async (plannerId, customizationId) => {
        // Prvo ukloni planer iz lokalne korpe
        setCart(cart.filter(planner => planner.id !== plannerId));
    
        const token = localStorage.getItem('token');
        try {
            // Pošaljemo DELETE zahtev ka backendu da obrišemo customizaciju iz baze
            await axios.delete(`http://127.0.0.1:8000/api/customizations/${customizationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Planer i customizacija uspešno obrisani');
        } catch (error) {
            console.error('Greška pri brisanju planera:', error.response?.data || error.message);
            alert('Došlo je do greške pri brisanju planera.');
        }
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

                {/* Display categories */}
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
                        !loading && categories.length === 0 && <p>Nema dostupnih kategorija</p>
                    )}
                </div>

                {/* Display form for color, font, and image */}
                {selectedCategory && (
                    <div className="form-container" style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <div className="form-section" style={{ flex: 1 }}>
                            <div className="divider-custom">
                                <div className="divider-custom-line"></div>
                                <div className="divider-custom-icon"><i className="fas fa-user"></i></div>
                                <div className="divider-custom-line"></div>
                            </div>
                            {/* Unos naziva planera */}
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={plannerName}
                                    onChange={(e) => setPlannerName(e.target.value)}
                                    placeholder="Unesite naziv planera"
                                />
                            </div>

                            {/* Unos teksta */}
                            <div className="form-group">
                                <textarea
                                    className="form-control"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    placeholder="Ostavite napomenu..."
                                />
                            </div>

                            {/* Color picker */}
                            <div className="form-group">
                                <p>Izaberite boju: </p>
                                <input
                                    type="color"
                                    className="form-control plus picker"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                />
                            </div>

                            {/* Font picker */}
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

                            {/* Image upload */}
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

                        {/* Preview Section */}
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

                                {/* Image preview */}
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

                        {/* Add to Cart button */}
                        <button className="btn btn-primary btn-lg mt-3" onClick={savePlanner}>
                            Dodaj u korpu
                        </button>
                    </div>
                )}

                {/* Cart Sidebar */}
                <div style={{
                    position: 'fixed',
                    top: 0,
                    right: showCart ? '0' : '-300px', // Prikaz na klik
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
                                <p style={{ fontSize: '14px' }}>{item.category}</p>
                                <div style={{
                                    background: item.boja,
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%'
                                }}></div>
                                {item.slika && <img src={item.slika} alt="Planer" style={{ width: '50px', height: '50px', borderRadius: '5px' }} />}
                                <button onClick={() => removeFromCart(item.id, item.customizationId)} className="btn btn-danger mt-2">Obriši</button>
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
                    <button onClick={() => window.location.href='/order'} className="btn btn-success">Nastavi narudžbinu</button>
                </div>
                </div>

                {/* Cart button */}
                <button
                    className="btn btn-dark"
                    style={{ position: 'fixed', top: '50px', right: '20px', zIndex:1000 }}
                    onClick={() => setShowCart(!showCart)}
                >
                    🛒 Korpa ({cart.length})
                </button>
            </div>
        </section>
    );
}

export default CategoryList;
