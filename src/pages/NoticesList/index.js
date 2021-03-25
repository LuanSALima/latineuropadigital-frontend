import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import NoticesCard from '../../components/NoticesCard';
import { Page, ScreenView } from '../../styles/default';
import imgTest from '../../assets/icon.svg';

import api from '../../services/api';

function NoticesList() {
  //Card content
  /*
  const [myCard,setMyCard] = useState([{
    title:"LatiN Europa Digital Vem com Tudo!".substr(0,18),
    description:"Latin Europa Digital vem fazendo Juz ao Nome! com seu Criador Oficcial, Alexandre, Conectou Continentes!".substr(0,75),
    image:imgTest,
    icon:imgTest,
  },
  {
    title:"LatiN Europa Digital Vem com Tudo!".substr(0,18),
    description:"Latin Europa Digital vem fazendo Juz ao Nome! com seu Criador Oficcial, Alexandre, Conectou Continentes!".substr(0,75),
    image:imgTest,
    icon:imgTest,
  }]);
  */

  const [posts, setPosts] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {

    async function listPosts() {
      try {
        const response = await api.get("/post/list");

        if(response.data.success) {
          if(response.data.posts) {
            var postsDb = [];
            for(let index in response.data.posts) {
              const post = response.data.posts[index];
              postsDb.push({title: post.title, description: post.description, image: `${process.env.REACT_APP_API_URL}`+post.imagePath, icon: imgTest});
            }
            setPosts(postsDb);
          }
        }
      } catch (error) {
        if(error.response) {
          if(error.response.data) {
            if(error.response.data.message) {
              setErrors({message: error.response.data.message});
            }
          }
        }
      }
    }
    listPosts();
  }, []);

  return (
      <Page>
        <Header/>
        <ScreenView width={"90%"}>
         {/* <FeatureContent>
        <b>Acesse Nossa PÁGINA!!!</b>
         </FeatureContent> */}
        <br></br>
        <h2 style={{color: 'red'}}>{errors.message}</h2>

        {posts.map((content)=>(
          <NoticesCard icon={content.icon} image={content.image} title={content.title.length >= 18?content.title+"..":content.title}text={content.description.length >= 75 ? content.description+"..":content.description} />
        ))}
        
        </ScreenView>
      </Page>
  );
}

export default NoticesList;