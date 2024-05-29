import React, { useEffect, useState } from "react";
import "../../../styles/components/ProjectTaskCardModal.css";

import { FaTrash } from "react-icons/fa";

//Todo: fix updateTask [fixed; not a good solution]
//Todo: Then fix design
//Todo: Clicking outside will hide this component

function ProjectTaskCardModal(props) {
  const {
    todoModel,
    id,
    updateProjectList,
    todoList,
    setTodoList,
    modal,
    setModal,
  } = props;

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

  const handleProgressColorClass = (value) => {
    if (value == "Done") {
      return "done";
    } else if (value == "In progress") {
      return "in-progress";
    } else {
      return "todo";
    }
  };

  const handlePriorityColorClass = (value) => {
    if (value == "Low") {
      return "low";
    } else if (value == "Medium") {
      return "medium";
    } else {
      return "high";
    }
  };

  useEffect(() => {
    updateProjectList(todoList);
  }, [todoList]);

  return (
    <div className="project-task-card-modal-container">
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
        className={handlePriorityColorClass(todoModel?.priority)}
        onChange={(e) => updateTask(e.target.value, 3)}
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <select
        value={todoModel?.progress}
        className={handleProgressColorClass(todoModel?.progress)}
        onChange={(e) => updateTask(e.target.value, 4)}
      >
        <option>To do</option>
        <option>In progress</option>
        <option>Done</option>
      </select>
      <button className="button " onClick={() => deleteTask(id)}>
        <FaTrash color="red" size={15}></FaTrash>
      </button>
      <button className="button " onClick={() => setModal(!modal)}>
        <FaTrash color="red" size={15}></FaTrash>
      </button>
    </div>
  );
}

export default ProjectTaskCardModal;
