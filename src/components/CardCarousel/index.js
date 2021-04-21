import React from 'react';

import Carousel from 'react-bootstrap/Carousel';
import imageAux from '../../assets/icon.svg';

import { Link } from "react-router-dom";
import './styles.css'
function CardCarousel(props) {

	const handleImageError =(image)=>{
	    image.target.src = imageAux;
	};

	if(props.items.length)return (
		<Carousel className="navbar  myCarrousel">
			{props.items.map((content, index) => {

				let link = props.route;

				if(content.postType) {
		            switch (content.postType) {
		              case "Notice":
		                link = "/noticia";
		                break;
		              case "Directory":
		                link = "/diretorio";
		                break;
		              case "Event":
		                link = "/evento";
		                break;
		              case "Course":
		                link = "/curso";
		                break;
		              default:
		                break;
		            }
	        	}
				return (
					<Carousel.Item interval={3500} key={index}>
						<Link to={link+"/"+content.id} >
							<img
							  className="d-block myImage"
							  src={content.image}
							  onError={handleImageError}
							  alt="First slide"
							 
							/>
							{/* Alexandre does not wanna get caption here */}
							{/* <Carousel.Caption>
							  <div style={{ padding:"1.4rem 0.7rem",backgroundColor:"rgba(0, 0, 0, 0.35)",overflowWrap: "break-word",maxWidth:"250px !important",margin:"0 auto",borderRadius:"0.5rem"}}>
							  <h3 style={{color:"var(--color-freela-white)"}}>{content.title.length > 20?
								content.title.substr(0,30)+".."
								:
								content?.title}</h3>
											<p className="spanP" style={{color:"var(--color-freela-white)",marginBottom:"1.5rem"}}>{content.subtitle.length > 70?
								content.subtitle.substr(0,70)+".."
								:
								content?.subtitle}</p>
								</div>
							</Carousel.Caption> */}
						</Link>
					</Carousel.Item>
				);
			})}
		</Carousel>
	);
	else{
		return <></>
	}
}

export default CardCarousel;