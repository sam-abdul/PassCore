import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Google from "../assets/google.png";
import Navbar from "./Navbar";
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return (
    <>
      <Navbar/>
      <div className="form">
        <div className="form-body">
          {error && <p>{JSON.stringify(error.message)}</p>}
          <input
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email address"
            type="email"
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
          <Link className="forget-password" to="/reset">
            {" "}
            Forgot Password
          </Link>
          <button
            className="auth-button"
            onClick={() => logInWithEmailAndPassword(email, password)}
          >
            Sign In
          </button>
          <br></br>
          <button className="google-button" onClick={signInWithGoogle}>
            <img className="google-icon" src={Google} alt="google button" />
            Sign In with Google
          </button>
          
          <div className="account">
            {" "}
            Don't have an account{" "}
            <Link className="account-bold" to="/register">
              Sign Up
            </Link>{" "}
            <br></br>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
