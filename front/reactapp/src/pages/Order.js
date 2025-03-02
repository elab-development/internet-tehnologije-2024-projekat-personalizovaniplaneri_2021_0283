import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import jsPDF from 'jspdf';

function Order() {
    const [cart, setCart] = useState([]);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
        const price = savedCart.reduce((sum, item) => sum + (item.cena || 0), 0);
        setTotalPrice(price);
    }, []);

    const getUserIdFromToken = async () => {
        const token = localStorage.getItem('token');
        
        if (!token) return null;

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/user', {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response.data.id)
            return response.data.id;
        } catch (error) {
            console.error('Greška pri dobijanju korisnika:', error);
            return null;
        }
    };

    const handleOrder = async () => {
        if (!address || !phone) {
            alert('Molimo unesite adresu i broj telefona.');
            return;
        }
    
        const userId = await getUserIdFromToken();
        if (!userId) {
            alert('Korisnik nije ulogovan.');
            return;
        }
    
        const orderData = cart.map(item => ({
            naziv: item.naziv,
            boja: item.boja,
            font: item.font,
            tekst: item.tekst,
            category_id: item.category_id,
            slika: item.slika,
            cena: item.cena,
            user_id: userId,
        }));
    
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://127.0.0.1:8000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(orderData),
            });
    
            if (!response.ok) {
                throw new Error('Došlo je do greške pri slanju narudžbine.');
            }
    
            alert('Narudžbina uspešno poslata!');
            localStorage.removeItem('cart');

            // Generiši PDF
            generatePDF();

            navigate('/');
        } catch (error) {
            console.error('Greška pri slanju narudžbine:', error.message);
            alert('Došlo je do greške pri slanju narudžbine.');
        }
    };

    const generatePDF = () => {
        const doc = new jsPDF();
    
        // Naslov
        doc.setFontSize(18);
        doc.text('Račun za narudžbinu', 10, 10);
    
        // Detalji narudžbine
        doc.setFontSize(12);
        let yPos = 20;
    
        cart.forEach((item, index) => {
            doc.text(`Proizvod ${index + 1}: ${item.naziv}`, 10, yPos);
            yPos += 10;
            doc.text(`Boja: ${item.boja}`, 10, yPos);
            yPos += 10;
            doc.text(`Font: ${item.font}`, 10, yPos);
            yPos += 10;
            doc.text(`Napomena: ${item.tekst}`, 10, yPos);
            yPos += 10;
            doc.text(`Cena: ${item.cena} RSD`, 10, yPos);
            yPos += 15; // Dodajemo više prostora između proizvoda
        });
    
        // Ukupna cena
        doc.setFontSize(14);
        doc.text(`Ukupna cena: ${totalPrice} RSD`, 10, yPos);
    
        // Adresa i telefon
        yPos += 15;
        doc.text(`Adresa: ${address}`, 10, yPos);
        yPos += 10;
        doc.text(`Telefon: ${phone}`, 10, yPos);
    
        // Sačuvaj PDF
        doc.save('racun.pdf');
    };

    const generatePDF = () => {
        const doc = new jsPDF();
    
        // Naslov
        doc.setFontSize(18);
        doc.text('Račun za narudžbinu', 10, 10);
    
        // Detalji narudžbine
        doc.setFontSize(12);
        let yPos = 20;
    
        cart.forEach((item, index) => {
            doc.text(`Proizvod ${index + 1}: ${item.naziv}`, 10, yPos);
            yPos += 10;
            doc.text(`Boja: ${item.boja}`, 10, yPos);
            yPos += 10;
            doc.text(`Font: ${item.font}`, 10, yPos);
            yPos += 10;
            doc.text(`Napomena: ${item.tekst}`, 10, yPos);
            yPos += 10;
            doc.text(`Cena: ${item.cena} RSD`, 10, yPos);
            yPos += 15; // Dodajemo više prostora između proizvoda
        });
    
        // Ukupna cena
        doc.setFontSize(14);
        doc.text(`Ukupna cena: ${totalPrice} RSD`, 10, yPos);
    
        // Adresa i telefon
        yPos += 15;
        doc.text(`Adresa: ${address}`, 10, yPos);
        yPos += 10;
        doc.text(`Telefon: ${phone}`, 10, yPos);
    
        // Sačuvaj PDF
        doc.save('racun.pdf');
    };

    return (
        <section className="page-section">
            <div className="container">
                <h2 className="text-uppercase text-secondary mb-3">Narudžbina</h2>
                <div className="divider-custom">
                    <div className="divider-custom-line"></div>
                    <div className="divider-custom-icon"><i className="fas fa-shopping-cart"></i></div>
                    <div className="divider-custom-line"></div>
                </div>

                <div className="cart-items">
                    {cart.length === 0 ? (
                        <p>Korpa je prazna.</p>
                    ) : (
                        cart.map((item, index) => (
                            <div key={index} className="cart-item" style={{ marginBottom: '20px', padding: '10px', borderBottom: '1px solid #ccc' }}>
                                <h3>{item.naziv}</h3>
                                {item.slika && (
                                    <img
                                        src={item.slika}
                                        alt={item.naziv}
                                        style={{ width: '100%', maxWidth: '200px', height: 'auto', borderRadius: '10px' }}
                                    />
                                )}
                                <p>Boja: <span style={{ backgroundColor: item.boja, padding: '5px', borderRadius: '5px' }}>{item.boja}</span></p>
                                <p>Font: {item.font}</p>
                                <p>Napomena: {item.tekst}</p>
                                <p>Cena: {item.cena} RSD</p>
                            </div>
                        ))
                    )}
                </div>

                <div className="form-group">
                    <label>Adresa:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Unesite adresu"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Telefon:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Unesite broj telefona"
                        required
                    />
                </div>

                <div className="total-price" style={{ marginTop: '20px', fontSize: '1.2em', fontWeight: 'bold' }}>
                    Ukupna cena: {totalPrice} RSD
                </div>

                <button className="btn btn-primary btn-lg mt-3" onClick={handleOrder}>
                    Pošalji narudžbinu
                </button>
                
            </div>
        </section>
    );
}

export default Order;