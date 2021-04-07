import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import NoticesCard from "../../../components/NoticesCard";
import { MyCardLink, MyFilteredOptions, MySideCardLink, Page, MyCardMap } from "../../../styles/default";
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

function NoticesList() {
  const [noticesFeatured, setNoticesFeatured] = useState([]);

  const [mostViewedAt, setMostViewedAt] = useState("daily");
  const [noticesMostViewed, setNoticesMostViewed] = useState([]);

  const [notices, setNotices] = useState([]);
  const [tags, setTags] = useState([]);

  const [actualPage, setActualPage] = useState(1);
  const [qntResults] = useState(10);
  const [totalNotices, setTotalNotices] = useState(0);

  const listTags = async () => {
    try {
      const response = await api.get("notices/tags");
      setTags(response.data.tags);
    } catch (error) {}
  };

  const listNotices = async () => {
    try {
      const response = await api.get("/notice/list?page="+actualPage+"&results="+qntResults);

      if (response.data.success) {
        if (response.data.notices) {
          let noticesDb = [];
          for (let index in response.data.notices) {
            const notice = response.data.notices[index];
            noticesDb.push({
              tag: notice.tags,
              id: notice._id,
              title: notice.title,
              subtitle: notice.content,
              image: `${process.env.REACT_APP_API_URL}` + notice.imagePath,
              icon: imgTest,
            });
          }
          setNotices(noticesDb);
        }
        if (response.data.totalNotices) {
          setTotalNotices(response.data.totalNotices);
        }
      }
    } catch (error) {}
  };

  const listNoticesMostViewed = async () => {
    try {
      const response = await api.get("/notice/list?results=5&views=" + mostViewedAt);

      if (response.data.success) {
        if (response.data.notices) {
          let noticesMostViewedDb = [];
          for (let index in response.data.notices) {
            const notice = response.data.notices[index];
            noticesMostViewedDb.push({
              tag: notice.tags,
              id: notice._id,
              title: notice.title,
              subtitle: notice.content,
              image: `${process.env.REACT_APP_API_URL}` + notice.imagePath,
              icon: imgTest,
              views: notice.views,
            });
          }
          setNoticesMostViewed(noticesMostViewedDb);
        }
      }
    } catch (error) {
      setNoticesMostViewed([]);
    }
  };

  useEffect(() => {
    listNoticesMostViewed();
  }, [mostViewedAt]);
  useEffect(() => {
    listNotices();
  }, [actualPage]);
  useEffect(() => {
    listTags();
  }, []);

  return (
    <Page>
      <Header />
      <MyScreenView>
        <h1>Noticias y Actualidad</h1>

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

        <CardCarousel items={noticesMostViewed} route={"/noticia"}/>

        <div style={{display: 'block'}}>
          <MyCardMap>
          <h2 style={{margin:"0 auto" , width:"100%"}}>Reciente</h2>
          {notices.map((content) => {
            return (
              <MyCardLink>
              <Link to={"/noticia/" + content.id} >
                <NoticesCard
                  id={content.id}
                  tag={content.tag}
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

          <MySideCardLink>
            <img  src={imgTest} />
            <img  src={imgTest} />
            <img  src={imgTest} />
            <img  src={imgTest} />
            <img  src={imgTest} />  
            </MySideCardLink>
        </div>

        <Pagination totalResults={totalNotices} resultsPerPage={qntResults} actualPage={actualPage} changePage={setActualPage}/>
        <span>PAGINA ATUAL: {actualPage}</span>
      </MyScreenView>
      <Footer />
    </Page>
  );
}

export default NoticesList;
