import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
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

	const handleRegisterSubmit = async (e) => {
		e.preventDefault();
		setButtonText("Enviando Dados ...");

		if (password === confirmPassword) {
			try {
				const response = await api.post("/auth/signup", { username, email, password, phone, professional });

				console.log(response.data);
				setButtonText("Cadastrado com Sucesso");
			} catch (error) {
				setButtonText("Tente Novamente");

			}
		} else {
		}

	};

	return (<Page>
		<Header />
		<Form width={"45%"} center>
			<ContentView>
				<label>¡Anuncie sus servicios!</label>


				<input
					placeholder="Insira seu Nome"
					type="text"
					onChange={(e) => {
						setUsername(e.target.value);
					}}
					value={username}
				/>

				<input
					placeholder="Insira seu E-mail"
					type="email"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					value={email}
				/>

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

				<input
					placeholder="Confirme sua Senha "
					type="password"
					onChange={(e) => {
						setConfirmPassword(e.target.value);
					}}
					value={confirmPassword}
				/>

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
		<Footer />
	</Page>);
}

export default Register;