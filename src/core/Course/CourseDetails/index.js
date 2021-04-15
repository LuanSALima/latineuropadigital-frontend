import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import { Details, Page, Outline_Button, AppButton } from '../../../styles/default';
import Toastifying, {TOASTIFY_OPTIONS} from '../../../components/Toastifying'
import api from '../../../services/api';

import { isAuthenticated } from '../../../services/auth';
import Footer from '../../../components/Footer';
import imgAux from '../../../assets/icon.svg';
import { toast } from 'react-toastify';
import history from '../../../services/history/history'
import Stars from '../../../components/Stars';

import { Content, MyImage } from "./styles";
import { MyScreenView } from "../CourseList/styles";

function CourseDetails(props) {

  const [removeButtonText, setRemoveButtonText] = useState("Remover");

  const [idCourse] = useState(props.match.params.id);
  const [course, setCourse] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [errors, setErrors] = useState({});

  async function findCourse() {
    try {
      const response = await api.get("/course/"+idCourse);

      if(response.data.success) {
        if(response.data.course) {
          setCourse(response.data.course);
        }
        if(response.data.featured) {
          setFeatured(response.data.featured);
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

  const updateFeatured = async (e) => {
    e.preventDefault();

    try {
      if(featured) {
        const response = await api.delete("/featured/"+featured._id);
        if(response.data.success) {
          toast.success("Removido dos destaques com sucesso", TOASTIFY_OPTIONS);
          
          setFeatured(null);
        }
      } else {
        const response = await api.post("/featured/create", {post: course._id, postType: 'Course'});
        if(response.data.success) {
          toast.success("Adicionado aos destaques com sucesso", TOASTIFY_OPTIONS);
          if(response.data.featured) {
            setFeatured(response.data.featured);
          }
        }
      }
    } catch (error) {
      toast.error("Não foi Possível Adicionar aos Destaques",TOASTIFY_OPTIONS)
    }
  }

  return (
    <Page>
      <Header/>
      <MyScreenView>
        <Content>
            {isAuthenticated() === true ? (
              <Stars isFeature={featured} onClick={updateFeatured} />
            ) : null}
            <Toastifying />

            <label>{course.title}</label>
            <h4>{course.subtitle}</h4>
            <br></br>
            <hr></hr>
            <MyImage>
              <img
                onError={handleImageError}
                src={process.env.REACT_APP_API_URL + course.imagePath}
              />
            </MyImage>
            <br></br>
            <hr></hr>
            <p>{course.content}</p>
          </Content>

          {course.link?.length > 1 ? (
            <div>
              <AppButton
                onClick={() => {
                  window.location.assign(course.link);
                }}
              >
                Accesito
              </AppButton>
            </div>
          ) : null}

          {isAuthenticated() && (
            <div>
              <Outline_Button type="danger" onClick={handleRemoveCourse}>
                {"Eliminar"}
              </Outline_Button>
              <Outline_Button type="warning" onClick={handleEditeCourse}>
                {"Editar"}
              </Outline_Button>
            </div>
          )}
      </MyScreenView>
      <Footer/>
  </Page>
  );
}

export default CourseDetails;