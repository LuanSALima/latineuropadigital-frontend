import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import { Details, Page, Outline_Button } from '../../../styles/default';
import Toastifying, {TOASTIFY_OPTIONS} from '../../../components/Toastifying'
import api from '../../../services/api';

import { isAdmin } from '../../../services/auth';
import Footer from '../../../components/Footer';
import imgAux from '../../../assets/icon.svg';
import { toast } from 'react-toastify';
import history from '../../../services/history/history'

function CourseDetails(props) {

  const [removeButtonText, setRemoveButtonText] = useState("Remover");

  const [idCourse] = useState(props.match.params.id);
  const [course, setCourse] = useState([]);
  const [errors, setErrors] = useState({});

  async function findCourse() {
    try {
      const response = await api.get("/course/"+idCourse);

      if(response.data.success) {
        if(response.data.course) {
          setCourse(response.data.course);
        }
      }
    } catch (error) {
      setErrors({message: "Não foi possível encontrar este Courseo"});
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
    findCourse();
  }, []);

  const handleRemoveCourse = async (e) => {
    e.preventDefault();
    setRemoveButtonText("Removendo ...");

    try {
       await api.delete("/course/"+idCourse);

      toast.success("Removido com Sucesso!",TOASTIFY_OPTIONS)
      setTimeout(() => {
        history.push('/dashboard')
      }, 1500);
      
    } catch (error) {
      
      toast.error("Não foi Possível Remover",TOASTIFY_OPTIONS)
  
      
    }
  }

  const handleImageError = (image)=>{
    image.target.src = imgAux;
  }
  const handleEditeCourse = ()=>{
    history.push("/course/editar/"+idCourse);
  }

  return (
    <Page>
    <Header/>
    <Details width={"90%"}>
    <Toastifying/>

    <label>{course.title}</label>
    <h3>{course.subtitle}</h3>
    <img onError={handleImageError} src={process.env.REACT_APP_API_URL+course.imagePath} />
    <h4> Contenido </h4>
    <span>{course.content}</span>
    
    {
    isAdmin() &&
    <div>
      <Outline_Button type="danger" onClick={handleRemoveCourse}>{"Eliminar"}</Outline_Button>
      <Outline_Button type="warning" onClick={handleEditeCourse}>{"Editar"}</Outline_Button>
    </div>
    }

    </Details>
    <Footer/>
  </Page>
  );
}

export default CourseDetails;