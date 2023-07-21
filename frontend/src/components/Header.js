import React from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import headerLogo from "../images/logo.svg";

function Header({loggedIn, userEmail, onSignOut}) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    onSignOut();
    navigate('/sign-in');
  };

  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="логотип проекта"/>
      {loggedIn ? (
        <nav className="header__navigate">
          <span>{userEmail}</span>
          <Link className="header__sign-out" onClick={handleSignOut}>
            Выйти
          </Link>
        </nav>
      ) : location.pathname === '/sign-in' ? (
        <nav className="header__navigate">
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </nav>
      ) : location.pathname === '/sign-up' ? (
        <nav className="header__navigate">
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        </nav>
      ) : null}
    </header>
  );
}

export default Header;
