import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import { Details, Page, Outline_Button, AppButton, DetailsBlock, DetailsColumn, DetailsItem, RelativeDetailsBlock } from '../../../styles/default';
import Toastifying, {TOASTIFY_OPTIONS} from '../../../components/Toastifying'
import api from '../../../services/api';
import {isAuthenticated} from '../../../services/auth'

import Footer from '../../../components/Footer';
import imgAux from '../../../assets/icon.svg';
import { toast } from 'react-toastify';
import history from '../../../services/history/history'
import Stars from '../../../components/Stars';

import { MyScreenView } from "../EventList/styles";
import { Content, MyImage } from "./styles";

function EventDetails(props) {

  const [removeButtonText, setRemoveButtonText] = useState("Remover");

  const [idEvent] = useState(props.match.params.id);
  const [event, setEvent] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [errors, setErrors] = useState({});

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
      setErrors({message: "Não foi possível encontrar este Evento"});
      if(error.response) {
        if(error.response.data) {
          if(error.response.data.message) {
            setErrors({message: error.response.data.message});
          }
        }
      }
    }
  }

  useEffect(() => {
    findEvent();
  }, []);

  const handleRemoveEvent = async (e) => {
    e.preventDefault();
    setRemoveButtonText("Removendo ...");

    try {
    await api.delete("/event/"+idEvent);
    toast.success("Removido com Sucesso!",TOASTIFY_OPTIONS)
      
    setTimeout(() => {
        history.push('/dashboard')
      }, 1500);
    } catch (error) {
      toast.error("Não foi Possível Remover",TOASTIFY_OPTIONS)
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
          toast.success("Removido dos destaques com sucesso", TOASTIFY_OPTIONS);
          
          setFeatured(null);
        }
      } else {
        const response = await api.post("/featured/create", {post: event._id, postType: 'Event'});
        if(response.data.success) {
          toast.success("Adicionado aos destaques com sucesso", TOASTIFY_OPTIONS);
          if(response.data.featured) {
            setFeatured(response.data.featured);
          }
        }
      }
    } catch (error) {
      toast.error("Não foi Possível Adicionar aos Destaques",TOASTIFY_OPTIONS)
    }
  }

  return (
      <Page>
        <Header/>
        <MyScreenView>
        <Content>
          {isAuthenticated() === true ? (
            <Stars isFeature={featured} onClick={updateFeatured} />
          ) : null}
          <Toastifying />

          <label>{event.eventName}</label>

          <hr/>

          {event.imagePath ?
            <MyImage>
              <img
                onError={handleImageError}
                src={process.env.REACT_APP_API_URL + event.imagePath}
              />
            </MyImage>
          :
            <div></div>
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
            {/*

            Não há nenhum campo no BCD que seja um link, por exemplo o directory possui o WebSite

            <AppButton
              onClick={() => {
                
              }}
            >
              Acessito
            </AppButton>
            */}
          </RelativeDetailsBlock>
        
          <hr />

          <p>{event.eventDescription}</p>

        </Content>
        {isAuthenticated() && (
          <div>
            <Outline_Button type="danger" onClick={handleRemoveEvent}>
              {"Eliminar"}
            </Outline_Button>
            <Outline_Button type="warning" onClick={handleEditeEvent}>
              {"Editar"}
            </Outline_Button>
          </div>
        )}
      </MyScreenView>
        <Footer/>
      </Page>
  );
}

export default EventDetails;