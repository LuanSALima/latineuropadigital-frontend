import React, { useState, useEffect } from 'react';

import Header from '../../../components/Header';
import { Page } from '../../../styles/default';

import api from '../../../services/api';
import Footer from '../../../components/Footer';
import { MyScreenView, OportunityCard } from '../OpportunitieList/styles';

function Job(props) {
  return (
    <OportunityCard>
    <label >{props.job.title}</label>
      <span >Nome: <b>{props.job.professionalName}</b></span>
      <span >Descrição: <b>{props.job.description}</b></span>
      <span >Contato: <b>{props.job.professionalContact}</b></span>
  </OportunityCard>
  );
}

function OpportunitiePendents(props) {

  const [jobs, setJobs] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {

    async function listJobs() {
      try {
        const response = await api.get("/jobs/pendent");

        if(response.data.success) {
          if(response.data.jobs) {
            setJobs(response.data.jobs);
          }
        }
      } catch (error) {
        setErrors({message: "Não foi possível carregar as Oportunidades"});
        if(error.response) {
          if(error.response.data) {
            if(error.response.data.message) {
              setErrors({message: error.response.data.message});
            }
          }
        }
      }
    }
    listJobs();

  }, []);

  return (
  <Page>
    <Header/>
    <MyScreenView>
    <h1>OPORTUNIDADES PENDIENTES</h1>
    <h2 style={{color: 'red'}}>{errors.message}</h2>
     {jobs.map((currentjob)=>(
        <Job job={currentjob} />
      ))}
    </MyScreenView>
  
      <Footer/>
  </Page>);
}

export default OpportunitiePendents;