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

function EventList() {

  const [eventsFeatured, setEventsFeatured] = useState([]);

  const [mostViewedAt, setMostViewedAt] = useState("daily");
  const [eventsMostViewed, setEventsMostViewed] = useState([]);

  const [events, setEvents] = useState([]);
  const [tags, setTags] = useState([]);

  const [actualPage, setActualPage] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);
 
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
        if(response.data.totalEvents) {
          setTotalEvents(response.data.totalEvents);
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
      setEventsMostViewed([]);
    }
  }

  useEffect(() => {
    listEventsMostViewed();
  }, [mostViewedAt]);

  useEffect(() => {
    listEvents();
  }, [actualPage]);
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
        <div style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {events.map((content) => {
          return (
            <Link to={"/evento/" + content.id}>
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
        <Pagination totalResults={totalEvents} resultsPerPage={30} actualPage={actualPage} changePage={setActualPage}/>
        <span>PAGINA ATUAL: {actualPage}</span>

        </MyScreenView>
        <Footer/>
      </Page>
  );
}

export default EventList;