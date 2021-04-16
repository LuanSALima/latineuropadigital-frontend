import React, { useState, useEffect } from 'react';

import Header from '../../../components/Header';
import { AppButton, ContentView, Form, Page } from '../../../styles/default';

import api from '../../../services/api';

import Select from 'react-select';

import useMyForm from '../../../hooks/useValidationForm';

function TagEdit(props) {

  const [buttonText, setButtonText] = useState("Editar");

  const [idTag] = useState(props.match.params.id);
  const [title, setTitle] = useState("Carregando Título...");
  const [description, setDescription] = useState("Carregando Descrição...");
  const [types, setTypes] = useState([]);
  const [typesOptions] = useState([
    {
      label: 'Notícia',
      value: 'Notice'
    }, 
    {
      label: 'Directorio',
      value: 'Directory'
    }, 
    {
      label: 'Evento',
      value: 'Event'
    }, 
    {
      label: 'Curso',
      value: 'Course'
    }
  ]);
  const [errors, setErrors] = useState({});

  const [firstRender,setFirstRender]= useState(true);

  const handleTagEdit = async (e) => {
    e.preventDefault();
    setButtonText("Enviando Dados ...");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if(useMyForm(title, description, types) === true){
      try {
        const response = await api.put("/tag/"+idTag, {title, description, types});

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
      setErrors({message: "¡Hubo un error! Verifique que todos los campos estén llenos"});
      setFirstRender(false);
    }
  };

  async function getTag() {
    try {
      const response = await api.get("/tag/"+idTag);

      if(response.data.success) {
        setTitle("");
        setDescription("");
        if(response.data.tag) {
          setTitle(response.data.tag.title);
          setDescription(response.data.tag.description);
          setTypes(response.data.tag.types);
        }
      }
    } catch (error) {
      setErrors({message: "Não foi possível encontrar esta Tag"});
      setTitle("Problema ao carregar o título");
      setDescription("Problema ao carregar a descrição");
    }
  }
  useEffect(() => {
    getTag();
  }, [idTag]);

  const onChangeSelectTags = (typesSelected) => {
    let types = [];
    for(const type of typesSelected) {
      types.push(type.value);
    }
    setTypes(types);
  }

  const [tagTypes,setTagTypes] = useState();

  const createSelectOptions = () => {
    let options = []
    for(const type of types){
        options.push({label:type,value:type})
      }
     setTagTypes(options);
  }
  
  useEffect(()=>{
    createSelectOptions();
  },[types]);

  return (
  <Page>
    <Header/>
    <Form width={"45%"} center>
      <ContentView>
        <label>Editar a Tag !</label>

        <label style={{color: 'red'}}>{errors.message}</label>

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

        <fieldset>
        <Select
         options={typesOptions}
          isClearable
          value={tagTypes}
          isMulti
          closeMenuOnSelect={false}
          onChange={onChangeSelectTags}
          placeholder={"Selecioneo Tipo de Publicação que está tag pertence"}
        />
        <span style={{color: 'red'}}>{errors.type}</span>
        </fieldset>

        <br></br>
        <AppButton onClick={handleTagEdit}>{buttonText}</AppButton>
      </ContentView>
    </Form>
  </Page>);
}

export default TagEdit;