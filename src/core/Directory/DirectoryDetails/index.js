import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import { Details, Outline_Button, Page, AppButton } from '../../../styles/default';
import imgAux from '../../../assets/icon.svg';
import Toastifying, {TOASTIFY_OPTIONS} from '../../../components/Toastifying'

import api from '../../../services/api';

import Footer from '../../../components/Footer';
import history from '../../../services/history/history'
import { toast } from 'react-toastify';
import Stars from '../../../components/Stars';

import {isAuthenticated} from '../../../services/auth';

import { MyScreenView } from "../DirectoryList/styles";
import { Content, MyImage } from "./styles";

function DirectoryDetails(props) {

  const [removeButtonText, setRemoveButtonText] = useState("Remover");

  const [idDirectory] = useState(props.match.params.id);
  const [directory, setDirectory] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [errors, setErrors] = useState({});

  async function findDirectory() {
    try {
      const response = await api.get("/directory/"+idDirectory);

      if(response.data.success) {
        if(response.data.directory) {
          setDirectory(response.data.directory);
        }
        if(response.data.featured) {
          setFeatured(response.data.featured);
        }
      }
    } catch (error) {
      setErrors({message: "Não foi possível encontrar este Directory"});
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
    findDirectory();
  }, []);

  const handleRemoveDirectory = async (e) => {
    e.preventDefault();

    try {
      await api.delete("/directory/"+idDirectory);
      toast.success("Removido com Sucesso!",TOASTIFY_OPTIONS)
      setTimeout(() => {
        history.push('/dashboard')
      }, 1500);
    
    } catch (error) {
        toast.error("Não foi possível remover" , TOASTIFY_OPTIONS)
     
    }
  }
  const handleEditeDirectory = ()=>{
    history.push("/directory/editar/"+idDirectory);
  }
  const handleImageError = (image)=>{
    image.target.src = imgAux;
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
        const response = await api.post("/featured/create", {post: directory._id, postType: 'Directory'});
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

          <label>{directory.businessName}</label>

          <br></br>
          <hr></hr>
          <MyImage>
            <img
              onError={handleImageError}
              src={process.env.REACT_APP_API_URL + directory.imagePath}
            />
          </MyImage>
          <br></br>
          <hr></hr>

          <h4></h4>

          <p>{directory.businessDescription}</p>

          <br />

          <span>Localización:</span>
          <span>{directory.businessAddress}</span>
          <br />

          <span>Ciudad:</span>
          <span>{directory.businessCity}</span>
          <br />

          <span>Provincia:</span>
          <span>{directory.businessProvince}</span>
          <br />

          <span>Código postal:</span>
          <span>{directory.businessPostalCode}</span>
          <br />

          <span>Teléfono:</span>
          <span>{directory.businessPhone}</span>
          <span>{directory.businessSecondPhone}</span>
          <br />

          <hr/>

          <span>Nombre de contacto:</span>
          <span>{directory.contactName}</span>
          <br />

          <span>Telefono para contacto:</span>
          <span>{directory.contactPhone}</span>
          <br />

          <span>Email de contacto:</span>
          <span>{directory.contactEmail}</span>
          <br />

        </Content>
      </MyScreenView>
    <Footer/>
  </Page>
  );
}

export default DirectoryDetails;