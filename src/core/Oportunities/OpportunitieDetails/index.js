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

import { MyScreenView } from "../OpportunitieList/styles";
import { Content, MyImage } from "./styles";

function OpportunitieDetails(props) {

  const [idJob] = useState(props.match.params.id);
  const [job, setJob] = useState([]);

  async function findJob() {
    try {
      const response = await api.get("/job/"+idJob);
      if(response.data.success) {
        if(response.data.job) {
          setJob(response.data.job);
        }
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    findJob();
  }, []);

  const handleRemoveJob = async (e) => {
    e.preventDefault();

    try {
      await api.delete("/job/"+idJob);
      toast.success("Removido com Sucesso!",TOASTIFY_OPTIONS)
      setTimeout(() => {
        history.push('/dashboard')
      }, 1500);
    
    } catch (error) {
        toast.error("Não foi possível remover" , TOASTIFY_OPTIONS)
     
    }
  }

  const handleEditJob = ()=>{
    history.push("/job/editar/"+idJob);
  }

  const handleImageError = (image)=>{
    //image.target.src = imgAux;
    image.target.style.display='none'
  }

  return (
    <Page>
    <Header/>
      <MyScreenView>
      <Content>

      <label>{job.title}</label>
      <h4>{job.professionalName}</h4>
      <h4>{job.professionalContact}</h4>
      <h4>{job.description}</h4>
      <p>{job.jobTypes}</p>
      <hr/>
        
      {job.content?
            job.content.split('\n').map((content) => {
              return <p>{content} <br /></p>
            })
            :
            <></>
          }

       
        </Content>
        {isAuthenticated() && (
          <div>
            <Outline_Button type="danger" onClick={handleRemoveJob}>
              {"Eliminar"}
            </Outline_Button>
            <Outline_Button type="warning" onClick={handleEditJob}>
              {"Editar"}
            </Outline_Button>
          </div>
        )}
      </MyScreenView>
    <Footer/>
  </Page>
  );
}

export default OpportunitieDetails;