import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import { Page, OutlineButton, AppButton, DetailsBlock, DetailsColumn, DetailsItem, RelativeDetailsBlock } from '../../../styles/default';
import Toastifying, {TOASTIFY_OPTIONS} from '../../../components/Toastifying'
import api from '../../../services/api';
import {isAuthenticated} from '../../../services/auth'

import Footer from '../../../components/Footer';
import { toast } from 'react-toastify';
import history from '../../../services/history/history'
import Stars from '../../../components/Stars';

import { MyScreenView } from "../EventList/styles";
import { Content, MyImage } from "./styles";

function EventDetails(props) {

  const [removeButtonText, setRemoveButtonText] = useState("Eliminar");

  const [idEvent] = useState(props.match.params.id);
  const [event, setEvent] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {

    async function findEvent() {
      try {
        const response = await api.get("/event/"+idEvent);

        if(response.data.success) {
          if(response.data.event) {
            setEvent(response.data.event);
          }
          if(response.data.featured) {
            setFeatured(response.data.featured);
          }
        }
      } catch (error) {
        setErrors({message: "No se pudo encontrar esta agenda"});
        if(error.message) {
          setErrors({message: error.message});
        }
      }
    }

    findEvent();
  }, [idEvent]);

  const handleRemoveEvent = async (e) => {
    e.preventDefault();
    setRemoveButtonText("Eliminando ...");

    try {
    await api.delete("/event/"+idEvent);

    setRemoveButtonText("Eliminado con éxito!");
    toast.success("Eliminado con éxito!",TOASTIFY_OPTIONS)
      
    setTimeout(() => {
        history.push('/dashboard')
      }, 1500);
    } catch (error) {
      setRemoveButtonText("No se pudo eliminar");
      toast.error("No se pudo eliminar",TOASTIFY_OPTIONS)
    }
  }

  const handleImageError = (image)=>{
    //image.target.src = imgAux;
    image.target.style.display='none'
  }

  const handleEditeEvent = ()=>{
    history.push("/event/editar/"+idEvent);
  }

  const updateFeatured = async (e) => {
    e.preventDefault();

    try {
      if(featured) {
        const response = await api.delete("/featured/"+featured._id);
        if(response.data.success) {
          toast.success("Eliminado con éxito de lo más destacado", TOASTIFY_OPTIONS);
          
          setFeatured(null);
        }
      } else {
        const response = await api.post("/featured/create", {post: event._id, postType: 'Event'});
        if(response.data.success) {
          toast.success("Agregado con éxito a los aspectos más destacados", TOASTIFY_OPTIONS);
          if(response.data.featured) {
            setFeatured(response.data.featured);
          }
        }
      }
    } catch (error) {
      toast.error("No se pudo agregar a lo más destacado",TOASTIFY_OPTIONS)
    }
  }

  return (
      <Page>
        <Header/>
        <MyScreenView>
        <Content>
          <h2 style={{color: 'red'}}>{errors.message}</h2>

          {isAuthenticated() === true ? (
            <Stars isFeature={featured} onClick={updateFeatured} />
          ) : null}
          <Toastifying />

          <label>{event.eventName}</label>

          {event.imagePath ?
            <MyImage>
              <img
                onError={handleImageError}
                src={process.env.REACT_APP_API_URL + event.imagePath}
                alt={"Imagen de "+event.eventName}
              />
            </MyImage>
          :
            <></>
          }

          <hr />

          <DetailsBlock>
            <DetailsColumn>

              <DetailsItem>
                <p>Localización:</p>
                <span>{event.eventAddress}</span>
              </DetailsItem>

              <DetailsItem>
                <p>Local:</p>
                <span>{event.eventLocation}</span>
              </DetailsItem>
             
              <DetailsItem>
                <p>Precio de la entrada:</p>
                <span>{event.eventTicketPrice}</span>
              </DetailsItem>
              
              <DetailsItem>
                <p>Mas informaciones:</p>
                <span>{event.eventMoreInfo}</span>
              </DetailsItem>

            </DetailsColumn>
            <DetailsColumn align="end" style={{borderLeft: '1px solid black'}}>

              <DetailsItem>
                <p>Nombre de contacto:</p>
                <span>{event.contactName}</span>
              </DetailsItem>
             
              <DetailsItem>
                <p>Telefono para contacto:</p>
                <span>{event.contactPhone}</span>
              </DetailsItem>
              
              <DetailsItem>
                <p>Email de contacto:</p>
                <span>{event.contactEmail}</span>
              </DetailsItem>
              
            </DetailsColumn>
            
          </DetailsBlock>

         
          <RelativeDetailsBlock>
            <DetailsItem align="center">
              <p>Fecha:</p>
              <span>{event.eventDate}</span>
            </DetailsItem>
            <DetailsItem align="center">
              <p>Cronograma:</p>
              <span>{event.eventTime}</span>
            </DetailsItem>
            {
              event.link ?
              <AppButton
                onClick={() => {
                  window.location.assign(event.link);
                }}
              >
                Acessito
              </AppButton>
              :
              <></>
            }
          </RelativeDetailsBlock>
        
          <hr />
          
          {event.eventDescription?
            event.eventDescription.split('\n').map((content, index) => {
              return <p key={index}>{content} <br /></p>
            })
            :
            <></>
          }

        </Content>
        {isAuthenticated() && (
          <div>
            <OutlineButton type="danger" onClick={handleRemoveEvent}>
              {removeButtonText}
            </OutlineButton>
            <OutlineButton type="warning" onClick={handleEditeEvent}>
              {"Editar"}
            </OutlineButton>
          </div>
        )}
      </MyScreenView>
        <Footer/>
      </Page>
  );
}

export default EventDetails;