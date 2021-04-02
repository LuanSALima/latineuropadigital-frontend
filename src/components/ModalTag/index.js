import React, { useState } from 'react';
import {Modal,Button} from 'react-bootstrap'
import api from '../../services/api';
import { AppButton, ContentView, Form } from '../../styles/default';
import Select from 'react-select';
import Toastifying, { TOASTIFY_OPTIONS } from '../Toastifying';
import { toast } from 'react-toastify';
import history from '../../services/history/history';
// import { Container } from './styles';

function ModalTag(props) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [types, setTypes] = useState([]);
  const [typesOptions] = useState([
    {
      label: 'Actualidad',
      value: 'Notice'
    }, 
    {
      label: 'Directorio',
      value: 'Directory'
    }, 
    {
      label: 'Agenda',
      value: 'Event'
    }, 
    {
      label: 'Educación',
      value: 'Course'
    }
  ]);


  const onChangeSelectTags = (typesSelected) => {
    let types = [];
    for(const type of typesSelected) {
      types.push(type.value);
    }
    setTypes(types);
  }

  const handleTagRegister = async (e) => {
    e.preventDefault();

    try {
     await api.post("/tag/create", {title, description, types});
      toast.success("Etiqueta registrada correctamente!",TOASTIFY_OPTIONS)
      setTimeout(() => {
        history.push(window.location.href = window.location.pathname + window.location.search + window.location.hash);
      }, 2.500);
    } catch (error) {
        toast.error("¡Hubo un error!",TOASTIFY_OPTIONS)
    }
  };
  
    return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Toastifying/>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            <h1>Tags</h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {<h4>Insertar etiquetas para registrarlas en el Banco</h4>}
           {props.content && <p>
             {props.content}
            </p>}
            
            <Form width={"100%"} height={"50vh"} center nullBox nullBorder>
            <ContentView>
        <input
          placeholder="Insira o Título"
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          value={title}
        />

        <input
          placeholder="Insira a Descrição"
          type="text"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
        />
      <fieldset>
        <Select
         options={typesOptions}
          isClearable
          isMulti
          closeMenuOnSelect={false}
          onChange={onChangeSelectTags}
          placeholder={"Selecioneo Tipo de Publicação que está tag pertence"}
        />
      </fieldset>

        <br></br>
        <AppButton onClick={handleTagRegister}>Añadir Etiqueta</AppButton>

      </ContentView>
        </Form>

          </Modal.Body>
          <Modal.Footer>

            <Button onClick={props.onHide}>Cerrar</Button>
          </Modal.Footer>
        </Modal>
      );
    }

export default ModalTag;