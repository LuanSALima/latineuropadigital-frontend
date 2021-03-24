import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import { AppButton, ContentView, Form, Page } from '../../styles/default';

import api from '../../services/api';

function Tag(props) {
  return (
    <div style={{margin: '0 auto'}}><span style={{fontSize: '18px'}}>{props.tag}</span><button style={{backgroundColor: 'red', marginLeft: '5px'}}>X</button></div>
  );
}

function NoticeRegister() {

  const [buttonText, setButtonText] = useState("Cadastrar");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [dbTags, setDbTags] = useState([]);
  const [errors, setErrors] = useState({});

  const addTag = (e) => {
    e.preventDefault();

    setTags([...tags, tag]);
    setTag("");
  }

  useEffect(() => {

    async function listTags() {
      try {
        const response = await api.get("/tags/list");

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
        setErrors({message: "Não foi possível encontrar as Tags"});
        console.log(error.response.data);
      }
    }
    listTags();

  }, []);

  const handleNoticeRegister = async (e) => {
    e.preventDefault();
    setButtonText("Enviando Dados ...");

    try {
      const response = await api.post("/post/create", {title, description, tags});
      console.log(response.data);
      setButtonText("Cadastrado com Sucesso");
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

  return (
  <Page>
    <Header/>
    <Form width={"45%"} center>
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

        <h6 style={{margin: '10px auto'}}>Tags:</h6>
        {tags.map((currentTag)=>(
          <Tag tag={currentTag} />
        ))}

        <select>
        {dbTags.map((currentTag)=>(
          <option>{currentTag}</option>
        ))}
        </select>

        <input
          placeholder="Insira as Tags"
          type="text"
           onChange={(e) => {
            setTag(e.target.value);
          }}
          value={tag}
        />
        <button onClick={addTag}>Adicionar Tag</button>
        <span style={{color: 'red'}}>{errors.tags}</span>

        <br></br>
        <AppButton onClick={handleNoticeRegister}>{buttonText}</AppButton>
      </ContentView>
    </Form>
  </Page>);
}

export default NoticeRegister;