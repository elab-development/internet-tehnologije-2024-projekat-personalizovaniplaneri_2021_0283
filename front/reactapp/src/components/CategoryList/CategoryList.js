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

    const savePlanner = async () => {
        const formData = new FormData();
        formData.append('category_id', selectedCategory.id);
        formData.append('naziv', plannerName);
        formData.append('boja', color);
        formData.append('font', font);
        formData.append('tekst', text);
    
        // Dodajte sliku ako postoji
        if (image) {
            formData.append('slika', image); // Koristite 'slika' kao ključ
        }
    
        // Proverite sadržaj FormData
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
    
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/customizations', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data', // Obavezno za slanje fajlova
                },
            });
            console.log('Planer sačuvan:', response.data);
            alert('Planer uspešno dodat u korpu!');
        } catch (error) {
            console.error('Greška:', error.response?.data || error.message);
            alert('Došlo je do greške pri čuvanju planera.');
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
                                    padding: '10px',
                                    margin: '10px',
                                }}
                            >
                                <img
                                    src={`/images/${category.naziv.toLowerCase()}.jpg`}
                                    alt={category.naziv}
                                    style={{ width: '100px', height: '100px' }}
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
                        {/* Form Section (Left side) */}
                        
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

                        {/* Preview Section (Right side) */}
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
                                {/* Naziv with selected font and color */}
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
                        {/* Generate PDF button */}
                        <button
                            className="btn btn-primary btn-lg mt-3"
                            onClick={savePlanner}
                        >
                            Dodaj u korpu
                        </button>
                    </div>
                )}
                
                
            </div>
        </section>
    );
}

export default CategoryList;

