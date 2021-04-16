import React, { useState } from 'react';

import Header from '../../../components/Header';
import { AppButton, ContentView, Form, Page } from '../../../styles/default';
import Footer from '../../../components/Footer';
import api from '../../../services/api';

import Select from 'react-select';
import { toast } from 'react-toastify';
import Toastifying, {TOASTIFY_OPTIONS} from'../../../components/Toastifying';

import useMyForm from '../../../hooks/useValidationForm';

function TagRegister() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [types, setTypes] = useState([]);
  const [typesOptions] = useState([
    {
      label: 'Actualidad',
      value: 'Notice'
    }, 
    {
      label: 'Directorio',
      value: 'Directory'
    }, 
    {
      label: 'Agenda',
      value: 'Event'
    }, 
    {
      label: 'Educación',
      value: 'Course'
    }
  ]);

  const [firstRender,setFirstRender]= useState(true);

  const handleTagRegister = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if(useMyForm(title, description, types) === true){
      try {
        await api.post("/tag/create", {title, description, types});
        toast.success("Registrado Correctamente.")
      } catch (error) {
        toast.error("Error!.",TOASTIFY_OPTIONS);
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
    setTypes(types);
  }

  return (
  <Page>
    <Header/>
    <Toastifying/>
    <Form width={"45%"} height={"80vh"} center>
      <ContentView>
        <label>Registrar Etiqueta</label>

        <input
          style={!useMyForm(title) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
          placeholder="  Título"
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />

        <input
          style={!useMyForm(description) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
          placeholder=" Descrição"
          type="text"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        />
    <fieldset>
        <Select
         options={typesOptions}
          isClearable
          isMulti
          closeMenuOnSelect={false}
          onChange={onChangeSelectTags}
          placeholder={"Seleccione dónde aparecerá esta etiqueta"}
        />
    </fieldset>

        <br></br>
        <AppButton onClick={handleTagRegister}>Registrar</AppButton>
      </ContentView>
    </Form>
    <Footer/>
  </Page>);
}

export default TagRegister;