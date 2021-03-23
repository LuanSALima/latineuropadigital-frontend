import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import { AppButton, Form, Page } from '../../styles/default';

import api from '../../services/api';

function EditJob(props) {

  const [buttonText, setButtonText] = useState("Editar");

  const [idJob] = useState(props.match.params.id);
  const [title, setTitle] = useState("Carregando Título...");
  const [description, setDescription] = useState("Carregando Descrição...");
  const [errors, setErrors] = useState({});

  const handleJobEdit = async (e) => {
    e.preventDefault();
    setButtonText("Enviando Dados ...");

    try {
      const response = await api.put("/job/"+idJob, {title, description});

      console.log(response.data);
      setButtonText("Editado com Sucesso");
    } catch (error) {
      setButtonText("Tente Novamente");

      if(error.response.data) {
        //Dados retornados do backend
        if(error.response.data.errors) {
          setErrors(error.response.data.errors);
        }
        if(error.response.data.message) {
          setErrors({message: error.response.data.message});
        }
      } else {
        //Não houve dados retornados do backend
        alert("Erro Inesperado!");
      }
    }
  };

  useEffect(() => {
    async function getJob() {
      try {
        const response = await api.get("/job/"+idJob);

        if(response.data.success) {
          if(response.data.job) {
            setTitle(response.data.job.title);
            setDescription(response.data.job.description);
          }
        }
      } catch (error) {
        setErrors({message: "Não foi possível encontrar este Job"});
        setTitle("Problema ao carregar o título");
        setDescription("Problema ao carregar a descrição");
      }
    }
    getJob();
  }, [idJob]);

  return (
  <Page>
    <Header/>
    <Form width={"45%"} center>
      <label>Editar seu Serviço Freelancer !</label>

      <label style={{color: 'red'}}>{errors.message}</label>

      <input
        placeholder="Insira o Título"
        type="text"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
      />
      <span style={{color: 'red'}}>{errors.title}</span>

      <input
        placeholder="Insira a Descrição"
        type="texta"
         onChange={(e) => {
          setDescription(e.target.value);
        }}
        value={description}
      />
      <span style={{color: 'red'}}>{errors.description}</span>
      <br></br>
      <AppButton onClick={handleJobEdit}>{buttonText}</AppButton>
    </Form>
  </Page>);
}

export default EditJob;