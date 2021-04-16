import React, { useState, useEffect } from 'react';

import Header from '../../../components/Header';
import { AppButton, ContentView, Form, Page } from '../../../styles/default';

import api from '../../../services/api';

import { getUser, updateUser } from "../../../services/auth";

import useMyForm from '../../../hooks/useValidationForm';

function UserEdit(props) {

  const [buttonText, setButtonText] = useState("Editar");

  const [idUser] = useState(props.match.params.id);
  const [username, setUsername] = useState("Carregando Nome do Usuário...");
  const [email, setEmail] = useState("Carregando E-mail do Usuário...");
  const [phone, setPhone] = useState("Carregando Telefone do Usuário...");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const [firstRender,setFirstRender]= useState(true);

  const handleuserEdit = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if(useMyForm(username, email) === true){
      setButtonText("Enviando Dados ...");

      try {
        const response = await api.put("/user/"+idUser, {username, email, phone, password});

        if(response.data.success) {
          if(getUser()._id === idUser) {
            updateUser(username);
          }
        }

        console.log(response.data);
        setButtonText("Editado com Sucesso");
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

  useEffect(() => {
    async function getUser() {
      try {
        const response = await api.get("/user/"+idUser);

        if(response.data.success) {
          if(response.data.user) {
            setUsername(response.data.user.username);
            setEmail(response.data.user.email);
            setPhone(response.data.user.phone);
          }
        }
      } catch (error) {
        setErrors({message: "Não foi possível encontrar este user"});
        setUsername("Problema ao carregar o  Nome");
        setEmail("Problema ao carregar o Email");
        setPhone("Problema ao carregar o Telefone");
      }
    }
    getUser();
  }, [idUser]);

  return (
  <Page>
    <Header/>
    <Form width={"45%"} center>
      <ContentView>
        <label>Editar o Usuário !</label>

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
          placeholder="Insira a Senha do Usuário"
          type="text"
           onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <span style={{color: 'red'}}>{errors.password}</span>
        <br></br>
        <AppButton onClick={handleuserEdit}>{buttonText}</AppButton>
      </ContentView>
    </Form>
  </Page>);
}

export default UserEdit;