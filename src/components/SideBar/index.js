import React, { useState, useEffect } from 'react';

import { MySideBarCard } from "../../styles/default";
import { Link } from "react-router-dom";
import imgTest from "../../assets/icon.svg";

function SideBar(props) {

	const [allPosts, setAllPosts] = useState([]);
	const [postsShowing, setPostsShowing] = useState([]);

	useEffect(() => {
		setAllPosts(props.items);
	}, [props.items]);

	return (
		allPosts.map((post, index) => {
			let link = "/";

			switch (post.postType) {
				case "Notice":
				  link = "/noticia/";
				  break;
				case "Directory":
				  link = "/diretorio/";
				  break;
				case "Event":
				  link = "/evento/";
				  break;
				case "Course":
				  link = "/curso/";
				  break;
				default:
				  break;
			}

			return (
                <Link to={link + post.id} key={index}>
                  <MySideBarCard>
                    <img
                      src={post.image}
                      onError={(image) => {
                        image.target.src = imgTest;
                      }}
                      alt={"Imagen del post "+post.title}
                    />
                    <span>{post.title}</span>
                  </MySideBarCard>
                </Link>
            );
		})
	);
}

export default SideBar;