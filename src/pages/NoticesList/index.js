import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import NoticesCard from '../../components/NoticesCard';
import {  Page, ScreenView } from '../../styles/default';
import imgTest from '../../assets/icon.svg';

import api from '../../services/api';
import HorizonScrollView from '../../components/HorizonScrollView';
import Footer from '../../components/Footer';

function NoticesList() {

  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
 
  const listTags = async () =>{
    try {
      const response = await api.get("/tag/list");
      setTags(response.data.tags)
    } catch (error) {
    }
  }
   const listPosts = async () => {
    try {

      const response = await api.get("/post/list");

      if(response.data.success) {
        if(response.data.posts) {
          let postsDb = [];
          for(let index in response.data.posts) {
            const post = response.data.posts[index];
            postsDb.push({ tag : post.tags,id: post._id, title: post.title, description: post.description, image: `${process.env.REACT_APP_API_URL}`+post.imagePath, icon: imgTest});
          }
          setPosts(postsDb);
        }
      }

    } catch (error) {
      
          
    }
  }

  useEffect(() => {
    listPosts();
  }, []);
  useEffect(() => {
    listTags();
  }, []);

  return (
      <Page>
        <Header/>
        <ScreenView width={"90%"}>
    
{tags.map((tags)=>(
  <HorizonScrollView title={tags.title} subtitle="Espetáculos, entretenimento e mucho más">
  {posts.map((content)=>(
    content.tag.map((tagFiltered)=>{
      if(tagFiltered === tags.title){
        return  <NoticesCard id={content.id} icon={content.icon} image={content.image} title={content.title.length >= 18?content.title+"..":content.title}text={content.description.length >= 75 ? content.description+"..":content.description} />
       }
    })
 
  ))}
  </HorizonScrollView>
  ))
  }
        </ScreenView>
        <Footer/>
      </Page>
  );
}

export default NoticesList;