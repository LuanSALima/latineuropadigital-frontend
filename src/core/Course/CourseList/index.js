import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import NoticesCard from '../../../components/NoticesCard';
import {  MyCardLink, MyCardMap, MyFilteredOptions, MySideBarCard, MySideCardLink, Page, ScreenView } from '../../../styles/default';
import imgTest from '../../../assets/icon.svg';
import Select from 'react-select';
import api from '../../../services/api';
import HorizonScrollView from '../../../components/HorizonScrollView';
import Footer from '../../../components/Footer';
import { MyScreenView } from './styles';

import { Link } from 'react-router-dom';
import { MdFilterList, MdStar } from 'react-icons/md';

import Pagination from '../../../components/Pagination';

function CourseList() {

  const [coursesFeatured, setCoursesFeatured] = useState([]);

  const [mostViewedAt, setMostViewedAt] = useState("daily");
  const [coursesMostViewed, setCoursesMostViewed] = useState([]);

  const [courses, setCourses] = useState([]);
  const [tags, setTags] = useState([]);

  const [actualPage, setActualPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
 
  const [postsSideBar, setPostsSideBar] = useState([]);
  const [courseSideBar, setCourseSideBar] = useState([]);

  const listTags = async () => {
    try {
      const response = await api.get("courses/tags");
      setTags(response.data.tags);
    } catch (error) {
    }
  }
   const listCourses = async () => {
    try {

      const response = await api.get("/course/list");

      if(response.data.success) {
        if(response.data.courses) {
          let coursesDb = [];
          for(let index in response.data.courses) {
            const course = response.data.courses[index];
            coursesDb.push({ tag : course.tags,id: course._id, title: course.title, subtitle: course.subtitle, image: `${process.env.REACT_APP_API_URL}`+course.imagePath, icon: imgTest});
          }
          setCourses(coursesDb);
        }
        if(response.data.totalCourses) {
          setTotalCourses(response.data.totalCourses);
        }
      }

    } catch (error) {
      
          
    }
  }

  const listCoursesMostViewed = async () => {
    try {

      const response = await api.get("/course/list?views="+mostViewedAt);

      if(response.data.success) {
        if(response.data.courses) {
          let coursesMostViewedDb = [];
          for(let index in response.data.courses) {
            const course = response.data.courses[index];
            coursesMostViewedDb.push({ tag : course.tags,id: course._id, title: course.title, subtitle: course.subtitle, image: `${process.env.REACT_APP_API_URL}`+course.imagePath, icon: imgTest, views: course.views});
          }
          setCoursesMostViewed(coursesMostViewedDb);
        }
      }

    } catch (error) {
      setCoursesMostViewed([]);
    }
  }

  useEffect(() => {
    listCoursesMostViewed();
  }, [mostViewedAt]);

  useEffect(() => {
    listCourses();
  }, [actualPage]);
  useEffect(() => {
    listTags();
  }, []);

  return (
      <Page>
        <Header/>
        <MyScreenView >

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



         {/* <CardCarousel items={noticesMostViewed} route={"/noticia"}/> */}


         <div style={{display: 'block'}}>
        <MyCardMap>
        <h2>Cursos</h2>
        {courses.map((content) => {
          return (
            <MyCardLink>

            <Link to={"/curso/" + content.id}>
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
            {courseSideBar.map((notice) => {
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
        <Pagination totalResults={totalCourses} resultsPerPage={30} actualPage={actualPage} changePage={setActualPage}/>

        </MyScreenView>
        <Footer/>
      </Page>
  );
}

export default CourseList;