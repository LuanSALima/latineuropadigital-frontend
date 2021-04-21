import React, { useState, useEffect } from 'react';

import Header from '../../../components/Header';
import { AppButton, ContentView, Form, OutlineButton, Page, ProgressBar } from '../../../styles/default';
import Footer from '../../../components/Footer';
import api from '../../../services/api';

import {MdFileUpload} from 'react-icons/md/index';
import Toastifying, {TOASTIFY_OPTIONS} from "../../../components/Toastifying";
import { toast } from 'react-toastify';
import ModalTag from '../../../components/ModalTag';

import Select from 'react-select';

import useMyForm, { verifyLink } from '../../../hooks/useValidationForm';

function CourseEdit(props) {

  const [buttonText, setButtonText] = useState("Editar");

  const [idCourse] = useState(props.match.params.id);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState('');
  const [link, setLink] = useState("");
  const [tags, setTags] = useState([]);
  const [dbTags, setDbTags] = useState([]);
  const [errors, setErrors] = useState({});
  const [progress, setProgess] = useState(0); // progess bar

  const [modalShow,setModalShow] = useState(false);
  const [previewImage,setPreviewImage] = useState();

  const handleValidator =  useMyForm(title,subtitle,content,tags,link);
  const handleLinkValidator = verifyLink(link);

  const [firstRender,setFirstRender]= useState(true);

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

  useEffect(() => {

    async function getCourse() {
      try {
        const response = await api.get("/course/"+idCourse);

        if(response.data.success) {
          if(response.data.course) {
            setTitle(response.data.course.title);
            setSubtitle(response.data.course.subtitle);
            setContent(response.data.course.content);
            setTags(response.data.course.tags);
            setLink(response.data.course.link);
          }
        }
      } catch (error) {
        setErrors({message: "Não foi possível carregar o Courseo"});
        if(error.response) {
          if(error.response.data) {
            if(error.response.data.message) {
              setErrors({message: error.response.data.message});
            }
          }
        }
      }
    }

    getCourse();
    listTags();
  }, [idCourse]);

  const handleCourseEdit = async (e) => {
    e.preventDefault();
    setButtonText("Enviando Dados ...");
    
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
        
        const response = await api.put("/course/"+idCourse, formData, {
          onUploadProgress: (ProgressCourse) => {
            let progress = Math.round(ProgressCourse.loaded / ProgressCourse.total * 100) + '%';
            setProgess(progress);
          }
        });

        if(response.data.success) {
          setButtonText("Editado com Sucesso");
        }
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
      setFirstRender(false);
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

  const [courseTags,setCourseTags] = useState();
  
  useEffect(()=>{
    const createSelectOptions = () => {
      let options = []
      for(const tag of tags){
          options.push({label:tag,value:tag})
        }
       setCourseTags(options);
    }
    createSelectOptions();
  },[tags]);


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
        <label>Edite o Curso !</label>

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
          style={!useMyForm(subtitle) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
          placeholder="  Subtítulo"
          type="text"
           onChange={(e) => {
            setSubtitle(e.target.value);
          }}
          value={subtitle}
        />
        <span style={{color: 'red'}}>{errors.subtitle}</span>

        <textarea
          style={!useMyForm(content) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
          placeholder="  Conteudo"
          type="text"
           onChange={(e) => {
            setContent(e.target.value);
          }}
          value={content}
        />
        <span style={{color: 'red'}}>{errors.content}</span>

        <div>
        <label htmlFor="uploadPhoto" className="btn-cta">
          {image?.name?image?.name:"Haga clic aquí para agregar una imagen"}
        <MdFileUpload />
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
          value={courseTags}
          isMulti
          closeMenuOnSelect={false}
          onChange={onChangeSelectTags}
          placeholder={"¡Seleccione las etiquetas!"}
        />
       
        <span style={{color: 'red'}}>{errors.dbTags}</span>

        </fieldset>
        <OutlineButton type="success" onClick={handleChangeTags}>Añadir Etiqueta</OutlineButton>
        <div style={{width: '100%'}}>
          <ProgressBar width={progress}>
            {progress}
          </ProgressBar>
        </div>
        <AppButton onClick={handleCourseEdit}>{buttonText}</AppButton>
      </ContentView>
    </Form>
    <Footer/>
  </Page>);
}

export default CourseEdit;