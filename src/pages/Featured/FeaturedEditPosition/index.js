import React, { useState, useEffect } from 'react';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Page, MyFilteredOptions } from '../../../styles/default';
import { ListView, List } from './styles';
import Toastifying, {TOASTIFY_OPTIONS} from '../../../components/Toastifying';
import { toast } from 'react-toastify';

import Select from "react-select";
import { MdFilterList } from "react-icons/md/index";

import api from '../../../services/api';

import FeaturedCard from '../../../components/FeaturedCard';

function FeaturedEditPosition() {

	const [featureds, setFeatureds] = useState([]);
	const [validPositions, setValidPositions] = useState([]);
	const [postType, setPostType] = useState('all');

	async function listFeatureds() {
		try {
			
			let request = "/featured/list";

			if(postType !== 'all') {
				request = "/featured/list?type="+postType;
			}

			const response = await api.get(request);

			if(response.data) {
				if(response.data.success) {
					if(response.data.featureds) {
						setFeatureds(response.data.featureds);
					}
				}
			}
			
		} catch(error) {
			toast.error(error.message, TOASTIFY_OPTIONS);
		}
	}

	useEffect(() => {
		listFeatureds();
	}, [postType]);

	useEffect(() => {

		function setPositions() {
			let positions = [];
			for(const featured of featureds) {
				positions.push(featured.position);
			}
			setValidPositions(positions);
		}
		
		setPositions();
	}, [featureds]);

	const refreshFeatureds = () => {
		setFeatureds([]);
		listFeatureds();
	}

	return (
		<Page>
			<Toastifying/>
		    <Header/>
		    	<ListView>
				    <h1>Cambiar la posición dos Destacados</h1>

					<MyFilteredOptions>
						<Select
						  placeholder={
						    <MdFilterList
						      style={{ marginLeft: "1rem" }}
						      size={23}
						      color="var(--color-freela-pink)"
						    />
						  }
						  options={[
						    { label: "ACTUALIDAD", value: "notice" },
						    { label: "DIRECTORIO", value: "directory" },
						    { label: "AGENDA", value: "event" },
						    { label: "EDUCACIÓN", value: "course" },
						    { label: "TODOS", value: "all"}
						  ]}
						  onChange={(e)=>setPostType(e.value)}
						/>
					</MyFilteredOptions>
				    <List>
				    	{featureds.map((featured, index) => {

				    		let postTitle = "Titulo não encontrado";

				    		if(!featured.post) {
				    			return (
				    				<FeaturedCard id={featured._id} imagePath={""} title={featured.postType+" eliminado"} position={featured.position} options={validPositions} prioritized={featured.prioritized} callback={refreshFeatureds} key={index}/>
				    			);
				    		}

							if (featured.post.title) {
								postTitle = featured.post.title;
							} else if (featured.post.businessName) {
								postTitle = featured.post.businessName;
							} else if (featured.post.eventName) {
								postTitle = featured.post.eventName;
							}

				    		return (
				    			<FeaturedCard id={featured._id} imagePath={featured.post.imagePath} title={postTitle} position={featured.position} options={validPositions} prioritized={featured.prioritized} callback={refreshFeatureds} key={index}/>
				    		);
				    	})}
				    </List>
			    </ListView>
		    <Footer/>
		</Page>
	);
}

export default FeaturedEditPosition;