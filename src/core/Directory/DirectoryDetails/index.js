import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import { OutlineButton, Page, AppButton, DetailsBlock, DetailsColumn, DetailsItem, RelativeDetailsBlock } from '../../../styles/default';
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

  const [removeButtonText, setRemoveButtonText] = useState("Eliminar");

  const [idDirectory] = useState(props.match.params.id);
  const [directory, setDirectory] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {

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
        setErrors({message: "No se pudo encontrar este directorio"});
        if(error.message) {
          setErrors({message: error.message});
        }
      }
    }
    findDirectory();
  }, [idDirectory]);

  const handleRemoveDirectory = async (e) => {
    e.preventDefault();
    setRemoveButtonText("Eliminando ...");

    try {
      await api.delete("/directory/"+idDirectory);

      setRemoveButtonText("Eliminado con éxito");
      toast.success("Eliminado con éxito!",TOASTIFY_OPTIONS)
      setTimeout(() => {
        history.push('/dashboard')
      }, 1500);
    
    } catch (error) {
      setRemoveButtonText("No se pudo eliminar");
      toast.error("No se pudo eliminar" , TOASTIFY_OPTIONS);
    }
  }
  const handleEditeDirectory = ()=>{
    history.push("/directory/editar/"+idDirectory);
  }
  const handleImageError = (image)=>{
    //image.target.src = imgAux;
    image.target.style.display='none'
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
          <h2 style={{color: 'red'}}>{errors.message}</h2>

          {isAuthenticated() === true ? (
            <Stars isFeature={featured} onClick={updateFeatured} />
          ) : null}
          <Toastifying />

          <label>{directory.businessName}</label>

          {directory.imagePath ?
            <MyImage>
              <img
                onError={handleImageError}
                src={process.env.REACT_APP_API_URL + directory.imagePath}
                alt={"Imagen de "+directory.businessName}
              />
            </MyImage>
          :
            <></>
          }

          <hr/>

          <DetailsBlock>
            <DetailsColumn>

              <DetailsItem>
                <p>Localización:</p>
                <span>{directory.businessAddress}</span>
              </DetailsItem>

              <DetailsItem>
                <p>Ciudad:</p>
                <span>{directory.businessCity}</span>
              </DetailsItem>
              
              <DetailsItem>
                <p>Provincia:</p>
                <span>{directory.businessProvince}</span>
              </DetailsItem>
              
              <DetailsItem>
                <p>Código postal:</p>
                <span>{directory.businessPostalCode}</span>
              </DetailsItem>
             
              <DetailsItem>
                <p>Teléfono:</p>
                <span>{directory.businessPhone}</span>
                <span>{directory.businessSecondPhone ? directory.businessSecondPhone : ""}</span>
              </DetailsItem>
              
            </DetailsColumn>
            {/* Final Part */}
            <DetailsColumn align="end" style={{borderLeft: '1px solid var(--color-freela-hover)'}}>

              <DetailsItem>
                <p>Nombre de contacto:</p>
                <span>{directory.contactName}</span>
              </DetailsItem>
             
              <DetailsItem>
                <p>Telefono para contacto:</p>
                <span>{directory.contactPhone}</span>
              </DetailsItem>
              
              <DetailsItem>
                <p>Email de contacto:</p>
                <span>{directory.contactEmail}</span>
              </DetailsItem>
              
            </DetailsColumn>
            
          </DetailsBlock>

          <RelativeDetailsBlock>
            {
              directory.businessWebsite ?
              <AppButton
                onClick={() => {
                  window.location.assign(directory.businessWebsite);
                }}
              >
                Acessito
              </AppButton>
              :
              <></>
            }
          </RelativeDetailsBlock>

          <hr/>

          {directory.businessDescription?
            directory.businessDescription.split('\n').map((content, index) => {
              return <p key={index}>{content} <br /></p>
            })
            :
            <></>
          }
          
        </Content>
        {isAuthenticated() && (
          <div>
            <OutlineButton type="danger" onClick={handleRemoveDirectory}>
              {removeButtonText}
            </OutlineButton>
            <OutlineButton type="warning" onClick={handleEditeDirectory}>
              {"Editar"}
            </OutlineButton>
          </div>
        )}
      </MyScreenView>
    <Footer/>
  </Page>
  );
}

export default DirectoryDetails;