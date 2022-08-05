import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase/firebase";
import Google from "../assets/google.png";
import Navbar from "./Navbar";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);
  return (
    <>
    <Navbar/>
      <div className="form-body">
        <input
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="nick name"
          type="text"
        />
        <br></br>
        <input
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email address"
        />
        <br></br>
        <input
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          type="password"
        />
        <br></br>
        <button className="auth-button" onClick={register}>
          Sign Up
        </button>
        <br></br>
        <button className="google-button" onClick={signInWithGoogle}>
          <img className="google-icon" src={Google} alt="google button" />
          Sign Up with Google
        </button>

        <div className="account">
          {" "}
           Have an account{" "}
          <Link className="account-bold" to="/">
            Sign In
          </Link>{" "}
        
        </div>
      </div>

    </>
  );
};

export default Register;
