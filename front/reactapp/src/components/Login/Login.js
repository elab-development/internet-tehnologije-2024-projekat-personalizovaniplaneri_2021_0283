import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(email + password);
            const response = await axios.post('http://localhost:8000/api/login', { email, password });
           localStorage.setItem('token', response.data.access_token);
            navigate('/personalization');
        } catch (error) {
            alert("Pogrešan e-mail ili lozinka!");
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
            </div>
        </section>
    );
};
 
export default Login;
