import React from 'react';
import { Link } from 'react-router-dom';

import { FooterStyles} from './styles';

function Footer() {
  return  ( <FooterStyles>
      <div>
          <label>Dirección : Lisboa, Edíficio Vera Cruz, 20</label>
          <label>Sitio :<a> www.soluçõesonline.com</a></label>
          <label>Contacto : (+351)217 854-999</label>
      </div>
      <Link to="/login">
      <div>  
        <label>
        Adm Platform
        </label>
     
        </div>      
        </Link>
  </FooterStyles> );
}

export default Footer;