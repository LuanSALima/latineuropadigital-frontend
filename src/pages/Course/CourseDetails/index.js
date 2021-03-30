import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import NoticesCard from '../../../components/NoticesCard';
import { Page, ScreenView } from '../../../styles/default';

import api from '../../../services/api';

import { isAdmin } from '../../../services/auth';
import Footer from '../../../components/Footer';

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
      const response = await api.delete("/course/"+idCourse);

      if(response.data.success) {
        setRemoveButtonText("Removido com sucesso!");
      }
    } catch (error) {
      setRemoveButtonText("Ocorreu um erro ao remover");
      
      if(error.response) {
        if(error.response.data) {
          if(error.response.data.message) {
            setErrors({message: error.response.data.message});
          }
        }
      }
    }
  }

  return (
      <Page>
        <Header/>
        <ScreenView width={"90%"}>
         {/* <FeatureContent>
        <b>Acesse Nossa PÁGINA!!!</b>
         </FeatureContent> */}
        <br></br>
        <h2 style={{color: 'red'}}>{errors.message}</h2>

        <img src={process.env.REACT_APP_API_URL+course.imagePath} />

        <h1>Titulo</h1>
        <h3>{course.title}</h3>

        <h1>Descrição</h1>
        <h3>{course.description}</h3>
        
        {
        isAdmin() ?
        <div>
          <button onClick={handleRemoveCourse}>{removeButtonText}</button>
        </div>
        :
        <br />
        }

        </ScreenView>
        <Footer/>
      </Page>
  );
}

export default CourseDetails;