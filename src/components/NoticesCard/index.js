import React from 'react';

import { Container, Description,Image, Title } from './styles';
import imageAux from '../../assets/icon.svg'
function NoticesCard(props) {

  const handleImageError =(image)=>{
    image.target.src = imageAux;
  };

  return (
    
    <Container>      
        {props.image?<Image>
        <img onError={handleImageError} src={props.image}/>
        </Image>:null}
        <Description>
            <Title>
                {props.icon?<img src={props.icon}/>:null}
                {props.title?
                  <label>
                  {props.title.length > 18?
                    props.title.substr(0,18)+".."
                    :
                    props.title}
                  </label>
                :
                <label>
                  No Title provided
                </label>
              }
            </Title>
            {props.text?
              <span>
              {props.text.length > 75?
                    props.text.substr(0,75)+".."
                    :
                    props.text}
              </span>
            :
            <span>
              No text provided
            </span>
            }
        </Description>
    </Container>
    
  );
}

export default NoticesCard;