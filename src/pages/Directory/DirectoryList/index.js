import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import NoticesCard from '../../../components/NoticesCard';
import {  Page, ScreenView } from '../../../styles/default';
import imgTest from '../../../assets/icon.svg';

import api from '../../../services/api';
import HorizonScrollView from '../../../components/HorizonScrollView';
import Footer from '../../../components/Footer';
import { MyScreenView } from './styles';

import { Link } from 'react-router-dom';

function DirectoryList() {

  const [directories, setDirectories] = useState([]);
  const [tags, setTags] = useState([]);
 
  const listTags = async () => {
    try {
      const response = await api.get("directories/tags");
      setTags(response.data.tags);
    } catch (error) {
    }
  }
   const listNotices = async () => {
    try {

      const response = await api.get("/directory/list");

      if(response.data.success) {
        if(response.data.directories) {
          let directoriesDb = [];
          for(let index in response.data.directories) {
            const directory = response.data.directories[index];
            directoriesDb.push({ tag : directory.tags,id: directory._id, title: directory.title, description: directory.description, image: `${process.env.REACT_APP_API_URL}`+directory.imagePath, icon: imgTest});
          }
          setDirectories(directoriesDb);
        }
      }

    } catch (error) {
      
          
    }
  }

  useEffect(() => {
    listNotices();
  }, []);
  useEffect(() => {
    listTags();
  }, []);

  return (
      <Page>
        <Header/>
        <MyScreenView >
    <h1> Diretorios :</h1>
{tags.map((tags)=>(
  <HorizonScrollView title={tags.title} subtitle={tags.description}>
  {directories.map((content)=>(
    content.tag.map((tagFiltered)=>{
      if(tagFiltered === tags.title){
        return  <Link to={"/diretorio/"+content.id}><NoticesCard id={content.id} icon={content.icon} image={content.image} title={content.title.length >= 18?content.title+"..":content.title}text={content.description.length >= 75 ? content.description+"..":content.description} /></Link>
       }
    })
 
  ))}
  </HorizonScrollView>
  ))
  }
        </MyScreenView>
        <Footer/>
      </Page>
  );
}

export default DirectoryList;