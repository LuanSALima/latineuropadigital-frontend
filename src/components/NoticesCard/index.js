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
                {props.title?<label>{props.title}</label>:null}
            </Title>
            {props.text?<span>{props.text}</span>:null}
        </Description>
    </Container>
    
  );
}

export default NoticesCard;