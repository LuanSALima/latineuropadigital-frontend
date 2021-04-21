import React, { useState, useEffect } from 'react';

import Header from '../../../components/Header';
import { AppButton, ContentView, Form, Page } from '../../../styles/default';

import Toastifying, {TOASTIFY_OPTIONS} from '../../../components/Toastifying'
import { toast } from 'react-toastify';

import api from '../../../services/api';

function FeaturedEdit(props) {

	const [idFeatured] = useState(props.match.params.id);
	const [post, setPost] = useState({});
	const [postType, setPostType] = useState("");
	const [position, setPosition] = useState(0);
	const [prioritized, setPrioritized] = useState(false);
	const [errors, setErrors] = useState({});

	useEffect(() => {

		async function getFeatured() {
		    try {
		      const response = await api.get("/featured/"+idFeatured);

		      if(response.data.success) {
		        if(response.data.featured) {
		        	setPost(response.data.featured.post);
		        	setPostType(response.data.featured.postType);
					setPosition(response.data.featured.position);
					if(response.data.featured.prioritized === 'true') {
						setPrioritized(true);	
					} else {
						setPrioritized(false);
					}
		        }
		      }
		    } catch (error) {
		      setErrors({message: "Não foi possível encontrar esta Tag"});
		    }
		}
		
		getFeatured();
	}, [idFeatured]);

	const handleFeaturedEdit = async (e) => {
		e.preventDefault();

	    try {
	      	const response = await api.put("/featured/"+idFeatured, {post, postType, position, prioritized: prioritized.toString()});
	       	
	       	if(response.data.success) {
	      		toast.success("Alterado com Sucesso!",TOASTIFY_OPTIONS)
	  		}
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

		        <label>Seleccione la posición del Destacado</label>
		        <input
		          placeholder="Nova posición"
		          type="number"
		          min="1"
		          onChange={(e) => {
		            setPosition(e.target.value);
		          }}
		          value={position}
		        />
		        <span style={{color: 'red'}}>{errors.position}</span>

		        <br />

		        <label>Destacado tiene prioridad?</label>
		        <input
		          type="checkbox"
		          onChange={(e) => {		    
		            setPrioritized(e.target.checked);		            
		          }}
		          checked={prioritized}
		        />
		        <span style={{color: 'red'}}>{errors.prioritized}</span>

		        <br></br>
		        <AppButton onClick={handleFeaturedEdit}>Editar</AppButton>
		      </ContentView>
		    </Form>
	  	</Page>
	);
}

export default FeaturedEdit;