import React from 'react';

import { Container, Description,Image, Title } from './styles';

function NoticesCard(props) {
  return (
    
    <Container>      
        {props.image?<Image>
        <img src={props.image}/>
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