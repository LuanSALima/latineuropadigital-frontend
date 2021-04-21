import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Page, ScreenView } from "../../styles/default";

import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import api from "../../services/api";
import Sidebar from "./sidebar";
import { Content, DashButton } from "./styles";
import HorizonScrollView from "../../components/HorizonScrollView";
function Dashboard() {
  const [dbData, setDBData] = useState([]);
  const [dataType, setDataType] = useState("");
  const [columns, setColumns] = useState([]);
  const [columnsIsReady, setColumnsIsReady] = useState(false);
  const [error, setError] = useState(false);
  const [closeMenu, setCloseMenu] = useState(false);
  const [ignoreColumns] = useState([
    "__v",
    "_id",
    "createdAt",
    "updatedAt",
    "owner",
    "imagePath",
    "subtitle",
    "content",
    "link",
    "businessAddress",
    "businessPostalCode",
    "businessCity",
    "businessPhone",
    "businessWebsite",
    "businessDescription",
  	"contactPhone",
  	"contactEmail",
  	"contactRole",
  	"businessSecondPhone",
  	'eventOrganizedBy',
  	"eventAddress",
  	"eventDate",
  	"eventTime",
  	"eventTicketPrice",
  	"eventMoreInfo",
  	"eventDescription",
  	"contactPhone",
  	"contactEmail",
  	"contactRole",
  	'description',
  ]);

  useEffect(() => {
    setTableNotices();
  }, []);

  useEffect(() => {

    function mapDinamicColumns() {
      let individualColumn = [];

      Object.keys(dbData).forEach((key) => {
        Object.keys(dbData[key]).forEach((chave) => {
          if (
            individualColumn.indexOf(chave) === -1 &&
            ignoreColumns.indexOf(chave) === -1
          ) {
            individualColumn.push(chave);
          }
        });
      });

      if (dbData.length) {
        individualColumn.push("Editar");
        individualColumn.push("Eliminar");
      }

      setColumns(individualColumn);
    }

    mapDinamicColumns();
    setColumnsIsReady(true); //Set State to true to createTableRow start creating the Rows with the updated columns
  }, [dbData, ignoreColumns]);

  const createTableHead = () => {
    return columns.map((column, index) => {
      return <th style={{ textTransform: "uppercase" }} key={index}>{column}</th>;
    });
  };

  const createTableRow = (row) => {

    //Check if the columns is already updated to actual data, because when change the dbData this keeps trying to create the Rows with the columns of the previous dbData
    if(columnsIsReady) {
      let rowData = [];

      let lastIndex = 0;

      for(const column of columns) {
        
        let pushed = false;

        if(column === 'Editar' || column === 'Eliminar') {
          break;
        }

        const items = Object.keys(row);

        for(let index = lastIndex; index < items.length ; index++) {
          const item = items[index];
          
          if (column === item) {
            if (row[item] !== null) {
              if (typeof row[item] === "object") {
                try {
                  if (row[item].title) {
                    rowData.push(row[item].title);
                  } else if (row[item].businessName) {
                    rowData.push(row[item].businessName);
                  } else if (row[item].eventName) {
                    rowData.push(row[item].eventName);
                  } else if (row[item].length === 0) {
                    rowData.push("No hay " + item);
                  } else {
                    rowData.push(row[item].join("/"));
                  }
                } catch (err) {
                  rowData.push(err.message);
                }
              } else {
                rowData.push(row[item].toString().substr(0, 20));
              }
            } else {
              rowData.push(item + " eliminado");
            }

            pushed = true;
            lastIndex = index+1;

            //Pois no lugar que está apontando esta coluna ja foi encontrado o valor desta linha com mesmo key que o nome da coluna
            break;
          } else {
            continue;
          }
        }

        if (!pushed) {
          rowData.push("");
        }
      }

      if (dbData.length) {
        rowData.push(row._id);
        rowData.push(row._id);
      }

      return rowData.map((data, index) => {
        //Se o index for igual a 0, Ou seja a primeira coluna da tabela, no qual ja colocamos no cabecalho como Editar
        if (index === columns.length - 2) {
          return (
            <td key={index}>
              <Link to={dataType + "/editar/" + data} style={{ color: "green" }}>
                Editar
              </Link>
            </td>
          );
        }

        //Se o index for igual a 1, Ou seja a segunda coluna da tabela, no qual ja colocamos no cabecalho como Remover
        if (index === columns.length - 1) {
          const removeItem = async (e) => {
            e.preventDefault();

            try {
              const response = await api.delete(dataType + "/" + data);

              if (response.data.success) {
                let array = dbData;

                if (dataType === "featured") {
                  setTableFeatureds();
                } else {
                  for(let contentIndex=0 ; contentIndex < array.length ; contentIndex++) {
                    if (array[contentIndex]._id === data) {
                      array.splice(contentIndex, 1);

                      setDBData([]); //Utilizo isto para limpar o state e depois popular o state com a array atualizada
                      setDBData(array);
                      break;
                    }
                  }
                }
              }
            } catch (error) {}
          };

          return (
            <td key={index}>
              <button onClick={removeItem} style={{ color: "red" }}>
                Eliminar
              </button>
            </td>
          );
        }

        return <td key={index}>{data.length > 12 ? data.substr(0, 12) + "..." : data}</td>;
      });

    }
  };

  const createTable = (data) => {
    return (
      <Table striped bordered hover className="tabela">
        <thead>
          <tr>{createTableHead(data)}</tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            return <tr key={index}>{createTableRow(row)}</tr>;
          })}
        </tbody>
      </Table>
    );
  };

  const setTableUsers = async (e) => {
    e.preventDefault();
    setDataType("user");
    setColumnsIsReady(false); //Set State to false to stop the createTableRow from trying to create the rows with the columns of the previous dbData

    try {
      const response = await api.get("/user/list");

      if (response.data.success) {
        if (response.data.users) {
          setDBData(response.data.users);
          setError(false);
        }
      }
    } catch (error) {
      setDBData([]);
      setError(true);
    }
  };

  const setTableTags = async (e) => {
    e.preventDefault();
    setDataType("tag");
    setColumnsIsReady(false); //Set State to false to stop the createTableRow from trying to create the rows with the columns of the previous dbData

    try {
      const response = await api.get("/tag/list");

      if (response.data.success) {
        if (response.data.tags) {
          setDBData(response.data.tags);
          setError(false);
        }
      }
    } catch (error) {
      setDBData([]);
      setError(true);
    }
  };

  const setTableOpportunities = async (e) => {
    e.preventDefault();
    setDataType("job");
    setColumnsIsReady(false); //Set State to false to stop the createTableRow from trying to create the rows with the columns of the previous dbData

    try {
      const response = await api.get("/jobs/all");

      if (response.data.success) {
        if (response.data.jobs) {
          setDBData(response.data.jobs);
          setError(false); 
        }
      }
    } catch (error) {
      setDBData([]);
      setError(true);
    }
  };

  const setTableNotices = async (e) => {
    if (e) {
      e.preventDefault();
    }

    setDataType("notice");
    setColumnsIsReady(false); //Set State to false to stop the createTableRow from trying to create the rows with the columns of the previous dbData

    try {
      const response = await api.get("/notice/list");

      if (response.data.success) {
        if (response.data.notices) {
          setDBData(response.data.notices);
          setError(false);
        }
      }
    } catch (error) {
      setDBData([]);
      setError(true);
    }
  };

  const setTableDirectories = async (e) => {
    e.preventDefault();
    setDataType("directory");
    setColumnsIsReady(false); //Set State to false to stop the createTableRow from trying to create the rows with the columns of the previous dbData

    try {
      const response = await api.get("/directories/all");

      if (response.data.success) {
        if (response.data.directories) {
          setDBData(response.data.directories);
          setError(false);
        }
      }
    } catch (error) {
      setDBData([]);
      setError(true);
    }
  };

  const setTableEvent = async (e) => {
    e.preventDefault();
    setDataType("event");
    setColumnsIsReady(false); //Set State to false to stop the createTableRow from trying to create the rows with the columns of the previous dbData

    try {
      const response = await api.get("/events/all");

      if (response.data.success) {
        if (response.data.events) {
          setDBData(response.data.events);
          setError(false);
        }
      }
    } catch (error) {
      setDBData([]);
      setError(true);
    }
  };

  const setTableCourse = async (e) => {
    e.preventDefault();
    setDataType("course");
    setColumnsIsReady(false); //Set State to false to stop the createTableRow from trying to create the rows with the columns of the previous dbData

    try {
      const response = await api.get("/course/list");

      if (response.data.success) {
        if (response.data.courses) {
          setDBData(response.data.courses);
          setError(false);
        }
      }
    } catch (error) {
      setDBData([]);
      setError(true);
    }
  };

  const setTableJobType = async (e) => {
    e.preventDefault();
    setDataType("jobtype");
    setColumnsIsReady(false); //Set State to false to stop the createTableRow from trying to create the rows with the columns of the previous dbData

    try {
      const response = await api.get("/jobtype/list");

      if (response.data.success) {
        if (response.data.jobTypes) {
          setDBData(response.data.jobTypes);
          setError(false);
        }
      }
    } catch (error) {
      setDBData([]);
      setError(true);
    }
  };

  const setTableFeatureds = async (e) => {
    if (e) {
      e.preventDefault();
    }

    setDataType("featured");
    setColumnsIsReady(false); //Set State to false to stop the createTableRow from trying to create the rows with the columns of the previous dbData

    try {
      const response = await api.get("/featureds/all");

      if (response.data.success) {
        if (response.data.featureds) {
          setDBData(response.data.featureds);
          setError(false);
        }
      }
    } catch (error) {
      setDBData([]);
      setError(true);
    }
  };

  return (
    <Page>
      <Header />
      <ScreenView width={"100%"}>
        {/* Content of page (TABLE below) */}

        <Sidebar
          view={closeMenu ? "none" : null}
          viewClick={() => setCloseMenu(!closeMenu)}
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
          {dataType && (
            <div>
              <Link
                to={
                  dataType === "event"
                    ? "/evento/anunciar"
                    : dataType === "directory"
                    ? "/diretorio/anunciar"
                    : "/" + dataType + "/cadastrar"
                }
              >
                <DashButton>Regístrate Nuevo</DashButton>
              </Link>
              {dataType === "featured" ? (
                <Link to={"/featured/alterar-posicao"}>
                  <DashButton>Alterar Posições</DashButton>
                </Link>
              ) : (
                <></>
              )}
            </div>
          )}
          {dataType === "featured" ? (
            <span>Las publicaciones pendientes no se mostrarán en los listados. Edite la publicación para su aceptación para que aparezca en los listados</span>
          ) : (
            <></>
          )}
          <HorizonScrollView>
            {(error && !dbData.length) || error ? (
              <h3>No hay contenido disponible!</h3>
            ) : (
              createTable(dbData)
            )}
          </HorizonScrollView>
        </Content>
      </ScreenView>
      <Footer />
    </Page>
  );
}

export default Dashboard;
