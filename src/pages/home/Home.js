import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

import ProjectItemCard from "./components/ProjectItemCard";
import AddNewProjectFields from "./components/AddNewProjectFields";
import NewProjectButton from "./components/NewProjectButton";
import ToggleViewButton from "../../components/shared/ToggleViewButton";

import { loadData, clearAll } from "../../utils/Common";
import { getDocFromFirestore } from "../../utils/Common";
import { auth, googleProvider } from "../../utils/Firebase";
import { signInWithPopup, signOut } from "firebase/auth";

//Todo: reset input field after creating a project
//Todo: add timestamp
//Todo: filter based on timestamp (fixes sorting)

function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const [projectList, setProjectList] = useState([]);
  const [isViewAddProjectField, setIsViewAddProjectField] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  console.log(auth?.currentUser?.email);

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console(err);
    }
  };

  useEffect(() => {
    setProjectList(projectList);
  }, [projectList]);

  useEffect(() => {
    // var loadedProjectList = loadData("projectList");
    setIsLoading(true);
    const getData = async () => {
      const data = await getDocFromFirestore();
      setIsLoading(false);
      if (data) {
        setProjectList(data);
      }
    };

    getData();
  }, []);

  return (
    <div className="home-container">
      {isLoading ? (
        <div className="loading-container">
          <span>Loading...</span>
        </div>
      ) : (
        <></>
      )}

      <div className="left-items">
        <ToggleViewButton
          buttonName="New Project"
          isView={isViewAddProjectField}
          setIsView={setIsViewAddProjectField}
          divId="addNewProjectField"
          cssDisplay="flex"
          activeButtonClass="black-button"
          notActiveButtonClass="white-button"
        ></ToggleViewButton>
        <AddNewProjectFields
          setIsViewAddProjectField={setIsViewAddProjectField}
          projectList={projectList}
          setProjectList={setProjectList}
        ></AddNewProjectFields>

        <div className="second-row">
          <button className="button black-button">Settings</button>
          <button className="button black-button">Starred</button>
        </div>

        {/* <button className="button red-button" onClick={logout}>
          Log out
        </button> */}

        {/* <p>Starred</p> */}

        {/* {projectList
          .filter((model) => {
            return model.userId == auth?.currentUser?.uid;
          })
          .map((model) => {
            if (model.starred) {
              return (
                <ProjectItemCard
                  model={model}
                  id={model.id}
                  firestoreId={model.id}
                ></ProjectItemCard>
              );
            }
          })} */}
      </div>

      <p>Starred</p>
      <div className="project-item-card-grid-container">
        {projectList
          .filter((model) => {
            return model.userId == auth?.currentUser?.uid;
          })
          .map((model) => {
            if (model.starred) {
              return (
                <ProjectItemCard
                  model={model}
                  id={model.id}
                  firestoreId={model.id}
                ></ProjectItemCard>
              );
            }
          })}
      </div>

      <p className="title">All Projects</p>
      <div className="project-item-card-grid-container">
        {projectList
          .filter((model) => {
            return model.userId == auth?.currentUser?.uid;
          })
          .map((model) => {
            return (
              <ProjectItemCard
                model={model}
                id={model.id}
                firestoreId={model.id}
              ></ProjectItemCard>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
