import React from 'react';

import { Container } from './styles';

function Sidebar(props) {
  return  (
      <Container>
 <div className="container-fluid mt-5">
		<div className="row mt-3">
			<div className="sidebar-sticky p-4">
				<h3 className="sidebar-heading justify-content-center align-items-center text-center">Menu</h3>
				<ul className="nav flex-column justify-content-center align-items-center">
					<li className="nav-item p-1">
						<button onClick={props.noticia}>Notícias</button>
					</li>
					<li className="nav-item p-1">
						<button onClick={props.usuario}>Usuários</button>
					</li>
					<li className="nav-item p-1">
						<button onClick={props.oportunidade}>Oportunidades</button>
					</li>
					<li className="nav-item p-1">
						<button onClick={props.tag}>Tags</button>
					</li>
				</ul>
			</div>
		</div>
	</div>
      </Container>
  );
}

export default Sidebar;