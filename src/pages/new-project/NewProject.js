import React, { useState, useEffect } from "react";
import "./NewProject.css";

import { Link } from "react-router-dom";
import { loadData, saveData } from "../../utils/Common";

function NewProject() {
  const [projectList, setProjectList] = useState([]);
  const [title, setTitle] = useState("");
  const [starred, setStarred] = useState(false);

  const addNewProject = () => {
    const projectModel = {
      title: title,
      starred: starred,
      todoList: [],
    };

    projectList.push(projectModel);
    setProjectList(projectList);
    saveData("projectList", projectList);
    setTitle("");
  };

  useEffect(() => {
    var loadedProjectList = loadData("projectList");
    if (loadedProjectList) {
      setProjectList(loadedProjectList);
    }
  }, []);

  return (
    <div className="new-project-container">
      <h3>Add new project</h3>
      <input
        className="input-field"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      ></input>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <label for="starred">Add to starred</label>
        <input
          id="starred"
          className="checkbox"
          type="checkbox"
          onChange={() => setStarred(!starred)}
        ></input>
      </div>
      <Link to={"/"}>
        <button className="button blue-button" onClick={addNewProject}>
          Create
        </button>
      </Link>
    </div>
  );
}

export default NewProject;
