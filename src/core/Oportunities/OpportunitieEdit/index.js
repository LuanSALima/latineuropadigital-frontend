import React, { useState, useEffect } from 'react';

import Header from '../../../components/Header';
import { AppButton, ContentView, Form, Outline_Button, Page } from '../../../styles/default';
import Footer from '../../../components/Footer';
import Toastifying, { TOASTIFY_OPTIONS } from '../../../components/Toastifying';
import api from '../../../services/api';
import { toast } from "react-toastify";

import Select from 'react-select';
import {Modal,Button} from 'react-bootstrap'

function OpportunitieEdit(props) {

  const [buttonText, setButtonText] = useState("Editar");

  const [idJob] = useState(props.match.params.id);
  const [professionalName, setProfessionalName] = useState("Carregando Nome do Profissional...");
  const [professionalContact, setProfessionalContact] = useState("Carregando Contato do Profissional...");
  const [title, setTitle] = useState("Carregando Título...");
  const [description, setDescription] = useState("Carregando Descrição...");
  const [jobTypes, setJobTypes] = useState([]);
  const [dbJobTypes, setDbJobTypes] = useState([]);
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [modalShow,setModalShow] = useState(false);

  async function listJobTypes() {
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
      toast.error("¡Hubo un error!",TOASTIFY_OPTIONS);
    }
  }

  useEffect(() => {
    listJobTypes();
  }, []);

  const handleJobEdit = async (e) => {
    e.preventDefault();
    setButtonText("Enviando Dados ...");

    try {
      const response = await api.put("/job/"+idJob, {professionalName, professionalContact, title, description, jobTypes, status});

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
            setProfessionalName(response.data.job.professionalName);
            setProfessionalContact(response.data.job.professionalContact);
            setTitle(response.data.job.title);
            setDescription(response.data.job.description);
            setStatus(response.data.job.status);
            setJobTypes(response.data.job.jobTypes);
          }
        }
      } catch (error) {
        setErrors({message: "Não foi possível encontrar este Job"});
        setProfessionalName("Problema ao carregar o  Nome do Profissional");
        setProfessionalContact("Problema ao carregar o Contato do Profissional");
        setTitle("Problema ao carregar o título");
        setDescription("Problema ao carregar a descrição");
      }
    }
    getJob();
  }, [idJob]);

  const onChangeSelectTags = (typesSelected) => {
    let types = [];
    for(const type of typesSelected) {
      types.push(type.value);
    }
    setJobTypes(types);
  }

  const handleChangeTags = (e)=>{
    e.preventDefault();
    setModalShow(true);
  }

  return (
  <Page>
    <Header/>
    <Form width={"45%"} center>
      <ContentView>
        <label>Editar a Oportunidade !</label>

        <label style={{color: 'red'}}>{errors.message}</label>

        <input
          placeholder="  Nome do Profissional"
          type="text"
           onChange={(e) => {
            setProfessionalName(e.target.value);
          }}
          value={professionalName}
        />
        <span style={{color: 'red'}}>{errors.professionalName}</span>

        <input
          placeholder="  Contato do Profissional"
          type="text"
           onChange={(e) => {
            setProfessionalContact(e.target.value);
          }}
          value={professionalContact}
        />
        <span style={{color: 'red'}}>{errors.professionalContact}</span>

        <input
          placeholder="  Título"
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <span style={{color: 'red'}}>{errors.title}</span>

        <input
          placeholder=" Descrição"
          type="text"
           onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        />
        <span style={{color: 'red'}}>{errors.description}</span>

        <fieldset>
        <Select
         options={dbJobTypes.map((currentJobType)=>(
          {label:currentJobType,value:currentJobType}))}
          isClearable
          isMulti
          closeMenuOnSelect={false}
          onChange={onChangeSelectTags}
          placeholder={"Selecione as tags"}
        />
        </fieldset>
        <Outline_Button type="success" onClick={handleChangeTags}>Añadir Etiqueta</Outline_Button>

        <p>Selecione o status da Oportunidade</p>
        <select value={status} onChange={(e) => {setStatus(e.target.value)}}>
          <option value="pendent">Pendente</option>
          <option value="accepted">Aceita</option>
        </select>
        <br></br>
        <AppButton onClick={handleJobEdit}>{buttonText}</AppButton>
      </ContentView>
    </Form>
  </Page>);
}

export default OpportunitieEdit;