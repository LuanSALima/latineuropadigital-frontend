import React from 'react';

import { FooterStyles} from './styles';

function Footer() {
  return  ( <FooterStyles>
      <div>
          <label>Endereço : Lisboa, Edíficio Vera Cruz, 20</label>
          <label><a>Site : www.soluçõesonline.com</a></label>
          <label>Contato : (+351)217 854-999</label>
      </div>

  </FooterStyles> );
}

export default Footer;