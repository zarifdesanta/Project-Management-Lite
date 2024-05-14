import React, { useEffect, useState } from "react";
import "./ProjectMain.css";
import { useParams } from "react-router-dom";

import { saveData, loadData } from "../../utils/SaveLoad";

import ProjectTodoItemCard from "../../components/ProjectTodoItemCard";
import ProjectTaskCard from "../../components/ProjectTaskCard";

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

  const addNewTask = () => {
    var todoModel = {
      taskName: taskName,
      details: details,
      priority: priority,
      progress: progress,
    };

    todoList.push(todoModel);
    setTodoList(todoList);

    updateProjectList(todoList);

    setTaskName("Title");
    setDetails("Details");
    setPriority("High");
    setProgress("To do");
  };

  const updateProjectList = (todoList) => {
    //setting up updated porject list

    model.todoList = todoList;
    setModel(model);
    projectList[id] = model;
    setProjectList(projectList);
    saveData("projectList", projectList);
  };

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
    <div className="project-main-container">
      <h3>{model?.title}</h3>
      <div>
        <input onChange={(e) => setTaskName(e.target.value)}></input>
        <input onChange={(e) => setDetails(e.target.value)}></input>
        <select onChange={(e) => setPriority(e.target.value)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        {/* <input onChange={(e) => setPriority(e.target.value)}></input> */}
        <select onChange={(e) => setProgress(e.target.value)}>
          <option>To do</option>
          <option>In progress</option>
          <option>Done</option>
        </select>
        {/* <input onChange={(e) => setProgress(e.target.value)}></input> */}
        <button onClick={() => addNewTask()}>Add+</button>
      </div>
      <div className="project-main-todo-item-container">
        {todoList.map((todoModel, id) => {
          return (
            <ProjectTodoItemCard
              todoModel={todoModel}
              id={id}
              todoList={todoList}
              setTodoList={setTodoList}
              updateProjectList={updateProjectList}
            ></ProjectTodoItemCard>
          );
        })}
      </div>
    </div>
  );
}

export default ProjectMain;
