import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './styles.css';

function Header() {
  return (
    <Navbar collapseOnSelect className="headerStyles" expand="lg">
      <Link to="/">
      <Navbar.Brand className="headerTitle texts">LatineuroPadigital</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/products">
            <div className="headerLinks">
              <span className="texts">Notícias</span>
            </div>
          </Link>
          <Link to="/products">
            <div className="headerLinks">
              <span className="texts">Celebridades</span>
            </div>
          </Link>
          <Link to="/products">
            <div className="headerLinks">
              <span className="texts">Eventos</span>
            </div>
          </Link>
          <Link to="/products">
            <div className="headerLinks">
              <span className="texts">Oportunidades</span>
            </div>
          </Link>
          
        </Nav>
        <Nav>
          <Link to="/login">
            <div className="headerLinks">
              <span className="texts">Login</span>
            </div>
          </Link>
          <Link to="/register">
            <div className="headerLinks">
              <span className="texts">Cadastro</span>
            </div>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;