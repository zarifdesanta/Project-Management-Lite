import React, { useEffect, useState } from "react";
import "./SignIn.css";
import { auth, googleProvider } from "../../utils/Firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { Link } from "react-router-dom";

import { FaAngleRight } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

function SignIn() {
  const [user, setUser] = useState();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      handleLetsGoButton();
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console(err);
    }
  };

  const handleLetsGoButton = () => {
    if (auth?.currentUser != null) {
      document.getElementById("letsGo").style.display = "block";
    } else {
      document.getElementById("letsGo").style.display = "none";
    }
  };

  useEffect(() => {
    handleLetsGoButton();
  }, []);

  return (
    <div className="sign-in-container">
      <h3>Project Management Lite</h3>
      <button
        className="button blue-button max-content sign-in-button"
        onClick={signInWithGoogle}
      >
        <FaGoogle
          size={24}
          style={{ verticalAlign: "middle", marginRight: "4px" }}
        ></FaGoogle>
        Sign in with Google
      </button>

      {/* <button onClick={logout}>Log out</button> */}

      <Link className="go-to-home-button-container" to={"/home"} id="letsGo">
        <button className="go-to-home-button">
          <FaAngleRight
            size={50}
            style={{ verticalAlign: "middle" }}
          ></FaAngleRight>
        </button>
      </Link>
    </div>
  );
}

export default SignIn;
