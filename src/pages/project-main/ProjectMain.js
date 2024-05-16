import React, { useEffect, useState } from "react";
import "./ProjectMain.css";
import { useParams } from "react-router-dom";

import { saveData, loadData } from "../../utils/SaveLoad";

import ProjectTaskCard from "../../components/ProjectTaskCard";
import AddTaskModal from "../../components/modals/AddTaskModal";

//Todo: fix default value
//Todo: fix default value after adding

function ProjectMain() {
  const [projectList, setProjectList] = useState([]);
  const [model, setModel] = useState();
  const [todoList, setTodoList] = useState([]);
  const { id } = useParams();

  const [taskName, setTaskName] = useState("Title");
  const [details, setDetails] = useState("Details");
  const [priority, setPriority] = useState("High");
  const [progress, setProgress] = useState("To do");
  const [issueId, setIssueId] = useState();
  const [task, setTask] = useState();

  const addNewTask = () => {
    var todoModel = {
      taskName: taskName,
      details: details,
      priority: priority,
      progress: progress,
      issueId: issueId,
    };

    todoList.push(todoModel);
    setTodoList(todoList);

    updateProjectList(todoList);

    setTaskName("Title");
    setDetails("Details");
    setPriority("High");
    setProgress("To do");
    setIssueId();

    setIsViewInputField(!isViewInputField);
  };

  // const handleSetTask = (value, id) => {
  //   if (id == 1) {
  //     todoModel.taskName = value;
  //   } else if (id == 2) {
  //     todoModel.details = value;
  //   } else if (id == 3) {
  //     todoModel.priority = value;
  //   } else if (id == 4) {
  //     todoModel.progress = value;
  //   }

  //   setTask(value);
  // };

  const updateProjectList = (todoList) => {
    //setting up updated porject list

    model.todoList = todoList;
    setModel(model);
    projectList[id] = model;
    setProjectList(projectList);
    saveData("projectList", projectList);
  };

  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(!modal);
  };

  const [isViewInputField, setIsViewInputField] = useState(false);

  const toggleFields = () => {
    if (isViewInputField) {
      document.getElementById("fields").style.display = "grid";
      document.getElementById("fields").style.animation =
        "animate-field-open 0.4s forwards";
    } else {
      document.getElementById("fields").style.animation =
        "animate-field-close 0.4s forwards";
    }
  };

  useEffect(() => {
    toggleFields();
  }, [isViewInputField]);

  useEffect(() => {
    var loadedProjectList = loadData("projectList");
    if (loadedProjectList) {
      setProjectList(loadedProjectList);
      setModel(loadedProjectList[id]);
      setTodoList(loadedProjectList[id].todoList);
    }
    console.log(todoList);
  }, []);

  return (
    <>
      <div className="project-main-container">
        <h3>{model?.title}</h3>
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
                onChange={(e) => setIssueId(e.target.value)}
              ></input>
              <input
                placeholder="Title"
                onChange={(e) => setTaskName(e.target.value)}
              ></input>
              <input
                placeholder="Details"
                onChange={(e) => setDetails(e.target.value)}
              ></input>
              <select onChange={(e) => setPriority(e.target.value)}>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>

              <select onChange={(e) => setProgress(e.target.value)}>
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
          {/* <button
            style={{ alignSelf: "end", width: "150px" }}
            onClick={() => openModal()}
          >
            openModal
          </button> */}

          <div className="task-item-container">
            <div className="task-item-fields-container">
              <p>Id</p>
              <p>Title</p>
              <p>Details</p>
              <p>Priority</p>
              <p>Progress</p>
            </div>
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
    </>
  );
}

export default ProjectMain;
