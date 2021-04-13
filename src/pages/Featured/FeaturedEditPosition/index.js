import React, { useState, useEffect } from 'react';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { AppButton, ContentView, Form, Page } from '../../../styles/default';
import Toastifying, {TOASTIFY_OPTIONS} from '../../../components/Toastifying';

import api from '../../../services/api';

function FeaturedEditPosition() {

	const [featureds, setFeatureds] = useState([]);

	async function listFeatureds() {
		try {
			const response = await api.get("/featured/list");

			setFeatureds(response.featureds);
		} catch(error) {
			toast.error(error.message, TOASTIFY_OPTIONS);
		}
	}

	return (
		<Page>
			<Toastifying/>
		    <Header/>

		    <Footer/>
		</Page>
	);
}

export default FeaturedEditPosition;