import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <section className="page-section bg-light text-center">
        <div className="container">
          <h2 className="page-section-heading text-uppercase text-secondary mb-0">Dobrodošli</h2>
          <div className="divider-custom">
            <div className="divider-custom-line"></div>
            <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
            <div className="divider-custom-line"></div>
          </div>
          <p className="lead">Personalizujte svoj planer i organizujte svoj dan na moderan način!</p>
          <div className="row justify-content-center">
            <div className="col-md-4">
              <button className="btn btn-outline-primary btn-lg" onClick={() => navigate("/login")}>Prijava</button>
            </div>
            <div className="col-md-4">
              <button className="btn btn-outline-primary btn-lg" onClick={() => navigate("/register")}>Registracija</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
