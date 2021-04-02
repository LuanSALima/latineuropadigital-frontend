import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import { Details, Page, Outline_Button } from '../../../styles/default';
import Toastifying, {TOASTIFY_OPTIONS} from '../../../components/Toastifying'
import api from '../../../services/api';
import {isAuthenticated} from '../../../services/auth'

import { isAdmin } from '../../../services/auth';
import Footer from '../../../components/Footer';
import imgAux from '../../../assets/icon.svg';
import { toast } from 'react-toastify';
import history from '../../../services/history/history'
import Stars from '../../../components/Stars';

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
    image.target.src = imgAux;
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
      toast.error("Não foi Possível Remover",TOASTIFY_OPTIONS)
    }
  }

  return (
      <Page>
        <Header/>
        <Details width={"90%"}>
        {isAuthenticated() === true ? <Stars isFeature={featured} onClick={updateFeatured} />: null}
        <Toastifying/>
   
        <label>{event.title}</label>
        <h3>{event.subtitle}</h3>
        <img onError={handleImageError} src={process.env.REACT_APP_API_URL+event.imagePath} />
        <h4> Contenido </h4>
        <span>{event.content}</span>
        
        {
        isAdmin() &&
        <div>
          <Outline_Button type="danger" onClick={handleRemoveEvent}>{"Eliminar"}</Outline_Button>
          <Outline_Button type="warning" onClick={handleEditeEvent}>{"Editar"}</Outline_Button>
        </div>
        }

        </Details>
        <Footer/>
      </Page>
  );
}

export default EventDetails;