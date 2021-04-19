import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import { Details, Outline_Button, Page, AppButton, DetailsBlock, DetailsColumn, DetailsItem, RelativeDetailsBlock } from '../../../styles/default';
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

function OportunitiesDetails(props) {

  const [removeButtonText, setRemoveButtonText] = useState("Remover");

  const [idOportunities] = useState(props.match.params.id);
  const [oportunities, setOportunities] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [errors, setErrors] = useState({});

  async function findOportunities() {
    try {
      const response = await api.get("/oportunities/"+idOportunities);

      if(response.data.success) {
        if(response.data.oportunities) {
          setOportunities(response.data.oportunities);
        }
        if(response.data.featured) {
          setFeatured(response.data.featured);
        }
      }
    } catch (error) {
      setErrors({message: "Não foi possível encontrar este oportunities"});
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
    findOportunities();
  }, []);

  const handleRemoveDirectory = async (e) => {
    e.preventDefault();

    try {
      await api.delete("/oportunities/"+idOportunities);
      toast.success("Removido com Sucesso!",TOASTIFY_OPTIONS)
      setTimeout(() => {
        history.push('/dashboard')
      }, 1500);
    
    } catch (error) {
        toast.error("Não foi possível remover" , TOASTIFY_OPTIONS)
     
    }
  }
  const handleEditeDirectory = ()=>{
    history.push("/oportunities/editar/"+idOportunities);
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
        const response = await api.post("/featured/create", {post: oportunities._id, postType: 'oportunities'});
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

          <label>{oportunities.businessName}</label>

          {oportunities.imagePath ?
            <MyImage>
              <img
                onError={handleImageError}
                src={process.env.REACT_APP_API_URL + oportunities.imagePath}
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
                <span>{oportunities.businessAddress}</span>
              </DetailsItem>

              <DetailsItem>
                <p>Ciudad:</p>
                <span>{oportunities.businessCity}</span>
              </DetailsItem>
              
              <DetailsItem>
                <p>Provincia:</p>
                <span>{oportunities.businessProvince}</span>
              </DetailsItem>
              
              <DetailsItem>
                <p>Código postal:</p>
                <span>{oportunities.businessPostalCode}</span>
              </DetailsItem>
             
              <DetailsItem>
                <p>Teléfono:</p>
                <span>{oportunities.businessPhone}</span>
                <span>{oportunities.businessSecondPhone ? oportunities.businessSecondPhone : ""}</span>
              </DetailsItem>
              
            </DetailsColumn>
            {/* Final Part */}
            <DetailsColumn align="end" style={{borderLeft: '1px solid var(--color-freela-hover)'}}>

              <DetailsItem>
                <p>Nombre de contacto:</p>
                <span>{oportunities.contactName}</span>
              </DetailsItem>
             
              <DetailsItem>
                <p>Telefono para contacto:</p>
                <span>{oportunities.contactPhone}</span>
              </DetailsItem>
              
              <DetailsItem>
                <p>Email de contacto:</p>
                <span>{oportunities.contactEmail}</span>
              </DetailsItem>
              
            </DetailsColumn>
            
          </DetailsBlock>

          <RelativeDetailsBlock>
            {
              oportunities.businessWebsite ?
              <AppButton
                onClick={() => {
                  window.location.assign(oportunities.businessWebsite);
                }}
              >
                Acessito
              </AppButton>
              :
              <></>
            }
            
          </RelativeDetailsBlock>

          <hr/>

          {oportunities.businessDescription?
            oportunities.businessDescription.split('\n').map((content) => {
              if(content === '') {
                return <br />
              } else {
                return <p>{content}</p>
              }
            })
            :
            <></>
          }
          
        </Content>
        {isAuthenticated() && (
          <div>
            <Outline_Button type="danger" onClick={handleRemoveDirectory}>
              {"Eliminar"}
            </Outline_Button>
            <Outline_Button type="warning" onClick={handleEditeDirectory}>
              {"Editar"}
            </Outline_Button>
          </div>
        )}
      </MyScreenView>
    <Footer/>
  </Page>
  );
}

export default OportunitiesDetails;