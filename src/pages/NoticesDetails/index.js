import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import NoticesCard from '../../components/NoticesCard';
import { Page, ScreenView } from '../../styles/default';
import imgTest from '../../assets/icon.svg';

import api from '../../services/api';

import { isAdmin } from '../../services/auth';

function NoticesDetails(props) {

  const [removeButtonText, setRemoveButtonText] = useState("Remover");

  const [idPost] = useState(props.match.params.id);
  const [post, setPost] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {

    async function findPost() {
      try {
        const response = await api.get("/post/"+idPost);

        if(response.data.success) {
          if(response.data.post) {
            setPost(response.data.post);
          }
        }
      } catch (error) {
        setErrors({message: "Não foi possível encontrar este Post"});
        if(error.response) {
          if(error.response.data) {
            if(error.response.data.message) {
              setErrors({message: error.response.data.message});
            }
          }
        }
      }
    }
    findPost();
  }, []);

  const handleRemoveNotice = async (e) => {
    e.preventDefault();
    setRemoveButtonText("Removendo ...");

    try {
      const response = await api.delete("/post/"+idPost);

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

        <img src={process.env.REACT_APP_API_URL+post.imagePath} />

        <h1>Titulo</h1>
        <h3>{post.title}</h3>

        <h1>Descrição</h1>
        <h3>{post.description}</h3>
        
        {
        isAdmin() ?
        <div>
          <button onClick={handleRemoveNotice}>{removeButtonText}</button>
        </div>
        :
        <br />
        }

        </ScreenView>
      </Page>
  );
}

export default NoticesDetails;