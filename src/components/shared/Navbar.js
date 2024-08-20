import React, { useEffect } from "react";
import "../../styles/shared/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../utils/Firebase";
import { signInWithPopup, signOut } from "firebase/auth";

import { FaStar } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  // console.log(auth?.currentUser?.email);

  const logout = async () => {
    try {
      await signOut(auth);
      //document.getElementById("rightItems").style.display = "none";
      navigate("/");
    } catch (err) {
      console(err);
    }
  };

  useEffect(() => {
    if (window.location.pathname == "/") {
      document.getElementById("rightItems").style.display = "none";
    } else {
      document.getElementById("rightItems").style.display = "flex";
    }
  }, [navigate]);

  return (
    <div className="navbar-main-container">
      <div className="navbar-sub-container">
        <div className="navbar-left-items">
          <span className="navbar-title">Atmos Lite</span>
        </div>
        <div className="navbar-right-items" id="rightItems">
          {/* <button className="button">+</button> */}
          <button className="button black-button">
            <FaStar size={16} color="white"></FaStar>
          </button>
          <button className="button black-button">
            <FaGear size={16} color="white"></FaGear>
          </button>
          <button className="button black-button" onClick={() => logout()}>
            <FaSignOutAlt size={16} color="white"></FaSignOutAlt>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
