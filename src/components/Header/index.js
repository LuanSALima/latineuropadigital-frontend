import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import icon from '../../assets/icon.svg'
import './styles.css';

import {isAdmin, getUser } from "../../services/auth";

function Header() {
  return (
    <Navbar collapseOnSelect className="headerStyles" expand="lg">
      <Link to="/">
      <Navbar.Brand className="headerTitle "><img src={icon}/></Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        {
          ! isAdmin() ? 
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
        <Link to="/job/cadastrar">
          <div className="headerLinks">
            <span className="texts">ANUNCIAR</span>
          </div>
        </Link>
      </Nav>
        </>
        ):null}
      
       { isAdmin()? (
<>       
       <Nav className="mr-auto">
          <NavDropdown className="headerLinks texts" title="ACTUALIDAD">
            <Link to="/noticias" className="dropdown-item">Listar Actualidad</Link>
            <Link to="/notice/cadastrar" className="dropdown-item">Anunciar Actualidad</Link>
          </NavDropdown>
      
          <NavDropdown className="headerLinks texts" title="DIRECTORIO">
            <Link to="/diretorios" className="dropdown-item">Listar Directorio</Link>
            <Link to="/directory/cadastrar" className="dropdown-item">Anunciar Directorio</Link>
          </NavDropdown>

          <NavDropdown className="headerLinks texts" title="AGENDA">
            <Link to="/eventos" className="dropdown-item">Listar Eventos</Link>
            <Link to="/event/cadastrar" className="dropdown-item">Anunciar Eventos</Link>
          </NavDropdown>

          <NavDropdown className="headerLinks texts" title="EDUCACIÓN">
            <Link to="/cursos" className="dropdown-item">Listar Cursos</Link>
            <Link to="/course/cadastrar" className="dropdown-item">Anunciar Cursos</Link>
          </NavDropdown>
          <NavDropdown className="headerLinks texts" title="OPORTUNIDADES">
            <Link to="/oportunidades" className="dropdown-item">Listar Aceitas</Link>
            <Link to="/oportunidades-pendentes" className="dropdown-item">Listar Pendentes</Link>
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