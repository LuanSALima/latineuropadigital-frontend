import React from 'react';


import { Container, Description,Image, Title, Time, Tag } from './styles';

import imageAux from '../../assets/icon.svg'

function NoticesCard(props) {

  const handleImageError =(image)=>{
    image.target.src = imageAux;
  };

  const date = (date) => {
    const today = Date.now();
    const postDate = new Date(date);
    const difer = Math.round((today-postDate.getTime())/1000); //Transformando milisegundo em segundo

    if(difer < 59) {
      if(Math.round(difer) === 1) {
        return ("1 segundo atrás");
      } else {
        return (Math.round(difer)+ " segundos atrás");
      }
    }

    if((difer/60) < 59) {
      if(Math.round(difer/60) === 1) {
        return ("1 minuto atrás");
      } else {
        return (Math.round(difer/60)+ " minutos atrás");
      }
    }

    if((difer/3600) < 23) {
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
      if(Math.round(dias/364) === 1) {
        return ("1 ano atrás");
      } else {
        return (Math.round(dias/365)+ " anos atrás");  
      }
    }
  }

  const formatText = (text) => {
    if(text.length > 75) {
      return text.substr(0,100)+"..";
    } else {
      return text;
    }
  }

  return (
    
    <Container>      
        {props.image?<Image>
        <img onError={handleImageError} src={props.image} alt={"Imagen de "+props.title}/>
        </Image>:null}
        <Description>
            <Title>
                {/* {props.icon?<img src={props.icon} alt={"Icone de "+props.title}/>:null} */}
                <div>
                {props.tag?
                props.tag.slice(0, 4).map((tag, index) => {
                  return <Tag key={index}><span>{tag}</span></Tag>
                })
                :
                null
                }
                </div>
                {props.title?
                  <label>
                  {props.title.length > 28?
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
              formatText(props.text).split('\n').map((text, index) => {
                  return <span key={index}>{text} <br/></span>
              })
            :
            <span>
              No text provided
            </span>
            }
            <Time>
          
              <hr/>
              {props.date?
                <span>{date(props.date)}</span>
                :
                <span>fecha no pasada</span>
              }
            </Time>
        </Description>
    </Container>
    
  );
}

export default NoticesCard;