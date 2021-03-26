import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import { AppButton, ContentView, Form, Page } from '../../styles/default';
import Footer from '../../components/Footer';
import api from '../../services/api';
import { login } from '../../services/auth';

function Login() {

  const [buttonText, setButtonText] = useState("Login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setButtonText("Enviando Dados ...");

    try {
      const response = await api.post("/auth/authenticate", {email, password});

      login(response.data.token, response.data.user);
      setButtonText("Logado com Sucesso");
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
          <label>Faça Login na Nossa Plataforma!</label>

          <label style={{color: 'red'}}>{errors.message}</label>

          <input
            placeholder="Insira seu E-mail"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <span style={{color: 'red'}}>{errors.email}</span>

          <input
            placeholder="Insira sua Senha "
            type="password"
             onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <span style={{color: 'red'}}>{errors.password}</span>

          <Link to="/cadastro">
            Ainda não Tem Conta? Cadastre-se Clicando Aqui!!
          </Link>
          <br></br>
          <AppButton onClick={handleLoginSubmit}>{buttonText}</AppButton>
        </ContentView>
    </Form>
    <Footer/>
  </Page>);
}

export default Login;