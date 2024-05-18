import React from "react";
import "../../../styles/components/AddNewTaskFields.css";

function AddNewTaskFields(props) {
  const { handleSetTodoModel, addNewTask } = props;
  return (
    <div className="add-new-task-container">
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
            className="button blue-button fit-content"
            onClick={() => addNewTask()}
          >
            Add+
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNewTaskFields;
