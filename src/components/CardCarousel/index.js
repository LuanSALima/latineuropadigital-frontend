import React from 'react';

import Carousel from 'react-bootstrap/Carousel';

import imageAux from '../../assets/icon.svg';

function CardCarousel(props) {

	const handleImageError =(image)=>{
	    image.target.src = imageAux;
	};

	return (
		<Carousel>
			{props.items.map((content) => {
				return (
					<Carousel.Item interval={1500}>
						<img
						  className="d-block w-100"
						  src={content.image}
						  onError={handleImageError}
						  alt="First slide"
						  style={{maxHeight: '350px', objectFit: 'cover'}}
						/>
						<Carousel.Caption>
						  <h3>{content.title}</h3>
						  <p>{content.subtitle}</p>
						</Carousel.Caption>
					</Carousel.Item>
				);
			})}
		</Carousel>
	);
}

export default CardCarousel;