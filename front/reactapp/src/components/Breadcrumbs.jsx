import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Ovo mapira stranice na ime koje se prikazuje u breadcrumbs
  const breadcrumbNames = {
    home: 'Početna',
    login: 'Prijava',
    order: 'Narudžbina',
    personalization: 'Personalizacija',
    register: 'Registracija'
  };

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/personalization">Personalizacija</Link>
        </li>
        {pathnames.map((value, index) => {
          const breadcrumbPath = `/${pathnames.slice(0, index + 1).join('/')}`;
          const breadcrumbName = breadcrumbNames[value] || value.charAt(0).toUpperCase() + value.slice(1);

          return (
            <li key={breadcrumbPath} className="breadcrumb-item">
              <Link to={breadcrumbPath}>{breadcrumbName}</Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
