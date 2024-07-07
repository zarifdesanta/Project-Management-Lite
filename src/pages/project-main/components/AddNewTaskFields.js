import React from "react";
import "../../../styles/components/AddNewTaskFields.css";

import { FaPlus } from "react-icons/fa";

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
          <textarea
            placeholder="Details"
            onChange={(e) => handleSetTodoModel(e.target.value, "details")}
          ></textarea>
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
            <option>Discussion</option>
            <option>Ignore</option>
            <option>Done</option>
          </select>
          <button
            className="button white-button fit-content"
            onClick={() => addNewTask()}
          >
            <span style={{ verticalAlign: "middle", marginRight: "4px" }}>
              Add
            </span>
            <FaPlus size={12} style={{ verticalAlign: "middle" }}></FaPlus>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNewTaskFields;
