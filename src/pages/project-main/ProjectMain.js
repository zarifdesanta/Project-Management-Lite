import React, { useEffect, useState } from "react";
import "./ProjectMain.css";
import { Link, useParams } from "react-router-dom";

import {
  toggleView,
  saveData,
  loadData,
  deleteDocFromFirestore,
} from "../../utils/Common";
import { getDocFromFirestore, updateDocInFirestore } from "../../utils/Common";

import ProjectTaskCard from "./components/ProjectTaskCard";
import AddNewTaskFields from "./components/AddNewTaskFields";
import NewTaskButton from "./components/NewTaskButton";
import OptionsButton from "./components/OptionsButton";

//Done: fix default value
//Done: fix default value after adding
//Todo: update design
//Todo: title and starred method can be improved
//Done: make a better solution for input handling -> using one useState()

function ProjectMain(props) {
  const { id } = useParams();
  const [firestoreId, setFirestoreId] = useState();

  const [projectList, setProjectList] = useState([]);
  const [model, setModel] = useState();
  const [todoModel, setTodoModel] = useState(initTodoModel);
  const [todoList, setTodoList] = useState([]);

  const [projectTitle, setProjectTitle] = useState(model?.title);
  const [isStarred, setIsStarred] = useState(model?.starred);

  const [isViewInputField, setIsViewInputField] = useState(false);
  const [isViewOptionsField, setIsViewOptionsField] = useState(false);

  var initTodoModel = {
    issueId: "Id",
    taskName: "Title",
    details: "Details",
    priority: "Priority",
    progress: "Progress",
  };

  const handleSetTodoModel = (value, input) => {
    setTodoModel((prevModel) => ({ ...prevModel, [input]: value }));
  };

  const addNewTask = () => {
    if (todoModel == null) {
      alert("Please insert input");
      return;
    }

    todoList.push(todoModel);
    setTodoList(todoList);

    updateProjectList(todoList);
    setIsViewInputField(!isViewInputField);
    setTodoModel(initTodoModel);
  };

  const updateProjectList = (todoList) => {
    //setting up updated porject list

    model.todoList = todoList;
    setModel(model);
    projectList[id] = model;
    setProjectList(projectList);
    // saveData("projectList", projectList);
    updateDocInFirestore(firestoreId, model);
  };

  const handleSetProjectTitle = (e) => {
    var model = {
      title: e,
      starred: isStarred,
      todoList: todoList,
    };

    setProjectTitle(e);
    projectList[id] = model;
    setProjectList(projectList);
    // saveData("projectList", projectList);
    updateDocInFirestore(firestoreId, model);
  };

  const handleSetIsStarred = (isStarred) => {
    setIsStarred(isStarred);

    var model = {
      title: projectTitle,
      starred: isStarred,
      todoList: todoList,
    };

    projectList[id] = model;
    setProjectList(projectList);
    // saveData("projectList", projectList);
    updateDocInFirestore(firestoreId, model);
  };

  const deleteThisProject = () => {
    let copiedProjectList = [...projectList];
    copiedProjectList.splice(id, 1);
    setProjectList(copiedProjectList);
    // saveData("projectList", copiedProjectList);
    // updateDocInFirestore(firestoreId, model);
    deleteDocFromFirestore(firestoreId);
  };

  useEffect(() => {
    setTodoModel(initTodoModel);
    // console.log(model?.id);
    // var loadedProjectList = loadData("projectList");

    const getData = async () => {
      const data = await getDocFromFirestore();
      if (data) {
        setFirestoreId(data[id].id);
        setProjectList(data);
        setModel(data[id]);
        setProjectTitle(data[id].title);
        setIsStarred(data[id].starred);
        setTodoList(data[id].todoList);
      }
    };

    getData();

    // if (loadedProjectList) {
    //   setProjectList(loadedProjectList);
    //   setModel(loadedProjectList[id]);
    //   setProjectTitle(loadedProjectList[id].title);
    //   setIsStarred(loadedProjectList[id].starred);
    //   setTodoList(loadedProjectList[id].todoList);
    // }
  }, []);

  return (
    <>
      <div className="project-main-container">
        <div className="header">
          <input
            value={projectTitle}
            onChange={(e) => handleSetProjectTitle(e.target.value)}
          ></input>
          <button onClick={() => handleSetIsStarred(!isStarred)}>
            {isStarred ? "Starred" : "Not Starred"}
          </button>
        </div>
        <div className="sub-container">
          <div className="option-new-button-container">
            <OptionsButton
              isViewOptionsField={isViewOptionsField}
              setIsViewOptionsField={setIsViewOptionsField}
            ></OptionsButton>

            <NewTaskButton
              isViewInputField={isViewInputField}
              setIsViewInputField={setIsViewInputField}
            ></NewTaskButton>
          </div>

          <div className="options-item-container" id="options">
            <Link className="" style={{ width: "100%" }} to={"/"}>
              <button
                className="button red-button"
                onClick={() => deleteThisProject()}
              >
                Delete Project
              </button>
            </Link>
            <button
              className="button orange-button"
              onClick={() => handleSetIsStarred(!isStarred)}
            >
              {isStarred ? "Starred" : "Not Starred"}
            </button>
          </div>

          <AddNewTaskFields
            handleSetTodoModel={handleSetTodoModel}
            addNewTask={addNewTask}
          ></AddNewTaskFields>

          <div className="">
            <div className="task-item-fields-container">
              <p>Id</p>
              <p>Title</p>
              <p>Details</p>
              <p>Priority</p>
              <p>Progress</p>
            </div>
            <div className="task-item-container">
              {todoList.reverse().map((todoModel, id) => {
                return (
                  <ProjectTaskCard
                    todoModel={todoModel}
                    id={id}
                    todoList={todoList}
                    setTodoList={setTodoList}
                    updateProjectList={updateProjectList}
                  ></ProjectTaskCard>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectMain;
