import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import { Details, Outline_Button, Page } from '../../../styles/default';
import imgAux from '../../../assets/icon.svg';
import Toastifying, {TOASTIFY_OPTIONS} from '../../../components/Toastifying'

import api from '../../../services/api';

import { isAdmin } from '../../../services/auth';
import Footer from '../../../components/Footer';
import history from '../../../services/history/history'
import { toast } from 'react-toastify';

function DirectoryDetails(props) {

  const [removeButtonText, setRemoveButtonText] = useState("Remover");

  const [idDirectory] = useState(props.match.params.id);
  const [directory, setDirectory] = useState([]);
  const [errors, setErrors] = useState({});

  async function findDirectory() {
    try {
      const response = await api.get("/directory/"+idDirectory);

      if(response.data.success) {
        if(response.data.directory) {
          setDirectory(response.data.directory);
        }
      }
    } catch (error) {
      setErrors({message: "Não foi possível encontrar este Directory"});
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
    findDirectory();
  }, []);

  const handleRemoveDirectory = async (e) => {
    e.preventDefault();

    try {
      await api.delete("/directory/"+idDirectory);
      toast.success("Removido com Sucesso!",TOASTIFY_OPTIONS)
      setTimeout(() => {
        history.push('/dashboard')
      }, 1500);
    
    } catch (error) {
        toast.error("Não foi possível remover" , TOASTIFY_OPTIONS)
     
    }
  }
  const handleEditeDirectory = ()=>{
    history.push("/directory/editar/"+idDirectory);
  }
  const handleImageError = (image)=>{
    image.target.src = imgAux;
  }
  return (
    <Page>
    <Header/>
    <Details width={"90%"}>
    <Toastifying/>

    <label>{directory.title}</label>
    <h3>{directory.subtitle}</h3>
    <img onError={handleImageError} src={process.env.REACT_APP_API_URL+directory.imagePath} />
    <h4> Contenido </h4>
    <span>{directory.content}</span>
    
    {
    isAdmin() &&
    <div>
      <Outline_Button type="danger" onClick={handleRemoveDirectory}>{"Eliminar"}</Outline_Button>
      <Outline_Button type="warning" onClick={handleEditeDirectory}>{"Editar"}</Outline_Button>
    </div>
    }

    </Details>
    <Footer/>
  </Page>
  );
}

export default DirectoryDetails;