import React from 'react';

import Header from '../../components/Header';
import { AppButton, Form, Page } from '../../styles/default';
import { ContentLogin } from './styles';
function Login() {
  return (
  <Page>
    <Header/>
    <Form width={"85%"} center>
        <ContentLogin>
          <label>Faça Login na Nossa Plataforma!</label>
          <input placeholder="Insira seu E-mail" type="email"/>
          <input placeholder="Insira sua Senha "type="password"/>
          <AppButton>Logar</AppButton>
        </ContentLogin>
    </Form>
  </Page>);
}

export default Login;