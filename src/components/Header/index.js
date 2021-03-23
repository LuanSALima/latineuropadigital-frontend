import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import icon from '../../assets/icon.svg'
import './styles.css';

function Header() {
  return (
    <Navbar collapseOnSelect className="headerStyles" expand="lg">
      <Link to="/">
      <Navbar.Brand className="headerTitle "><img src={icon}/></Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/noticias">
            <div className="headerLinks">
              <span className="texts">NOTICIAS</span>
            </div>
          </Link>
          <Link to="/celebridades">
            <div className="headerLinks">
              <span className="texts">EVENTOS</span>
            </div>
          </Link>
          <Link to="/eventos">
            <div className="headerLinks">
              <span className="texts">AGENDA</span>
            </div>
          </Link>
          <Link to="/oportunidades">
            <div className="headerLinks">
              <span className="texts">OPORTUNIDADE</span>
            </div>
          </Link>
          
        </Nav>
        <Nav>
          <Link to="/login">
            <div className="headerLinks">
              <span className="texts">LOGIN</span>
            </div>
          </Link>
          <Link to="/cadastro">
            <div className="headerLinks">
              <span className="texts">CADASTRO</span>
            </div>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;