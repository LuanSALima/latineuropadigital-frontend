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

function EventList() {

  const [eventsFeatured, setEventsFeatured] = useState([]);

  const [events, setEvents] = useState([]);
  const [tags, setTags] = useState([]);

  const [actualPage, setActualPage] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);
 
  const [postsSideBar, setPostsSideBar] = useState([]);
  const [eventSideBar, setEventSideBar] = useState([]);

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
  useEffect(() => {
    listTags();
  }, []);

  return (
      <Page>
        <Header/>
        <MyScreenView >

        {/* <CardCarousel items={noticesMostViewed} route={"/noticia"}/> */}


        <div style={{display: 'block'}}>
        <h2>Eventos</h2>
        <MyCardMap>
        {events.map((content) => {
          return (
            <MyCardLink>
            <Link to={"/evento/" + content.id}>
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
            {eventSideBar.map((notice) => {
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
        <Pagination totalResults={totalEvents} resultsPerPage={30} actualPage={actualPage} changePage={setActualPage}/>

        </MyScreenView>
        <Footer/>
      </Page>
  );
}

export default EventList;