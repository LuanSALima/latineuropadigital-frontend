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

function EventList() {

  const [events, setEvents] = useState([]);
  const [tags, setTags] = useState([]);
 
  const listTags = async () => {
    try {
      const response = await api.get("events/tags");
      setTags(response.data.tags);
    } catch (error) {
    }
  }
   const listEvents = async () => {
    try {

      const response = await api.get("/event/list");

      if(response.data.success) {
        if(response.data.events) {
          let eventsDb = [];
          for(let index in response.data.events) {
            const event = response.data.events[index];
            eventsDb.push({ tag : event.tags,id: event._id, title: event.title, description: event.description, image: `${process.env.REACT_APP_API_URL}`+event.imagePath, icon: imgTest});
          }
          setEvents(eventsDb);
        }
      }

    } catch (error) {
      
          
    }
  }

  useEffect(() => {
    listEvents();
  }, []);
  useEffect(() => {
    listTags();
  }, []);

  return (
      <Page>
        <Header/>
        <MyScreenView >
    <h1> Eventos :</h1>
{tags.map((tags)=>(
  <HorizonScrollView title={tags.title} subtitle={tags.description}>
  {events.map((content)=>(
    content.tag.map((tagFiltered)=>{
      if(tagFiltered === tags.title){
        return  <Link to={"/evento/"+content.id}><NoticesCard id={content.id} icon={content.icon} image={content.image} title={content.title.length >= 18?content.title+"..":content.title}text={content.description.length >= 75 ? content.description+"..":content.description} /></Link>
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

export default EventList;