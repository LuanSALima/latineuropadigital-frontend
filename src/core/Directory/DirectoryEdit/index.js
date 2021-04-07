import React, { useState, useEffect } from 'react';

import Header from '../../../components/Header';
import { AppButton, ContentView, Form, Outline_Button, Page } from '../../../styles/default';
import Footer from '../../../components/Footer';
import api from '../../../services/api';

import {MdFileUpload} from 'react-icons/md/index';
import Toastifying, {TOASTIFY_OPTIONS} from "../../../components/Toastifying";
import { toast } from 'react-toastify';
import ModalTag from '../../../components/ModalTag';
import MyModal from '../../../components/MyModal';

import Select from 'react-select';

import useMyForm, { verifyLink } from '../../../hooks/useValidationForm';

function DirectoryEdit(props) {

  const [buttonText, setButtonText] = useState("Editar");

  const [idDirectory] = useState(props.match.params.id);

  const [businessName, setBusinessName] = useState("");
  const [businessAdress, setBusinessAdress] = useState("");
  const [businessCity, setBusinessCity] = useState("");
  const [businessProvince, setBusinessProvince] = useState("");
  const [businessPostalCode, setBusinessPostalCode] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessWebsite, setBusinessWebsite] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactRole, setContactRole] = useState("");

  const [status, setStatus] = useState("");

  const [tags, setTags] = useState([]);
  const [dbTags, setDbTags] = useState([]);

  const [image, setImage] = useState('');
  const [previewImage,setPreviewImage] = useState();
  const [progress, setProgess] = useState(0);

  const handleValidator =  useMyForm(
    businessName,
    businessAdress,
    businessCity,
    businessProvince,
    businessPostalCode,
    businessPhone,
    businessDescription,
    contactName,
    contactPhone,
    contactEmail,
    contactRole
  );
  const handleLinkValidator = verifyLink(businessWebsite);

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
      console.log(error);
    }
  }

  async function getDirectory() {
    try {
      const response = await api.get("/directory/"+idDirectory);

      if(response.data.success) {
        if(response.data.directory) {
          setBusinessName(response.data.directory.businessName);
          setBusinessAdress(response.data.directory.businessAdress);
          setBusinessCity(response.data.directory.businessCity);
          setBusinessProvince(response.data.directory.businessProvince);
          setBusinessPostalCode(response.data.directory.businessPostalCode);
          setBusinessPhone(response.data.directory.businessPhone);
          setBusinessWebsite(response.data.directory.businessWebsite);
          setBusinessDescription(response.data.directory.businessDescription);
          setContactName(response.data.directory.contactName);
          setContactPhone(response.data.directory.contactPhone);
          setContactEmail(response.data.directory.contactEmail);
          setContactRole(response.data.directory.contactRole);
          setTags(response.data.directory.tags);
          setStatus(response.data.directory.status);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    getDirectory();
    listTags();

  }, []);

  const handleDirectoryEdit = async (e) => {
    e.preventDefault();
    setButtonText("Enviando Dados ...");
    
    if(handleValidator){
      try {
        const formData = new FormData();
        formData.append('businessName', businessName);
        formData.append('businessAdress', businessAdress);
        formData.append('businessCity', businessCity);
        formData.append('businessProvince', businessProvince);
        formData.append('businessPostalCode', businessPostalCode);
        formData.append('businessPhone', businessPhone);
        formData.append('businessWebsite', businessWebsite);
        formData.append('businessDescription', businessDescription);
        formData.append('contactName', contactName);
        formData.append('contactPhone', contactPhone);
        formData.append('contactEmail', contactEmail);
        formData.append('contactRole', contactRole);
        formData.append('status', status);
        formData.append('image', image);
        tags.map((tag) => {
          formData.append('tags', tag);
        });
        
        const response = await api.put("/directory/"+idDirectory, formData, {
          onUploadProgress: (ProgressCourse) => {
            let progress = Math.round(ProgressCourse.loaded / ProgressCourse.total * 100) + '%';
            setProgess(progress);
          }
        });

        setButtonText("Editado com Sucesso");
      } catch (error) {
        setButtonText("Tente Novamente");

        console.log(error);
      }
    }else{
      setButtonText("Tente Novamente");
      toast.error("¡Hubo un error! Verifique que todos los campos estén llenos",TOASTIFY_OPTIONS)
    }
  };

  const onChangeSelectTags = (tagsSelected) => {
    let tags = [];
    for(const tag of tagsSelected) {
      tags.push(tag.value);
    }
    setTags(tags);
  }

  return (
  <Page>
    <Toastifying/>
    <Header/>
    <Form width={"80%"} height={"80vh"} center>
      
        <label>Editar Diretorio</label>

        <div style={{display: 'block'}}>
          <h4>BUSINESS INFORMATION</h4>
          <div style={{width: '50%', float: 'left'}}>
            <div className="form-group" style={{padding: '15px', height: '80px'}}>
              <label>Business Name<span style={{color: 'red'}}>*</span></label>
              <input
                style={{width: '100%', height: '30px', marginTop: '0'}}
                type="text"
                onChange={(e) => {
                  setBusinessName(e.target.value);
                }}
                value={businessName}
              />
            </div>
            <div className="form-group" style={{padding: '15px', height: '80px'}}>
              <label>City<span style={{color: 'red'}}>*</span></label>
              <input
                style={{width: '100%', height: '30px', marginTop: '0'}}
                type="text"
                onChange={(e) => {
                  setBusinessCity(e.target.value);
                }}
                value={businessCity}
              />
            </div>
            <div className="form-group" style={{padding: '15px', height: '80px'}}>
              <label>Postal Code<span style={{color: 'red'}}>*</span></label>
              <input
                style={{width: '100%', height: '30px', marginTop: '0'}}
                type="text"
                onChange={(e) => {
                  setBusinessPostalCode(e.target.value);
                }}
                value={businessPostalCode}
              />
            </div>
            <div className="form-group" style={{padding: '15px', height: '80px'}}>
              <label>Phone 2</label>
              <input
                style={{width: '100%', height: '30px', marginTop: '0'}}
                type="text"
                placeholder="Atribui nada pq nao existe no BCD"
              />
            </div>
          </div>

          <div style={{width: '50%', float: 'left'}}>
            <div className="form-group" style={{padding: '15px', height: '80px'}}>
              <label>Address<span style={{color: 'red'}}>*</span></label>
              <input
                style={{width: '100%', height: '30px', marginTop: '0'}}
                type="text"
                onChange={(e) => {
                  setBusinessAdress(e.target.value);
                }}
                value={businessAdress}
              />
            </div>
            <div className="form-group" style={{padding: '15px', height: '80px'}}>
              <label>Province<span style={{color: 'red'}}>*</span></label>
              <fieldset>
                <Select
                  options={[
                    {label: 'Portugal', value: 'Portugal'},
                    {label: 'Espanha', value: 'Espanha'},
                    {label: 'França', value: 'França'}

                  ]}
                  isClearable
                  closeMenuOnSelect={false}
                  onChange={(e) => {setBusinessProvince(e.value)}}
                  placeholder={"¡Seleccione a Provincia!"}
                />
              </fieldset>
            </div>
            <div className="form-group" style={{padding: '15px', height: '80px'}}>
              <label>Phone<span style={{color: 'red'}}>*</span></label>
              <input
                style={{width: '100%', height: '30px', marginTop: '0'}}
                type="text"
                onChange={(e) => {
                  setBusinessPhone(e.target.value);
                }}
                value={businessPhone}
              />
            </div>
            <div className="form-group" style={{padding: '15px', height: '80px'}}>
              <label>Website</label>
              <input
                style={{width: '100%', height: '30px', marginTop: '0'}}
                type="text"
                onChange={(e) => {
                  setBusinessWebsite(e.target.value);
                }}
                value={businessWebsite}
              />
            </div>

          </div>
          <div className="form-group" style={{padding: '15px'}}>
            <label>Business Description<span style={{color: 'red'}}>*</span></label>
            <textarea
              style={{width: '100%', height: '30px', marginTop: '0'}}
              type="text"
              onChange={(e) => {
                setBusinessDescription(e.target.value);
              }}
              value={businessDescription}
            />
            <div style={{width: '100%', textAlign: 'center'}}>
              <span>400 characters limit. {businessDescription.length < 400 ? 400-businessDescription.length+" characters left": "Limit characters reached"} </span>
            </div>
          </div>
          
        </div>

        <hr />
       
        <div style={{display: 'block'}}>
          <h4>CONTACT INFORMATION</h4>
          <div style={{width: '50%', float: 'left'}}>
            <div className="form-group" style={{padding: '15px', height: '80px'}}>
              <label>Full Name<span style={{color: 'red'}}>*</span></label>
              <input
                style={{width: '100%', height: '30px', marginTop: '0'}}
                type="text"
                onChange={(e) => {
                  setContactName(e.target.value);
                }}
                value={contactName}
              />
            </div>
            <div className="form-group" style={{padding: '15px', height: '80px'}}>
              <label>Email<span style={{color: 'red'}}>*</span></label>
              <input
                style={{width: '100%', height: '30px', marginTop: '0'}}
                type="text"
                onChange={(e) => {
                  setContactEmail(e.target.value);
                }}
                value={contactEmail}
              />
            </div>
          </div>

          <div style={{width: '50%', float: 'left'}}>
            <div className="form-group" style={{padding: '15px', height: '80px'}}>
              <label>Phone Number<span style={{color: 'red'}}>*</span></label>
              <input
                style={{width: '100%', height: '30px', marginTop: '0'}}
                type="text"
                onChange={(e) => {
                  setContactPhone(e.target.value);
                }}
                value={contactPhone}
              />
            </div>
            <div className="form-group" style={{padding: '15px', height: '80px'}}>
              <label>Which is your role?<span style={{color: 'red'}}>*</span></label>
              <fieldset>
                <Select
                  options={[
                    {label: 'Business Owner', value: 'Business Owner'},
                    {label: 'Business Manager', value: 'Business Manager'}
                  ]}
                  isClearable
                  closeMenuOnSelect={false}
                  onChange={(e) => {setContactRole(e.value)}}
                  placeholder={"¡Seleccione!"}
                />
              </fieldset>
            </div>
          </div>
          <div className="form-group" style={{padding: '15px'}}>
            <label>Tags<span style={{color: 'red'}}>*</span></label>
            <fieldset>
              <Select
               options={dbTags.map((currentTag)=>(
                {label:currentTag,value:currentTag}))}
                isClearable
                isMulti
                closeMenuOnSelect={false}
                onChange={onChangeSelectTags}
                placeholder={"¡Seleccione las etiquetas!"}
              />
            </fieldset>
          </div>
           <div className="form-group" style={{padding: '15px'}}>
            <label>Status</label>
            <fieldset>
              <select style={{width: '100%', border: '1px solid gray'}} value={status} onChange={(e) => {setStatus(e.target.value)}}>
                <option value="pendent">Pendente</option>
                <option value="accepted">Aceita</option>
              </select>
            </fieldset>
          </div>
          <ContentView>
            <div style={{ width: progress, backgroundColor: 'blue', color: 'white' }}>
              {progress}
            </div>
            <div>
              <label for="uploadPhoto" class="btn-cta">
                {image?.name?image?.name:"Haga clic aquí para agregar una imagen"}
              <MdFileUpload/>
              </label>
              <input
                 id="uploadPhoto"
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  if(e.target.files[0]){
                    setPreviewImage(URL.createObjectURL(e.target.files[0]));
                  }
                }}
              />
             { image && <img src={previewImage}/>}
            </div>
          </ContentView>
        </div>

        <button className="btn btn-primary btn-lg btn-block" onClick={handleDirectoryEdit}>{buttonText}</button>
    </Form>
    <Footer/>
  </Page>);
}

export default DirectoryEdit;