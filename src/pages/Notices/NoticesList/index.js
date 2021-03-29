import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import NoticesCard from '../../../components/NoticesCard';
import {  Page, ScreenView } from '../../../styles/default';
import imgTest from '../../../assets/icon.svg';

import api from '../../../services/api';
import HorizonScrollView from '../../../components/HorizonScrollView';
import Footer from '../../../components/Footer';
import { MyScreenView } from './styles';

function NoticesList() {

  const [notices, setNotices] = useState([]);
  const [tags, setTags] = useState([]);
 
  const listTags = async () =>{
    try {
      const response = await api.get("notices/tags");
      setTags(response.data.tags);
    } catch (error) {
    }
  }
   const listNotices = async () => {
    try {

      const response = await api.get("/notice/list");

      if(response.data.success) {
        if(response.data.notices) {
          let noticesDb = [];
          for(let index in response.data.notices) {
            const notice = response.data.notices[index];
            noticesDb.push({ tag : notice.tags,id: notice._id, title: notice.title, description: notice.description, image: `${process.env.REACT_APP_API_URL}`+notice.imagePath, icon: imgTest});
          }
          setNotices(noticesDb);
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
    <h1> Noticias y actualidad:</h1>
{tags.map((tags)=>(
  <HorizonScrollView title={tags.title} subtitle="Espetáculos, entretenimento e mucho más">
  {notices.map((content)=>(
    content.tag.map((tagFiltered)=>{
      if(tagFiltered === tags.title){
        return  <NoticesCard id={content.id} icon={content.icon} image={content.image} title={content.title.length >= 18?content.title+"..":content.title}text={content.description.length >= 75 ? content.description+"..":content.description} />
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

export default NoticesList;