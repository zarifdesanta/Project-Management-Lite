import React, { useEffect, useState } from "react";
import "../../../styles/components/AddNewProjectFields.css";

import { Link } from "react-router-dom";
import { loadData, saveData, addDocInFirestore } from "../../../utils/Common";
import { auth } from "../../../utils/Firebase";

function AddNewProjectFields(props) {
  const { setIsViewAddProjectField, projectList, setProjectList } = props;

  //   const [projectList, setProjectList] = useState([]);
  const [title, setTitle] = useState("");
  const [starred, setStarred] = useState(false);

  const addNewProject = () => {
    const projectModel = {
      userId: auth?.currentUser?.uid,
      title: title,
      starred: starred,
      todoList: [],
    };

    projectList.push(projectModel);
    setProjectList(projectList);
    // saveData("projectList", projectList);
    addDocInFirestore(projectModel);
    setTitle("");
    setStarred(false);

    setIsViewAddProjectField(false);
  };

  useEffect(() => {
    var loadedProjectList = loadData("projectList");
    if (loadedProjectList) {
      setProjectList(loadedProjectList);
    }
  }, []);

  return (
    <div className="add-new-project-fields-container" id="addNewProjectField">
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

export default AddNewProjectFields;
