import React, { useEffect, useState } from "react";
import "../styles/components/ProjectTaskCard.css";

import { saveData } from "../utils/SaveLoad";

//Todo: fix updateTask [fixed; not a good solution]
//Todo: Then fix design

function ProjectTaskCard(props) {
  const { todoModel, id, updateProjectList, todoList, setTodoList } = props;

  const [updateDom, setUpdateDom] = useState();

  const updateTask = (value, id) => {
    if (id == 1) {
      todoModel.taskName = value;
    } else if (id == 2) {
      todoModel.details = value;
    } else if (id == 3) {
      todoModel.priority = value;
    } else if (id == 4) {
      todoModel.progress = value;
    } else if (id == 5) {
      todoModel.issueId = value;
    }

    setUpdateDom(value);
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
    updateProjectList(todoList);
  }, [todoList]);

  return (
    <div className="project-task-card-container">
      <input
        value={todoModel.issueId}
        onChange={(e) => updateTask(e.target.value, 5)}
      ></input>
      <input
        value={todoModel?.taskName}
        placeholder={todoModel?.taskName}
        onChange={(e) => updateTask(e.target.value, 1)}
      ></input>
      <textarea
        value={todoModel?.details}
        onChange={(e) => updateTask(e.target.value, 2)}
      ></textarea>
      <select
        value={todoModel?.priority}
        onChange={(e) => updateTask(e.target.value, 3)}
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <select
        value={todoModel?.progress}
        onChange={(e) => updateTask(e.target.value, 4)}
      >
        <option>To do</option>
        <option>In progress</option>
        <option>Done</option>
      </select>
      <button className="button red-button" onClick={() => deleteTask(id)}>
        Delete
      </button>
    </div>
  );
}

export default ProjectTaskCard;
