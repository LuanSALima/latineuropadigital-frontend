import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import NoticesCard from '../../components/NoticesCard';
import { FeatureContent, LittleFeatureContent, Page, ScreenView, MyCardMap } from '../../styles/default';
import imgTest from '../../assets/icon.svg';
import { Banner, MyView,GetContent } from './styles';
import Footer from '../../components/Footer';
import HorizonScrollView from "../../components/HorizonScrollView";

import api from '../../services/api';

import { Link } from "react-router-dom";

function Notices() {

  const [featureds, setFeatureds] = useState([]);

  const listFeatureds = async () => {
    try {
      const response = await api.get("/featured/list");
      if(response.data.success) {
        if(response.data.featureds) {
          let featuredsDb = [];
          for(let index in response.data.featureds) {
            if(response.data.featureds[index].post) {
              const featured = response.data.featureds[index].post;
              featuredsDb.push({
                tag: featured.tags,
                id: featured._id,
                title: featured.title,
                subtitle: featured.subtitle,
                image: `${process.env.REACT_APP_API_URL}`+featured.imagePath,
                icon: imgTest,
                postType: response.data.featureds[index].postType,
                date: featured.createdAt
              });
            }
          }
          setFeatureds(featuredsDb);
        }
      }
    } catch (error) {    
    }
  }

  useEffect(() => {
    listFeatureds();
  }, []);

  return (
      <Page>
        <Header/>
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
        <ScreenView width="95%">

          <MyCardMap>
          {featureds.map((featured)=>{
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
                <NoticesCard icon={featured.icon} image={featured.image} title={featured.title} text={featured.subtitle} date={featured.date}/>
              </Link>
            )
          }
        )}  
        </MyCardMap>

       </ScreenView>
        <Footer/>
      </Page>
  );
}

export default Notices;