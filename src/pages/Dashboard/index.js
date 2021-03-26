import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Page } from '../../styles/default';

import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import api from '../../services/api';

function Dashboard() {

	const [dbData, setDBData] = useState([]);
	const [dataType, setDataType] = useState("");
	const [columns, setColumns] = useState([]);
  	const [errors, setErrors] = useState({});
  	const [ignoreColumns, setIgnoreColumns] = useState([
  		'__v',
  		'_id',
  		'createdAt',
  		'updatedAt',
  		'owner',
  		'imagePath'
  	]);

  	useEffect(() => {
	}, []);

  	useEffect(() => {
	    function mapDinamicColumns(){
	    	let individualColumn = [];

	    	if(dbData.length) {
	    		individualColumn.push("Editar");
	    		individualColumn.push("Remover");
	    	}

	  		Object.keys(dbData).forEach((key) => {
	  			Object.keys(dbData[key]).forEach((chave) => {
	  				if(individualColumn.indexOf(chave) === -1 && ignoreColumns.indexOf(chave) === -1) {
	  					individualColumn.push(chave);
	  				}
	  			});
	  		});
	  		setColumns(individualColumn);
	    }
	    mapDinamicColumns();
	}, [dbData]);

  	const createTableHead = () => {
  		return (
  			columns.map((column) => {
  				return (
  					<th>{column}</th>
  				);
  			})
  		)
  	}

  	const createTableRow = (row) => {
  		let rowData = [];

  		if(dbData.length) {
  			rowData.push(row._id);
  			rowData.push(row._id);
  		}

  		/*
			Para cada coluna procura para cada key da linha
			Se a key da linha for igual da coluna
			adiciona a array rowData o valor correspondente a column

			Isto impede que haja um dado que não pertence a coluna, por exemplo um dado fora de ordem
  		*/

  		/*
			Problema disto que este loop ocorre MUITAS vezes, mesmo que ele encontre que a linha e a coluna sejam iguais,
			ele continua a buscar por outros indices, isto é causado porque não há uma maneira de dar um 'break' neste loop
			que seria usado no lugar do comentario abaixo
  		*/
  		columns.map((column) => {
			Object.keys(row).map((item) => {
				if(column == item) {
					rowData.push(row[item]);
					//break; Pois no lugar que está apontando esta coluna ja foi encontrado o valor desta linha com mesmo key que o nome da coluna
				} else {
					//Remova este comentário abaixo para entender o que este problema
					//console.log(column+" != "+item);
				}
			});
		});
	  		
  		return (
  			rowData.map((data, index) => {

  				//Se o index for igual a 0, Ou seja a primeira coluna da tabela, no qual ja colocamos no cabecalho como Editar
  				if(index === 0) {
  					return (
  						<td><Link to={dataType+"/editar/"+data}>Editar</Link></td>
  					);
  				}

  				//Se o index for igual a 1, Ou seja a segunda coluna da tabela, no qual ja colocamos no cabecalho como Remover
  				if(index === 1) {
  					const removeItem = async (e) => {
  						e.preventDefault();

  						try {
							const response = await api.delete(dataType+"/"+data);

							if(response.data.success) {
							  	let array = dbData;

		  						array.map((content, contentIndex) => {
		  							if(content._id === data) {
		  								array.splice(contentIndex, 1);

		  								setDBData([]); //Utilizo isto para limpar o state e depois popular o state com a array atualizada
		  								setDBData(array);
		  							}
		  						});
							}
						} catch (error) {
							setErrors({message: "Não foi possível deletar o item"});

							if(error.response) {
							  if(error.response.data) {
							    if(error.response.data.message) {
							      setErrors({message: error.response.data.message});
							    }
							  }
							}
						}
						
  					}

  					return (
  						<td><button onClick={removeItem}>Remover</button></td>
  					);
  				}

  				return (
  					<td>{data}</td>
  				);
  			})
  		);
  	}

  	const createTable = (data) => {
  		return (
  			<Table striped bordered hover>
				<thead>
					<tr>{createTableHead(data)}</tr>
				</thead>
				<tbody>
					{data.map((row) => {
						return <tr>{createTableRow(row)}</tr>
					})}
				</tbody>
			</Table>
  		);
  	}

  	const setTablePosts = async (e) => {
  		e.preventDefault();
  		setErrors({}); /*Limpando os erros anteriores*/
		setDataType("post");

  		try {
			const response = await api.get("/post/list");

			if(response.data.success) {
			  if(response.data.posts) {
			    setDBData(response.data.posts);
			  }
			}
		} catch (error) {
			setErrors({message: "Não foi possível carregar a lista de notícias"});
			setDBData([]);
			if(error.response) {
			  if(error.response.data) {
			    if(error.response.data.message) {
			      setErrors({message: error.response.data.message});
			    }
			  }
			}
		}
  	}

  	const setTableUsers = async (e) => {
  		e.preventDefault();
  		setErrors({}); /*Limpando os erros anteriores*/
  		setDataType("user");

  		try {
			const response = await api.get("/user/list");

			if(response.data.success) {
			  if(response.data.users) {
			    setDBData(response.data.users);
			  }
			}
		} catch (error) {
			setErrors({message: "Não foi possível carregar a lista de usuários"});
			setDBData([]);
			if(error.response) {
			  if(error.response.data) {
			    if(error.response.data.message) {
			      setErrors({message: error.response.data.message});
			    }
			  }
			}
		}
  	}

  	const setTableTags = async (e) => {
  		e.preventDefault();
		setErrors({}); /*Limpando os erros anteriores*/
		setDataType("tag");

  		try {
			const response = await api.get("/tag/list");

			if(response.data.success) {
			  if(response.data.tags) {
			    setDBData(response.data.tags);
			  }
			}
		} catch (error) {
			setErrors({message: "Não foi possível carregar a lista de tags"});
			setDBData([]);
			if(error.response) {
			  if(error.response.data) {
			    if(error.response.data.message) {
			      setErrors({message: error.response.data.message});
			    }
			  }
			}
		}
  	}

  	const setTableOpportunities = async (e) => {
  		e.preventDefault();
  		setErrors({}); /*Limpando os erros anteriores*/
		setDataType("job");

  		try {
			const response = await api.get("/job/list");

			if(response.data.success) {
			  if(response.data.jobs) {
			    setDBData(response.data.jobs);
			  }
			}
		} catch (error) {
			setErrors({message: "Não foi possível carregar a lista de oportunidades"});
			setDBData([]);
			if(error.response) {
			  if(error.response.data) {
			    if(error.response.data.message) {
			      setErrors({message: error.response.data.message});
			    }
			  }
			}
		}
  	}

  return (
    <Page>
    <Header/>
    <div className="container-fluid mt-5">
		<div className="row mt-3">
			<div className="sidebar-sticky p-4">
				<h3 className="sidebar-heading justify-content-center align-items-center text-center">Menu</h3>
				<ul className="nav flex-column justify-content-center align-items-center">
					<li className="nav-item p-1">
						<button onClick={setTablePosts}>Notícias</button>
					</li>
					<li className="nav-item p-1">
						<button onClick={setTableUsers}>Usuários</button>
					</li>
					<li className="nav-item p-1">
						<button onClick={setTableOpportunities}>Oportunidades</button>
					</li>
					<li className="nav-item p-1">
						<button onClick={setTableTags}>Tags</button>
					</li>
				</ul>
			</div>
			<div className="container">
				<h1>Dashboard</h1>
				<h2 style={{color: 'red'}}>{errors.message}</h2>
				{(!dbData.length)?<h3>Acesse as funcionalidades clicando nos items do menu à esquerda</h3>:<span></span>}
				{createTable(dbData)}
			</div>
		</div>
	</div>
	<Footer/>
  </Page>)
}

export default Dashboard;