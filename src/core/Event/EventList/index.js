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

function EventList() {

  const [eventsFeatured, setEventsFeatured] = useState([]);

  const [mostViewedAt, setMostViewedAt] = useState("daily");
  const [eventsMostViewed, setEventsMostViewed] = useState([]);

  const [events, setEvents] = useState([]);
  const [tags, setTags] = useState([]);

  const [actualPage, setActualPage] = useState(1);
  const [qntResults] = useState(10);
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
            eventsDb.push({ 
              tag : event.tags,
              id: event._id,
              title: event.eventName,
              subtitle: event.eventDescription,
              image: `${process.env.REACT_APP_API_URL}`+event.imagePath,
              icon: imgTest,
              date: event.createdAt
            });
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

  const listEventsCarousel = async () => {
    try {
      const response = await api.get("/event/list?results=5&views=" + mostViewedAt);

      if (response.data.success) {
        if (response.data.events) {
          let eventsMostViewedDb = [];
          for (let index in response.data.events) {
            const event = response.data.events[index];
            eventsMostViewedDb.push({
              tag: event.tags,
              id: event._id,
              title: event.eventName,
              subtitle: event.eventDescription,
              image: `${process.env.REACT_APP_API_URL}` + event.imagePath,
              icon: imgTest,
              views: event.views,
            });
          }
          setEventsMostViewed(eventsMostViewedDb);
        }
      }
    } catch (error) {
      setEventsMostViewed([]);
    }
  };

  const listEventsSideBar = async () => {
    try {
      const response = await api.get("/event/list?results=2&views=weekly");

      if (response.data.success) {
        if (response.data.events) {
          let eventsSideBarDB = [];
          for (let index in response.data.events) {
            const event = response.data.events[index];
            eventsSideBarDB.push({
              tag: event.tags,
              id: event._id,
              title: event.eventName,
              subtitle: event.eventDescription,
              image: `${process.env.REACT_APP_API_URL}` + event.imagePath,
              icon: imgTest,
              views: event.views,
            });
          }
          setEventSideBar(eventsSideBarDB);
        }
      }
    } catch (error) {
      setEventSideBar([]);
    }
  };

  const listSideBar = async () => {
    try {
      const response = await api.get("/featured/list?type=event&results=3");

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
    listEventsCarousel();
  }, [mostViewedAt]);

  useEffect(() => {
    listEvents();
  }, [actualPage]);
  useEffect(() => {
    listTags();
    listSideBar();
    listEventsSideBar();
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

        <CardCarousel items={eventsMostViewed} route={"/evento"}/>


        <div style={{display: 'block'}}>
        <MyCardMap>
        
        {events.map((content) => {
          return (
            <MyCardLink>
            <Link to={"/evento/" + content.id}>
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
            {eventSideBar.map((event) => {
              return (
                <Link to={"/evento/" + event.id}>
                  <MySideBarCard >
                    <img  src={event.image} onError={(image) => {image.target.src = imgTest}}/>
                    <span>{event.title.length > 20?event.title.substr(0,20)+"...":event.title}</span>
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