import React, { useEffect, useState } from "react";
import "./SignIn.css";
import { auth, googleProvider } from "../../utils/Firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

import { FaAngleRight } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

function SignIn() {
  const navigate = useNavigate();

  const [user, setUser] = useState();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);

      navigate("/home");
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

  return (
    <div className="sign-in-container">
      <div className="sign-in-sub-container">
        <h3>Sign In</h3>

        <label for="email">Email</label>
        <input id="email" placeholder="Email"></input>

        <label for="password">Password</label>
        <input id="password" placeholder="Password"></input>

        <button className="button blue-button max-content center">
          Log In
        </button>

        <div className="sign-in-divider-container">
          <div></div>
          <div>or</div>
          <div></div>
        </div>

        <button
          className="button blue-button max-content sign-in-button"
          onClick={signInWithGoogle}
        >
          <FaGoogle
            size={16}
            style={{ verticalAlign: "middle", marginRight: "4px" }}
          ></FaGoogle>
          Sign in with Google
        </button>

        {/* <button onClick={logout}>Log out</button> */}
      </div>
    </div>
  );
}

export default SignIn;
