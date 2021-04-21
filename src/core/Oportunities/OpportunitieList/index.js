import React, { useState, useEffect } from "react";

import Header from "../../../components/Header";
import { MyCardLink, Page, MyCardMap, MySideCardLink } from "../../../styles/default";

import api from "../../../services/api";
import Footer from "../../../components/Footer";
import { MyCheckBoxList, MyScreenView } from "./styles";
import { Link } from "react-router-dom";
import NoticesCard from "../../../components/NoticesCard";

import Pagination from "../../../components/Pagination";

function Job(props) {
  const description =
    "Professional Name: " + props.job.professionalName +
    "\nDescrição : " + props.job.description +
    "\nContato : " + props.job.professionalContact;

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

function OpportunitieList(props) {
  const [jobs, setJobs] = useState([]);
  const [errors, setErrors] = useState({});

  const [jobTypes, setJobTypes] = useState([]);
  const [jobTypesSearched, setJobTypesSearched] = useState([]);

  const [actualPage, setActualPage] = useState(1);
  const [qntResults] = useState(10);
  const [totalJobs, setTotalJobs] = useState(0);

  async function listJobTypes() {
    try {
      const response = await api.get("/jobs/types");

      if(response.data.success) {
        if(response.data.jobTypes) {
          setJobTypes(response.data.jobTypes);
        }
      }
    } catch (error) {
     
    }
  }

  useEffect(() => {

    async function listJobs() {
      setErrors({ jobs: "" });
      try {
        let query = "/job/list?page=" + actualPage + "&results=" + qntResults;

        if(jobTypesSearched.length > 0) {

          const jobTypes = [];

          for(const jobType of jobTypesSearched) {
            jobTypes.push(encodeURIComponent(jobType));
          }

          query += '&types='+jobTypes.join(',');
        }

        const response = await api.get(query);

        if (response.data.success) {
          if (response.data.jobs) {
            setJobs(response.data.jobs);
          }
          if (response.data.totalJobs) {
            setTotalJobs(response.data.totalJobs);
          }
        }
      } catch (error) {
        setJobs([]);
        setErrors({ jobs: "No puede cargar as Oportunidades" });
        if (error.message) {
          setErrors({ jobs: error.message });
        }
      }
    }

    listJobs();
  }, [actualPage, qntResults, jobTypesSearched]);

  useEffect(() => {
    listJobTypes();
  }, []);

  return (
    <Page>
      <Header />
      <MyScreenView>

        <div style={{ display: "block" }}>
          <MyCardMap>
            <h2 style={{ margin: "0 auto", width: "100%" }}>Oportunidades</h2>

            <h2 style={{ margin: "0 auto", width: "100%", color: 'red' }}>{errors.jobs}</h2>
           
            {jobs.map((currentjob, index) => (
               <MyCardLink key={index} >
              <Job job={currentjob}/>
              </MyCardLink>

            ))}
          </MyCardMap>
          
          <MySideCardLink style={{marginTop:"6.7rem"}}>
          {jobTypes.map((type, index) => {
            return (
               <MyCheckBoxList key={index}>
                <input
                  type='checkbox'
                  id={index}
                  name={index}
                  onChange={(e) => {
                    const index = jobTypesSearched.indexOf(type);
                    if(index === -1) {
                      setJobTypesSearched([...jobTypesSearched, type]);
                    } else {
                      const array = [...jobTypesSearched];
                      array.splice(index, 1);
                      setJobTypesSearched(array);
                    }
                  }}
                />
                <label htmlFor={index}>{type}</label>
               </MyCheckBoxList>

            )
          })}
          </MySideCardLink>

        </div>

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

export default OpportunitieList;
