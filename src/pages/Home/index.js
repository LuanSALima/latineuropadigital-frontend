import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import NoticesCard from "../../components/NoticesCard";
import {
  FeatureContent,
  LittleFeatureContent,
  Page,
  ScreenView,
  MyCardMap,
  MyCardLink,
  MySideBarCard,
  MySideCardLink,
} from "../../styles/default";
import imgTest from "../../assets/icon.svg";
import { Banner, MyView, GetContent } from "./styles";
import Footer from "../../components/Footer";
import HorizonScrollView from "../../components/HorizonScrollView";

import api from "../../services/api";

import { Link } from "react-router-dom";
import { MyScreenView } from "../../core/Notices/NoticesList/styles";
import CardCarousel from "../../components/CardCarousel";
import { MdStar } from "react-icons/md";

function Notices() {
  const [featureds, setFeatureds] = useState([]);

  const [postsSideBar, setPostsSideBar] = useState([]);
  const [noticesSideBar, setNoticesSideBar] = useState([]);

  const listFeatureds = async () => {
    try {
      const response = await api.get("/featured/list");
      if (response.data.success) {
        if (response.data.featureds) {
          let featuredsDb = [];
          for (let index in response.data.featureds) {
            if (response.data.featureds[index].post) {
              const featured = response.data.featureds[index].post;

              let postTitle = "Titulo não encontrado";

              if (featured.title) {
                postTitle = featured.title;
              } else if (featured.businessName) {
                postTitle = featured.businessName;
              } else if (featured.eventName) {
                postTitle = featured.eventName;
              }

              let postSubtitle = "Subtítulo não encontrado";

              if (featured.subtitle) {
                postSubtitle = featured.subtitle;
              } else if (featured.businessDescription) {
                postSubtitle = featured.businessDescription;
              } else if (featured.eventDescription) {
                postSubtitle = featured.eventDescription;
              }

              featuredsDb.push({
                tag: featured.tags,
                id: featured._id,
                title: postTitle,
                subtitle: postSubtitle,
                image: `${process.env.REACT_APP_API_URL}` + featured.imagePath,
                icon: imgTest,
                postType: response.data.featureds[index].postType,
                date: featured.createdAt,
              });
            }
          }
          setFeatureds(featuredsDb);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    listFeatureds();
  }, []);

  return (
    <Page>
      <Header />
      <MyView width={"100%"}>
        <Banner>
          <FeatureContent>
            <b>Latinos</b>
          </FeatureContent>
          <FeatureContent>
            <span>Em Europa</span>
          </FeatureContent>
          <FeatureContent>
            <b>TU Oportunidad!</b>
          </FeatureContent>
          <LittleFeatureContent>
            <span>Conectamos a Latinos en Europa</span>
          </LittleFeatureContent>
          <LittleFeatureContent>
            <span>Con Toda a America Latina</span>
          </LittleFeatureContent>
        </Banner>
      </MyView>
      <br></br>
      <MyScreenView>
        {/* <CardCarousel items={noticesMostViewed} route={"/noticia"}/> */}

        <MySideCardLink>
          {postsSideBar.map((featured) => {
            let link = "/";

            switch (featured.postType) {
              case "Notice":
                link = "/noticia/";
                break;
              case "Directory":
                link = "/diretorio/";
                break;
              case "Event":
                link = "/evento/";
                break;
              case "Course":
                link = "/curso/";
                break;
              default:
                break;
            }

            return (
              <Link to={link + featured.id}>
                <MySideBarCard>
                  <img
                    src={featured.image}
                    onError={(image) => {
                      image.target.src = imgTest;
                    }}
                  />
                  <span>{featured.title}</span>
                  <MdStar size={30} color="yellow" />
                </MySideBarCard>
              </Link>
            );
          })}
          {noticesSideBar.map((notice) => {
            return (
              <Link to={"/noticia/" + notice.id}>
                <MySideBarCard>
                  <img
                    src={notice.image}
                    onError={(image) => {
                      image.target.src = imgTest;
                    }}
                  />
                  <span>
                    {notice.title.length > 20
                      ? notice.title.substr(0, 20) + "..."
                      : notice.title}
                  </span>
                </MySideBarCard>
              </Link>
            );
          })}
        </MySideCardLink>

        <div style={{ display: "block" }}>
          <MyCardMap>
            {featureds.map((featured) => {
              let link = "/";

              switch (featured.postType) {
                case "Notice":
                  link = "/noticia/";
                  break;
                case "Directory":
                  link = "/diretorio/";
                  break;
                case "Event":
                  link = "/evento/";
                  break;
                case "Course":
                  link = "/curso/";
                  break;
                default:
                  break;
              }

              return (
                <MyCardLink>
                  <Link to={link + featured.id}>
                    <NoticesCard
                      icon={featured.icon}
                      image={featured.image}
                      title={featured.title}
                      text={featured.subtitle}
                      date={featured.date}
                    />
                  </Link>
                </MyCardLink>
              );
            })}
          </MyCardMap>
        </div>
      </MyScreenView>
      <Footer />
    </Page>
  );
}

export default Notices;
