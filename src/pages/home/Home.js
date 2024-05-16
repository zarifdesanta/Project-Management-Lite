import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

import ProjectItemCard from "../../components/ProjectItemCard";

import { saveData, loadData, clearAll } from "../../utils/SaveLoad";

function Home() {
  const [projectList, setProjectList] = useState([]);

  useEffect(() => {
    var loadedProjectList = loadData("projectList");
    if (loadedProjectList) {
      setProjectList(loadedProjectList);
    }
  }, []);

  return (
    <div className="home-container">
      <div className="left-items">
        <Link to={"/new-project"}>
          <button className="button blue-button">New Project +</button>
        </Link>

        <div className="second-row">
          <button className="button">Settings</button>
          <button className="button orange-button">Starred</button>
        </div>
        <button className="button red-button" onClick={() => clearAll()}>
          Delete All
        </button>
      </div>

      <div className="project-item-card-grid-container">
        {projectList.reverse().map((model, id) => {
          return <ProjectItemCard model={model} id={id}></ProjectItemCard>;
        })}
      </div>
    </div>
  );
}

export default Home;
