import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import NoticesCard from '../../../components/NoticesCard';
import { Page, ScreenView } from '../../../styles/default';

import api from '../../../services/api';

import { isAdmin } from '../../../services/auth';
import Footer from '../../../components/Footer';

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
    setRemoveButtonText("Removendo ...");

    try {
      const response = await api.delete("/directory/"+idDirectory);

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

        <img src={process.env.REACT_APP_API_URL+directory.imagePath} />

        <h1>Titulo</h1>
        <h3>{directory.title}</h3>

        <h1>Descrição</h1>
        <h3>{directory.description}</h3>
        
        {
        isAdmin() ?
        <div>
          <button onClick={handleRemoveDirectory}>{removeButtonText}</button>
        </div>
        :
        <br />
        }

        </ScreenView>
        <Footer/>
      </Page>
  );
}

export default DirectoryDetails;