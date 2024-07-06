import React, { useEffect, useState } from "react";
import "../../../styles/components/ProjectTaskCard.css";

import { FaTrash } from "react-icons/fa";
import ProjectTaskCardModal from "./ProjectTaskCardModal";

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

  const [modal, setModal] = useState(false);
  function openModal() {
    console.log("opening modal");
    return (
      <ProjectTaskCardModal
        todoModel={todoModel}
        id={id}
        todoList={todoList}
        setTodoList={setTodoList}
        updateProjectList={updateProjectList}
      ></ProjectTaskCardModal>
    );
  }

  const onClickOusideModal = () => {
    if (document.getElementById("modal")) {
      setModal(!modal);
    }
  };

  useEffect(() => {
    updateProjectList(todoList);
  }, [todoList]);

  useEffect(() => {
    openModal();
  }, [modal]);

  return (
    <>
      {modal ? (
        <div
          onClick={() => onClickOusideModal()}
          className="project-task-card-modal-main-container"
        ></div>
      ) : (
        <></>
      )}

      {modal ? (
        <ProjectTaskCardModal
          todoModel={todoModel}
          id={id}
          todoList={todoList}
          setTodoList={setTodoList}
          updateProjectList={updateProjectList}
          modal={modal}
          setModal={setModal}
        ></ProjectTaskCardModal>
      ) : (
        <></>
      )}
      <div className="project-task-card-container">
        <input
          value={todoModel.issueId}
          onClick={() => setModal(!modal)}
          // onChange={(e) => updateTask(e.target.value, 5)}
        ></input>
        <input
          value={
            todoModel?.taskName.length > 18
              ? todoModel?.taskName.slice(0, 18) + "..."
              : todoModel?.taskName
          }
          placeholder={todoModel?.taskName}
          onClick={() => setModal(!modal)}
          // onChange={(e) => updateTask(e.target.value, 1)}
        ></input>
        <input
          value={
            todoModel?.details.length > 50
              ? todoModel?.details.slice(0, 50) + "..."
              : todoModel?.details
          }
          onClick={() => setModal(!modal)}
          // onChange={(e) => updateTask(e.target.value, 2)}
        ></input>

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
        <button className="button " onClick={() => deleteTask(id)}>
          <FaTrash color="red" size={15}></FaTrash>
        </button>
        {/* <button className="button " onClick={() => setModal(!modal)}>
        <FaTrash color="red" size={15}></FaTrash>
      </button> */}
      </div>
    </>
  );
}

export default ProjectTaskCard;
