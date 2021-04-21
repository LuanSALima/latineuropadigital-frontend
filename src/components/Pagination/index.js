import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from 'react-bootstrap';
import { Content,Ul,Li } from './styles';
import {MdNavigateBefore,MdNavigateNext} from 'react-icons/md';
function Pagination(props) {

	const totalResults = props.totalResults;
	const resultsPerPage = props.resultsPerPage;
	const actualPage = props.actualPage;
	const totalPages = Math.ceil(totalResults/resultsPerPage);
	const changePage = props.changePage;

	const pages = [];

	for(let i=1 ; i<(totalPages+1) ; i++) {
		pages.push(i);
	}
	
	const generatePagination = () => {
		return (
			pages.map((page, index) => {
				if(page === actualPage) {
					return (
						<Li className="page-item disabled" key={index}>
							<Content className="page-link">{page}</Content>
						</Li>
					);
				} else {
					return (
						<Li className="page-item" key={index}>
							<Content onClick={() => {changePage(page); window.scrollTo(0,300);}}className="page-link">{page}</Content>
						</Li>
					);
				}
			})
		);
	}

	if (pages?.length) {
		return (
			<Container>
				<Ul className="pagination">
					{actualPage !== 1 ?
					<Li className="page-item">
						<Content onClick={() => {changePage(1); window.scrollTo(0,300);}} className="page-link">{<MdNavigateBefore/>}</Content>
					</Li>
					:
					<Li className="page-item">
						<Content className="page-link disabled">{<MdNavigateBefore/>}</Content>
					</Li>
					}
					
					{generatePagination()}

					{actualPage !== totalPages ?
					<Li className="page-item">
						<Content onClick={() => {changePage(totalPages);
						window.scrollTo(0,300);
						}} className="page-link">{<MdNavigateNext/>}</Content>
					</Li>
					:
					<Li className="page-item">
						<Content className="page-link disabled">{<MdNavigateNext/>}</Content>
					</Li>
					}
				</Ul>
			</Container >
		);
	}else{
		return <></>;
	}
}

export default Pagination;