import React from 'react';

// import { Container } from './styles';
import Header from '../../components/Header';
import { Form, Page } from '../../styles/default';
function Register() {
  return(  <Page>
    <Header/>
    <Form width={"85%"}>
        <h1>Register page!</h1>
    </Form>
  </Page>);
}

export default Register;