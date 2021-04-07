import React, { useState, useEffect } from 'react';

import Header from '../../../components/Header';
import { AppButton, ContentView, Form, Outline_Button, Page } from '../../../styles/default';
import Footer from '../../../components/Footer';
import api from '../../../services/api';
import Select from 'react-select';
import {MdFileUpload} from 'react-icons/md/index'
import Toastifying, {TOASTIFY_OPTIONS} from "../../../components/Toastifying"
import { toast } from 'react-toastify';
import ModalTag from '../../../components/ModalTag';

import useMyForm, { verifyLink } from '../../../hooks/useValidationForm';

function DirectoryRegister() {

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

  const [tags, setTags] = useState([]);
  const [dbTags, setDbTags] = useState([]);

  const [modalShow,setModalShow] = useState(false);
  const [previewImage,setPreviewImage] = useState();

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
      const response = await api.get("/tags/directory");

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
   
    }
  }

  useEffect(() => {
    listTags();
  }, []);

  const handleDirectoryRegister = async (e) => {
    e.preventDefault();
    
    if(handleValidator){
      try {
        await api.post("/directory/create", {
          businessName,
          businessAdress,
          businessCity,
          businessProvince,
          businessPostalCode,
          businessPhone,
          businessWebsite,
          businessDescription,
          contactName,
          contactPhone,
          contactEmail,
          contactRole,
          tags
        });

        toast.success("¡Directorio enviado para validación!",TOASTIFY_OPTIONS)
      } catch (error) {
        toast.error("¡Hubo un error! Verifique que todos los campos estén llenos",TOASTIFY_OPTIONS);
        console.log(error);
      }
    }else{
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

  const handleChangeTags = (e)=>{
    e.preventDefault();
    setModalShow(true);
  }

  return (
  <Page>
    <Toastifying/>
    {modalShow && <ModalTag
    show={modalShow}
    onHide={()=>setModalShow(false)}
    />}
    <Header/>
    <Form width={"80%"} height={"80vh"} center>
      
        <label>Registra tu negocio gratis</label>

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
              <span>400 characters limit.  400 characters left</span>
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
        </div>

        <button className="btn btn-primary btn-lg btn-block" onClick={handleDirectoryRegister}>Registrar</button>
    </Form>
    <Footer/>
  </Page>);
}

export default DirectoryRegister;