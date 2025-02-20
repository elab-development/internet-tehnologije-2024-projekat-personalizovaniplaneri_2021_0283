import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login/Login";
import Register from "./pages/Register";
import Personalization from "./pages/Personalization";
import Navbar from "./components/Navbar";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CategoryList from "./components/CategoryList/CategoryList";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./components/Dashboard";
import AdminRoute from "./components/AdminRoute";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/personalization" element={
          <PrivateRoute> {/* Protect ruta kojo prosledjujemo dete komponentu PostList */}
            <CategoryList />
          </PrivateRoute>
        } />
        <Route path="/dashboard" element={
          <AdminRoute> {/* Protect dashboard */}
            <Dashboard />
          </AdminRoute>
        } />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/personalization" element={<Personalization />} /> */}
      </Routes>
    </Router>
  );
}

export default App;