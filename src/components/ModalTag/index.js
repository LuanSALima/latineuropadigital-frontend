import React, { useEffect, useState } from 'react';
import MyModal from '../MyModal';

// import { Container } from './styles';

function ModalTag(props) {

  ////

  const [ModalTitle, setModalTitle] = useState("");
  const [description, setDescription] = useState("");
  const [types, setTypes] = useState([]);
  const [typesOptions] = useState([
    {
      label: 'Notícia',
      value: 'Notice'
    }, 
    {
      label: 'Directorio',
      value: 'Directory'
    }, 
    {
      label: 'Evento',
      value: 'Event'
    }, 
    {
      label: 'Curso',
      value: 'Course'
    }
  ]);
  ///
   // eslint-disable-next-line no-unused-expressions
  

  return (
  <>
  <MyModal
    title="Tags"
    insideTitle={"Insertar etiquetas para registrarlas en el Banco"}
    show={props.show}
    onHide={()=>props.show }
    >
 
      </MyModal>
      </>);
}

export default ModalTag;