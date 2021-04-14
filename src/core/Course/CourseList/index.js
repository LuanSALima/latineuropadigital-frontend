import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import NoticesCard from "../../../components/NoticesCard";
import { MyCardLink, MyFilteredOptions, MySideCardLink, Page, MyCardMap, MySideBarCard } from "../../../styles/default";
import imgTest from "../../../assets/icon.svg";

import api from "../../../services/api";
import HorizonScrollView from "../../../components/HorizonScrollView";
import Footer from "../../../components/Footer";
import { MyScreenView } from "./styles";
import { Link } from "react-router-dom";
import Select from "react-select";
import { MdFilterList } from "react-icons/md/index";
import Stars from "../../../components/Stars";

import Pagination from '../../../components/Pagination';
import CardCarousel from '../../../components/CardCarousel';

import { MdStar } from 'react-icons/md';

function CourseList() {

  const [coursesFeatured, setCoursesFeatured] = useState([]);

  const [mostViewedAt, setMostViewedAt] = useState("daily");
  const [coursesMostViewed, setCoursesMostViewed] = useState([]);

  const [courses, setCourses] = useState([]);
  const [tags, setTags] = useState([]);

  const [actualPage, setActualPage] = useState(1);
  const [qntResults] = useState(10);
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
            coursesDb.push({ 
              tag: course.tags,
              id: course._id,
              title: course.title,
              subtitle: course.subtitle,
              image: `${process.env.REACT_APP_API_URL}`+course.imagePath,
              icon: imgTest,
              date: course.createdAt
            });
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

  const listCoursesCarousel = async () => {
    try {
      const response = await api.get("/course/list?results=5&views=" + mostViewedAt);

      if (response.data.success) {
        if (response.data.courses) {
          let coursesMostViewedDb = [];
          for (let index in response.data.courses) {
            const course = response.data.courses[index];
            coursesMostViewedDb.push({
              tag: course.tags,
              id: course._id,
              title: course.title,
              subtitle: course.content,
              image: `${process.env.REACT_APP_API_URL}` + course.imagePath,
              icon: imgTest,
              views: course.views,
            });
          }
          setCoursesMostViewed(coursesMostViewedDb);
        }
      }
    } catch (error) {
      setCoursesMostViewed([]);
    }
  };

  const listCoursesSideBar = async () => {
    try {
      const response = await api.get("/course/list?results=2&views=weekly");

      if (response.data.success) {
        if (response.data.courses) {
          let coursesSideBarDB = [];
          for (let index in response.data.courses) {
            const course = response.data.courses[index];
            coursesSideBarDB.push({
              tag: course.tags,
              id: course._id,
              title: course.title,
              subtitle: course.content,
              image: `${process.env.REACT_APP_API_URL}` + course.imagePath,
              icon: imgTest,
              views: course.views,
            });
          }
          setCourseSideBar(coursesSideBarDB);
        }
      }
    } catch (error) {
      setCourseSideBar([]);
    }
  };

  const listSideBar = async () => {
    try {
      const response = await api.get("/featured/list?type=course&results=3");

      if (response.data.success) {
        if (response.data.featureds) {
          let postsSideBarDB = [];
          for (let index in response.data.featureds) {
            const featuredPost = response.data.featureds[index].post;

            let postTitle = "Titulo não encontrado";

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
    listCoursesCarousel();
  }, [mostViewedAt]);

  useEffect(() => {
    listCourses();
  }, [actualPage]);
  useEffect(() => {
    listTags();
    listSideBar();
    listCoursesSideBar();
  }, []);

  return (
      <Page>
        <Header/>
        <MyScreenView >

          <h1>Cursos</h1>

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



         <CardCarousel items={coursesMostViewed} route={"/curso"}/>


         <div style={{display: 'block'}}>
        <MyCardMap>
        
        {courses.map((content) => {
          return (
            <MyCardLink>

            <Link to={"/curso/" + content.id}>
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
                  link = "/courseo/";
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