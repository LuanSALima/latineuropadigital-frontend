import React, { useState } from 'react';

import Header from '../../../components/Header';
import { AppButton, ContentView, Form, Page } from '../../../styles/default';

import api from '../../../services/api';

import useMyForm from '../../../hooks/useValidationForm';

function UserRegister(props) {

  const [buttonText, setButtonText] = useState("Cadastrar");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const [firstRender,setFirstRender]= useState(true);

  const handleUserRegister = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if(useMyForm(username, email, password) === true){
      setButtonText("Enviando Dados ...");

      try {
        const response = await api.post("/user/create", {username, email, phone, password});

        if(response.data.success) {
          setButtonText("Cadastrado com Sucesso");
        }
      } catch (error) {
        setButtonText("Tente Novamente");

        if(error) {
          //Dados retornados do backend
          if(error.errors) {
            setErrors(error.errors);
          }
          if(error.message) {
            setErrors({message: error.message});
          }
        } else {
          //Não houve dados retornados do backend
          alert("Erro Inesperado!");
        }
      }
    }else {
      setErrors({message: "¡Hubo un error! Verifique que todos los campos estén llenos"});
      setFirstRender(false);
    }
  };

  return (
  <Page>
    <Header/>
    <Form width={"45%"} center>
      <ContentView>
        <label>Registre um Usuário !</label>

        <label style={{color: 'red'}}>{errors.message}</label>

        <input
          style={!useMyForm(username) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
          placeholder="Insira o Nome do Usuário"
          type="text"
           onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
        />
        <span style={{color: 'red'}}>{errors.username}</span>

        <input
          style={!useMyForm(email) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
          placeholder="Insira o E-mail do Usuário"
          type="text"
           onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <span style={{color: 'red'}}>{errors.email}</span>

        <input
          placeholder="Insira o Telefone do Usuário"
          type="text"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          value={phone}
        />
        <span style={{color: 'red'}}>{errors.phone}</span>

        <input
          style={!useMyForm(password) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
          placeholder="Insira a Senha do Usuário"
          type="text"
           onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <span style={{color: 'red'}}>{errors.password}</span>
        <br></br>
        <AppButton onClick={handleUserRegister}>{buttonText}</AppButton>
      </ContentView>
    </Form>
  </Page>);
}

export default UserRegister;