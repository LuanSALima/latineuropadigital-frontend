import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import { AppButton, ContentView, Form, Page } from '../../styles/default';

import api from '../../services/api';

function Register() {

	const [buttonText, setButtonText] = useState("Cadastrar");

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [professional, setProfessional] = useState(false);
	const [errors, setErrors] = useState({});

	const handleRegisterSubmit = async (e) => {
		e.preventDefault();
		setButtonText("Enviando Dados ...");
		
		if(password === confirmPassword) {
			try {
				const response = await api.post("/auth/signup", {username, email, password, phone, professional});

				console.log(response.data);
				setButtonText("Cadastrado com Sucesso");
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
		} else {
			setErrors({confirmPassword: "As senhas não coincidem"});
		}
		
	};

  return(  <Page>
    <Header/>
    <Form width={"45%"} center>
		<ContentView>
        <label>Cadastre-se na Nossa Plataforma!</label>

        <h5 style={{color: 'red'}}>{errors.message}</h5>
        
        <input
			placeholder="Insira seu Nome"
			type="text"
			onChange={(e) => {
			  setUsername(e.target.value);
			}}
			value={username}
		/>
		<span style={{color: 'red'}}>{errors.username}</span>

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
			placeholder="Insira seu Telefone"
			type="text"
			onChange={(e) => {
			  setPhone(e.target.value);
			}}
			value={phone}
		/>

		<input
			placeholder="Insira sua Senha "
			type="password"
			 onChange={(e) => {
			  setPassword(e.target.value);
			}}
			value={password}
		/>
		<span style={{color: 'red'}}>{errors.password}</span>

		<input
			placeholder="Confirme sua Senha "
			type="password"
			 onChange={(e) => {
			  setConfirmPassword(e.target.value);
			}}
			value={confirmPassword}
		/>
		<span style={{color: 'red'}}>{errors.confirmPassword}</span>

		<input
			type="checkbox"
			onChange={(e) => {
				setProfessional(!professional);
			}}
		/>
		<label>Conta Profissional ?</label>

		<Link to="/login">
			Já possui uma Conta? Faça Login Clicando Aqui!!
		</Link>
		<br></br>
		<AppButton onClick={handleRegisterSubmit}>{buttonText}</AppButton>
		</ContentView>
    
	</Form>
  </Page>);
}

export default Register;