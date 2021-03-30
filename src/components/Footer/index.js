import React from 'react';
import { Link } from 'react-router-dom';

import { FooterStyles} from './styles';

function Footer() {
  return  ( <FooterStyles>
      <div>
          <label>Dirección : Lisboa, Edíficio Vera Cruz, 20</label>
          <label>Sitio :<a> www.soluçõesonline.com</a></label>
          <label>Contacto : (+351)217 854-999</label>

          <Link to="/login">
        Adm Platform
        </Link>
      </div>
     
  </FooterStyles> );
}

export default Footer;