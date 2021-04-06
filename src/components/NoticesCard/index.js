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
                {/* {props.icon?<img src={props.icon}/>:null} */}
               <div>{props.tag?
                props.tag.map((tag) => {
                  return <span style={{margin: '0 5px', padding: '2px 10px', color: 'white', backgroundColor: '#2f2d2d'}}>{tag}</span>
                })
                :
                null}</div>
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
        </Description>
    </Container>
    
  );
}

export default NoticesCard;