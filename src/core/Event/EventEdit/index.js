import React, { useState, useEffect } from 'react';

import Header from '../../../components/Header';
import { AppButton, ContentView, Form, Outline_Button, Page,  ProgressBar, FormBlock, FormColumn, FormGroup, Required, CharLimit } from '../../../styles/default';
import Footer from '../../../components/Footer';
import api from '../../../services/api';

import {MdFileUpload} from 'react-icons/md/index';
import Toastifying, {TOASTIFY_OPTIONS} from "../../../components/Toastifying";
import { toast } from 'react-toastify';
import ModalTag from '../../../components/ModalTag';
import MyModal from '../../../components/MyModal';

import Select from 'react-select';

import useMyForm, { verifyLink } from '../../../hooks/useValidationForm';

function EventEdit(props) {

  const [buttonText, setButtonText] = useState("Editar");

  const [idEvent] = useState(props.match.params.id);

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
  const [status, setStatus] = useState("");

  const [tags, setTags] = useState([]);
  const [dbTags, setDbTags] = useState([]);

  const [progress, setProgess] = useState(0); // progess bar
  const [image, setImage] = useState('');
  const [previewImage,setPreviewImage] = useState();

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
      toast.error("Error al enumerar etiquetas",TOASTIFY_OPTIONS)
    }
  }

  async function getEvent() {
    try {
      const response = await api.get("/event/"+idEvent);

      if(response.data.success) {
        if(response.data.event) {
          setEventName(response.data.event.eventName);
          setEventOrganizedBy(response.data.event.eventOrganizedBy);
          setEventLocation(response.data.event.eventLocation);
          setEventAddress(response.data.event.eventAddress);
          setEventDate(response.data.event.eventName);
          setEventTime(response.data.event.eventTime);
          setEventTicketPrice(response.data.event.eventTicketPrice);
          setEventMoreInfo(response.data.event.eventMoreInfo);
          setEventDescription(response.data.event.eventDescription);
          setContactName(response.data.event.contactName);
          setContactPhone(response.data.event.contactPhone);
          setContactEmail(response.data.event.contactEmail);
          setContactRole(response.data.event.contactRole);
          setTags(response.data.event.tags);
          setStatus(response.data.event.status);
        }
      }
    } catch (error) {
      toast.error("Error al buscar el evento",TOASTIFY_OPTIONS)
    }
  }

  useEffect(() => {

    getEvent();
    listTags();

  }, []);

  const handleEventEdit = async (e) => {
    e.preventDefault();
    setButtonText("Enviando Dados ...");
    
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
        formData.append('status', status);
        formData.append('image', image);
        tags.map((tag) => {
          formData.append('tags', tag);
        });
        
        const response = await api.put("/event/"+idEvent, formData, {
          onUploadProgress: (ProgressEvent) => {
            let progress = Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
            setProgess(progress);
          }
        });

        setButtonText("editado exitosamente");
        toast.success("editado exitosamente",TOASTIFY_OPTIONS)
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
      setFirstRender(false);
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

  const [eventTags,setEventTags] = useState();

  const createSelectOptions = () => {
    let options = []
    for(const tag of tags){
        options.push({label:tag,value:tag})
      }
     setEventTags(options);
  }
  
  useEffect(()=>{
    createSelectOptions();
  },[tags]);

  return (
  <Page>
    <Toastifying/>
    <Header/>
    <Form width={"80%"} height={"80vh"} center>
      
      <label>Editar Evento</label>

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
                value={{label: contactRole, value: contactRole}}
                closeMenuOnSelect={false}
                onChange={(e) => {setContactRole(e.value)}}
                placeholder={"¡Seleccione!"}
              />
            </fieldset>
          </FormGroup>
        </FormColumn>
        <FormGroup>
          <label>Tags<Required>*</Required></label>
          <fieldset>
            <Select
              style={!useMyForm(eventTags) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
             options={dbTags.map((currentTag)=>(
              {label:currentTag,value:currentTag}))}
              isClearable
              value={eventTags}
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
            <select value={status} onChange={(e) => {setStatus(e.target.value)}}>
              <option value="pendent">Pendente</option>
              <option value="accepted">Aceita</option>
            </select>
          </fieldset>
        </FormGroup>
        <ContentView>
          <div>
            <label for="uploadPhoto" class="btn-cta">
              {image?.name?image?.name:"Haga clic aquí para agregar una imagen"}
            <MdFileUpload />
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
      
      <button className="btn btn-primary btn-lg btn-block" onClick={handleEventEdit}>Editar</button>
    
    </Form>
    <Footer/>
  </Page>);
}

export default EventEdit;