import React, { useState, useEffect } from 'react';

import Header from '../../../components/Header';
import { AppButton, ContentView, Form, Outline_Button, Page, ProgressBar, FormBlock, FormColumn, FormGroup, Required, CharLimit } from '../../../styles/default';
import Footer from '../../../components/Footer';
import api from '../../../services/api';
import Select from 'react-select';
import {MdFileUpload} from 'react-icons/md/index'
import Toastifying, {TOASTIFY_OPTIONS} from "../../../components/Toastifying"
import { toast } from 'react-toastify';
import ModalTag from '../../../components/ModalTag';

import useMyForm, { verifyLink } from '../../../hooks/useValidationForm';

function EventRegister() {

  const [eventName, setEventName] = useState("");
  const [eventOrganizedBy, setEventOrganizedBy] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventTicketPrice, setEventTicketPrice] = useState("");
  const [eventMoreInfo, setEventMoreInfo] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactRole, setContactRole] = useState("");

  const [tags, setTags] = useState([]);
  const [dbTags, setDbTags] = useState([]);

  const [image, setImage] = useState('');
  const [previewImage,setPreviewImage] = useState();
  const [progress, setProgess] = useState(0);

  const [link,setLink]= useState('');

  const [firstRender,setFirstRender]= useState(true);

  const handleValidator =  useMyForm(
    eventName,
    eventOrganizedBy,
    eventLocation,
    eventAddress,
    eventDate,
    eventTime,
    eventTicketPrice,
    eventMoreInfo,
    eventDescription,
    contactName,
    contactPhone,
    contactEmail,
    contactRole
  );

  async function listTags() {
    try {
      const response = await api.get("/tags/event");

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

  const handleEventRegister = async (e) => {
    e.preventDefault();

    if(handleValidator){
      try {
        const formData = new FormData();

        formData.append('eventName', eventName);
        formData.append('eventOrganizedBy', eventOrganizedBy);
        formData.append('eventLocation', eventLocation);
        formData.append('eventAddress', eventAddress);
        formData.append('eventDate', eventDate);
        formData.append('eventTime', eventTime);
        formData.append('eventTicketPrice', eventTicketPrice);
        formData.append('eventMoreInfo', eventMoreInfo);
        formData.append('eventDescription', eventDescription);
        formData.append('contactName', contactName);
        formData.append('contactPhone', contactPhone);
        formData.append('contactEmail', contactEmail);
        formData.append('contactRole', contactRole);
        formData.append('link', link);
        formData.append('image', image);
        tags.map((tag) => {
          formData.append('tags', tag);
        });
        
        await api.post("/event/create", formData, {
          onUploadProgress: (ProgressCourse) => {
            let progress = Math.round(ProgressCourse.loaded / ProgressCourse.total * 100) + '%';
            setProgess(progress);
          }
        });
      
        toast.success("Evento enviado para validación!",TOASTIFY_OPTIONS)
      } catch (error) {
        if(error.message) {
          toast.error(error.message, TOASTIFY_OPTIONS)
        } else {
          toast.error("Hubo un error no Servidor! Verifique que todos los campos estén llenos", TOASTIFY_OPTIONS)
        }
      }
    }else{
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

  return (
  <Page>
    <Toastifying/>
    <Header/>
    <Form width={"80%"} height={"80vh"} center>
      
      <label>Registra tu evento gratis</label>

      <FormBlock>
        <h4>EVENT INFORMATION</h4>
        <FormColumn>
          <FormGroup>
            <label>Event Name<Required>*</Required></label>
            <input
              style={!useMyForm(eventName) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
              type="text"
              onChange={(e) => {
                setEventName(e.target.value);
              }}
              value={eventName}
            />
          </FormGroup>
          <FormGroup>
            <label>Venue / Location<Required>*</Required></label>
            <input
              style={!useMyForm(eventLocation) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
              type="text"
              onChange={(e) => {
                setEventLocation(e.target.value);
              }}
              value={eventLocation}
            />
          </FormGroup>
          <FormGroup>
            <label>Date<Required>*</Required></label>
            <input
              style={!useMyForm(eventDate) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
              type="text"
              onChange={(e) => {
                setEventDate(e.target.value);
              }}
              value={eventDate}
            />
          </FormGroup>
          <FormGroup>
            <label>Ticket Price<Required>*</Required></label>
            <input
              style={!useMyForm(eventTicketPrice) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
              type="text"
              onChange={(e) => {
                setEventTicketPrice(e.target.value);
              }}
              value={eventTicketPrice}
            />
          </FormGroup>
        </FormColumn>
        <FormColumn>
          <FormGroup>
            <label>Organized By<Required>*</Required></label>
            <input
              style={!useMyForm(eventOrganizedBy) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
              type="text"
              onChange={(e) => {
                setEventOrganizedBy(e.target.value);
              }}
              value={eventOrganizedBy}
            />
          </FormGroup>
          <FormGroup>
            <label>Address<Required>*</Required></label>
            <input
              style={!useMyForm(eventAddress) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
              type="text"
              onChange={(e) => {
                setEventAddress(e.target.value);
              }}
              value={eventAddress}
            />
          </FormGroup>
          <FormGroup>
            <label>Time<Required>*</Required></label>
            <input
              style={!useMyForm(eventTime) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
              type="text"
              onChange={(e) => {
                setEventTime(e.target.value);
              }}
              value={eventTime}
              placeholder={"e.g. Doors open 8am. Show Time 10 pm."}
            />
          </FormGroup>
          <FormGroup>
            <label>More Info<Required>*</Required></label>
            <input
              style={!useMyForm(eventMoreInfo) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
              type="text"
              onChange={(e) => {
                setEventMoreInfo(e.target.value);
              }}
              value={eventMoreInfo}
              placeholder={"e.g. name@gmail.com | (111) 111-1111"}
            />
          </FormGroup>
        </FormColumn>
        <FormGroup>
            <label>Event Description<Required>*</Required></label>
            <textarea
              style={!useMyForm(eventDescription) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
              type="text"
              onChange={(e) => {
                setEventDescription(e.target.value);
              }}
              value={eventDescription}
              placeholder={"e.g. Free or $25.00"}
            />
            <CharLimit>
              <span>215 characters limit. {eventDescription.length < 215 ? 215-eventDescription.length+" characters left": "Limit characters reached"} </span>
            </CharLimit>
        </FormGroup>

      </FormBlock>

      <hr />
     
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
                  {label: 'Event Owner', value: 'Event Owner'},
                  {label: 'Event Producer', value: 'Event Producer'}
                ]}
                isClearable
                closeMenuOnSelect={false}
                onChange={(e) => {setContactRole(e.value)}}
                placeholder={"¡Seleccione!"}
              />
            </fieldset>
          </FormGroup>
        </FormColumn>
        <FormGroup>

        <span>Por favor, inserte "http: //" o "https: //" antes de su enlace.</span>
       <input style={!verifyLink(link) && !firstRender?{backgroundColor: '#f9b3b3'}:{}} type="text" placeholder="Link" onChange={(e)=>{setLink(e.target.value)}} value={link} />

          <label>Tags<Required>*</Required></label>
          <fieldset>
            <Select
              style={!useMyForm(tags) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
             options={dbTags.map((currentTag)=>(
              {label:currentTag,value:currentTag}))}
              isClearable
              isMulti
              closeMenuOnSelect={false}
              onChange={onChangeSelectTags}
              placeholder={"¡Seleccione las etiquetas!"}
            />
          </fieldset>
        </FormGroup>
        <FormGroup>
          <label>Por favor, inserte "http: //" o "https: //" antes de su enlace.</label>
          <input style={!verifyLink(link) && !firstRender?{backgroundColor: '#f9b3b3'}:{}} type="text" placeholder="Link" onChange={(e)=>{setLink(e.target.value)}} value={link} />
        </FormGroup>
        <ContentView>
          <div>
            <label for="uploadPhoto" class="btn-cta">
              {image?.name?image?.name:"Haga clic aquí para agregar una imagen"}
            <MdFileUpload style={!useMyForm(image) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}/>
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
      
      <button className="btn btn-primary btn-lg btn-block" onClick={handleEventRegister}>Registrar</button>
    
    </Form>
    <Footer/>
  </Page>);
}

export default EventRegister;