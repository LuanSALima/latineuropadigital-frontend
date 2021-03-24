import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import { Page } from '../../styles/default';

import api from '../../services/api';

function Job(props) {
  return (
    <div style={{marginBottom: '15px'}}>
      <span style={{fontSize: '18px'}}>Título: </span>
      <span>{props.job.title}</span>
      <br />
      <span style={{fontSize: '18px'}}>Descrição: </span>
      <span>{props.job.description}</span>
      <br />
      <span style={{fontSize: '18px'}}>Nome Usuário:</span>
      <span>{props.job.owner.username}</span>
      <span style={{fontSize: '18px', marginLeft: '10px'}}>ID Usuário:</span>
      <span>{props.job.owner.id}</span>
    </div>
  );
}

function Opportunities(props) {

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
        setErrors({message: "Não foi possível encontrar este Job"});
        console.log(error.response.data);
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
  </Page>);
}

export default Opportunities;