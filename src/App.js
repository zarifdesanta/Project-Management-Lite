import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import ProjectMain from "./pages/project_main/ProjectMain";
import NewProject from "./pages/new_project/NewProject";

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route
            path="/project-main/:id"
            element={<ProjectMain></ProjectMain>}
          ></Route>
          <Route
            path="/new-project/:data"
            element={<NewProject></NewProject>}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
