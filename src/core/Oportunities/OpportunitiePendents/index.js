import React, { useState, useEffect } from "react";

import Header from "../../../components/Header";
import { MyCardLink, Page } from "../../../styles/default";

import api from "../../../services/api";
import Footer from "../../../components/Footer";
import { MyScreenView } from "../OpportunitieList/styles";
import { Link } from "react-router-dom";
import NoticesCard from "../../../components/NoticesCard";

import Pagination from "../../../components/Pagination";

function Job(props) {
  const description =
    "Professional Name: " +
    props.job.professionalName +"\n"+
    "Descrição : " +
    props.job.description +"\n"+
    "Contato : " +
    props.job.professionalContact;

  return (
    <MyCardLink notAll>
      <Link to={"oportunidade/"+props.job._id}>
        <NoticesCard 
          tag={props.job.jobTypes}
          date={props.job.createdAt} 
          title={props.job.title} 
          text={description} 
        />
      </Link>
    </MyCardLink>
  );
}

function OpportunitiePendents(props) {
  const [jobs, setJobs] = useState([]);
  const [errors, setErrors] = useState({});

  const [actualPage, setActualPage] = useState(1);
  const [qntResults] = useState(10);
  const [totalJobs, setTotalJobs] = useState(0);

  useEffect(() => {

    async function listJobs() {
      try {
        const response = await api.get("/jobs/pendent?page=" + actualPage + "&results=" + qntResults);

        if (response.data.success) {
          if (response.data.jobs) {
            setJobs(response.data.jobs);
          }
          if (response.data.totalJobs) {
            setTotalJobs(response.data.totalJobs);
          }
        }
      } catch (error) {
        setErrors({ message: "No puede cargar as Oportunidades" });
        if (error.message) {
          setErrors({ message: error.message });
        }
      }
    }

    listJobs();
  }, [actualPage, qntResults]);

  return (
    <Page>
      <Header />
      <MyScreenView>
        <h1>Oportunidades Pendientes</h1>
        <h2 style={{ color: "red" }}>{errors.message}</h2>
        {jobs.map((currentjob, index) => (
          <Job job={currentjob} key={index}/>
        ))}

        <Pagination
          totalResults={totalJobs}
          resultsPerPage={qntResults}
          actualPage={actualPage}
          changePage={setActualPage}
        />
      </MyScreenView>
      
      <Footer />
    </Page>
  );
}

export default OpportunitiePendents;
