import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import NoticesCard from "../../../components/NoticesCard";
import { MyCardLink, MyFilteredOptions, MySideCardLink, Page, MyCardMap } from "../../../styles/default";
import imgTest from "../../../assets/icon.svg";

import api from "../../../services/api";
import Footer from "../../../components/Footer";
import { MyScreenView } from "./styles";
import { Link } from "react-router-dom";
import Select from "react-select";
import { MdFilterList } from "react-icons/md/index";

import Pagination from '../../../components/Pagination';
import CardCarousel from '../../../components/CardCarousel';

import SideBar from "../../../components/SideBar";

function EventList() {

  const [mostViewedAt, setMostViewedAt] = useState("daily");
  const [eventsMostViewed, setEventsMostViewed] = useState([]);

  const [events, setEvents] = useState([]);
  //const [tags, setTags] = useState([]);

  const [actualPage, setActualPage] = useState(1);
  const [qntResults] = useState(10);
  const [totalEvents, setTotalEvents] = useState(0);
 
  const [postsSideBar, setPostsSideBar] = useState([]);
  const [eventSideBar, setEventSideBar] = useState([]);
  /*
  const listTags = async () => {
    try {
      const response = await api.get("events/tags");
      setTags(response.data.tags);
    } catch (error) {
    }
  }
  */
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

  const listEventsSideBar = async () => {
    try {
      const response = await api.get("/event/list?results=100&views=weekly");

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
      const response = await api.get("/featured/list?type=event&results=100");

      if (response.data.success) {
        if (response.data.featureds) {
          let postsSideBarDB = [];
          for (let index in response.data.featureds) {
            const featuredPost = response.data.featureds[index].post;

            let postTitle = "Titulo no encontrado";

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
              postType: response.data.featureds[index].postType,
              prioritized: response.data.featureds[index].prioritized
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
    }

    listEventsCarousel();
  }, [mostViewedAt]);

  useEffect(() => {
    listEvents();
  }, [actualPage]);
  useEffect(() => {
    //listTags();
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
            {events.map((content, index) => {
              return (
                <MyCardLink key={index}>
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

            <SideBar items={postsSideBar} qntPosts={4} interval={5000} />
            
            <SideBar items={eventSideBar} link={'/evento/'} qntPosts={4} interval={5000} />

          </MySideCardLink>

        </div>
        <Pagination 
          totalResults={totalEvents}
          resultsPerPage={qntResults}
          actualPage={actualPage}
          changePage={setActualPage}
        />

        </MyScreenView>
        <Footer/>
      </Page>
  );
}

export default EventList;