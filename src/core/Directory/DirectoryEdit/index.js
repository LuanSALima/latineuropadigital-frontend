import React, { useState, useEffect } from 'react';

import Header from '../../../components/Header';
import { AppButton, ContentView, Form, Page } from '../../../styles/default';
import Footer from '../../../components/Footer';
import api from '../../../services/api';

function Tag(props) {
  return (
    <div style={{margin: '0 auto'}}><span style={{fontSize: '18px'}}>{props.tag}</span><button style={{backgroundColor: 'red', marginLeft: '5px'}}>X</button></div>
  );
}

function DirectoryEdit(props) {

  const [buttonText, setButtonText] = useState("Editar");

  const [idDirectory] = useState(props.match.params.id);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState('');
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [dbTags, setDbTags] = useState([]);
  const [errors, setErrors] = useState({});
  const [progress, setProgess] = useState(0); // progess bar

  const addTag = (e) => {
    e.preventDefault();

    setTags([...tags, tag]);
    setTag("");
  }

  async function listTags() {
    try {
      const response = await api.get("/tag/list");

      if(response.data.success) {
        if(response.data.tags) {
          let dbTags = [];
          for(let index in response.data.tags) {
            dbTags.push(response.data.tags[index].title);
          }
          setDbTags(dbTags);
        }
      }
    } catch (error) {
      if(error.response) {
        if(error.response.data) {
          if(error.response.data.message) {
            setErrors({dbTags: error.response.data.message});
          }
        }
      }
    }
  }

  async function getDirectory() {
    try {
      const response = await api.get("/directory/"+idDirectory);

      if(response.data.success) {
        if(response.data.directory) {
          setTitle(response.data.directory.title);
          setSubtitle(response.data.directory.subtitle);
          setContent(response.data.directory.content);
          setTags(response.data.directory.tags);
        }
      }
    } catch (error) {
      setErrors({message: "Não foi possível carregar o Diretório"});
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

    getDirectory();
    listTags();

  }, []);

  const handleDirectoryEdit = async (e) => {
    e.preventDefault();
    setButtonText("Enviando Dados ...");
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('content', content);
    formData.append('image', image);
    tags.map((tag) => {
      formData.append('tags', tag);
    })
    
    try {
      
      const response = await api.put("/directory/"+idDirectory, formData, {
        onUploadProgress: (ProgressEvent) => {
          let progress = Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
          setProgess(progress);
        }
      });

      setButtonText("Editado com Sucesso");
    } catch (error) {
      setButtonText("Tente Novamente");
      if(error.response) {
        if(error.response.data) {
          //Dados retornados do backend
          if(error.response.data.errors) {
            setErrors(error.response.data.errors);
          }
          if(error.response.data.message) {
            setErrors({message: error.response.data.message});
          }
        } else {
          //Não houve dados retornados do backend
          alert("Erro Inesperado!");
        }
        console.log(errors);
      }
    }

  };

  return (
  <Page>
    <Header/>
    <Form width={"45%"} center>
      <ContentView>
        <label>Edite o Diretório !</label>

        <label style={{color: 'red'}}>{errors.message}</label>

        <input
          placeholder="Insira o Título"
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />
        <span style={{color: 'red'}}>{errors.title}</span>

        <input
          placeholder="Insira o Subtítulo"
          type="text"
           onChange={(e) => {
            setSubtitle(e.target.value);
          }}
          value={subtitle}
        />
        <span style={{color: 'red'}}>{errors.subtitle}</span>

        <input
          placeholder="Insira o Conteudo"
          type="text"
           onChange={(e) => {
            setContent(e.target.value);
          }}
          value={content}
        />
        <span style={{color: 'red'}}>{errors.content}</span>

        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        <span style={{color: 'red'}}>{errors.imagePath}</span>

        <h6 style={{margin: '10px auto'}}>Tags:</h6>
        {tags.map((currentTag)=>(
          <Tag tag={currentTag} />
        ))}

        <select>
        {dbTags.map((currentTag)=>(
          <option>{currentTag}</option>
        ))}
        </select>
        <span style={{color: 'red'}}>{errors.dbTags}</span>

        <input
          placeholder="Insira as Tags"
          type="text"
           onChange={(e) => {
            setTag(e.target.value);
          }}
          value={tag}
        />
        <button onClick={addTag}>Adicionar Tag</button>
        <span style={{color: 'red'}}>{errors.tags}</span>

        <div style={{ width: progress, backgroundColor: 'blue', color: 'white' }}>
           {progress}
        </div>
        <br></br>
        <AppButton onClick={handleDirectoryEdit}>{buttonText}</AppButton>
      </ContentView>
    </Form>
    <Footer/>
  </Page>);
}

export default DirectoryEdit;