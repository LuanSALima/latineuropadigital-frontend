import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import { Page } from '../../styles/default';

import api from '../../services/api';
import Footer from '../../components/Footer';
function Job(props) {
  return (
    <div style={{marginBottom: '15px'}}>
      <span style={{fontSize: '18px'}}>Título: </span>
      <span>{props.job.title}</span>
      <br />
      <span style={{fontSize: '18px'}}>Descrição: </span>
      <span>{props.job.description}</span>
      <br />
      <span style={{fontSize: '18px'}}>Nome:</span>
      <span>{props.job.professionalName}</span>
      <span style={{fontSize: '18px', marginLeft: '10px'}}>Contato:</span>
      <span>{props.job.professionalContact}</span>
    </div>
  );
}

function OpportunitieList(props) {

  const [jobs, setJobs] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {

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
    listJobs();

  }, []);

  return (
  <Page>
    <Header/>
    <h1>Oportunidades</h1>
    <h2 style={{color: 'red'}}>{errors.message}</h2>
     {jobs.map((currentjob)=>(
        <Job job={currentjob} />
      ))}
      <Footer/>
  </Page>);
}

export default OpportunitieList;