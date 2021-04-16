import React, { useState, useEffect } from 'react';

import Header from '../../../components/Header';
import { AppButton, ContentView, Form, Outline_Button, Page, ProgressBar, FormBlock, FormColumn, FormGroup, Required, CharLimit } from '../../../styles/default';
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
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessCity, setBusinessCity] = useState("");
  const [businessProvince, setBusinessProvince] = useState("");
  const [businessPostalCode, setBusinessPostalCode] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessSecondPhone, setBusinessSecondPhone] = useState("");
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

  const [firstRender,setFirstRender]= useState(true);

  const handleValidator =  useMyForm(
    businessName,
    businessAddress,
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
          setBusinessAddress(response.data.directory.businessAddress);
          setBusinessCity(response.data.directory.businessCity);
          setBusinessProvince(response.data.directory.businessProvince);
          setBusinessPostalCode(response.data.directory.businessPostalCode);
          setBusinessPhone(response.data.directory.businessPhone);
          setBusinessSecondPhone(response.data.directory.businessSecondPhone);
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
        formData.append('businessAddress', businessAddress);
        formData.append('businessCity', businessCity);
        formData.append('businessProvince', businessProvince);
        formData.append('businessPostalCode', businessPostalCode);
        formData.append('businessPhone', businessPhone);
        formData.append('businessSecondPhone', businessSecondPhone);
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
        toast.success("¡Directorio editado com Sucesso",TOASTIFY_OPTIONS)
      } catch (error) {
        setButtonText("Tente Novamente");

        if(error.message) {
          toast.error(error.message, TOASTIFY_OPTIONS)
        } else {
          toast.error("Hubo un error no Servidor! Verifique que todos los campos estén llenos", TOASTIFY_OPTIONS)
        }
        console.log(error);
      }
    }else{
      setButtonText("Tente Novamente");
      toast.error("¡Hubo un error! Verifique que todos los campos estén llenos",TOASTIFY_OPTIONS)
      setFirstRender(false);
    }
  };

  const onChangeSelectTags = (tagsSelected) => {
    let tags = [];
    for(const tag of tagsSelected) {
      tags.push(tag.value);
    }
    setTags(tags);
  }

  const [directoryTags,setDirectoryTags] = useState();

  const createSelectOptions = () => {
    let options = []
    for(const tag of tags){
        options.push({label:tag,value:tag})
      }
     setDirectoryTags(options);
  }
  
  useEffect(()=>{
    createSelectOptions();
  },[tags]);

  return (
  <Page>
    <Toastifying/>
    <Header/>
    <Form width={"80%"} height={"80vh"} center>
      
        <label>Editar Diretorio</label>

        <FormBlock>
          <h4>CONTACT INFORMATION</h4>
          <FormColumn>
            <FormGroup>
              <label>Full Name<Required>*</Required></label>
              <input
                style={!useMyForm(contactName) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}             
                type="text"
                onChange={(e) => {
                  setContactName(e.target.value);
                }}
                value={contactName}
              />
            </FormGroup>
            <FormGroup>
              <label>Email<Required>*</Required></label>
              <input
                style={!useMyForm(contactEmail) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}             
                type="text"
                onChange={(e) => {
                  setContactEmail(e.target.value);
                }}
                value={contactEmail}
              />
            </FormGroup>
          </FormColumn>

          <FormColumn>
            <FormGroup>
              <label>Phone Number<Required>*</Required></label>
              <input
                style={!useMyForm(contactPhone) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
                type="text"
                onChange={(e) => {
                  setContactPhone(e.target.value);
                }}
                value={contactPhone}
              />
            </FormGroup>
            <FormGroup>
              <label>Which is your role?<Required>*</Required></label>
              <fieldset>
                <Select
                  style={!useMyForm(contactRole) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
                  options={[
                    {label: 'Business Owner', value: 'Business Owner'},
                    {label: 'Business Manager', value: 'Business Manager'}
                  ]}
                  isClearable
                  value={{label: contactRole, value: contactRole}}
                  closeMenuOnSelect={false}
                  onChange={(e) => {setContactRole(e.value)}}
                  placeholder={"¡Seleccione!"}
                />
              </fieldset>
            </FormGroup>
          </FormColumn>
        </FormBlock>

        <hr />

        <FormBlock>
          <h4>BUSINESS INFORMATION</h4>
          <FormColumn>
            <FormGroup>
              <label>Business Name<Required>*</Required></label>
              <input      
                style={!useMyForm(businessName) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}         
                type="text"
                onChange={(e) => {
                  setBusinessName(e.target.value);
                }}
                value={businessName}
              />
            </FormGroup>
            <FormGroup>
              <label>City<Required>*</Required></label>
              <input   
                style={!useMyForm(businessCity) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}             
                type="text"
                onChange={(e) => {
                  setBusinessCity(e.target.value);
                }}
                value={businessCity}
              />
            </FormGroup>
            <FormGroup>
              <label>Postal Code<Required>*</Required></label>
              <input     
                style={!useMyForm(businessPostalCode) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}           
                type="text"
                onChange={(e) => {
                  setBusinessPostalCode(e.target.value);
                }}
                value={businessPostalCode}
              />
            </FormGroup>
            <FormGroup>
              <label>Phone 2</label>
              <input
                type="text"
                onChange={(e) => {
                  setBusinessSecondPhone(e.target.value);
                }}
                value={businessSecondPhone}
              />
            </FormGroup>
          </FormColumn>

          <FormColumn>
            <FormGroup>
              <label>Address<Required>*</Required></label>
              <input       
                style={!useMyForm(businessAddress) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}        
                type="text"
                onChange={(e) => {
                  setBusinessAddress(e.target.value);
                }}
                value={businessAddress}
              />
            </FormGroup>
            <FormGroup>
              <label>Province<Required>*</Required></label>
              <fieldset>
                <Select
                  style={!useMyForm(businessProvince) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
                  options={[
                    {label: 'Portugal', value: 'Portugal'},
                    {label: 'Espanha', value: 'Espanha'},
                    {label: 'França', value: 'França'}

                  ]}
                  isClearable
                  value={{label: businessProvince, value: businessProvince}}
                  closeMenuOnSelect={false}
                  onChange={(e) => {setBusinessProvince(e.value)}}
                  placeholder={"¡Seleccione a Provincia!"}
                />
              </fieldset>
            </FormGroup>
            <FormGroup>
              <label>Phone<Required>*</Required></label>
              <input
                style={!useMyForm(businessPhone) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
                type="text"
                onChange={(e) => {
                  setBusinessPhone(e.target.value);
                }}
                value={businessPhone}
              />
            </FormGroup>
            <FormGroup>
              <label>Website</label>
              <input               
                type="text"
                onChange={(e) => {
                  setBusinessWebsite(e.target.value);
                }}
                value={businessWebsite}
              />
            </FormGroup>

          </FormColumn>
          <FormGroup>
            <label>Business Description<Required>*</Required></label>
            <textarea      
              style={!useMyForm(businessDescription) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}      
              type="text"
              onChange={(e) => {
                setBusinessDescription(e.target.value);
              }}
              value={businessDescription}
            />
            <CharLimit>
              <span>400 characters limit. {businessDescription.length < 400 ? 400-businessDescription.length+" characters left": "Limit characters reached"} </span>
            </CharLimit>
          </FormGroup>
          <FormGroup>
            <label>Tags<Required>*</Required></label>
            <fieldset>
              <Select
                style={!useMyForm(directoryTags) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
               options={dbTags.map((currentTag)=>(
                {label:currentTag,value:currentTag}))}
                isClearable
                value={directoryTags}
                isMulti
                closeMenuOnSelect={false}
                onChange={onChangeSelectTags}
                placeholder={"¡Seleccione las etiquetas!"}
              />
            </fieldset>
          </FormGroup>
          <FormGroup>
            <label>Status</label>
            <fieldset>
              <select style={!useMyForm(status) && !firstRender?{backgroundColor: '#f9b3b3'}:{}} value={status} onChange={(e) => {setStatus(e.target.value)}}>
                <option value="pendent">Pendente</option>
                <option value="accepted">Aceita</option>
              </select>
            </fieldset>
          </FormGroup>
          <ContentView>
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
          <ProgressBar width={progress}>
            {progress}
          </ProgressBar>
        </FormBlock>

        <button className="btn btn-primary btn-lg btn-block" onClick={handleDirectoryEdit}>{buttonText}</button>
    </Form>
    <Footer/>
  </Page>);
}

export default DirectoryEdit;