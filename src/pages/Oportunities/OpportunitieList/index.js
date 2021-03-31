import React, { useState, useEffect } from 'react';

import Header from '../../../components/Header';
import { Page } from '../../../styles/default';

import api from '../../../services/api';
import Footer from '../../../components/Footer';
import { MyScreenView,OportunityCard } from './styles';


function Job(props) {
  return (
    <OportunityCard>
      <label>{props.job.title}</label>
      <span >Nome: <b>{props.job.professionalName}</b></span>
      <span >Descrição: <b>{props.job.description}</b></span>
      <span >Contato: <b>{props.job.professionalContact}</b></span>
    </OportunityCard>
  );
}

function OpportunitieList(props) {

  const [jobs, setJobs] = useState([]);
  const [errors, setErrors] = useState({});



  async function listJobs() {
    try {
      const response = await api.get("/job/list");

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

  useEffect(() => {
    listJobs();
  }, []);

  return (
  <Page>
    <Header/>
    <MyScreenView>

    <h1>Oportunidades</h1>
    <h2 style={{color: 'red'}}>{errors.message}</h2>
     {jobs.map((currentjob)=>(
        <Job job={currentjob} />
      ))}

    </MyScreenView>
      <Footer/>
  </Page>);
}

export default OpportunitieList;