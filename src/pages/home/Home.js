import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

import ProjectItemCard from "./components/ProjectItemCard";
import AddNewProjectFields from "./components/AddNewProjectFields";
import NewProjectButton from "./components/NewProjectButton";

import { loadData, clearAll } from "../../utils/Common";
import { getDocFromFirestore } from "../../utils/Common";

//Todo: reset input field after creating a project

function Home() {
  const [projectList, setProjectList] = useState([]);
  const [isViewAddProjectField, setIsViewAddProjectField] = useState(false);

  useEffect(() => {
    setProjectList(projectList);
  }, [projectList]);

  useEffect(() => {
    // var loadedProjectList = loadData("projectList");
    const getData = async () => {
      const data = await getDocFromFirestore();
      if (data) {
        setProjectList(data);
      }
    };

    getData();
  }, []);

  return (
    <div className="home-container">
      <div className="left-items">
        {/* <Link to={"/new-project"}>
          <button className="button blue-button">New Project +</button>
        </Link> */}

        <NewProjectButton
          isViewAddProjectField={isViewAddProjectField}
          setIsViewAddProjectField={setIsViewAddProjectField}
        ></NewProjectButton>
        <AddNewProjectFields
          setIsViewAddProjectField={setIsViewAddProjectField}
          projectList={projectList}
          setProjectList={setProjectList}
        ></AddNewProjectFields>

        <div className="second-row">
          <button className="button">Settings</button>
          <button className="button orange-button">Starred</button>
        </div>
        <button className="button red-button" onClick={() => clearAll()}>
          Delete All
        </button>

        <p>Starred</p>
        {projectList.map((model, id) => {
          if (model.starred) {
            return (
              <ProjectItemCard
                model={model}
                id={id}
                firestoreId={model.id}
              ></ProjectItemCard>
            );
          }
        })}
      </div>

      <div className="project-item-card-grid-container">
        <p className="title">All Projects</p>
        {projectList.map((model, id) => {
          return (
            <ProjectItemCard
              model={model}
              id={id}
              firestoreId={model.id}
            ></ProjectItemCard>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
