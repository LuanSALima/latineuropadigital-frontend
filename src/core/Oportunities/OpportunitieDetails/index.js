import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import { OutlineButton, Page, AppButton, DetailsBlock, DetailsColumn, DetailsItem, RelativeDetailsBlock } from '../../../styles/default';
import Toastifying, {TOASTIFY_OPTIONS} from '../../../components/Toastifying'

import api from '../../../services/api';

import Footer from '../../../components/Footer';
import history from '../../../services/history/history'
import { toast } from 'react-toastify';

import {isAuthenticated} from '../../../services/auth';

import { MyScreenView } from "../OpportunitieList/styles";
import { Content } from "./styles";

function OpportunitieDetails(props) {

  const [idJob] = useState(props.match.params.id);
  const [job, setJob] = useState([]);

  useEffect(() => {

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

    findJob();
  }, [idJob]);

  const handleRemoveJob = async (e) => {
    e.preventDefault();

    try {
      await api.delete("/job/"+idJob);
      toast.success("Removido com Sucesso!",TOASTIFY_OPTIONS)
      setTimeout(() => {
        history.push('/dashboard')
      }, 1500);
    
    } catch (error) {
        toast.error("No se pudo eliminar" , TOASTIFY_OPTIONS)
     
    }
  }

  const handleEditJob = ()=>{
    history.push("/job/editar/"+idJob);
  }

  return (
    <Page>
    <Toastifying/>
    <Header/>
      <MyScreenView>
        <Content>

          <label>{job.title}</label>

          <hr/>

          <DetailsBlock>
            <DetailsColumn>

              <DetailsItem>
                <p>Professional Name:</p>
                <span>{job.professionalName}</span>
              </DetailsItem>

            </DetailsColumn>

            <DetailsColumn align="end" style={{borderLeft: '1px solid var(--color-freela-hover)'}}>

              <DetailsItem>
                <p>Professional Contact:</p>
                <span>{job.professionalContact}</span>
              </DetailsItem>

            </DetailsColumn>
            
          </DetailsBlock>

          <RelativeDetailsBlock>
            {
              job.link ?
              <AppButton
                onClick={() => {
                  window.location.assign(job.link);
                }}
              >
                Acessito
              </AppButton>
              :
              <></>
            }
          </RelativeDetailsBlock>

          <hr />

          {job.description?
            job.description.split('\n').map((content, index) => {
              return <p key={index}>{content} <br /></p>
            })
            :
            <></>
          }

        </Content>
        {isAuthenticated() && (
          <div>
            <OutlineButton type="danger" onClick={handleRemoveJob}>
              {"Eliminar"}
            </OutlineButton>
            <OutlineButton type="warning" onClick={handleEditJob}>
              {"Editar"}
            </OutlineButton>
          </div>
        )}
      </MyScreenView>
    <Footer/>
  </Page>
  );
}

export default OpportunitieDetails;