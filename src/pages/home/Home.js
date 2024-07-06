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

import { FaSearch } from "react-icons/fa";

//Todo: reset input field after creating a project
//Todo: add timestamp
//Todo: filter based on timestamp (fixes sorting)

function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const [projectList, setProjectList] = useState([]);
  const [isViewAddProjectField, setIsViewAddProjectField] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [searchVal, setSearchVal] = useState("");

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

  const handleSearchInput = (searchTerm) => {
    if (searchTerm == "") {
      const getData = async () => {
        const data = await getDocFromFirestore();
        setIsLoading(false);
        if (data) {
          setProjectList(data);
        }
      };

      getData();
    }

    const filteredList = projectList.filter((project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setProjectList(filteredList);
    console.log(filteredList);
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
          activeButtonClass="black-button max-content"
          notActiveButtonClass="white-button max-content"
        ></ToggleViewButton>
        <AddNewProjectFields
          setIsViewAddProjectField={setIsViewAddProjectField}
          projectList={projectList}
          setProjectList={setProjectList}
        ></AddNewProjectFields>

        <button className="button black-button max-content">Settings</button>
        <button className="button black-button max-content">Starred</button>
        <div className="second-row">
          <div className="search-field">
            <FaSearch className="custom-icon"></FaSearch>
            <input
              placeholder="Search..."
              type="text"
              onChange={(e) => handleSearchInput(e.target.value)}
            ></input>
          </div>
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
      <div
        className="project-item-card-grid-container"
        style={{ height: "20vh" }}
      >
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
