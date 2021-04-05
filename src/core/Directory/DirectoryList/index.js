import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import NoticesCard from '../../../components/NoticesCard';
import {  MyFilteredOptions, Page, ScreenView } from '../../../styles/default';
import imgTest from '../../../assets/icon.svg';
import Select from 'react-select';

import api from '../../../services/api';
import HorizonScrollView from '../../../components/HorizonScrollView';
import Footer from '../../../components/Footer';
import { MyScreenView } from './styles';

import { Link } from 'react-router-dom';
import { MdFilterList } from 'react-icons/md';

import Pagination from '../../../components/Pagination';

function DirectoryList() {

  const [directoriesFeatured, setDirectoriesFeatured] = useState([]);

  const [mostViewedAt, setMostViewedAt] = useState("daily");
  const [directoriesMostViewed, setDirectoriesMostViewed] = useState([]);

  const [directories, setDirectories] = useState([]);
  const [tags, setTags] = useState([]);

  const [actualPage, setActualPage] = useState(1);
  const [totalDirectories, setTotalDirectories] = useState(0);
 
  const listTags = async () => {
    try {
      const response = await api.get("directories/tags");
      setTags(response.data.tags);
    } catch (error) {
    }
  }
   const listDirectories = async () => {
    try {

      const response = await api.get("/directory/list");

      if(response.data.success) {
        if(response.data.directories) {
          let directoriesDb = [];
          for(let index in response.data.directories) {
            const directory = response.data.directories[index];
            directoriesDb.push({ tag : directory.tags,id: directory._id, title: directory.title, subtitle: directory.subtitle, image: `${process.env.REACT_APP_API_URL}`+directory.imagePath, icon: imgTest});
          }
          setDirectories(directoriesDb);
        }
        if (response.data.totalDirectories) {
          setTotalDirectories(response.data.totalDirectories);
        }
      }

    } catch (error) {
      
          
    }
  }

  const listDirectoriesMostViewed = async () => {
    try {

      const response = await api.get("/directory/list?views="+mostViewedAt);

      if(response.data.success) {
        if(response.data.directories) {
          let directoriesMostViewedDb = [];
          for(let index in response.data.directories) {
            const directory = response.data.directories[index];
            directoriesMostViewedDb.push({ tag : directory.tags,id: directory._id, title: directory.title, subtitle: directory.subtitle, image: `${process.env.REACT_APP_API_URL}`+directory.imagePath, icon: imgTest, views: directory.views});
          }
          setDirectoriesMostViewed(directoriesMostViewedDb);
        }
      }

    } catch (error) {
      setDirectoriesMostViewed([]);
    }
  }

  useEffect(() => {
    listDirectoriesMostViewed();
  }, [mostViewedAt]);

  useEffect(() => {
    listDirectories();
  }, [actualPage]);
  useEffect(() => {
    listTags();
  }, []);

  return (
      <Page>
        <Header/>
        <MyScreenView >
    <h1>Directorios</h1>

    <MyFilteredOptions>
          <Select
            placeholder={
              <MdFilterList
                style={{ marginLeft: "1rem" }}
                size={23}
                color="var(--color-freela-pink)"
              />
            }
            options={[
              { label: " Mais Visualizadas do Dia", value: "daily" },
              { label: " Mais Visualizadas da Semana", value: "weekly" },
              { label: " Mais Visualizadas do Mês", value: "monthly" },
              { label: " Mais Visualizadas de todos os tempos", value: "allTime" },
            ]}
            onChange={(e)=>setMostViewedAt(e.value)}
          />
        </MyFilteredOptions>

        <HorizonScrollView title={mostViewedAt} subtitle={"Mais visualizados durante o tempo: "+mostViewedAt}>
          {directoriesMostViewed.map((content)=>{
              return <Link to={"/diretorio/"+content.id}><NoticesCard id={content.id} icon={content.icon} image={content.image} title={content.title} text={content.subtitle} /><span>Views: {content.views}</span></Link>
            }
          )}
        </HorizonScrollView>

        <h2>Recentes</h2>
        <div style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {directories.map((content) => {
          return (
            <Link to={"/diretorio/" + content.id}>
              <NoticesCard
                id={content.id}
                icon={content.icon}
                image={content.image}
                title={content.title}
                text={content.subtitle}
              />
            </Link>
          );
        })}
        </div>

        <Pagination totalResults={totalDirectories} resultsPerPage={30} actualPage={actualPage} changePage={setActualPage}/>
        <span>PAGINA ATUAL: {actualPage}</span>

        </MyScreenView>
        <Footer/>
      </Page>
  );
}

export default DirectoryList;