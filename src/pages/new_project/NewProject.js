import React, { useState } from "react";
import "./NewProject.css";

import { projectList } from "../../data/ProjectList";
import { Link } from "react-router-dom";

function NewProject() {
  const [title, setTitle] = useState("");

  const addNewProject = () => {
    const projectModel = {
      title: "",
      starred: false,
      others: [],
    };

    projectList.push(projectModel);
    console.log(projectList);
  };

  return (
    <div>
      <input
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      ></input>
      <Link to={"/"}>
        <button onClick={addNewProject()}>Create</button>
      </Link>
    </div>
  );
}

export default NewProject;
