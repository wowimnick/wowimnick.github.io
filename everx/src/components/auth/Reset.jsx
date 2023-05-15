import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordResetEmailFn } from "./firebase";
import AOS from 'aos';
import "./Reset.css";

function Reset(props) {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  const handleExitClick = () => {
    props.setResetVisible(false);
  };

  return (
    <div className="reset" data-aos="fade-in" data-aos-easing="ease">
      <div className="reset__container" data-aos="fade-up" data-aos-easing="ease">
        <button className="exit" onClick={handleExitClick}>⮌</ button>
        <input
          type="text"
          className="reset__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className="reset__btn"
          onClick={() => sendPasswordResetEmailFn(email)}>
          Reset
        </button>
      </div>
    </div>
  );
}
export default Reset;