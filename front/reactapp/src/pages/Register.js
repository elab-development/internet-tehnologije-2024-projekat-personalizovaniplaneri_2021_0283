import React, { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();


  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Ime je obavezno.";
    if (!lastName.trim()) newErrors.lastName = "Prezime je obavezno.";
    if (!email.trim()) {
      newErrors.email = "Email je obavezan.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email nije validan.";
    }
    if (!password.trim()) {
      newErrors.password = "Lozinka je obavezna.";
    } else if (password.length < 6) {
      newErrors.password = "Lozinka mora imati najmanje 6 karaktera.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    /*e.preventDefault();
    if (validateForm()) {
      // Add your registration logic here (e.g., API call to Laravel backend)
      console.log("Name:", name, "Email:", email, "Password:", password);
    }*/
      e.preventDefault();
      if (!validateForm()) return;
  
      try {
        const response = await fetch("http://localhost:8000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            lastName,
            email,
            password,
          }),
        });
  
        const data = await response.json();
        if (response.ok) {
          setModalOpen(true);
          setMessage("Uspešna registracija! Možete se prijaviti.");
          setName("");
          setEmail("");
          setPassword("");
          setErrors({});
        } else {
          setErrors(data.errors || { general: "Greška pri registraciji." });
        }
      } catch (error) {
        setErrors({ general: "Došlo je do greške, pokušajte ponovo kasnije." });
      }
  };
  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        setModalOpen(false);
        navigate("/login"); // Preusmeravanje na login
      }, 3000);
    }
  }, [isModalOpen, navigate]);

  return (
    <section className="page-section">
      <div className="container d-flex flex-column align-items-center">
        <h2 className="text-uppercase text-secondary mb-3">Registracija</h2>
        <div className="divider-custom">
          <div className="divider-custom-line"></div>
          <div className="divider-custom-icon"><i className="fas fa-user-plus"></i></div>
          <div className="divider-custom-line"></div>
        </div>
        <form className="w-50" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Ime</label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Unesite ime"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="form-group">
            <label>Prezime</label>
            <input
              type="text"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Unesite prezime"
            />
            {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Unesite email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label>Lozinka</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="Unesite lozinku"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <button type="submit" className="btn btn-primary btn-lg mt-3">Registruj se</button>
        </form>
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Registracija uspešna">
          <p>Uspešno ste registrovani!</p>
        </Modal>
      </div>
    </section>
  );
}

export default Register;

