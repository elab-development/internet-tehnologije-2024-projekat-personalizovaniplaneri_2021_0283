import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-primary text-uppercase fixed-top">
      <div className="container">
        <Link className="navbar-brand text-white" to="/">Personalizovani Planeri</Link>
        <button className="navbar-toggler text-uppercase font-weight-bold bg-white text-primary rounded" 
                type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive">
          Menu <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link text-white" to="/">Početna</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/login">Prijava</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/register">Registracija</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/personalization">Personalizacija</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
