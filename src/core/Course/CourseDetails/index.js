import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import { Page, OutlineButton, AppButton } from '../../../styles/default';
import Toastifying, {TOASTIFY_OPTIONS} from '../../../components/Toastifying'
import api from '../../../services/api';

import { isAuthenticated } from '../../../services/auth';
import Footer from '../../../components/Footer';
import { toast } from 'react-toastify';
import history from '../../../services/history/history'
import Stars from '../../../components/Stars';

import { Content, MyImage } from "./styles";
import { MyScreenView } from "../CourseList/styles";

function CourseDetails(props) {

  const [removeButtonText, setRemoveButtonText] = useState("Eliminar");

  const [idCourse] = useState(props.match.params.id);
  const [course, setCourse] = useState([]);
  const [featured, setFeatured] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
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
        setErrors({message: "Este curso no se pudo encontrar"});
        if(error.message) {
          setErrors({message: error.message});
        }
      }
    }
    findCourse();
    
  }, [idCourse]);

  const handleRemoveCourse = async (e) => {
    e.preventDefault();
    setRemoveButtonText("Eliminando ...");

    try {
       await api.delete("/course/"+idCourse);

      toast.success("Eliminado con éxito!",TOASTIFY_OPTIONS)
      setTimeout(() => {
        history.push('/dashboard')
      }, 1500);
      
    } catch (error) {
      setRemoveButtonText("Hubo un error al eliminar");

      if(error.message) {
        toast.error(error.message, TOASTIFY_OPTIONS);
      } else {
        toast.error("No se pudo eliminar", TOASTIFY_OPTIONS);
      }
    }
  }

  const handleImageError = (image)=>{
    //image.target.src = imgAux;
    image.target.style.display='none'
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
          toast.success("Eliminado con éxito de lo más destacado", TOASTIFY_OPTIONS);
          
          setFeatured(null);
        }
      } else {
        const response = await api.post("/featured/create", {post: course._id, postType: 'Course'});
        if(response.data.success) {
          toast.success("Agregado con éxito a los aspectos más destacados", TOASTIFY_OPTIONS);
          if(response.data.featured) {
            setFeatured(response.data.featured);
          }
        }
      }
    } catch (error) {
      toast.error("No se pudo agregar a lo más destacado",TOASTIFY_OPTIONS)
    }
  }
  return (
    <Page>
      <Header/>
      <MyScreenView>
        <Content>
            <h2 style={{color: 'red'}}>{errors.message}</h2>
            {isAuthenticated() === true ? (
              <Stars isFeature={featured} onClick={updateFeatured} />
            ) : null}
            <Toastifying />

            <label>{course.title}</label>
            <h4>{course.subtitle}</h4>

           {course.imagePath? 
            <MyImage>
              <img
                onError={handleImageError}
                src={process.env.REACT_APP_API_URL + course.imagePath}
                alt={"Imagen de "+course.title}
              />
            </MyImage>
            :
            <></>
          }
            <hr></hr>

            {course.content?
              course.content.split('\n').map((content) => {
                return <p>{content} <br/></p>
              })
              :
              <></>
            }
            
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
              <OutlineButton type="danger" onClick={handleRemoveCourse}>
                {removeButtonText}
              </OutlineButton>
              <OutlineButton type="warning" onClick={handleEditeCourse}>
                {"Editar"}
              </OutlineButton>
            </div>
          )}
      </MyScreenView>
      <Footer/>
  </Page>
  );
}

export default CourseDetails;