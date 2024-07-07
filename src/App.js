import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import ProjectMain from "./pages/project-main/ProjectMain";
import NewProject from "./pages/new-project/NewProject";
import SignIn from "./pages/sign-in/SignIn";
import Navbar from "./components/shared/Navbar";

function App() {
  return (
    <>
      <div>
        <Router>
          <Navbar></Navbar>
          <div className="container">
            <Routes>
              <Route path="/home" element={<Home></Home>}></Route>
              <Route
                path="/project-main/:id"
                element={<ProjectMain></ProjectMain>}
              ></Route>
              <Route path="/" element={<SignIn></SignIn>}></Route>
              <Route
                path="/new-project"
                element={<NewProject></NewProject>}
              ></Route>
            </Routes>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
