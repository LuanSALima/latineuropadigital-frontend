import React, { useState, useEffect } from 'react';

import Header from '../../../components/Header';
import { AppButton, ContentView, Form, Outline_Button, Page } from '../../../styles/default';
import Footer from '../../../components/Footer';
import api from '../../../services/api';
import Select from 'react-select';
import {MdFileUpload} from 'react-icons/md/index'
import Toastifying, {TOASTIFY_OPTIONS} from "../../../components/Toastifying"
import { toast } from 'react-toastify';
import ModalTag from '../../../components/ModalTag';

function CourseRegister() {

  const [buttonText, setButtonText] = useState("Cadastrar");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState('');
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [dbTags, setDbTags] = useState([]);
  const [errors, setErrors] = useState({});
  const [progress, setProgess] = useState(0); // progess bar

  //For open modal

  const[modalShow,setModalShow] = useState(false);
  const [previewImage,setPreviewImage] = useState();

  async function listTags() {
    try {
      const response = await api.get("/tags/course");

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

  const handleCourseRegister = async (e) => {
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
      
      const response = await api.post("/course/create", formData, {
        onUploadProgress: (ProgressCourse) => {
          let progress = Math.round(ProgressCourse.loaded / ProgressCourse.total * 100) + '%';
          setProgess(progress);
        }
      });

      toast.success("¡Registrado correctamente!",TOASTIFY_OPTIONS)
      setButtonText("Registrado Correctamente");
    } catch (error) {
      console.log(error)
      setButtonText("Registrar");
        toast.error("¡Hubo un error! Verifique que todos los campos estén llenos",TOASTIFY_OPTIONS)
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


  const handleChangeTags = (e)=>{
    e.preventDefault();
    setModalShow(true);
  }

  return (
  <Page>
    <Toastifying/>
    {modalShow && <ModalTag
    show={modalShow}
    onHide={()=>setModalShow(false)}
    />}
    <Header/>
    <Form width={"45%"} height={"80vh"} center>
      <ContentView>
        <label>Crie um Curso !</label>

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
          placeholder="Insira o Subtítulo"
          type="text"
           onChange={(e) => {
            setSubtitle(e.target.value);
          }}
          value={subtitle}
        />
        <span style={{color: 'red'}}>{errors.subtitle}</span>

        <textarea
          placeholder="Contenido"
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
          
        <fieldset>
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
        </fieldset>
        <Outline_Button type="success" onClick={handleChangeTags}>Añadir Etiqueta</Outline_Button>

        <div style={{ width: progress, backgroundColor: 'blue', color: 'white' }}>
           {progress}
        </div>
        <br></br>
        <AppButton onClick={handleCourseRegister}>{buttonText}</AppButton>
      </ContentView>
    </Form>
    <Footer/>
  </Page>);
}

export default CourseRegister;