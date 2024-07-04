import React, { useEffect, useState } from "react";
import "./ProjectMain.css";
import { Link, useParams } from "react-router-dom";

import {
  toggleView,
  saveData,
  loadData,
  deleteDocFromFirestore,
} from "../../utils/Common";
import { getDocFromFirestore, updateDocInFirestore } from "../../utils/Common";

import ProjectTaskCard from "./components/ProjectTaskCard";
import ProjectTaskCardModal from "./components/ProjectTaskCardModal";
import AddNewTaskFields from "./components/AddNewTaskFields";
import NewTaskButton from "./components/NewTaskButton";
import OptionsButton from "./components/OptionsButton";
import ToggleViewButton from "../../components/shared/ToggleViewButton";

import { FaStar, FaGear } from "react-icons/fa";

//Done: fix default value
//Done: fix default value after adding
//Todo: update design
//Todo: title and starred method can be improved
//Done: make a better solution for input handling -> using one useState()

function ProjectMain(props) {
  const { id } = useParams();
  const [firestoreId, setFirestoreId] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [projectList, setProjectList] = useState([]);
  const [model, setModel] = useState();
  const [todoModel, setTodoModel] = useState(initTodoModel);
  const [todoList, setTodoList] = useState([]);

  const [projectTitle, setProjectTitle] = useState(model?.title);
  const [isStarred, setIsStarred] = useState(model?.starred);

  const [isViewInputField, setIsViewInputField] = useState(false);
  const [isViewOptionsField, setIsViewOptionsField] = useState(false);

  var initTodoModel = {
    issueId: "Id",
    taskName: "Title",
    details: "Details",
    priority: "Priority",
    progress: "Progress",
  };

  const handleSetTodoModel = (value, input) => {
    setTodoModel((prevModel) => ({ ...prevModel, [input]: value }));
  };

  const addNewTask = () => {
    if (todoModel == null) {
      alert("Please insert input");
      return;
    }

    todoList.push(todoModel);
    setTodoList(todoList);

    updateProjectList(todoList);
    setIsViewInputField(!isViewInputField);
    setTodoModel(initTodoModel);
  };

  const updateProjectList = (todoList) => {
    //setting up updated porject list

    model.todoList = todoList;
    setModel(model);

    updateDocInFirestore(firestoreId, model);
  };

  const handleSetProjectTitle = (e) => {
    var model = {
      title: e,
      starred: isStarred,
      todoList: todoList,
    };

    setProjectTitle(e);

    updateDocInFirestore(firestoreId, model);
  };

  const handleSetIsStarred = (isStarred) => {
    setIsStarred(isStarred);

    var model = {
      title: projectTitle,
      starred: isStarred,
      todoList: todoList,
    };

    updateDocInFirestore(firestoreId, model);
  };

  const deleteThisProject = () => {
    let copiedProjectList = [...projectList];
    copiedProjectList.splice(id, 1);

    deleteDocFromFirestore(firestoreId);
  };

  useEffect(() => {
    setTodoModel(initTodoModel);
    setIsLoading(true);

    const getData = async () => {
      const data = await getDocFromFirestore();
      setIsLoading(false);
      if (data) {
        var cur = data.filter((model) => {
          return model?.id == id;
        });

        setFirestoreId(id);
        setModel(cur[0]);
        setProjectTitle(cur[0].title);
        setIsStarred(cur[0].starred);
        setTodoList(cur[0].todoList);
      }
    };

    getData();
  }, []);

  return (
    <>
      <div className="project-main-container">
        {isLoading ? (
          <div className="loading-container">
            <span>Loading...</span>
          </div>
        ) : (
          <></>
        )}

        <div className="header">
          <input
            value={projectTitle}
            onChange={(e) => handleSetProjectTitle(e.target.value)}
          ></input>
          <button onClick={() => handleSetIsStarred(!isStarred)}>
            {isStarred ? (
              <FaStar size={20} color="orange"></FaStar>
            ) : (
              <FaStar size={20} color="white"></FaStar>
            )}
          </button>
        </div>
        <div className="sub-container">
          <div className="option-new-button-container">
            <ToggleViewButton
              buttonName="Options"
              isView={isViewOptionsField}
              setIsView={setIsViewOptionsField}
              divId="options"
              cssDisplay="flex"
              notActiveButtonClass="white-button"
            ></ToggleViewButton>

            <ToggleViewButton
              buttonName="New"
              isView={isViewInputField}
              setIsView={setIsViewInputField}
              divId="fields"
              cssDisplay="grid"
            ></ToggleViewButton>
          </div>

          <div className="options-item-container" id="options">
            <Link className="" style={{ width: "100%" }} to={"/home"}>
              <button
                className="button red-button"
                onClick={() => deleteThisProject()}
              >
                Delete Project
              </button>
            </Link>
            <button
              className="button white-button"
              onClick={() => handleSetIsStarred(!isStarred)}
            >
              {isStarred ? "Starred" : "Not Starred"}
            </button>
          </div>

          <AddNewTaskFields
            handleSetTodoModel={handleSetTodoModel}
            addNewTask={addNewTask}
          ></AddNewTaskFields>

          <div className="">
            <div className="task-item-fields-container">
              <p>Id</p>
              <p>Title</p>
              <p>Details</p>
              <p>Priority</p>
              <p>Progress</p>
            </div>
            <div className="task-item-container">
              {todoList.map((todoModel, id) => {
                return (
                  <ProjectTaskCard
                    todoModel={todoModel}
                    id={id}
                    todoList={todoList}
                    setTodoList={setTodoList}
                    updateProjectList={updateProjectList}
                  ></ProjectTaskCard>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectMain;
