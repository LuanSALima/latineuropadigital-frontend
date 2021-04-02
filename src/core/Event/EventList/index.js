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

function EventList() {

  const [eventsFeatured, setEventsFeatured] = useState([]);

  const [mostViewedAt, setMostViewedAt] = useState("daily");
  const [eventsMostViewed, setEventsMostViewed] = useState([]);

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
            eventsDb.push({ tag : event.tags,id: event._id, title: event.title, subtitle: event.subtitle, image: `${process.env.REACT_APP_API_URL}`+event.imagePath, icon: imgTest});
          }
          setEvents(eventsDb);
        }
      }

    } catch (error) {
      
          
    }
  }

  const listEventsMostViewed = async () => {
    try {

      const response = await api.get("/event/list?views="+mostViewedAt);

      if(response.data.success) {
        if(response.data.events) {
          let eventsMostViewedDb = [];
          for(let index in response.data.events) {
            const event = response.data.events[index];
            eventsMostViewedDb.push({ tag : event.tags,id: event._id, title: event.title, subtitle: event.subtitle, image: `${process.env.REACT_APP_API_URL}`+event.imagePath, icon: imgTest, views: event.views});
          }
          setEventsMostViewed(eventsMostViewedDb);
        }
      }

    } catch (error) {
    }
  }

  useEffect(() => {
    listEventsMostViewed();
  }, [mostViewedAt]);

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
    <h1>Eventos</h1>

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
      {eventsMostViewed.map((content)=>{
          return <Link to={"/evento/"+content.id}><NoticesCard id={content.id} icon={content.icon} image={content.image} title={content.title} text={content.subtitle} /><span>Views: {content.views}</span></Link>
        }
      )}
    </HorizonScrollView>

    <h2>Recentes</h2>
{tags.map((tags)=>(
  <HorizonScrollView title={tags.title} subtitle={tags.description}>
  {events.map((content)=>(
    content.tag.map((tagFiltered)=>{
      if(tagFiltered === tags.title){
        return  <Link to={"/evento/"+content.id}><NoticesCard id={content.id} icon={content.icon} image={content.image} title={content.title} text={content.subtitle} /></Link>
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