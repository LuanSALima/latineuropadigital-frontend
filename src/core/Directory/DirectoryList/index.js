import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import NoticesCard from "../../../components/NoticesCard";
import { MyCardLink, MyFilteredOptions, MySideCardLink, Page, MyCardMap, MySideBarCard } from "../../../styles/default";
import imgTest from "../../../assets/icon.svg";

import api from "../../../services/api";
import Footer from "../../../components/Footer";
import { MyScreenView } from "./styles";
import { Link } from "react-router-dom";
import Select from "react-select";
import { MdFilterList } from "react-icons/md/index";

import Pagination from '../../../components/Pagination';
import CardCarousel from '../../../components/CardCarousel';

import { MdStar } from 'react-icons/md';

function DirectoryList() {

  const [mostViewedAt, setMostViewedAt] = useState("daily");
  const [directoriesMostViewed, setDirectoriesMostViewed] = useState([]);

  const [directories, setDirectories] = useState([]);
  //const [tags, setTags] = useState([]);

  const [actualPage, setActualPage] = useState(1);
  const [qntResults] = useState(10);
  const [totalDirectories, setTotalDirectories] = useState(0);
 
  const [postsSideBar, setPostsSideBar] = useState([]);
  const [directorySideBar, setDirectorySideBar] = useState([]);
  /*
  const listTags = async () => {
    try {
      const response = await api.get("directories/tags");
      setTags(response.data.tags);
    } catch (error) {
    }
  }
  */

  const listDirectoriesSideBar = async () => {
    try {
      const response = await api.get("/directory/list?results=2&views=weekly");

      if (response.data.success) {
        if (response.data.directories) {
          let directoriesSideBarDB = [];
          for (let index in response.data.directories) {
            const directory = response.data.directories[index];
            directoriesSideBarDB.push({
              tag: directory.tags,
              id: directory._id,
              title: directory.businessName,
              subtitle: directory.businessDescription,
              image: `${process.env.REACT_APP_API_URL}` + directory.imagePath,
              icon: imgTest,
              views: directory.views,
            });
          }
          setDirectorySideBar(directoriesSideBarDB);
        }
      }
    } catch (error) {
      setDirectorySideBar([]);
    }
  };

  const listSideBar = async () => {
    try {
      const response = await api.get("/featured/list?type=directory&results=3");

      if (response.data.success) {
        if (response.data.featureds) {
          let postsSideBarDB = [];
          for (let index in response.data.featureds) {
            const featuredPost = response.data.featureds[index].post;

            let postTitle = "Titulo no encontrado";

            if(featuredPost.title) {
              postTitle = featuredPost.title;
            } else if (featuredPost.businessName) {
              postTitle = featuredPost.businessName;
            } else if (featuredPost.eventName) {
              postTitle = featuredPost.eventName;
            }

            postsSideBarDB.push({
              id: featuredPost._id,
              title: postTitle,
              image: `${process.env.REACT_APP_API_URL}` + featuredPost.imagePath,
              postType: response.data.featureds[index].postType
            });
          }
          setPostsSideBar(postsSideBarDB);
        }
      }
    } catch (error) {
      setPostsSideBar([]);
    }
  };

  useEffect(() => {

    const listDirectoriesCarousel = async () => {
      try {
        const response = await api.get("/directory/list?results=5&views=" + mostViewedAt);

        if (response.data.success) {
          if (response.data.directories) {
            let directoriesMostViewedDb = [];
            for (let index in response.data.directories) {
              const directory = response.data.directories[index];
              directoriesMostViewedDb.push({
                tag: directory.tags,
                id: directory._id,
                title: directory.businessName,
                subtitle: directory.businessDescription,
                image: `${process.env.REACT_APP_API_URL}` + directory.imagePath,
                icon: imgTest,
                views: directory.views,
              });
            }
            setDirectoriesMostViewed(directoriesMostViewedDb);
          }
        }
      } catch (error) {
        setDirectoriesMostViewed([]);
      }
    }

    listDirectoriesCarousel();
  }, [mostViewedAt]);

  useEffect(() => {

    const listDirectories = async () => {
      try {

        const response = await api.get("/directory/list?page="+actualPage+"&results="+qntResults);

        if(response.data.success) {
          if(response.data.directories) {
            let directoriesDb = [];
            for(let index in response.data.directories) {
              const directory = response.data.directories[index];
              directoriesDb.push({ 
                tag : directory.tags,
                id: directory._id,
                title: directory.businessName,
                subtitle: directory.businessDescription,
                image: `${process.env.REACT_APP_API_URL}`+directory.imagePath,
                icon: imgTest,
                date: directory.createdAt
              });
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

    listDirectories();
  }, [actualPage, qntResults]);

  useEffect(() => {
    //listTags();
    listSideBar();
    listDirectoriesSideBar();
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

          <CardCarousel items={directoriesMostViewed} route={"/diretorio"}/>
          <div style={{display: 'block'}}>
          
            <MyCardMap>
            {directories.map((content, index) => {
              return (
                <MyCardLink key={index}>
                  <Link to={"/diretorio/" + content.id}>
                    <NoticesCard
                      id={content.id}
                      tag={content.tag}
                      icon={content.icon}
                      image={content.image}
                      title={content.title}
                      text={content.subtitle}
                      date={content.date}
                    />
                  </Link>
                </MyCardLink>
              );
            })}
            </MyCardMap>

            {/* Will enter the sidebar */}
            <MySideCardLink>
              {postsSideBar?.map((featured, index) => {
                let link = "/";

                switch(featured.postType) {
                  case 'Notice':
                    link = "/diretorio/";
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
                  <Link to={link+featured.id} key={index}>
                    <MySideBarCard >
                      <img src={featured.image} onError={(image) => {image.target.src = imgTest}} alt={"Imagen del destacado "+featured.title}/>
                      <span >{featured.title}</span><MdStar size={30} color="yellow"/>
                    </MySideBarCard>
                  </Link>
                );
              })}

              {directorySideBar.map((directory, index) => {
                return (
                  <Link to={"/diretorio/" + directory.id} key={index}>
                    <MySideBarCard >
                      <img src={directory.image} onError={(image) => {image.target.src = imgTest}} alt={"Imagen de "+directory.title}/>
                      <span>{directory.title.length > 20?directory.title.substr(0,20)+"...":directory.title}</span>
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

export default DirectoryList;