import React, { useState, useEffect } from 'react';

import Header from '../../../components/Header';
import { AppButton, ContentView, Form, Outline_Button, Page } from '../../../styles/default';
import Footer from '../../../components/Footer';
import Toastifying, { TOASTIFY_OPTIONS } from '../../../components/Toastifying';
import api from '../../../services/api';
import { toast } from "react-toastify";

import Select from 'react-select';
import {Modal,Button} from 'react-bootstrap'



function OpportunitieRegister() {


  const [professionalName, setProfessionalName] = useState("");
  const [professionalContact, setProfessionalContact] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [jobTypes, setJobTypes] = useState([]);
  const [dbJobTypes, setDbJobTypes] = useState([]);
  const[modalShow,setModalShow] = useState(false);


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
      console.error("houve um erro!" , error)
    }
  }

  useEffect(() => {
    listTags();
  }, []);

  const handleJobRegister = async (e) => {
    e.preventDefault();
    try {
     await api.post("/job/create", {professionalName, professionalContact, title, description, jobTypes});
      toast.success("¡Enviado para validación!",TOASTIFY_OPTIONS)
    } catch (error) {
      toast.error("¡Hubo un error! Inténtalo de nuevo.",TOASTIFY_OPTIONS)
    
    }
  };

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




  function MyModalView(props){
   return ( <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Toastifying/>
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
      <h1>Promociona tu trabajo</h1>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    {<h4>
      Seleccione su rama de trabajo</h4>}
                 

      <Form width={"100%"} height={"50vh"} center nullBox nullBorder>
      <ContentView>
 {/* Promover RAMOS DE TABALHO AQUI! */}
      <input type="text"/>
</ContentView>
  </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={()=>setModalShow(false)}>Cerrar</Button>
    </Modal.Footer>
  </Modal>);
  }

  return (
  <Page>

        { <MyModalView 
        show={modalShow}
        onHide={()=>setModalShow(false)}
        />}

    <Header/>
    <Form width={"45%"} height={"80vh"} center>
      <Toastifying/>
      <ContentView>
        <label>¡Anuncie sus servicios!</label>

        <input
          placeholder="Introduzca su Nombre"
          type="text"
          onChange={(e) => {
            setProfessionalName(e.target.value);
          }}
          value={professionalName}
        />

        <input
          placeholder="Entrar en Contacto Profesional"
          type="text"
          onChange={(e) => {
            setProfessionalContact(e.target.value);
          }}
          value={professionalContact}
        />

        <input
          placeholder="Ingrese su Título de Servicio"
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />

        <input
          placeholder="Ingrese su Descripción de Servicio"
          type="text"
           onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        />

        <fieldset>
        <Select
         options={dbJobTypes.map((currentJobType)=>(
          {label:currentJobType,value:currentJobType}))}
          isClearable
          isMulti
          closeMenuOnSelect={false}
          onChange={onChangeSelectTags}
          placeholder={"¡Seleccione las etiquetas!"}
        />
        </fieldset>
        <Outline_Button type="success" onClick={handleChangeTags}>Añadir Etiqueta</Outline_Button>
       


        <AppButton onClick={handleJobRegister}>Registrar</AppButton>
      </ContentView>
    </Form>
    <Footer/>
  </Page>);
}

export default OpportunitieRegister;