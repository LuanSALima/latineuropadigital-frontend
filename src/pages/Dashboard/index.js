import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { AppButton, Page, ScreenView } from '../../styles/default';

import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import api from '../../services/api';
import Sidebar from './sidebar';
import { Content, DashButton } from './styles';
import HorizonScrollView from '../../components/HorizonScrollView'
function Dashboard() {

	const [dbData, setDBData] = useState([]);
	const [dataType, setDataType] = useState("");
	const [columns, setColumns] = useState([]);
	const [error,setError] = useState(false);
	const [closeMenu,setCloseMenu] = useState(false);
  	const [ignoreColumns, setIgnoreColumns] = useState([
  		'__v',
  		'_id',
  		'createdAt',
  		'updatedAt',
  		'owner',
  		'imagePath'
  	]);

  	useEffect(() => {
  		setTableNotices();
  	}, []);

	function mapDinamicColumns(){
		let individualColumn = [];

		Object.keys(dbData).forEach((key) => {
		  Object.keys(dbData[key]).forEach((chave) => {
			  if(individualColumn.indexOf(chave) === -1 && ignoreColumns.indexOf(chave) === -1) {
				  individualColumn.push(chave);
			  }
		  });
		});

		if(dbData.length) {
			individualColumn.push("Editar");
			individualColumn.push("Eliminar");
		}

		setColumns(individualColumn);
	}
	
  	useEffect(() => {
	    mapDinamicColumns();
	}, [dbData]);

  	const createTableHead = () => {
  		return (
  			columns.map((column) => {
  				return (
  					<th style={{textTransform:"uppercase"}}>{column}</th>
  				);
  			})
  		)
  	}

  	const createTableRow = (row) => {
  		let rowData = [];

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
  			let pushed = false;
			Object.keys(row).map((item) => {

				if(column == item) {
					if(row[item]) {
						if(typeof(row[item]) === "object") {
							try {
								if(row[item].title) {
									rowData.push(row[item].title);
								} else {
									rowData.push(row[item].join(' / '));
								}
							} catch(err) {
								rowData.push(err.message);
							}
						} else {
							rowData.push(row[item].toString());	
						}
					} else {
						rowData.push('Eliminado');
					}
					
					pushed = true;
					//break; Pois no lugar que está apontando esta coluna ja foi encontrado o valor desta linha com mesmo key que o nome da coluna
				} else {
					//Remova este comentário abaixo para entender o que este problema
					//console.log(column+" != "+item);
					return;
				}
			});

			if(!pushed && (column !== "Editar" && column !== "Eliminar")) {
				rowData.push("");
			}
		});

		if(dbData.length) {
  			rowData.push(row._id);
  			rowData.push(row._id);
  		}
	  		
  		return (
  			rowData.map((data, index) => {

  				//Se o index for igual a 0, Ou seja a primeira coluna da tabela, no qual ja colocamos no cabecalho como Editar
  				if(index === columns.length-2) {
  					return (
  						<td><Link to={dataType+"/editar/"+data} style={{color:"green"}}>Editar</Link></td>
  					);
  				}

  				//Se o index for igual a 1, Ou seja a segunda coluna da tabela, no qual ja colocamos no cabecalho como Remover
  				if(index === columns.length-1) {
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
						}
						
  					}

  					return (
  						<td><button onClick={removeItem} style={{color:"red"}}>Eliminar</button></td>
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
  			<Table striped bordered hover className="tabela">
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

  	const setTableUsers = async (e) => {
  		e.preventDefault();
  		setDataType("user");

  		try {
			const response = await api.get("/user/list");

			if(response.data.success) {
			  if(response.data.users) {
			    setDBData(response.data.users);
				setError(false)

			  }
			}
		} catch (error) {
			setDBData([]);
			setError(true)
			
		}
  	}

  	const setTableTags = async (e) => {
  		e.preventDefault();
		setDataType("tag");

  		try {
			const response = await api.get("/tag/list");

			if(response.data.success) {
			  if(response.data.tags) {
			    setDBData(response.data.tags);
				setError(false)
			  }
			}
		} catch (error) {
			setDBData([]);
			setError(true)
		
		}
  	}

  	const setTableOpportunities = async (e) => {
  		e.preventDefault();
		setDataType("job");

  		try {
			const response = await api.get("/jobs/all");

			if(response.data.success) {
			  if(response.data.jobs) {
			    setDBData(response.data.jobs);
				setError(false)
			  }
			}
		} catch (error) {
			setDBData([]);
			setError(true)

		
		}
  	}

  	const setTableNotices = async (e) => {
  		if(e) {
  			e.preventDefault();
  		}
  		
		setDataType("notice");

  		try {
			const response = await api.get("/notice/list");

			if(response.data.success) {
			  if(response.data.notices) {
			    setDBData(response.data.notices);
				setError(false);
			}
			}
		} catch (error) {
			setDBData([]);
			setError(true);
		}
  	}

  	const setTableDirectories = async (e) => {
  		e.preventDefault();
		setDataType("directory");

  		try {
			const response = await api.get("/directory/list");

			if(response.data.success) {
			  	if(response.data.directories) {
			    	setDBData(response.data.directories);
					setError(false);
				}
			}
		} catch (error) {
			setDBData([]);
			setError(true);
		}
  	}

  	const setTableEvent = async (e) => {
  		e.preventDefault();
		setDataType("event");

  		try {
			const response = await api.get("/event/list");

			if(response.data.success) {
			  	if(response.data.events) {
			    	setDBData(response.data.events);
					setError(false);
				}
			}
		} catch (error) {
			setDBData([]);
			setError(true);
		}
  	}

  	const setTableCourse = async (e) => {
  		e.preventDefault();
		setDataType("course");

  		try {
			const response = await api.get("/course/list");

			if(response.data.success) {
			  	if(response.data.courses) {
			    	setDBData(response.data.courses);
					setError(false);
				}
			}
		} catch (error) {
			setDBData([]);
			setError(true);
		}
  	}

  	const setTableJobType = async (e) => {
  		e.preventDefault();
		setDataType("jobtype");

  		try {
			const response = await api.get("/jobtype/list");

			if(response.data.success) {
			  	if(response.data.jobTypes) {
			    	setDBData(response.data.jobTypes);
					setError(false);
				}
			}
		} catch (error) {
			setDBData([]);
			setError(true);
		}
  	}

  	const setTableFeatureds = async (e) => {
  		e.preventDefault();
		setDataType("featured");

  		try {
			const response = await api.get("/featured/list");

			if(response.data.success) {
			  	if(response.data.featureds) {
			    	setDBData(response.data.featureds);
					setError(false);
				}
			}
		} catch (error) {
			setDBData([]);
			setError(true);
		}
  	}

  return (
    <Page>
    <Header/>
	<ScreenView width={"100%"}>

	{/* Content of page (TABLE below) */}

	<Sidebar 
	view={closeMenu?"none":null}
	viewClick={()=>setCloseMenu(!closeMenu)}
	noticia={setTableNotices} 
	diretorio={setTableDirectories} 
	evento={setTableEvent}
	curso={setTableCourse}
	oportunidade={setTableOpportunities}
	usuario={setTableUsers} 
	tag={setTableTags}
	jobType={setTableJobType}
	featureds={setTableFeatureds}
	/>
		<Content view={closeMenu}>
			<label>Dashboard</label>
			{dataType &&
			<div>
				<Link to={"/"+dataType+"/cadastrar"}>
				<DashButton>Regístrate Nuevo</DashButton>
				</Link>
			</div>
				
			}
			<HorizonScrollView >
			{error && !dbData.length ||error ? <h3>No hay contenido disponible!</h3>: createTable(dbData)}
			</HorizonScrollView>
		</Content>
	</ScreenView>
	<Footer/>
  </Page>)
}

export default Dashboard;