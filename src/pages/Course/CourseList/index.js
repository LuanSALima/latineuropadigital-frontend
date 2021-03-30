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

function CourseList() {

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
            coursesDb.push({ tag : course.tags,id: course._id, title: course.title, description: course.description, image: `${process.env.REACT_APP_API_URL}`+course.imagePath, icon: imgTest});
          }
          setCourses(coursesDb);
        }
      }

    } catch (error) {
      
          
    }
  }

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
    <h1> Cursos :</h1>
{tags.map((tags)=>(
  <HorizonScrollView title={tags.title} subtitle={tags.description}>
  {courses.map((content)=>(
    content.tag.map((tagFiltered)=>{
      if(tagFiltered === tags.title){
        return  <Link to={"/curso/"+content.id}><NoticesCard id={content.id} icon={content.icon} image={content.image} title={content.title.length >= 18?content.title+"..":content.title}text={content.description.length >= 75 ? content.description+"..":content.description} /></Link>
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