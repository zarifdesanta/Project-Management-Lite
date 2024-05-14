import React from "react";

function ProjectTaskCard(props) {
  const { todoModel, id, updateProjectList, todoList, setTodoList } = props;

  const deleteTask = () => {
    let copiedTodoList = [...todoList];
    copiedTodoList.splice(id, 1);
    // let newList = copiedTodoList.filter((item) => item.id !== id);
    setTodoList(copiedTodoList);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
      <p>{todoModel.taskName}</p>
      <p>{todoModel.details}</p>
      <p>{todoModel.priority}</p>
      <p>{todoModel.progress}</p>
      <button onClick={() => deleteTask()}>Delete</button>
    </div>
  );
}

export default ProjectTaskCard;
