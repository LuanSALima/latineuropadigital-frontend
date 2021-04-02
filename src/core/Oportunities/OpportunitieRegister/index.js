import React, { useState, useEffect } from 'react';

import Header from '../../../components/Header';
import { AppButton, ContentView, Form, Page } from '../../../styles/default';
import Footer from '../../../components/Footer';
import Toastifying, { TOASTIFY_OPTIONS } from '../../../components/Toastifying';
import api from '../../../services/api';
import { toast } from "react-toastify";

import Select from 'react-select';

function OpportunitieRegister() {

  const [buttonText, setButtonText] = useState("Cadastrar");

  const [professionalName, setProfessionalName] = useState("");
  const [professionalContact, setProfessionalContact] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobTypes, setJobTypes] = useState([]);
  const [dbJobTypes, setDbJobTypes] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {

    async function listTags() {
      try {
        const response = await api.get("/jobtype/list");

        if(response.data.success) {
          if(response.data.jobTypes) {
            let dbJobTypes = [];
            for(let index in response.data.jobTypes) {
              dbJobTypes.push(response.data.jobTypes[index].title);
            }
            setDbJobTypes(dbJobTypes);
          }
        }
      } catch (error) {
        if(error.response) {
          if(error.response.data) {
            if(error.response.data.message) {
              setErrors({dbJobTypes: error.response.data.message});
            }
          }
        }
      }
    }
    listTags();

  }, []);

  const handleJobRegister = async (e) => {
    e.preventDefault();
    setButtonText("Enviando Dados ...");

    try {

      
      const response = await api.post("/job/create", {professionalName, professionalContact, title, description, jobTypes});
      console.log(response.data);
      setButtonText("Cadastrado com Sucesso");
      toast.success("¡Enviado para validación!",TOASTIFY_OPTIONS)
    } catch (error) {
      toast.error("¡Hubo un error! Inténtalo de nuevo.",TOASTIFY_OPTIONS)
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
        } else {
          //Não houve dados retornados do backend
          alert("Erro Inesperado!");
        }
        console.log(errors);
      }
    }
  };

  const onChangeSelectTags = (typesSelected) => {
    let types = [];
    for(const type of typesSelected) {
      types.push(type.value);
    }
    setJobTypes(types);
  }

  return (
  <Page>
    <Header/>
    <Form width={"45%"} height={"80vh"} center>
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

        <Select
         options={dbJobTypes.map((currentJobType)=>(
          {label:currentJobType,value:currentJobType}))}
          isClearable
          isMulti
          closeMenuOnSelect={false}
          onChange={onChangeSelectTags}
          placeholder={"Selecione as tags"}
        />
       
        <span style={{color: 'red'}}>{errors.dbJobTypes}</span>

        <button>Adicionar Tag</button>
        <span style={{color: 'red'}}>{errors.tags}</span>

        <br></br>
        <AppButton onClick={handleJobRegister}>Registrar</AppButton>
      </ContentView>
    </Form>
    <Footer/>
  </Page>);
}

export default OpportunitieRegister;