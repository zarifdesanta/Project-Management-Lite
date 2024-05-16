import React from "react";
import "../../styles/components/modals/AddTaskModal.css";

function AddTaskModal(props) {
  const { modal, setModal } = props;
  return (
    <div className="add-task-modal-container">
      AddTaskModal
      <button onClick={() => setModal(!modal)}>Close Modal</button>
      {/* <div className="add-task-items">
        <input onChange={(e) => setTaskName(e.target.value)}></input>
        <input onChange={(e) => setDetails(e.target.value)}></input>
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

        <button onClick={() => addNewTask()}>Add+</button>
      </div> */}
    </div>
  );
}

export default AddTaskModal;
