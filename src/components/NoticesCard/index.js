import React from 'react';

import { Container, Description,Image, Title, Time } from './styles';
import imageAux from '../../assets/icon.svg'
function NoticesCard(props) {

  const handleImageError =(image)=>{
    image.target.src = imageAux;
  };

  const date = (date) => {
    const today = Date.now();
    const postDate = new Date(date);
    const difer = Math.round((today-postDate.getTime())/1000);

    if(difer < 60) {
      if(Math.round(difer) === 1) {
        return ("1 segundo atrás");
      } else {
        return (Math.round(difer)+ " segundos atrás");
      }
    }

    if((difer/60) < 60) {
      if(Math.round(difer/60) === 1) {
        return ("1 minuto atrás");
      } else {
        return (Math.round(difer/60)+ " minutos atrás");
      }
    }

    if((difer/3600) < 60) {
      if(Math.round(difer/3600) === 1) {
        return ("1 hora atrás");
      } else {
        return (Math.round(difer/3600)+ " horas atrás");
      }
    }

    const dias = Math.round(difer/86400);

    if((dias) < 6) {
      if(dias === 1) {
        return ("1 dia atrás");
      } else {
        return (Math.round(difer/86400)+ " dias atrás");
      }
    }

    if((dias/7) < 4) {
      if(Math.round(dias/7) === 1) {
        return ("1 semana atrás");
      } else {
        return (Math.round(difer/604800)+ " semanas atrás"); 
      }
    }

    if(dias < 365) {
      if(Math.round(dias/30) === 1) {
        return ("1 mês atrás");
      } else {
        return (Math.round(dias/30)+ " meses atrás");  
      }
    } else {
      if(Math.round(dias/365) === 1) {
        return ("1 ano atrás");
      } else {
        return (Math.round(dias/365)+ " anos atrás");  
      }
    }
  }

  return (
    
    <Container>      
        {props.image?<Image>
        <img onError={handleImageError} src={props.image}/>
        </Image>:null}
        <Description>
            <Title>
                {/* {props.icon?<img src={props.icon}/>:null} */}
             
                 {props.tag?
                props.tag.map((tag) => {
                  return   <div><span >{tag}</span> </div>
                })
                :
                null}
               
                {props.title?
                  <label>
                  {props.title.length > 18?
                    props.title.substr(0,28)+".."
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
                    props.text.substr(0,100)+".."
                    :
                    props.text}
              </span>
            :
            <span>
              No text provided
            </span>
            }
            <Time>
              Data Atual: {new Date().toString()}
              <br />
              Data Post: {new Date(props.date).toString()}
              <hr/>
              {props.date?
                date(props.date)
                :
                'data não passada'
              }
            </Time>
        </Description>
    </Container>
    
  );
}

export default NoticesCard;