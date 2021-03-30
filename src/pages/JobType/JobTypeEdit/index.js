import React, { useState, useEffect } from 'react';

import Header from '../../../components/Header';
import { AppButton, ContentView, Form, Page } from '../../../styles/default';

import api from '../../../services/api';

function JobTypeEdit(props) {

  const [buttonText, setButtonText] = useState("Editar");

  const [idJobType] = useState(props.match.params.id);
  const [title, setTitle] = useState("Carregando Título...");
  const [description, setDescription] = useState("Carregando Descrição...");
  const [errors, setErrors] = useState({});

  const handleJobTypeEdit = async (e) => {
    e.preventDefault();
    setButtonText("Enviando Dados ...");

    try {
      const response = await api.put("/jobtype/"+idJobType, {title, description});

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

  async function getJobType() {
    try {
      const response = await api.get("/jobtype/"+idJobType);

      if(response.data.success) {
        setTitle("");
        setDescription("");
        if(response.data.jobType) {
          setTitle(response.data.jobType.title);
          setDescription(response.data.jobType.description);
        }
      }
    } catch (error) {
      setErrors({message: "Não foi possível encontrar este Tipo de Oportunidade"});
      setTitle("Problema ao carregar o título");
      setDescription("Problema ao carregar a descrição");
    }
  }
  useEffect(() => {
    getJobType();
  }, [idJobType]);

  return (
  <Page>
    <Header/>
    <Form width={"45%"} center>
      <ContentView>
        <label>Editar o Tipo de Oportunidade !</label>

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
          type="text"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        />
        <span style={{color: 'red'}}>{errors.description}</span>

        <br></br>
        <AppButton onClick={handleJobTypeEdit}>{buttonText}</AppButton>
      </ContentView>
    </Form>
  </Page>);
}

export default JobTypeEdit;