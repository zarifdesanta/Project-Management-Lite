import React, { useEffect, useState } from "react";
import "../styles/components/ProjectTodoItemCard.css";

import { saveData } from "../utils/SaveLoad";

function ProjectTodoItemCard(props) {
  const { todoModel, id, updateProjectList, todoList, setTodoList } = props;

  const [progress, setProgress] = useState(todoModel?.progress);
  const [priority, setPriority] = useState(todoModel?.priority);
  const [details, setDetails] = useState(todoModel?.details);
  const [taskName, setTaskName] = useState(todoModel?.taskName);

  const updateTask = () => {
    todoModel.taskName = taskName;
    todoModel.details = details;
    todoModel.priority = priority;
    todoModel.progress = progress;

    setTodoList(todoList);
    updateProjectList(todoList);
  };

  //task item delete func
  const deleteTask = (id) => {
    let copiedTodoList = [...todoList];
    copiedTodoList.splice(id, 1);

    setTodoList(copiedTodoList);
    updateProjectList(copiedTodoList);
  };

  useEffect(() => {
    updateTask();
  }, [taskName, details, priority, progress]);

  useEffect(() => {
    updateProjectList(todoList);
  }, [todoList]);

  return (
    <div className="project-todo-item-card-container">
      {/* <p>{todoModel.taskName}</p>
      <p>{todoModel.details}</p>
      <p>{todoModel.priority}</p>
      <p>{todoModel.progress}</p> */}
      <input
        value={todoModel?.taskName}
        placeholder={todoModel?.taskName}
        onChange={(e) => setTaskName(e.target.value)}
      ></input>
      <textarea
        value={todoModel?.details}
        placeholder={todoModel?.taskName}
      ></textarea>
      <select value={todoModel?.priority}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <select value={todoModel?.progress}>
        <option>To do</option>
        <option>In progress</option>
        <option>Done</option>
      </select>
      <button onClick={() => deleteTask(id)}>Delete</button>
    </div>
  );
}

export default ProjectTodoItemCard;
