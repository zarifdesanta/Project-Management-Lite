import React, { useEffect, useState } from "react";
import "../../../styles/components/ProjectTaskCardModal.css";

import { FaTrash } from "react-icons/fa";

//Todo: fix updateTask [fixed; not a good solution]
//Todo: Then fix design
//Done: Clicking outside will hide this component

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
    setModal(!modal);
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
    <>
      <div className="project-task-card-modal-sub-container" id="modal">
        <div className="header-group">
          <input
            value={todoModel.issueId}
            onChange={(e) => updateTask(e.target.value, 5)}
          ></input>
          <input
            value={todoModel?.taskName}
            placeholder={todoModel?.taskName}
            onChange={(e) => updateTask(e.target.value, 1)}
          ></input>
        </div>
        <div className="row-group">
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
            <option>Discussion</option>
            <option>Ignore</option>
            <option>Done</option>
          </select>
        </div>

        <textarea
          value={todoModel?.details}
          onChange={(e) => updateTask(e.target.value, 2)}
        ></textarea>

        <div className="button-container">
          <button className="button black" onClick={() => deleteTask(id)}>
            <FaTrash color="red" size={15}></FaTrash>
          </button>
          <button
            className="button white-button"
            onClick={() => setModal(!modal)}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}

export default ProjectTaskCardModal;
