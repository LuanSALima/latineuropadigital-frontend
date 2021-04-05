import React, { useState, useEffect } from 'react';

import Header from '../../../components/Header';
import { AppButton, ContentView, Form, Outline_Button, Page } from '../../../styles/default';
import Footer from '../../../components/Footer';
import api from '../../../services/api';

import {MdFileUpload} from 'react-icons/md/index';
import Toastifying, {TOASTIFY_OPTIONS} from "../../../components/Toastifying";
import { toast } from 'react-toastify';
import ModalTag from '../../../components/ModalTag';
import MyModal from '../../../components/MyModal';

import Select from 'react-select';

import useMyForm, { verifyLink } from '../../../hooks/useValidationForm';

function EventEdit(props) {

  const [buttonText, setButtonText] = useState("Editar");

  const [idEvent] = useState(props.match.params.id);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState('');
  const [link, setLink] = useState("");
  const [tags, setTags] = useState([]);
  const [dbTags, setDbTags] = useState([]);
  const [errors, setErrors] = useState({});
  const [progress, setProgess] = useState(0); // progess bar

  const[modalShow,setModalShow] = useState(false);
  const [previewImage,setPreviewImage] = useState();

  const handleValidator =  useMyForm(title,subtitle,content,tags,link);
  const handleLinkValidator = verifyLink(link);

  async function listTags() {
    try {
      const response = await api.get("/tag/list");

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

  async function getEvent() {
    try {
      const response = await api.get("/event/"+idEvent);

      if(response.data.success) {
        if(response.data.event) {
          setTitle(response.data.event.title);
          setSubtitle(response.data.event.subtitle);
          setContent(response.data.event.content);
          setTags(response.data.event.tags);
          setLink(response.data.event.link);
        }
      }
    } catch (error) {
      setErrors({message: "Não foi possível carregar o Evento"});
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

    getEvent();
    listTags();

  }, []);

  const handleEventEdit = async (e) => {
    e.preventDefault();
    setButtonText("Enviando Dados ...");
    
    if(handleValidator && handleLinkValidator){
      const formData = new FormData();
      formData.append('title', title);
      formData.append('subtitle', subtitle);
      formData.append('content', content);
      formData.append('image', image);
      formData.append('link', link);
      tags.map((tag) => {
        formData.append('tags', tag);
      })
      
      try {
        
        const response = await api.put("/event/"+idEvent, formData, {
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
    }else{
      setButtonText("Tente Novamente");
      toast.error("¡Hubo un error! Verifique que todos los campos estén llenos",TOASTIFY_OPTIONS)
    }
  };

   const handleChangeTags = (e)=>{
    e.preventDefault();
    setModalShow(!modalShow);
  }

  const onChangeSelectTags = (tagsSelected) => {
    let tags = [];
    for(const tag of tagsSelected) {
      tags.push(tag.value);
    }
    setTags(tags);
  }

  return (
  <Page>
    <Toastifying/>
   {modalShow && <ModalTag
    show={modalShow}
    onHide={()=>setModalShow(false)}
    />}
    <Header/>
    <Form width={"45%"} center>
      <ContentView>
        <label>Edite o Evento !</label>

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

        <div>
        <label for="uploadPhoto" class="btn-cta">
          {image?.name?image?.name:"Haga clic aquí para agregar una imagen"}
        <MdFileUpload/>
        </label>
        <input
           id="uploadPhoto"
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
            if(e.target.files[0]){
              setPreviewImage(URL.createObjectURL(e.target.files[0]));
            }
          }}
        />
       { image && <img src={previewImage}/>}
       </div>
          
        <input type="text" placeholder="Link" onChange={(e)=>{setLink(e.target.value)}} value={link} />

        <fieldset>
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

        </fieldset>
        <Outline_Button type="success" onClick={handleChangeTags}>Añadir Etiqueta</Outline_Button>
        <AppButton onClick={handleEventEdit}>{buttonText}</AppButton>
      </ContentView>
    </Form>
    <Footer/>
  </Page>);
}

export default EventEdit;