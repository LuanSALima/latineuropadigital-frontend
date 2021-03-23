import React, {  useState } from 'react';
import Header from '../../components/Header';
import NoticesCard from '../../components/NoticesCard';
import { FeatureContent, Page, ScreenView } from '../../styles/default';
import imgTest from '../../assets/icon.svg';
function Notices() {
  //Card content
  const [myCard,setMyCard] = useState([{
    title:"LatiN Europa Digital Vem com Tudo!".substr(0,18),
    text:"Latin Europa Digital vem fazendo Juz ao Nome! com seu Criador Oficcial, Alexandre, Conectou Continentes!".substr(0,75),
    image:imgTest,
    icon:imgTest,
  }])

  return (
      <Page>
        <Header/>
        <ScreenView width={"90%"}>
         {/* <FeatureContent>
        <b>Acesse Nossa PÁGINA!!!</b>
         </FeatureContent> */}
        <br></br>

        {myCard.map((content)=>(
          <NoticesCard icon={content.icon} image={content.image} title={content.title.length >= 18?content.title+"..":content.title}text={content.text.length >= 75 ? content.text+"..":content.text} />
        ))}
        </ScreenView>
      </Page>
  );
}

export default Notices;