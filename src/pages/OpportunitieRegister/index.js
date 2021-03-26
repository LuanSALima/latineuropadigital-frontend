import React, { useState } from 'react';

import Header from '../../components/Header';
import { AppButton, ContentView, Form, Page } from '../../styles/default';
import Footer from '../../components/Footer';
import api from '../../services/api';

function OpportunitieRegister() {

  const [buttonText, setButtonText] = useState("Cadastrar");

  const [professionalName, setProfessionalName] = useState("");
  const [professionalContact, setProfessionalContact] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const handleJobRegister = async (e) => {
    e.preventDefault();
    setButtonText("Enviando Dados ...");

    try {
      const response = await api.post("/job/create", {professionalName, professionalContact, title, description});
      console.log(response.data);
      setButtonText("Cadastrado com Sucesso");
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

  return (
  <Page>
    <Header/>
    <Form width={"45%"} center>
      <ContentView>
        <label>Cadastre seu Serviço Freelancer !</label>

        <label style={{color: 'red'}}>{errors.message}</label>

        <input
          placeholder="Insira o Nome do Profissional"
          type="text"
          onChange={(e) => {
            setProfessionalName(e.target.value);
          }}
          value={professionalName}
        />
        <span style={{color: 'red'}}>{errors.professionalName}</span>

        <input
          placeholder="Insira o Contato do Profissional"
          type="text"
          onChange={(e) => {
            setProfessionalContact(e.target.value);
          }}
          value={professionalContact}
        />
        <span style={{color: 'red'}}>{errors.professionalContact}</span>

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
        <AppButton onClick={handleJobRegister}>{buttonText}</AppButton>
      </ContentView>
    </Form>
    <Footer/>
  </Page>);
}

export default OpportunitieRegister;