import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset} from "../firebase/firebase";
import Navbar from "./Navbar";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);
  return (
    <>
    <Navbar/>
     <div className="form-body">
     <input
      className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email address"
        type="email"
      /><br></br>
      <button className="auth-button" onClick={() => sendPasswordReset(email)}>
   Reset Password
      </button>
      <br></br>
      <div className="account">  Don't have an account? <Link className="account-bold" to="/register">Sign Up</Link> now.</div>
    
     </div>
     </>
  );
};

export default Reset;
