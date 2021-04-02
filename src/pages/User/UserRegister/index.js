import React, { useState, useEffect } from 'react';

import Header from '../../../components/Header';
import { AppButton, ContentView, Form, Page } from '../../../styles/default';

import api from '../../../services/api';

function UserRegister(props) {

  const [buttonText, setButtonText] = useState("Cadastrar");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleUserRegister = async (e) => {
    e.preventDefault();
    setButtonText("Enviando Dados ...");

    try {
      const response = await api.post("/user/create", {username, email, phone, password});

      if(response.data.success) {
        console.log(response.data);
        setButtonText("Cadastrado com Sucesso");
      }
    } catch (error) {
      setButtonText("Tente Novamente");

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
          placeholder="Insira o Nome do Usuário"
          type="text"
           onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
        />
        <span style={{color: 'red'}}>{errors.username}</span>

        <input
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