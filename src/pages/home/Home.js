import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

import ProjectItemCard from "./components/ProjectItemCard";
import AddNewProjectFields from "./components/AddNewProjectFields";
import NewProjectButton from "./components/NewProjectButton";

import { saveData, loadData, clearAll } from "../../utils/SaveLoad";

//Todo: reset input field after creating a project

function Home() {
  const [projectList, setProjectList] = useState([]);
  const [isViewAddProjectField, setIsViewAddProjectField] = useState(false);

  useEffect(() => {
    setProjectList(projectList);
  }, [projectList]);

  useEffect(() => {
    var loadedProjectList = loadData("projectList");
    if (loadedProjectList) {
      setProjectList(loadedProjectList);
    }
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
            return <ProjectItemCard model={model} id={id}></ProjectItemCard>;
          }
        })}
      </div>

      <div className="project-item-card-grid-container">
        {projectList.map((model, id) => {
          return <ProjectItemCard model={model} id={id}></ProjectItemCard>;
        })}
      </div>
    </div>
  );
}

export default Home;
