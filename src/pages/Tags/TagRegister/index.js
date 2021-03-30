import React, { useState, useEffect } from 'react';

import Header from '../../../components/Header';
import { AppButton, ContentView, Form, Page } from '../../../styles/default';

import api from '../../../services/api';

function TagRegister() {

  const [buttonText, setButtonText] = useState("Cadastrar");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const handleTagRegister = async (e) => {
    e.preventDefault();
    setButtonText("Enviando Dados ...");

    try {
      const response = await api.post("/tag/create", {title, description});

      console.log(response.data);
      setButtonText("Cadastrado com Sucesso");
    } catch (error) {
      setButtonText("Tente Novamente");
      if(error.response) {
        if(error.response.data) {
          //Dados retornados do backend
          if(error.response.data.errors) {
            setErrors(error.response.data.errors);
          }
          if(error.response.data.message) {
            setErrors({message: error.response.data.message});
          }
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
    <Form width={"45%"} height={"80vh"} center>
      <ContentView>
        <label>Cadastrar a Tag !</label>

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
        <AppButton onClick={handleTagRegister}>{buttonText}</AppButton>
      </ContentView>
    </Form>
  </Page>);
}

export default TagRegister;