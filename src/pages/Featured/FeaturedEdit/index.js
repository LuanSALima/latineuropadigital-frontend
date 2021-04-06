import React, { useState, useEffect } from 'react';

import Header from '../../../components/Header';
import { AppButton, ContentView, Form, Page } from '../../../styles/default';

import Toastifying, {TOASTIFY_OPTIONS} from '../../../components/Toastifying'
import { toast } from 'react-toastify';

import api from '../../../services/api';

function FeaturedEdit(props) {

	const [idFeatured] = useState(props.match.params.id);
	const [position, setPosition] = useState(0);
	const [errors, setErrors] = useState({});

	async function getFeatured() {
	    try {
	      const response = await api.get("/featured/"+idFeatured);

	      if(response.data.success) {
	        if(response.data.featured) {
	          setPosition(response.data.featured.position);
	        }
	      }
	    } catch (error) {
	      setErrors({message: "Não foi possível encontrar esta Tag"});
	    }
	}

	useEffect(() => {
		getFeatured();
	}, [idFeatured]);

	const handleFeaturedEdit = async (e) => {
		e.preventDefault();

	    try {
	      const response = await api.put("/featured/"+idFeatured+"/position", {position});

	      toast.success("Alterado com Sucesso!",TOASTIFY_OPTIONS)
	    } catch (error) {
	    	//Dados retornados do backend
			if(error.errors) {
			  setErrors(error.errors);
			}
			if(error.message) {
			  setErrors({message: error.message});
			}
	    }
	}

	return (
		<Page>
			<Toastifying/>
		    <Header/>
		    <Form width={"45%"} center>
		      <ContentView>
		        <label>Editar o Destaque !</label>

		        <label style={{color: 'red'}}>{errors.message}</label>

		         <input
		          placeholder="Nova posición"
		          type="number"
		          min="0"
		          onChange={(e) => {
		            setPosition(e.target.value);
		          }}
		          value={position}
		        />
		        <span style={{color: 'red'}}>{errors.position}</span>

		        <br></br>
		        <AppButton onClick={handleFeaturedEdit}>Editar</AppButton>
		      </ContentView>
		    </Form>
	  	</Page>
	);
}

export default FeaturedEdit;