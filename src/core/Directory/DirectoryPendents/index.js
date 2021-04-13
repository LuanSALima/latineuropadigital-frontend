import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import NoticesCard from '../../../components/NoticesCard';
import {  MyCardLink, MyCardMap, MyFilteredOptions, MySideBarCard, MySideCardLink, Page, ScreenView } from '../../../styles/default';
import imgTest from '../../../assets/icon.svg';
import Select from 'react-select';

import api from '../../../services/api';
import HorizonScrollView from '../../../components/HorizonScrollView';
import Footer from '../../../components/Footer';

import { Link } from 'react-router-dom';
import { MdFilterList, MdStar } from 'react-icons/md';

import Pagination from '../../../components/Pagination';
import { MyScreenView } from '../DirectoryList/styles';

function DirectoryPendents() {

  const [directoriesFeatured, setDirectoriesFeatured] = useState([]);

  const [directories, setDirectories] = useState([]);
  const [tags, setTags] = useState([]);

  const [actualPage, setActualPage] = useState(1);
  const [totalDirectories, setTotalDirectories] = useState(0);
 

  const [postsSideBar, setPostsSideBar] = useState([]);
  const [directorySideBar, setDirectorySideBar] = useState([]);

  const listDirectories = async () => {
    try {

      const response = await api.get("/directories/pendent");

      if(response.data.success) {
        if(response.data.directories) {
          let directoriesDb = [];
          for(let index in response.data.directories) {
            const directory = response.data.directories[index];
            directoriesDb.push({ tag : directory.tags,id: directory._id, title: directory.businessName, subtitle: directory.businessAdress, image: `${process.env.REACT_APP_API_URL}`+directory.imagePath, icon: imgTest});
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

  useEffect(() => {
    listDirectories();
  }, [actualPage]);

  return (
      <Page>
        <Header/>
        <MyScreenView >
      
      
        {/* <CardCarousel items={noticesMostViewed} route={"/noticia"}/> */}


        <div style={{display: 'block'}}>
        <MyCardMap>
        <h2>Directorios Pendentes</h2>

        {directories.map((content) => {
          return (
            <MyCardLink>

            <Link to={"/diretorio/" + content.id}>
              <NoticesCard
                id={content.id}
                icon={content.icon}
                image={content.image}
                title={content.title}
                text={content.subtitle}
              />
            </Link>
            </MyCardLink>

          );
        })}
        </MyCardMap>


  {/* Will enter the sidebar */}
  <MySideCardLink>
            {postsSideBar?.map((featured) => {
              let link = "/";

              switch(featured.postType) {
                case 'Notice':
                  link = "/noticia/";
                  break;
                case 'Directory':
                  link = "/diretorio/";
                  break;
                case 'Event':
                  link = "/evento/";
                  break;
                case 'Course':
                  link = "/curso/";
                  break;
                default:
                  break;
              }

              return (
                <Link to={link+featured.id}>
                  <MySideBarCard >
                    <img  src={featured.image} onError={(image) => {image.target.src = imgTest}}/>
                    <span >{featured.title}</span><MdStar size={30} color="yellow"/>
                  </MySideBarCard>
                </Link>
              );
            })}
            {directorySideBar.map((notice) => {
              return (
                <Link to={"/noticia/" + notice.id}>
                  <MySideBarCard >
                    <img  src={notice.image} onError={(image) => {image.target.src = imgTest}}/>
                    <span >{notice.title.length > 20?notice.title.substr(0,20)+"...":notice.title}</span>
                  </MySideBarCard>
                </Link>
              );
            })} 
          </MySideCardLink>


        </div>
        <Pagination totalResults={totalDirectories} resultsPerPage={30} actualPage={actualPage} changePage={setActualPage}/>

        </MyScreenView>
        <Footer/>
      </Page>
  );
}

export default DirectoryPendents;