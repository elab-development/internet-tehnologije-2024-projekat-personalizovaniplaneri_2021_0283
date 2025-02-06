import React from "react";

function Login() {
  return (
    <section className="page-section">
      <div className="container d-flex flex-column align-items-center">
        <h2 className="text-uppercase text-secondary mb-3">Prijava</h2>
        <div className="divider-custom">
          <div className="divider-custom-line"></div>
          <div className="divider-custom-icon"><i className="fas fa-user"></i></div>
          <div className="divider-custom-line"></div>
        </div>
        <form className="w-50">
          <div className="form-group">
            <label>Email</label>
            <input type="email" className="form-control" placeholder="Unesite email" />
          </div>
          <div className="form-group">
            <label>Lozinka</label>
            <input type="password" className="form-control" placeholder="Unesite lozinku" />
          </div>
          <button type="submit" className="btn btn-primary btn-lg mt-3">Prijavi se</button>
        </form>
      </div>
    </section>
  );
}

export default Login;
