import React from 'react';

import Carousel from 'react-bootstrap/Carousel';
import imageAux from '../../assets/icon.svg';

import { Link } from "react-router-dom";
import './styles.css'
function CardCarousel(props) {

	const handleImageError =(image)=>{
	    image.target.src = imageAux;
	};

	return (
		<Carousel className="myCarrousel">
			{props.items.map((content) => {
				return (
					<Carousel.Item interval={20000}>
						<Link to={props.route+"/"+content.id}>
							<img
							  className="d-block w-100 myImage"
							  src={content.image}
							  onError={handleImageError}
							  alt="First slide"
							 
							/>
							<Carousel.Caption>
							  <div style={{backgroundColor:"transparent",maxWidth:"auto",margin:"0 auto",borderRadius:"0.5rem"}}>
							  <h3 style={{color:"var(--color-freela-white)"}}>{content.title.length > 40?
				content.title.substr(0,40)+".."
				:
				content?.title}</h3>
							  <p style={{color:"var(--color-freela-white)"}}>{content.subtitle.length > 140?
				content.subtitle.substr(0,140)+".."
				:
				content?.subtitle}</p>
				</div>
							</Carousel.Caption>
						</Link>
					</Carousel.Item>
				);
			})}
		</Carousel>
	);
}

export default CardCarousel;