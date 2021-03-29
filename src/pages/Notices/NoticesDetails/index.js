import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import NoticesCard from '../../../components/NoticesCard';
import { Page, ScreenView } from '../../../styles/default';

import api from '../../../services/api';

import { isAdmin } from '../../../services/auth';
import Footer from '../../../components/Footer';

function NoticesDetails(props) {

  const [removeButtonText, setRemoveButtonText] = useState("Remover");

  const [idNotice] = useState(props.match.params.id);
  const [notice, setNotice] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {

    async function findNotice() {
      try {
        const response = await api.get("/notice/"+idNotice);

        if(response.data.success) {
          if(response.data.notice) {
            setNotice(response.data.notice);
          }
        }
      } catch (error) {
        setErrors({message: "Não foi possível encontrar este Notice"});
        if(error.response) {
          if(error.response.data) {
            if(error.response.data.message) {
              setErrors({message: error.response.data.message});
            }
          }
        }
      }
    }
    findNotice();
  }, []);

  const handleRemoveNotice = async (e) => {
    e.preventDefault();
    setRemoveButtonText("Removendo ...");

    try {
      const response = await api.delete("/notice/"+idNotice);

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

        <img src={process.env.REACT_APP_API_URL+notice.imagePath} />

        <h1>Titulo</h1>
        <h3>{notice.title}</h3>

        <h1>Descrição</h1>
        <h3>{notice.description}</h3>
        
        {
        isAdmin() ?
        <div>
          <button onClick={handleRemoveNotice}>{removeButtonText}</button>
        </div>
        :
        <br />
        }

        </ScreenView>
        <Footer/>
      </Page>
  );
}

export default NoticesDetails;