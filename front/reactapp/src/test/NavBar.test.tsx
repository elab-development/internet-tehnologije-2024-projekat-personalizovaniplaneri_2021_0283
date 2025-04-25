import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar.jsx';
import { BrowserRouter } from 'react-router-dom';

test('Navbar se prikazuje', () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
  const pocetnaLink = screen.getByText('Početna');
  expect(pocetnaLink).toBeInTheDocument();
});

test('Navigacioni linkovi ispravno usmeravaju', () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  // Provera linka "Početna"
  const pocetnaLink = screen.getByText('Početna');
  fireEvent.click(pocetnaLink);
  expect(window.location.pathname).toBe('/');

  // Provera linka "Prijava"
  const prijavaLink = screen.getByText('Prijava');
  fireEvent.click(prijavaLink);
  expect(window.location.pathname).toBe('/login');

  // Provera linka "Registracija"
  const registracijaLink = screen.getByText('Registracija');
  fireEvent.click(registracijaLink);
  expect(window.location.pathname).toBe('/register');

  // Provera linka "Personalizacija"
  const personalizacijaLink = screen.getByText('Personalizacija');
  fireEvent.click(personalizacijaLink);
  expect(window.location.pathname).toBe('/personalization');
});