import React, { useState } from 'react';

import Header from '../../../components/Header';
import { AppButton, ContentView, Form, Page } from '../../../styles/default';
import Footer from '../../../components/Footer';
import Toastifying, { TOASTIFY_OPTIONS } from '../../../components/Toastifying';
import api from '../../../services/api';
import { toast } from "react-toastify";

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
      toast.success("¡Enviado para validación!",TOASTIFY_OPTIONS)
    } catch (error) {
      toast.error("¡Hubo un error! Inténtalo de nuevo.",TOASTIFY_OPTIONS)
    }
  };

  return (
  <Page>
    <Header/>
    <Form width={"45%"} center>
      <Toastifying/>
      <ContentView>
        <label>¡Anuncie sus servicios!</label>
        <label style={{color: 'red'}}>{errors.message}</label>

        <input
          placeholder="Introduzca su Nombre"
          type="text"
          onChange={(e) => {
            setProfessionalName(e.target.value);
          }}
          value={professionalName}
        />
        <span style={{color: 'red'}}>{errors.professionalName}</span>

        <input
          placeholder="Entrar en Contacto Profesional"
          type="text"
          onChange={(e) => {
            setProfessionalContact(e.target.value);
          }}
          value={professionalContact}
        />
        <span style={{color: 'red'}}>{errors.professionalContact}</span>

        <input
          placeholder="Ingrese su Título de Servicio"
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <span style={{color: 'red'}}>{errors.title}</span>

        <input
          placeholder="Ingrese su Descripción de Servicio"
          type="text"
           onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        />
        <span style={{color: 'red'}}>{errors.description}</span>
        <br></br>
        <AppButton onClick={handleJobRegister}>Registrar</AppButton>
      </ContentView>
    </Form>
    <Footer/>
  </Page>);
}

export default OpportunitieRegister;