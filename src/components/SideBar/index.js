import React, { useState, useEffect } from 'react';

import { MySideBarCard } from "../../styles/default";
import { Link } from "react-router-dom";
import imgTest from "../../assets/icon.svg";

import { MdStar } from 'react-icons/md';

function SideBar(props) {

	const [allPosts, setAllPosts] = useState([]);
	const [postsShowing, setPostsShowing] = useState([]);

	useEffect(() => {
		if(props.items.length > 0) {
			setAllPosts(props.items);
		}
	}, [props.items]);

	useEffect(() => {

		function generatePostsShowing(posts, maxPosts, qntAlreadyShowed) {
			const startIndex = maxPosts*qntAlreadyShowed;
			const lastIndex = startIndex+maxPosts;

	  		const newPostsShowing = posts.slice(startIndex, lastIndex);

	  		return newPostsShowing;
		}

		function updatePostsAlreadyShowed(totalPosts, maxPosts, qntAlreadyShowed) {
			let postsAlreadyShowed = qntAlreadyShowed;

			if((maxPosts*postsAlreadyShowed)+maxPosts >= totalPosts) {
	  			postsAlreadyShowed = 0;
	  		} else {
	  			postsAlreadyShowed++;	
	  		}

	  		return postsAlreadyShowed;
		}

		if(allPosts.length > 0) {

			let postsAlreadyShowed = 0;

			setPostsShowing(generatePostsShowing(allPosts, props.qntPosts, postsAlreadyShowed));
	  		postsAlreadyShowed = updatePostsAlreadyShowed(allPosts.length, props.qntPosts, postsAlreadyShowed);

	  		if(allPosts.length > props.qntPosts) {
			  	const interval_id = setInterval(() => {
			  		setPostsShowing(generatePostsShowing(allPosts, props.qntPosts, postsAlreadyShowed));
			  		postsAlreadyShowed = updatePostsAlreadyShowed(allPosts.length, props.qntPosts, postsAlreadyShowed);
			  		
			  	}, props.interval);

			   	return () => {
					// Stop the interval when the component unmounts. 
					// Otherwise it will keeep going and you will get an error.
					clearInterval(interval_id);
				}
			}
		}
	}, [allPosts, props.interval, props.qntPosts]);

	return (
		postsShowing.map((post, index) => {
			let link = props.link;

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
                    {post.postType?
                    	post.prioritized === 'true'?
                    	<MdStar size={30} color="#e03b07" />
                    	:
						<MdStar size={30} color="yellow" />
                    :
                    null
                    }
                  </MySideBarCard>
                </Link>
            );
		})
	);
}

export default SideBar;