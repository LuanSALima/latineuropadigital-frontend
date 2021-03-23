import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import { AppButton, Form, Page } from '../../styles/default';

import api from '../../services/api';

function Opportunities(props) {

  const [jobs, setJobs] = useState({});
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
      }

      console.log(jobs);
    }
    listJobs();
  }, []);

  return (
  <Page>
    <Header/>
    <h1>Oportunidades</h1>
    <h2 style={{color: 'red'}}>{errors.message}</h2>
  </Page>);
}

export default Opportunities;