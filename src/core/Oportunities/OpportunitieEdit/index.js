import React, { useState, useEffect } from 'react';

import Header from '../../../components/Header';
import { AppButton, ContentView, Form, Outline_Button, Page } from '../../../styles/default';
import Footer from '../../../components/Footer';
import Toastifying, { TOASTIFY_OPTIONS } from '../../../components/Toastifying';
import api from '../../../services/api';
import { toast } from "react-toastify";

import Select from 'react-select';
import {Modal,Button} from 'react-bootstrap'

import { ActivityBrench, ActivityObject } from '../../../mock/mock';
import useMyForm, { verifyLink } from '../../../hooks/useValidationForm';

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

  const [link,setLink]= useState('');

  const [firstRender,setFirstRender]= useState(true);

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

    // eslint-disable-next-line react-hooks/rules-of-hooks
     if(useMyForm(professionalName, professionalContact, title, description, jobTypes) === true){
      setButtonText("Enviando Dados ...");
      try {
        const response = await api.put("/job/"+idJob, {professionalName, professionalContact, title, description, jobTypes, status, link});

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
     } else {
      toast.error("¡Hubo un error! Verifique que todos los campos estén llenos",TOASTIFY_OPTIONS)
      setFirstRender(false);
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
            setLink(response.data.job.link);
          }
        }
      } catch (error) {
        setErrors({message: "Não foi possível encontrar este Job"});
        setProfessionalName("Problema ao carregar o  Nome do Profissional");
        setProfessionalContact("Problema ao carregar o Contato do Profissional");
        setTitle("Problema ao carregar o título");
        setDescription("Problema ao carregar a descrição");
        setLink("Problema ao carregar o link");
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

  const [opportunitieTags,setOpportunitieTags] = useState();

  const createSelectOptions = () => {
    let options = []
    for(const jobType of jobTypes){
        options.push({label:jobType,value:jobType})
      }
     setOpportunitieTags(options);
  }
  
  useEffect(()=>{
    createSelectOptions();
  },[jobTypes]);

  return (
  <Page>
    <Header/>
    <Form width={"45%"} center>
      <ContentView>
        <label>Editar a Oportunidade !</label>

        <label style={{color: 'red'}}>{errors.message}</label>

        <input
          style={!useMyForm(professionalName) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
          placeholder="  Nome do Profissional"
          type="text"
           onChange={(e) => {
            setProfessionalName(e.target.value);
          }}
          value={professionalName}
        />
        <span style={{color: 'red'}}>{errors.professionalName}</span>

        <input
          style={!useMyForm(professionalContact) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
          placeholder="  Contato do Profissional"
          type="text"
           onChange={(e) => {
            setProfessionalContact(e.target.value);
          }}
          value={professionalContact}
        />
        <span style={{color: 'red'}}>{errors.professionalContact}</span>

        <input
          style={!useMyForm(title) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
          placeholder="  Título"
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <span style={{color: 'red'}}>{errors.title}</span>

        <input
          style={!useMyForm(description) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
          placeholder=" Descrição"
          type="text"
           onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        />
        <span style={{color: 'red'}}>{errors.description}</span>

        <span>Por favor, inserte "http: //" o "https: //" antes de su enlace.</span>
        <input style={!verifyLink(link) && !firstRender?{backgroundColor: '#f9b3b3'}:{}} type="text" placeholder="Link" onChange={(e)=>{setLink(e.target.value)}} value={link} />

        <fieldset>
        <Select
          //options={dbJobTypes.map((currentJobType)=>(
          //{label:currentJobType,value:currentJobType}))}
          options={ActivityObject}
          isClearable
          value={opportunitieTags}
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