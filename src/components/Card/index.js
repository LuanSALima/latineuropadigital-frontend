import React from 'react';

 import { Container ,Description} from './styles';

function Card(props) {
  return(
        <Container>
         {props.title?<label>{props.title}</label>:null}
           <Description>
           {props.text?<span>{props.text}</span>:null}
               {props.image?<img src={props.image}/>:null}
               {props.button?<button onClick={props.onClick}>{props.button}</button>:null}
           </Description>
        </Container>
  )
          }
export default Card;