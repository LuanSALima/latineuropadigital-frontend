import React, {  useState } from 'react';
import Header from '../../components/Header';
import NoticesCard from '../../components/NoticesCard';
import { FeatureContent, LittleFeatureContent, Page, ScreenView } from '../../styles/default';
import imgTest from '../../assets/icon.svg';
import { Banner, MyView,GetContent } from './styles';
import Footer from '../../components/Footer';
import HorizonScrollView from "../../components/HorizonScrollView"
function Notices() {
  //Card content
  const [myCard,setMyCard] = useState([{
    title:"LatiN Europa Digital Vem com Tudo!".substr(0,18),
    text:"Latin Europa Digital vem fazendo Juz ao Nome! com seu Criador Oficcial, Alexandre, Conectou Continentes!".substr(0,75),
    image:imgTest,
    icon:imgTest,
  },{
    title:"LatiN Europa Digital Vem com Tudo!".substr(0,18),
    text:"Latin Europa Digital vem fazendo Juz ao Nome! com seu Criador Oficcial, Alexandre, Conectou Continentes!".substr(0,75),
    image:imgTest,
    icon:imgTest,
  },{
    title:"LatiN Europa Digital Vem com Tudo!".substr(0,18),
    text:"Latin Europa Digital vem fazendo Juz ao Nome! com seu Criador Oficcial, Alexandre, Conectou Continentes!".substr(0,75),
    image:imgTest,
    icon:imgTest,
  },{
    title:"LatiN Europa Digital Vem com Tudo!".substr(0,18),
    text:"Latin Europa Digital vem fazendo Juz ao Nome! com seu Criador Oficcial, Alexandre, Conectou Continentes!".substr(0,75),
    image:imgTest,
    icon:imgTest,
  },{
    title:"LatiN Europa Digital Vem com Tudo!".substr(0,18),
    text:"Latin Europa Digital vem fazendo Juz ao Nome! com seu Criador Oficcial, Alexandre, Conectou Continentes!".substr(0,75),
    image:imgTest,
    icon:imgTest,
  },{
    title:"LatiN Europa Digital Vem com Tudo!".substr(0,18),
    text:"Latin Europa Digital vem fazendo Juz ao Nome! com seu Criador Oficcial, Alexandre, Conectou Continentes!".substr(0,75),
    image:imgTest,
    icon:imgTest,
  }])

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
        {myCard.map((content)=>(
          <NoticesCard icon={content.icon} image={content.image} title={content.title.length >= 18?content.title+"..":content.title}text={content.text.length >= 75 ? content.text+"..":content.text} />
        ))}
        </HorizonScrollView>
         </ScreenView>
          <Footer/>
      </Page>
  );
}

export default Notices;