import React, { useEffect, useState } from "react";
import "./ProjectMain.css";
import { useParams } from "react-router-dom";

import { saveData, loadData } from "../../utils/SaveLoad";

import ProjectTaskCard from "../../components/ProjectTaskCard";
import AddTaskModal from "../../components/modals/AddTaskModal";

//Todo: fix default value
//Todo: fix default value after adding
//Todo: update design
//Done: make a better solution for input handling -> using one useState()

function ProjectMain() {
  const [projectList, setProjectList] = useState([]);
  const [model, setModel] = useState();
  const [todoModel, setTodoModel] = useState(initTodoModel);
  const [todoList, setTodoList] = useState([]);
  const { id } = useParams();

  const [projectTitle, setProjectTitle] = useState(model?.title);
  const [isStarred, setIsStarred] = useState(model?.starred);

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

  const handleSetProjectTitle = (e) => {
    var model = {
      title: e,
      starred: isStarred,
      todoList: todoList,
    };

    setProjectTitle(e);
    projectList[id] = model;
    setProjectList(projectList);
    saveData("projectList", projectList);
  };

  const updateProjectList = (todoList) => {
    //setting up updated porject list

    model.todoList = todoList;
    setModel(model);
    projectList[id] = model;
    setProjectList(projectList);
    saveData("projectList", projectList);
  };

  const [isViewInputField, setIsViewInputField] = useState(false);

  const toggleFields = () => {
    if (isViewInputField) {
      document.getElementById("fields").style.display = "grid";
      document.getElementById("fields").style.animation =
        "animate-field-open 0.4s forwards";
    } else {
      document.getElementById("fields").style.animation =
        "animate-field-close 0.25s forwards";
    }
  };

  useEffect(() => {
    toggleFields();
  }, [isViewInputField]);

  useEffect(() => {
    setTodoModel(initTodoModel);

    var loadedProjectList = loadData("projectList");
    if (loadedProjectList) {
      setProjectList(loadedProjectList);
      setModel(loadedProjectList[id]);
      setProjectTitle(loadedProjectList[id].title);
      setIsStarred(loadedProjectList[id].starred);
      setTodoList(loadedProjectList[id].todoList);
    }
  }, []);

  return (
    <>
      <div className="project-main-container">
        <div className="header">
          <input
            value={projectTitle}
            onChange={(e) => handleSetProjectTitle(e.target.value)}
          ></input>
          <button>{isStarred ? "Starred" : "Not Starred"}</button>
        </div>
        <div className="sub-container">
          <button
            className={
              isViewInputField
                ? "button orange-button show-fields-button"
                : "button blue-button show-fields-button"
            }
            onClick={() => setIsViewInputField(!isViewInputField)}
          >
            {isViewInputField ? "Hide -" : "New +"}
          </button>
          <div className="add-task-items">
            <div className="fields" id="fields">
              <input
                placeholder="Id"
                onChange={(e) => handleSetTodoModel(e.target.value, "issueId")}
              ></input>
              <input
                placeholder="Title"
                onChange={(e) => handleSetTodoModel(e.target.value, "taskName")}
              ></input>
              <input
                placeholder="Details"
                onChange={(e) => handleSetTodoModel(e.target.value, "details")}
              ></input>
              <select
                onChange={(e) => handleSetTodoModel(e.target.value, "priority")}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>

              <select
                onChange={(e) => handleSetTodoModel(e.target.value, "progress")}
              >
                <option>To do</option>
                <option>In progress</option>
                <option>Done</option>
              </select>
              <button
                className="button blue-button"
                onClick={() => addNewTask()}
              >
                Add+
              </button>
            </div>
          </div>

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
