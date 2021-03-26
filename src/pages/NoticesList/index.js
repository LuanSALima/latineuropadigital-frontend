import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import NoticesCard from '../../components/NoticesCard';
import { AppButton, Page, ScreenView } from '../../styles/default';
import imgTest from '../../assets/icon.svg';

import api from '../../services/api';
import HorizonScrollView from '../../components/HorizonScrollView';

function NoticesList() {

  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading,setLoading] = useState(false);
 
 
  const listTags = async () =>{
    try {
      setLoading(true);
      const response = await api.get("/tag/list");
      setTags(response.data.tags)
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
   const listPosts = async () => {
    try {
      setLoading(true);

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
      setLoading(false);

    } catch (error) {
      setLoading(false);

      if(error.response) {
        if(error.response.data) {
          if(error.response.data.message) {
            setErrors({message: error.response.data.message});
          }
        }
      }
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
          <AppButton type="button" onClick={()=>{
            console.log(posts);
            console.log(tags);
          }}>list</AppButton>
          {loading &&<h1>Loading..</h1>}
         {/* <FeatureContent>
        <b>Acesse Nossa PÁGINA!!!</b>
         </FeatureContent> */}
        <br></br>
        <h2 style={{color: 'red'}}>{errors.message}</h2>
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
  ))}
        
        </ScreenView>
      </Page>
  );
}

export default NoticesList;