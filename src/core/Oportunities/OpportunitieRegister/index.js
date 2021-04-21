import React, { useState } from 'react';

import Header from '../../../components/Header';
import { AppButton, ContentView, Form, Page } from '../../../styles/default';
import Footer from '../../../components/Footer';
import Toastifying, { TOASTIFY_OPTIONS } from '../../../components/Toastifying';
import api from '../../../services/api';
import { toast } from "react-toastify";

import Select from 'react-select';
import { ActivityObject } from '../../../mock/mock';

import useMyForm, { verifyLink } from '../../../hooks/useValidationForm';

function OpportunitieRegister() {

  const [professionalName, setProfessionalName] = useState("");
  const [professionalContact, setProfessionalContact] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [jobTypes, setJobTypes] = useState([]);
  //const [dbJobTypes, setDbJobTypes] = useState([]);

  const [link,setLink]= useState('');

  const [firstRender,setFirstRender]= useState(true);
  /*
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
      console.error("houve um erro!" , error)
    }
  }

  useEffect(() => {
    listJobTypes();
  }, []);
  */
  
  const handleJobRegister = async (e) => {
    e.preventDefault();
      // eslint-disable-next-line react-hooks/rules-of-hooks
     if(useMyForm(professionalName, professionalContact, title, description, jobTypes) === true){
      try {
        await api.post("/job/create", {professionalName, professionalContact, title, description, jobTypes, link});
        toast.success("¡Enviado para validación!",TOASTIFY_OPTIONS)
      } catch (error) {
        toast.error("¡Hubo un error! Inténtalo de nuevo.",TOASTIFY_OPTIONS)
      
      }
     } else {
      toast.error("¡Hubo un error! Verifique que todos los campos estén llenos",TOASTIFY_OPTIONS)
      setFirstRender(false);
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

        <input
          style={!useMyForm(professionalName) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
          placeholder="Introduzca su Nombre"
          type="text"
          onChange={(e) => {
            setProfessionalName(e.target.value);
          }}
          value={professionalName}
        />

        <input
          style={!useMyForm(professionalContact) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
          placeholder="Entrar en Contacto Profesional"
          type="text"
          onChange={(e) => {
            setProfessionalContact(e.target.value);
          }}
          value={professionalContact}
        />

        <input
          style={!useMyForm(title) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
          placeholder="Ingrese su Título de Servicio"
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />

        <textarea
          style={!useMyForm(description) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
          placeholder="Ingrese su Descripción de Servicio"
          type="text"
           onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        />

        <span>Por favor, inserte "http: //" o "https: //" antes de su enlace.</span>
        <input style={!verifyLink(link) && !firstRender?{backgroundColor: '#f9b3b3'}:{}} type="text" placeholder="Link" onChange={(e)=>{setLink(e.target.value)}} value={link} />

        <fieldset>
        <Select
        //  options={dbJobTypes.map((currentJobType)=>(
        //   {label:currentJobType,value:currentJobType}))}
          options={ActivityObject}
          isClearable
          isMulti
          closeMenuOnSelect={false}
          onChange={onChangeSelectTags}
          placeholder={"¡Seleccione las etiquetas!"}
        />
        </fieldset>
        <AppButton onClick={handleJobRegister}>Registrar</AppButton>
      </ContentView>
    </Form>
    <Footer/>
  </Page>);
}

export default OpportunitieRegister;