import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import NoticesCard from '../../components/NoticesCard';
import { FeatureContent, LittleFeatureContent, Page, ScreenView } from '../../styles/default';
import imgTest from '../../assets/icon.svg';
import { Banner, MyView,GetContent } from './styles';
import Footer from '../../components/Footer';
import HorizonScrollView from "../../components/HorizonScrollView";

import api from '../../services/api';

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
              featuredsDb.push({ tag : featured.tags,id: featured._id, title: featured.title, subtitle: featured.subtitle, image: `${process.env.REACT_APP_API_URL}`+featured.imagePath, icon: imgTest});
            }
          }
          setFeatureds(featuredsDb);
          console.log(featuredsDb);
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

        <HorizonScrollView title="destaques" subtitle="Espetáculos, entretenimento e mucho más">
        {featureds.map((featured)=>(
          <NoticesCard icon={featured.icon} image={featured.image} title={featured.title} text={featured.subtitle} />
        ))}
        </HorizonScrollView>

         </ScreenView>
          <Footer/>
      </Page>
  );
}

export default Notices;