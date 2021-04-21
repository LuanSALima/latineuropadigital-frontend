import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import icon from '../../assets/icon.svg'
import './styles.css';

import {isAuthenticated, getUser } from "../../services/auth";

function Header() {
  return (
    <Navbar collapseOnSelect className="headerStyles" expand="lg">
      <Link to="/">
      <Navbar.Brand className="headerTitle "><img src={icon} alt="Logotipo de Latin Europa Digital"/></Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {
          ! isAuthenticated() ? 
          (
          <>
          <Nav className="mr-auto">
      
        <Link to="/noticias">
            <div className="headerLinks">
              <span className="texts">ACTUALIDAD</span>
            </div>
          </Link>
      
          
          <Link to="/diretorios">
            <div className="headerLinks">
              <span className="texts">DIRECTORIO</span>
            </div>
          </Link>
          <Link to="/eventos">
            <div className="headerLinks">
              <span className="texts">AGENDA</span>
            </div>
          </Link>
          <Link to="/cursos">
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
        <Nav>
        <NavDropdown alignRight className="headerSuperLink texts" title="ANUNCIAR">
          <Link to="/diretorio/anunciar" className="dropdown-item">DIRECTORIO</Link>
          <Link to="/evento/anunciar" className="dropdown-item">EVENTO</Link>
          <Link to="/job/cadastrar" className="dropdown-item">OPORTUNIDADE</Link>
        </NavDropdown>
      </Nav>
        </>
        ):null}
      
       { isAuthenticated()? (
<>       
       <Nav className="mr-auto">
          <NavDropdown className="headerLinks texts" title="ACTUALIDAD">
            <Link to="/noticias" className="dropdown-item">Lista de Actualidad</Link>
            <Link to="/notice/cadastrar" className="dropdown-item">Anunciar Actualidad</Link>
          </NavDropdown>
      
          <NavDropdown className="headerLinks texts" title="DIRECTORIO">
            <Link to="/diretorios" className="dropdown-item">Lista de Directorios Aceptado</Link>
            <Link to="/diretorios-Pendiente" className="dropdown-item">Lista de Directorios Pendiente</Link>
            <Link to="/diretorio/anunciar" className="dropdown-item">Anunciar Directorio</Link>
          </NavDropdown>

          <NavDropdown className="headerLinks texts" title="AGENDA">
            <Link to="/eventos" className="dropdown-item">Lista de Eventos Aceptado</Link>
            <Link to="/eventos-Pendiente" className="dropdown-item">Lista de Eventos Pendiente</Link>
            <Link to="/evento/anunciar" className="dropdown-item">Anunciar Eventos</Link>
          </NavDropdown>

          <NavDropdown className="headerLinks texts" title="EDUCACIÓN">
            <Link to="/cursos" className="dropdown-item">Lista de Cursos</Link>
            <Link to="/course/cadastrar" className="dropdown-item">Anunciar Cursos</Link>
          </NavDropdown>
          <NavDropdown className="headerLinks texts" title="OPORTUNIDADES">
            <Link to="/oportunidades" className="dropdown-item">Lista de Aceitas</Link>
            <Link to="/oportunidades-Pendiente" className="dropdown-item">Lista de Pendiente</Link>
            <Link to="/job/cadastrar" className="dropdown-item">Anunciar</Link>
          </NavDropdown>
          </Nav>
          <Nav>
          <NavDropdown alignRight className="headerLinks texts " title={getUser() ? getUser().username : "Missing Username"} id="collasible-nav-dropdown">
            <Link to="/dashboard" className="dropdown-item">Dashboard</Link>
            <Link to="/logout" className="dropdown-item">Logout</Link>
          </NavDropdown>


        </Nav>
        </>):null}
        
      
  
        
          
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;