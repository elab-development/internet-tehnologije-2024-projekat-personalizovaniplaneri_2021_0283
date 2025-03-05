import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import Breadcrumbs from '../components/Breadcrumbs';
import Button from '../components/Button';
import Modal from '../components/Modal';


function Order() {
    const [cart, setCart] = useState([]);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [isAdressModalOpen, setAdressModalOpen] = useState(false);  // Uspešan modal
    const [isErrorModalOpen, setErrorModalOpen] = useState(false);
    const [isUserModalOpen, setUserModalOpen] = useState(false);
    const [isTypeModalOpen, setTypeModalOpen] = useState(false);
    const [isOrderModalOpen, setOrderModalOpen] = useState(false);
    const [isPhoneModalOpen, setPhoneModalOpen] = useState(false);


    const navigate = useNavigate();

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
        const price = savedCart.reduce((sum, item) => sum + (item.cena || 0), 0);
        setTotalPrice(price);
    }, []);

    const getUserFromToken = async () => {
        const token = localStorage.getItem('token');
        
        if (!token) {
            console.log('Nema tokena!');
            return null;
        }

        try {
            const response = await axios.get('http://127.0.0.1:8000/api/user', {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('Korisnički podaci:', response.data);
            return response.data; // Returns the user object which contains type_id
        } catch (error) {
            console.error('Greška pri dobijanju korisnika:', error);
            return null;
        }
    };

    const handleOrder = async () => {
        // Validacija unosa adrese
        if (!address) {
            setAdressModalOpen(true);  // Otvori modal za neuspeh
            setTimeout(() => setAdressModalOpen(false), 5000);
            return;
        }
    
        // Validacija unosa broja telefona (proveravamo osnovni format telefona)
        const phoneRegex = /^[+]?[0-9]{1,4}[ ]?[(]?[0-9]{1,4}[)]?[-\s]?[0-9]{1,4}[-\s]?[0-9]{1,4}$/;
        if (!phone || !phoneRegex.test(phone)) {
            setPhoneModalOpen(true); // Otvori modal za neuspeh
            setTimeout(() => setPhoneModalOpen(false), 5000);
            return;
        }
    
        const user = await getUserFromToken();
        if (!user) {
            setUserModalOpen(true);  // Otvori modal za neuspeh
            setTimeout(() => setUserModalOpen(false), 2000);
            navigate('/login'); // Preusmeri na login ako korisnik nije ulogovan
            return;
        }
    
        console.log('Proveravam type_id:', user.type_id);
    
        // Check if user is a guest (type_id = 3)
        if (user.type_id === 3) {
            setTypeModalOpen(true);  // Otvori modal za neuspeh
            setTimeout(() => setTypeModalOpen(false), 2000);
            navigate('/login'); // Redirect guest users to login
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
            user_id: user.id, // Use the user's id for the order
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
    
            setOrderModalOpen(true);
            setTimeout(() => setOrderModalOpen(false), 3000);
            localStorage.removeItem('cart');
    
            // Generiši PDF
            generatePDF();
    
            setTimeout(() => {
                navigate('/'); // Redirect after 3 seconds
            }, 3000); // 3000 milisekundi = 3 sekunde
    
        } catch (error) {
            console.error('Greška pri slanju narudžbine:', error.message);
            setErrorModalOpen(true);  // Otvori modal za grešku
            setTimeout(() => setErrorModalOpen(false), 3000);
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

    return (
        <section className="page-section">
            <div className="container">
            <Breadcrumbs />
            <h2 className="text-uppercase text-secondary mb-3" style={{ textAlign: 'center' }}>Narudžbina</h2>
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

                <Button text="Naruči" onClick={handleOrder} className="btn-primary btn-lg mt-3"/>
                <Modal isOpen={isTypeModalOpen} onClose={() => setTypeModalOpen(false)} title="Ulogujte se!">
                    <p>Morate biti ulogovan korisnik!</p>
                </Modal>
                <Modal isOpen={isUserModalOpen} onClose={() => setUserModalOpen(false)} title="Ulogujte se!">
                    <p>Korisnik nije ulogovan!</p>
                </Modal>
                <Modal isOpen={isAdressModalOpen} onClose={() => setAdressModalOpen(false)} title="Adresa i broj!">
                    <p>Unesite Vašu adresu i broj telefona!</p>
                </Modal>
                <Modal isOpen={isErrorModalOpen} onClose={() => setErrorModalOpen(false)} title="Greška!">
                    <p>Greška pri slanju narudžbine!</p>
                </Modal>
                <Modal isOpen={isOrderModalOpen} onClose={() => setOrderModalOpen(false)} title="Uspešno!">
                    <p>Narudžbina uspešno poslata!</p>
                </Modal>
                <Modal isOpen={isPhoneModalOpen} onClose={() => setPhoneModalOpen(false)} title="Format!">
                    <p>Broj telefona treba sadržati samo cifre!</p>
                </Modal>
            </div>
        </section>
    );
}

export default Order;
