import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import NoticesCard from '../../../components/NoticesCard';
import {  Page, ScreenView } from '../../../styles/default';
import imgTest from '../../../assets/icon.svg';

import api from '../../../services/api';
import HorizonScrollView from '../../../components/HorizonScrollView';
import Footer from '../../../components/Footer';
import { MyScreenView } from './styles';
import {Select} from 'react-select'
import { Link } from 'react-router-dom';
      

function NoticesList() {

  const [noticesFeatured, setNoticesFeatured] = useState([]);

  const [mostViewedAt, setMostViewedAt] = useState("daily");
  const [noticesMostViewed, setNoticesMostViewed] = useState([]);

  const [notices, setNotices] = useState([]);
  const [tags, setTags] = useState([]);
 
  const listTags = async () => {
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

  const listNoticesMostViewed = async () => {
    try {

      const response = await api.get("/notice/list?views="+mostViewedAt);

      if(response.data.success) {
        if(response.data.notices) {
          let noticesMostViewedDb = [];
          for(let index in response.data.notices) {
            const notice = response.data.notices[index];
            noticesMostViewedDb.push({ tag : notice.tags,id: notice._id, title: notice.title, description: notice.description, image: `${process.env.REACT_APP_API_URL}`+notice.imagePath, icon: imgTest, views: notice.views});
          }
          setNoticesMostViewed(noticesMostViewedDb);
        }
      }

    } catch (error) {
    }
  }

  useEffect(() => {
    listNoticesMostViewed();
  }, [mostViewedAt]);
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
          <h1>Noticias y Actualidad</h1>

          <h2>Mais Visualizados</h2>
          
          <button className={(mostViewedAt === 'daily')? "btn btn-primary" : "btn btn-outline-primary" } onClick={(e) => {e.preventDefault();setMostViewedAt("daily")}}>
           Mais Visualizadas do Dia
          </button>

          <button className={(mostViewedAt === 'weekly')? "btn btn-primary" : "btn btn-outline-primary" } onClick={(e) => {e.preventDefault();setMostViewedAt("weekly")}}>
           Mais Visualizadas da Semana
          </button>

          <button className={(mostViewedAt === 'monthly')? "btn btn-primary" : "btn btn-outline-primary" } onClick={(e) => {e.preventDefault();setMostViewedAt("monthly")}}>
           Mais Visualizadas do Mês
          </button>

          <button className={(mostViewedAt === 'allTime')? "btn btn-primary" : "btn btn-outline-primary" } onClick={(e) => {e.preventDefault();setMostViewedAt("allTime")}}>
           Mais Visualizadas de todos os tempos
          </button>

          <HorizonScrollView title={mostViewedAt} subtitle={"Mais visualizados durante o tempo: "+mostViewedAt}>
            {noticesMostViewed.map((content)=>{
                return <Link to={"/noticia/"+content.id}><NoticesCard id={content.id} icon={content.icon} image={content.image} title={content.title.length >= 18?content.title+"..":content.title}text={content.description.length >= 75 ? content.description+"..":content.description} /><span>Views: {content.views}</span></Link>
              }
            )}
          </HorizonScrollView>

          <h2>Recentes</h2>
          {tags.map((tags)=>(
            <HorizonScrollView title={tags.title} subtitle={tags.description}>
              {notices.map((content)=>(
                content.tag.map((tagFiltered)=>{
                  if(tagFiltered === tags.title){
                    return  <Link to={"/noticia/"+content.id}><NoticesCard id={content.id} icon={content.icon} image={content.image} title={content.title.length >= 18?content.title+"..":content.title}text={content.description.length >= 75 ? content.description+"..":content.description} /></Link>
                   }
                })
              ))}
            </HorizonScrollView>
          ))}
        </MyScreenView>
        <Footer/>
      </Page>
  );
}

export default NoticesList;