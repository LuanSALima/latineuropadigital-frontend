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

function CourseList() {

  const [coursesFeatured, setCoursesFeatured] = useState([]);

  const [mostViewedAt, setMostViewedAt] = useState("daily");
  const [coursesMostViewed, setCoursesMostViewed] = useState([]);

  const [courses, setCourses] = useState([]);
  const [tags, setTags] = useState([]);
 
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
    }
  }

  useEffect(() => {
    listCoursesMostViewed();
  }, [mostViewedAt]);

  useEffect(() => {
    listCourses();
  }, []);
  useEffect(() => {
    listTags();
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

    <HorizonScrollView title={mostViewedAt} subtitle={"Mais visualizados durante o tempo: "+mostViewedAt}>
      {coursesMostViewed.map((content)=>{
          return <Link to={"/curso/"+content.id}><NoticesCard id={content.id} icon={content.icon} image={content.image} title={content.title}text={content.subtitle} /><span>Views: {content.views}</span></Link>
        }
      )}
    </HorizonScrollView>

    <h2>Recentes</h2>
{tags.map((tags)=>(
  <HorizonScrollView title={tags.title} subtitle={tags.description}>
  {courses.map((content)=>(
    content.tag.map((tagFiltered)=>{
      if(tagFiltered === tags.title){
        return  <Link to={"/curso/"+content.id}><NoticesCard id={content.id} icon={content.icon} image={content.image} title={content.title}text={content.subtitle} /></Link>
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

export default CourseList;