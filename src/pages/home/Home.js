import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

import ProjectItemCard from "../../components/ProjectItemCard";

import { saveData, loadData, clearAll } from "../../utils/SaveLoad";

function Home() {
  const [projectList, setProjectList] = useState([]);
  const [title, setTitle] = useState("");
  const [test, setTest] = useState(["hello", "getto", "gta"]);

  const addNewProject = () => {
    const projectModel = {
      title: title,
      starred: false,
      todoList: [],
    };

    projectList.push(projectModel);
    setProjectList(projectList);

    saveData("projectList", projectList);
    setTitle("");
    // console.log(projectList);
  };

  useEffect(() => {
    var loadedProjectList = loadData("projectList");
    if (loadedProjectList) {
      setProjectList(loadedProjectList);
    }
  }, []);

  return (
    <div className="home-container">
      <div>
        {/* <Link to={"/new-project"}>
          <span>New Project +</span>
        </Link> */}

        <input onChange={(e) => setTitle(e.target.value)}></input>
        <button onClick={() => addNewProject()}>Create New Project+</button>
        <button onClick={() => clearAll()}>Delete All</button>
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
