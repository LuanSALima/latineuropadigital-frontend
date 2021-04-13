import React, { useState, useEffect } from 'react';

import { Card } from './styles';

import imgTest from "../../assets/icon.svg";

import api from '../../services/api';

function FeaturedCard(props) {

	const [position, setPosition] = useState(props.position);
	const [options, setOptions] = useState([]);

	useEffect(() => {
		setOptions(props.options);
	}, [props.options])

	const generateOptions = () => {
		return (
			options.map((option) => {
				if(option === props.position) {
					return <option selected value={option}>{option}</option>
				} else {
					return <option value={option}>{option}</option>
				}
				
			})
		);
	}

	const changeFeaturedPosition = async (e) => {
		e.preventDefault();

		try {
			const response = await api.put("featured/"+props.id+"/position", {position});

			props.callback();
		} catch(error) {
			alert(error.message);
		}
	}

	return (
		<Card>
			<img src={`${process.env.REACT_APP_API_URL}`+props.imagePath} onError={(image) => {image.target.src = imgTest}}/>
			<p>{props.title}</p>
			<label>Posição</label>
			<form>
				<select onChange={(e) => {setPosition(e.target.value)}}>
					{generateOptions()}
				</select>
				<button className="btn btn-primary" onClick={changeFeaturedPosition}>Cambiar de posición</button>
			</form>
		</Card>
	);
}

export default FeaturedCard;