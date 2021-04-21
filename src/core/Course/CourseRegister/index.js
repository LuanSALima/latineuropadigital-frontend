import React, { useState, useEffect } from 'react';

import Header from '../../../components/Header';
import { AppButton, ContentView, Form, OutlineButton, Page } from '../../../styles/default';
import Footer from '../../../components/Footer';
import api from '../../../services/api';
import Select from 'react-select';
import {MdFileUpload} from 'react-icons/md/index'
import Toastifying, {TOASTIFY_OPTIONS} from "../../../components/Toastifying"
import { toast } from 'react-toastify';
import ModalTag from '../../../components/ModalTag';

import useMyForm, { verifyLink } from '../../../hooks/useValidationForm';

function CourseRegister() {

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState('');
  const [tags, setTags] = useState([]);
  const [dbTags, setDbTags] = useState([]);
  const [link,setLink]= useState('');

  const [modalShow,setModalShow] = useState(false);
  const [previewImage,setPreviewImage] = useState();

  const handleValidator =  useMyForm(title,subtitle,content,image,tags,link);
  const handleLinkValidator = verifyLink(link);

  const [firstRender,setFirstRender]= useState(true);

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
    }
  }

  useEffect(() => {
    listTags();
  }, []);

  const handleCourseRegister = async (e) => {
    e.preventDefault();
    
    if(handleValidator && handleLinkValidator){
      const formData = new FormData();
      formData.append('title', title);
      formData.append('subtitle', subtitle);
      formData.append('content', content);
      formData.append('image', image);
      formData.append('link', link);
      for(const tag of tags) {
        formData.append('tags', tag);
      }
      
      try {
        
        await api.post("/course/create", formData);
        toast.success("¡Registrado correctamente!",TOASTIFY_OPTIONS)
      } catch (error) {
          toast.error("¡Hubo un error! Verifique que todos los campos estén llenos",TOASTIFY_OPTIONS)
      }
    }else{
      toast.error("¡Hubo un error! Verifique que todos los campos estén llenos",TOASTIFY_OPTIONS)
      setFirstRender(false);
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
        <label>¡Crea un curso!</label>

        <input
          style={!useMyForm(title) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
          placeholder="Título"
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />

        <input
          style={!useMyForm(subtitle) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
          placeholder="Subtítulo"
          type="text"
           onChange={(e) => {
            setSubtitle(e.target.value);
          }}
          value={subtitle}
        />

        <textarea
          style={!useMyForm(content) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
          placeholder="Contenido"
          type="text"
           onChange={(e) => {
            setContent(e.target.value);
          }}
          value={content}
        />


        <div>
        <label htmlFor="uploadPhoto" className="btn-cta">
          {image?.name?image?.name:"Haga clic aquí para agregar una imagen"}
        <MdFileUpload style={!useMyForm(image) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}/>
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
       { image && <img src={previewImage} alt="Imagen para previsualizar la imagen que se registrará"/>}
       </div>
          
        <span>Por favor, inserte "http: //" o "https: //" antes de su enlace.</span>
       <input style={!verifyLink(link) && !firstRender?{backgroundColor: '#f9b3b3'}:{}} type="text" placeholder="Link" onChange={(e)=>{setLink(e.target.value)}} value={link} />

        <fieldset>
        <Select
          style={!useMyForm(tags) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
         options={dbTags.map((currentTag)=>(
          {label:currentTag,value:currentTag}))}
          isClearable
          isMulti
          closeMenuOnSelect={false}
          onChange={onChangeSelectTags}
          placeholder={"Seleccionar Etiquetas"}
        />

        </fieldset>
        <OutlineButton type="success" onClick={handleChangeTags}>Añadir Etiqueta</OutlineButton>

        <AppButton onClick={handleCourseRegister}>Registrar</AppButton>
      </ContentView>
    </Form>
    <Footer/>
  </Page>);
}

export default CourseRegister;