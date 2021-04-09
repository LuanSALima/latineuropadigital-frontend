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

function EventPendents() {

  const [eventsFeatured, setEventsFeatured] = useState([]);

  const [events, setEvents] = useState([]);
  const [tags, setTags] = useState([]);

  const [actualPage, setActualPage] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);
 
  const listEvents = async () => {
    try {

      const response = await api.get("/events/pendent");

      if(response.data.success) {
        if(response.data.events) {
          let eventsDb = [];
          for(let index in response.data.events) {
            const event = response.data.events[index];
            eventsDb.push({ tag : event.tags,id: event._id, title: event.eventName, subtitle: event.eventDescription, image: `${process.env.REACT_APP_API_URL}`+event.imagePath, icon: imgTest});
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

  useEffect(() => {
    listEvents();
  }, [actualPage]);

  return (
      <Page>
        <Header/>
        <MyScreenView >
        <h1>Eventos Pendentes</h1>

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

export default EventPendents;