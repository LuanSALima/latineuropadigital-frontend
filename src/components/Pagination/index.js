import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css";

function Pagination(props) {

	/*
	
	<ul class="paginacao">
				
	<?php if($pagina != 1): ?>
		<?php 
				$tag = isset($_GET['tag']) ? "&tag=".$_GET['tag'] : '';
			?>
			<li>
				<a href="<?php echo $_SERVER['PHP_SELF'].'?pagina=1'.$tag; ?>">&laquo;</a>
			</li>
	<?php else: ?>
		<li>
			<span>&laquo;</span>
		</li>
	<?php endif; ?>

		<?php for($i=($pagina-10); $i<($pagina+10); $i++): ?>
			
 		<?php if(($i > 0) && ($i <= $totalPaginas)): ?>

 			<?php if($i == $pagina): ?>
 				<li>
		 			<span><?php echo $i; ?></span>
		 		</li>
 			<?php else: ?>

 				<?php 
 					$tag = isset($_GET['tag']) ? "&tag=".$_GET['tag'] : '';
 				 ?>
 				<li>
	 				<a href="<?php echo $_SERVER['PHP_SELF'].'?pagina='.$i.$tag; ?>"><?php echo $i; ?></a>
	 			</li>
 			<?php endif; ?>

 		<?php endif; ?>

		<?php endfor; ?>

		<?php if($pagina != $totalPaginas): ?>
		<?php 
				$tag = isset($_GET['tag']) ? "&tag=".$_GET['tag'] : '';
			?>
			<li>
				<a href="<?php echo $_SERVER['PHP_SELF'].'?pagina='.$totalPaginas.$tag; ?>">&raquo;</a>
			</li>
	<?php else: ?>
		<li>
			<span>&raquo;</span>
		</li>
	<?php endif; ?>
	</ul>

	*/

	const totalResults = props.totalResults;
	const resultsPerPage = props.resultsPerPage;
	const actualPage = props.actualPage;
	const totalPages = Math.ceil(totalResults/resultsPerPage);
	const changePage = props.changePage;

	const generatePagination = () => {
		const pages = new Array();
		for(let i=1 ; i<(totalPages+1) ; i++) {
			pages.push(i);
		}

		return (
			pages.map((page) => {
				if(page === actualPage) {
					return (
						<li className="page-item disabled">
							<span className="page-link">{page}</span>
						</li>
					);
				} else {
					return (
						<li className="page-item">
							<span onClick={() => {changePage(page)}}className="page-link">{page}</span>
						</li>
					);
				}
				
			})
		);
	}

	return (
		<div style={{width: '100%'}}>
			<ul className="pagination">
				{actualPage !== 1 ?
				<li className="page-item">
					<span onClick={() => {changePage(1)}} className="page-link">&laquo;</span>
				</li>
				:
				<li className="page-item">
					<span className="page-link disabled">&laquo;</span>
				</li>
				}
				
				{generatePagination()}

				{actualPage !== totalPages ?
				<li className="page-item">
					<span onClick={() => {changePage(totalPages)}} className="page-link">&raquo;</span>
				</li>
				:
				<li className="page-item">
					<span className="page-link disabled">&raquo;</span>
				</li>
				}
			</ul>
		</div>
	);
}

export default Pagination;