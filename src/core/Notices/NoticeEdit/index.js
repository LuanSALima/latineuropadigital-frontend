import React, { useState, useEffect } from 'react';

import Header from '../../../components/Header';
import { AppButton, ContentView, Form, Page } from '../../../styles/default';
import Footer from '../../../components/Footer';
import api from '../../../services/api';

import Select from 'react-select';

function NoticeEdit(props) {

  const [buttonText, setButtonText] = useState("Editar");

  const [idNotice] = useState(props.match.params.id);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
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

  async function getNotice() {
    try {
      const response = await api.get("/notice/"+idNotice);

      if(response.data.success) {
        if(response.data.notice) {
          setTitle(response.data.notice.title);
          setSubtitle(response.data.notice.subtitle);
          setContent(response.data.notice.content);
          setTags(response.data.notice.tags);
        }
      }
    } catch (error) {
      setErrors({message: "Não foi possível carregar as Notícia"});
      if(error.response) {
        if(error.response.data) {
          if(error.response.data.message) {
            setErrors({message: error.response.data.message});
          }
        }
      }
    }
  }

  useEffect(() => {

    getNotice();
    listTags();

  }, []);

  const handleNoticeEdit = async (e) => {
    e.preventDefault();
    setButtonText("Enviando Dados ...");
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('content', content);
    formData.append('image', image);
    tags.map((tag) => {
      formData.append('tags', tag);
    })
    
    try {
      
      const response = await api.put("/notice/"+idNotice, formData, {
        onUploadProgress: (ProgressEvent) => {
          let progress = Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
          setProgess(progress);
        }
      });

      setButtonText("Editado com Sucesso");
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
    <Form width={"45%"} center>
      <ContentView>
        <label>Edite a Notícia !</label>

        <label style={{color: 'red'}}>{errors.message}</label>

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
          placeholder="  Subtítulo"
          type="text"
           onChange={(e) => {
            setSubtitle(e.target.value);
          }}
          value={subtitle}
        />
        <span style={{color: 'red'}}>{errors.subtitle}</span>

        <input
          placeholder="  Conteudo"
          type="text"
           onChange={(e) => {
            setContent(e.target.value);
          }}
          value={content}
        />
        <span style={{color: 'red'}}>{errors.content}</span>

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
          placeholder={"¡Seleccione las etiquetas!"}
        />
       
        <span style={{color: 'red'}}>{errors.dbTags}</span>

        <button>Adicionar Tag</button>
        <span style={{color: 'red'}}>{errors.tags}</span>

        <div style={{ width: progress, backgroundColor: 'blue', color: 'white' }}>
           {progress}
        </div>
        <br></br>
        <AppButton onClick={handleNoticeEdit}>{buttonText}</AppButton>
      </ContentView>
    </Form>
    <Footer/>
  </Page>);
}

export default NoticeEdit;