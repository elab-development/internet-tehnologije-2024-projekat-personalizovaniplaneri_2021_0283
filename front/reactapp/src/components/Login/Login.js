import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [isErrorModalOpen, setErrorModalOpen] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Pokušaj admin prijave...");
            const response = await axios.post('http://127.0.0.1:8000/api/admin/login', { email, password }, {
                headers: { 'Accept': 'application/json' }
            });
            console.log("Uspešna admin prijava:", response.data);
            localStorage.setItem('token', response.data.access_token);
            window.location.href = '/dashboard';  // Preusmeravanje na admin dashboard
        } catch (adminError) {
            console.error("Neuspešna admin prijava:", adminError.response?.data);
        try {
            console.log(email + password);
            const response = await axios.post('http://localhost:8000/api/login', { email, password });
           localStorage.setItem('token', response.data.access_token);
           setModalOpen(true); // Otvori modal
           setEmail('');
           setPassword('');

           // Nakon 3 sekunde zatvaramo modal i preusmeravamo
           setTimeout(() => {
               setModalOpen(false);
               navigate('/personalization'); // Preusmeravanje
           }, 3000);

       } catch (error) {
        setErrorModalOpen(true); // Otvori modal za neuspeh
        setEmail('');
        setPassword('');

        // Nakon 3 sekunde zatvoriti modal za neuspeh
        setTimeout(() => {
            setErrorModalOpen(false); // Zatvori modal za neuspeh
            }, 3000);
        }
    }
};
 
    return (
        <section className="page-section">
            <div className="container d-flex flex-column align-items-center">
                <h2 className="text-uppercase text-secondary mb-3">Prijava</h2>
                <div className="divider-custom">
                    <div className="divider-custom-line"></div>
                    <div className="divider-custom-icon"><i className="fas fa-user"></i></div>
                    <div className="divider-custom-line"></div>
                </div>
                <form className="w-50" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            placeholder="Unesite email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Lozinka:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            placeholder="Unesite lozinku"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg mt-3">Prijavi se</button>
                </form>
                {/* Modal za obaveštenje */}
                <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Prijava uspešna">
                    <p>Uspešno ste prijavljeni!</p>
                </Modal>
                <Modal isOpen={isErrorModalOpen} onClose={() => setErrorModalOpen(false)} title="Greška pri prijavi">
                    <p>Pogrešna lozinka ili email, pokušajte ponovo!</p>
                </Modal>
            </div>
        </section>
    );
};
 
export default Login;
