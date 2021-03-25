import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import icon from '../../assets/icon.svg'
import './styles.css';

import { isAuthenticated, isAdmin, getUser } from "../../services/auth";

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
              <span className="texts">ACTUALIDAD</span>
            </div>
          </Link>
      
          
          <Link to="/diretorio">
            <div className="headerLinks">
              <span className="texts">DIRECTORIO</span>
            </div>
          </Link>
          <Link to="/agenda">
            <div className="headerLinks">
              <span className="texts">AGENDA</span>
            </div>
          </Link>
          <Link to="/educacao">
            <div className="headerLinks">
              <span className="texts">EDUCACIÓN</span>
            </div>
          </Link>
          <Link to="/oportunidades">
            <div className="headerLinks">
              <span className="texts">OPORTUNIDADES</span>
            </div>
          </Link>
          
        </Nav>

      
       

        {isAuthenticated() ?
        <Nav>

          <NavDropdown className="headerLinks texts" title={"Anunciar/Editar"}>
            <Link to="/criar-post" className="dropdown-item"> Anunciar Noticias</Link>
            <Link to="/teste" className="dropdown-item">Anunciar Directorio</Link>
            <Link to="/teste" className="dropdown-item"> Anunciar Evento</Link>
            <Link to="/teste" className="dropdown-item">Anunciar Educación</Link>
            <Link to="/cadastrar-job" className="dropdown-item">Anunciar Oportunidad</Link>
            <hr></hr>
            <Link to="/teste" className="dropdown-item">Para Editar Noticias</Link>
            <Link to="/teste" className="dropdown-item">Para Editar Directorio</Link>
            <Link to="/teste" className="dropdown-item">Para Editar Evento</Link>
            <Link to="/teste" className="dropdown-item">Para Editar Educación</Link>
            <Link to="/teste" className="dropdown-item">Para Editar Oportunidad</Link>
          </NavDropdown>

          <NavDropdown className="headerLinks texts" title={getUser() ? getUser().username : "Missing Username"} id="collasible-nav-dropdown">
            <Link to="/cadastrar-job" className="dropdown-item">Cadastrar Job</Link>
            <Link to="/teste" className="dropdown-item">Outro Link</Link>
          </NavDropdown>


          <Link to="/logout">
            <div className="headerLinks">
              <span className="texts">Logout</span>
            </div>
          </Link>
        </Nav>
        : 
        <Nav>
        <Link to="/cadastro">
          <div className="headerLinks">
            <span className="texts">ANUNCIAR</span>
          </div>
        </Link>
      </Nav>
  
        }
          
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;