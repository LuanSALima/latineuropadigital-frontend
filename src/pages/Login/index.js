import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import { AppButton, ContentView, Form, Page } from '../../styles/default';
import Footer from '../../components/Footer';
import api from '../../services/api';
import { login } from '../../services/auth';
import history from '../../services/history/history'
import Toastifying, { TOASTIFY_OPTIONS } from '../../components/Toastifying';
import { toast } from 'react-toastify';

import useMyForm from '../../hooks/useValidationForm';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstRender,setFirstRender]= useState(true);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if(useMyForm(email, password) === true){
      try {
        const response = await api.post("/auth/authenticate", {email, password});
        login(response.data.token, response.data.user);
        toast.success("Inicio de Sesión Exitoso! Hola adm.",TOASTIFY_OPTIONS)
        setTimeout(() => {
          history.push('/dashboard')
        }, 1500);
      } catch (error) {
        //Toastify over here
        toast.error("Inicio de sesión incorrecto, vuelva a intentarlo",TOASTIFY_OPTIONS)
      }
    }else {
      toast.error("¡Hubo un error! Verifique que todos los campos estén llenos",TOASTIFY_OPTIONS)
      setFirstRender(false);
    }
    
  };

  return (
  <Page>
    <Header/>
    <Form width={"45%"} height={"80vh"} center>
        <ContentView>
          <Toastifying/>
          <label>Hola adm! inicia sesión en nuestra plataforma</label>

    <br></br>
          <input
            style={!useMyForm(email) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
            placeholder="E-mail"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />

          <input
            style={!useMyForm(password) && !firstRender?{backgroundColor: '#f9b3b3'}:{}}
            placeholder="Contraseña "
            type="password"
             onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
    <br></br>
          <AppButton onClick={handleLoginSubmit}>Iniciar Sesión</AppButton>
        </ContentView>
    </Form>
    <Footer/>
  </Page>);
}

export default Login;