import React, { useState, useEffect } from 'react';

import Header from '../../../components/Header';
import { AppButton, ContentView, Form, Page } from '../../../styles/default';
import Footer from '../../../components/Footer';
import api from '../../../services/api';

import Select from 'react-select';

function NoticeRegister() {

  const [buttonText, setButtonText] = useState("Cadastrar");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState('');
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [dbTags, setDbTags] = useState([]);
  const [errors, setErrors] = useState({});
  const [progress, setProgess] = useState(0); // progess bar

  async function listTags() {
    try {
      const response = await api.get("/tags/notice");

      if(response.data.success) {
        if(response.data.tags) {
          let dbTags = [];
          for(let index in response.data.tags) {
            dbTags.push(response.data.tags[index].title);
          }
          setDbTags(dbTags);
        }
      }
    } catch (error) {
      if(error.response) {
        if(error.response.data) {
          if(error.response.data.message) {
            setErrors({dbTags: error.response.data.message});
          }
        }
      }
    }
  }

  useEffect(() => {
    listTags();
  }, []);

  const handleNoticeRegister = async (e) => {
    e.preventDefault();
    setButtonText("Enviando Dados ...");
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    tags.map((tag) => {
      formData.append('tags', tag);
    })
    
    try {
      
      const response = await api.post("/notice/create", formData, {
        onUploadProgress: (ProgressEvent) => {
          let progress = Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
          setProgess(progress);
        }
      });

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
        } else {
          //Não houve dados retornados do backend
          alert("Erro Inesperado!");
        }
        console.log(errors);
      }
    }

  };

  const onChangeSelectTags = (tagsSelected) => {
    let tags = [];
    for(const tag of tagsSelected) {
      tags.push(tag.value);
    }
    setTags(tags);
  }

  return (
  <Page>
    <Header/>
    <Form width={"45%"} height={"80vh"} center>
      <ContentView>
        <label>Crie uma Publicação !</label>

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

        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <span style={{color: 'red'}}>{errors.imagePath}</span>
   
        <Select
         options={dbTags.map((currentTag)=>(
          {label:currentTag,value:currentTag}))}
          isClearable
          isMulti
          closeMenuOnSelect={false}
          onChange={onChangeSelectTags}
          placeholder={"Selecione as tags"}
        />
       
        <span style={{color: 'red'}}>{errors.dbTags}</span>

        <button>Adicionar Tag</button>
        <span style={{color: 'red'}}>{errors.tags}</span>

        <div style={{ width: progress, backgroundColor: 'blue', color: 'white' }}>
           {progress}
        </div>
        <br></br>
        <AppButton onClick={handleNoticeRegister}>{buttonText}</AppButton>
      </ContentView>
    </Form>
    <Footer/>
  </Page>);
}

export default NoticeRegister;