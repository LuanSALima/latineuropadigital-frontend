import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './styles.css';

import { isAuthenticated, getUser } from "../../services/auth";

function Header() {
  return (
    <Navbar collapseOnSelect className="headerStyles" expand="lg">
      <Link to="/">
      <Navbar.Brand className="headerTitle texts">LatineuroPadigital</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/noticias">
            <div className="headerLinks">
              <span className="texts">Notícias</span>
            </div>
          </Link>
          <Link to="/celebridades">
            <div className="headerLinks">
              <span className="texts">Celebridades</span>
            </div>
          </Link>
          <Link to="/eventos">
            <div className="headerLinks">
              <span className="texts">Eventos</span>
            </div>
          </Link>
          <Link to="/oportunidades">
            <div className="headerLinks">
              <span className="texts">Oportunidades</span>
            </div>
          </Link>
          
        </Nav>
        {isAuthenticated()
        ?
        <Nav>
          <NavDropdown className="headerLinks texts" title={getUser() ? getUser().username : "Missing Username"} id="collasible-nav-dropdown">
            <Link to="/cadastrar-job" className="dropdown-item">Cadastrar Job</Link>
            <Link to="/alterar-senha" className="dropdown-item">Alterar Senha</Link>
          </NavDropdown>

          <Link to="/logout">
            <div className="headerLinks">
              <span className="texts">Logout</span>
            </div>
          </Link>
        </Nav>
        :
        <Nav>
          <Link to="/login">
            <div className="headerLinks">
              <span className="texts">Login</span>
            </div>
          </Link>
          <Link to="/cadastro">
            <div className="headerLinks">
              <span className="texts">Cadastro</span>
            </div>
          </Link>
        </Nav>
        }
        
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;